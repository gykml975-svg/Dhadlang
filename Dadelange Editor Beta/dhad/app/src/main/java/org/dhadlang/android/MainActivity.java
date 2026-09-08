package org.dhadlang.android;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Build;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.graphics.Color;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.Toast;
import android.util.Log;
import android.database.Cursor;
import android.provider.OpenableColumns;

import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.InputStream;
import java.io.Writer;
import java.io.File;
import java.io.FileOutputStream;
import java.io.BufferedOutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.charset.CharacterCodingException;
import java.nio.charset.CodingErrorAction;
import java.nio.ByteBuffer;
import java.nio.charset.CharsetDecoder;

public class MainActivity extends Activity {
    private static final int PICK_FILE = 1001;
    private static final int CREATE_FILE = 1002;
    private static final long MAX_FILE_BYTES = 55L * 1024L * 1024L;
    private static final String LOCAL_ORIGIN = "file:///android_asset/";
    private static final String TRUSTED_PAGE = LOCAL_ORIGIN + "index.html";
    private static final String TAG = "DhadMainActivity";

    private WebView web;
    private String pendingName = "ملف.ضاد";
    private File pendingSaveFile;
    private long pendingSaveBytes = 0L;
    private boolean fileOperationPending = false;

    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        ProductionDiagnostics.install(this);
        cleanupStalePendingSaves();
        ProductionDiagnostics.event("activity_created");
        getWindow().setStatusBarColor(Color.rgb(20,22,28));
        getWindow().setNavigationBarColor(Color.rgb(16,18,24));

        web = new WebView(this);
        web.setBackgroundColor(Color.rgb(244,243,240));
        web.setWebViewClient(new SafeWebViewClient());
        web.setWebChromeClient(new WebChromeClient());

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowFileAccess(true);
        s.setAllowContentAccess(false);
        s.setAllowFileAccessFromFileURLs(false);
        s.setAllowUniversalAccessFromFileURLs(false);
        s.setBuiltInZoomControls(false);
        s.setDisplayZoomControls(false);
        s.setTextZoom(100);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            s.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) web.getSettings().setSafeBrowsingEnabled(true);
        web.addJavascriptInterface(new AndroidBridge(), "Android");
        if (state == null || !web.restoreState(state)) web.loadUrl("file:///android_asset/index.html");

        FrameLayout root = new FrameLayout(this);
        root.addView(web, new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT));
        setContentView(root);
    }

    private class SafeWebViewClient extends WebViewClient {
        @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            return openExternal(request.getUrl());
        }

        @Override public boolean shouldOverrideUrlLoading(WebView view, String url) {
            return openExternal(Uri.parse(url));
        }

        private boolean openExternal(Uri uri) {
            if (uri == null) return true;
            String scheme = uri.getScheme();
            if ("file".equalsIgnoreCase(scheme)) return TRUSTED_PAGE.equals(uri.toString());
            if ("mailto".equalsIgnoreCase(scheme)) {
                try { startActivity(new Intent(Intent.ACTION_SENDTO, uri)); }
                catch (Exception e) { Toast.makeText(MainActivity.this, "لا يوجد تطبيق بريد مناسب", Toast.LENGTH_SHORT).show(); }
                return true;
            }
            if ("tel".equalsIgnoreCase(scheme)) {
                try { startActivity(new Intent(Intent.ACTION_DIAL, uri)); }
                catch (Exception e) { Toast.makeText(MainActivity.this, "لا يوجد تطبيق اتصال مناسب", Toast.LENGTH_SHORT).show(); }
                return true;
            }
            if (!"http".equalsIgnoreCase(scheme) && !"https".equalsIgnoreCase(scheme)) return true;
            try {
                startActivity(new Intent(Intent.ACTION_VIEW, uri));
            } catch (Exception e) {
                Toast.makeText(MainActivity.this, "لا يوجد تطبيق مناسب لفتح الرابط", Toast.LENGTH_SHORT).show();
            }
            return true;
        }
    }

    private class AndroidBridge {
        @JavascriptInterface
        public void openFile() {
            if (!isTrustedBridgeCaller()) return;
            runOnUiThread(() -> {
                if (fileOperationPending) return;
                fileOperationPending = true;
                Intent i = new Intent(Intent.ACTION_OPEN_DOCUMENT);
                i.addCategory(Intent.CATEGORY_OPENABLE);
                i.setType("*/*");
                i.putExtra(Intent.EXTRA_MIME_TYPES, new String[]{"text/plain", "text/*", "application/octet-stream", "application/json", "text/html", "text/css", "application/javascript"});
                startActivityForResult(i, PICK_FILE);
            });
        }

        @JavascriptInterface
        public synchronized void beginSaveFile(String name) {
            if (!isTrustedBridgeCaller()) return;
            if (fileOperationPending) return;
            try {
                pendingName = sanitizeFileName(name);
                deletePendingSave();
                pendingSaveFile = File.createTempFile("dhad-save-", ".tmp", getCacheDir());
                pendingSaveBytes = 0L;
                fileOperationPending = true;
            } catch (Exception e) {
                fileOperationPending = false;
                deletePendingSave();
                Log.w(TAG, "Unable to start staged save", e);
                if (web != null) web.post(() -> web.evaluateJavascript("window.onAndroidFileSaved(false," + JSONObject.quote("تعذر تجهيز الحفظ") + ")", null));
            }
        }

        @JavascriptInterface
        public synchronized void appendSaveChunk(String chunk) {
            if (!isTrustedBridgeCaller() || chunk == null) return;
            try {
                if (!fileOperationPending || pendingSaveFile == null) throw new IllegalStateException("save session unavailable");
                byte[] bytes = chunk.getBytes(StandardCharsets.UTF_8);
                if (bytes.length > MAX_FILE_BYTES - pendingSaveBytes) throw new IllegalArgumentException("حجم الملف أكبر من 55 ميجابايت");
                try (BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(pendingSaveFile, true))) { out.write(bytes); }
                pendingSaveBytes += bytes.length;
            } catch (Exception e) {
                Log.w(TAG, "Staged save chunk failed", e);
                abortPendingSave("تعذر تجهيز محتوى الملف للحفظ");
            }
        }

        @JavascriptInterface
        public synchronized void finishSaveFile() {
            if (!isTrustedBridgeCaller()) return;
            runOnUiThread(() -> {
                if (!fileOperationPending || pendingSaveFile == null) {
                    web.post(() -> web.evaluateJavascript("window.onAndroidFileSaved(false," + JSONObject.quote("جلسة الحفظ غير متاحة") + ")", null));
                    return;
                }
                Intent i = new Intent(Intent.ACTION_CREATE_DOCUMENT);
                i.addCategory(Intent.CATEGORY_OPENABLE);
                i.setType("text/plain");
                i.putExtra(Intent.EXTRA_TITLE, pendingName);
                try { startActivityForResult(i, CREATE_FILE); } catch (Exception e) { abortPendingSave("تعذر فتح نافذة الحفظ"); }
            });
        }

        @JavascriptInterface
        public void saveFile(String name, String content) {
            if (!isTrustedBridgeCaller()) return;
            beginSaveFile(name);
            if (content != null) {
                for (int offset = 0; offset < content.length() && fileOperationPending; ) {
                    int end = Math.min(content.length(), offset + 64 * 1024);
                    appendSaveChunk(content.substring(offset, end));
                    offset = end;
                }
            }
            finishSaveFile();
        }

        private boolean isTrustedBridgeCaller() {
            String url = web == null ? null : web.getUrl();
            return TRUSTED_PAGE.equals(url);
        }
    }

    @Override protected void onPause() {
        if (web != null) web.evaluateJavascript("window.DhadIDE && window.DhadIDE.flushAutosave && window.DhadIDE.flushAutosave();", null);
        super.onPause();
    }

    @Override public void onBackPressed() {
        if (web != null && web.canGoBack()) { web.goBack(); return; }
        super.onBackPressed();
    }

    @Override protected void onDestroy() {
        if (web != null) {
            web.removeJavascriptInterface("Android");
            web.stopLoading();
            web.setWebChromeClient(null);
            web.setWebViewClient(null);
            web.destroy();
            web = null;
        }
        super.onDestroy();
    }

    @Override protected void onSaveInstanceState(Bundle out) {
        super.onSaveInstanceState(out);
        out.putString("pendingName", pendingName);
        out.putBoolean("fileOperationPending", fileOperationPending);
        if (pendingSaveFile != null) out.putString("pendingSavePath", pendingSaveFile.getAbsolutePath());
    }

    @Override protected void onRestoreInstanceState(Bundle state) {
        super.onRestoreInstanceState(state);
        pendingName = state.getString("pendingName", "ملف.ضاد");
        deletePendingSave();
        fileOperationPending = state.getBoolean("fileOperationPending", false);
        String savePath = state.getString("pendingSavePath", null);
        if (fileOperationPending && savePath != null) {
            File candidate = new File(savePath);
            if (candidate.isFile() && candidate.length() <= MAX_FILE_BYTES) { pendingSaveFile = candidate; pendingSaveBytes = candidate.length(); }
            else { fileOperationPending = false; deletePendingSave(); }
        } else { fileOperationPending = false; deletePendingSave(); }
    }

    @Override protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode != PICK_FILE && requestCode != CREATE_FILE) return;

        boolean success = false;
        String message = "تم إلغاء العملية";

        try {
            if (resultCode == RESULT_OK && data != null && data.getData() != null) {
                Uri uri = data.getData();
                if (requestCode == PICK_FILE) {
                    String name = displayName(uri);
                    String text = readText(uri);
                    final String safeName = name;
                    web.post(() -> web.evaluateJavascript("window.beginAndroidFileOpen(" + JSONObject.quote(safeName) + ")", null));
                    for (int offset = 0; offset < text.length(); ) {
                        int end = Math.min(text.length(), offset + 64 * 1024);
                        if (end < text.length() && end > offset && Character.isHighSurrogate(text.charAt(end - 1))) end--;
                        if (end <= offset) end = Math.min(text.length(), offset + 64 * 1024 + 1);
                        final String chunk = text.substring(offset, end);
                        web.post(() -> web.evaluateJavascript("window.appendAndroidFileChunk(" + JSONObject.quote(chunk) + ")", null));
                        offset = end;
                    }
                    web.post(() -> web.evaluateJavascript("window.finishAndroidFileOpen()", null));
                    success = true;
                    message = "تم فتح الملف";
                    ProductionDiagnostics.event("file_opened");
                } else {
                    if (pendingSaveFile == null || !pendingSaveFile.isFile()) throw new IllegalStateException("حالة الحفظ انتهت بسبب إعادة إنشاء الشاشة؛ أعد المحاولة");
                    if (pendingSaveBytes > MAX_FILE_BYTES) throw new IllegalArgumentException("حجم الملف أكبر من 55 ميجابايت");
                    OutputStream rawOut = getContentResolver().openOutputStream(uri);
                    if (rawOut == null) throw new IllegalStateException("output stream unavailable");
                    try (InputStream in = new java.io.BufferedInputStream(new java.io.FileInputStream(pendingSaveFile));
                         OutputStream out = rawOut) {
                        byte[] buf = new byte[64 * 1024]; int n; long total = 0;
                        while ((n = in.read(buf)) != -1) { total += n; if (total > MAX_FILE_BYTES) throw new IllegalArgumentException("حجم الملف أكبر من 55 ميجابايت"); out.write(buf,0,n); }
                        out.flush();
                    }
                    success = true;
                    message = "تم حفظ الملف";
                    ProductionDiagnostics.event("file_saved");
                }
            }
        } catch (Exception e) {
            Log.w(TAG, "File operation failed", e);
            message = "تعذر إتمام العملية: " + safeError(e);
        } finally {
            fileOperationPending = false;
            deletePendingSave();
            if (requestCode == CREATE_FILE) {
                final boolean ok = success;
                final String msg = message;
                web.post(() -> web.evaluateJavascript(
                        "window.onAndroidFileSaved(" + ok + "," + JSONObject.quote(msg) + ")", null));
            } else if (!success) {
                final String msg = message;
                web.post(() -> web.evaluateJavascript(
                        "window.onAndroidFileOpenFailed(" + JSONObject.quote(msg) + ")", null));
            }
            Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
        }
    }

    private String displayName(Uri uri) {
        try (Cursor c = getContentResolver().query(uri,
                new String[]{OpenableColumns.DISPLAY_NAME}, null, null, null)) {
            if (c != null && c.moveToFirst()) {
                int i = c.getColumnIndex(OpenableColumns.DISPLAY_NAME);
                if (i >= 0) {
                    String name = c.getString(i);
                    if (name != null && !name.trim().isEmpty()) return sanitizeFileName(name);
                }
            }
        } catch (Exception ignored) { }
        return "ملف.ضاد";
    }

    private String readText(Uri uri) throws Exception {
        long size = -1;
        try (Cursor c = getContentResolver().query(uri,
                new String[]{OpenableColumns.SIZE}, null, null, null)) {
            if (c != null && c.moveToFirst()) {
                int i = c.getColumnIndex(OpenableColumns.SIZE);
                if (i >= 0 && !c.isNull(i)) size = c.getLong(i);
            }
        }
        if (size > MAX_FILE_BYTES) throw new IllegalArgumentException("حجم الملف أكبر من 55 ميجابايت");

        try (InputStream in = getContentResolver().openInputStream(uri)) {
            if (in == null) throw new IllegalStateException("input stream unavailable");
            ByteArrayOutputStream out = new ByteArrayOutputStream((int)Math.min(Math.max(size, 4096), MAX_FILE_BYTES));
            byte[] buf = new byte[64 * 1024];
            long total = 0;
            int n;
            while ((n = in.read(buf)) != -1) {
                total += n;
                if (total > MAX_FILE_BYTES) throw new IllegalArgumentException("حجم الملف أكبر من 55 ميجابايت");
                out.write(buf, 0, n);
            }
            CharsetDecoder decoder = StandardCharsets.UTF_8.newDecoder()
                    .onMalformedInput(CodingErrorAction.REPORT)
                    .onUnmappableCharacter(CodingErrorAction.REPORT);
            try { return decoder.decode(ByteBuffer.wrap(out.toByteArray())).toString(); }
            catch (CharacterCodingException e) { throw new IllegalArgumentException("الملف ليس نص UTF-8 صالحًا"); }
        }
    }

    private void cleanupStalePendingSaves() {
        File dir = getCacheDir(); File[] files = dir == null ? null : dir.listFiles();
        if (files == null) return;
        long cutoff = System.currentTimeMillis() - 24L * 60L * 60L * 1000L;
        for (File f : files) if (f.getName().startsWith("dhad-save-") && f.lastModified() < cutoff) { try { f.delete(); } catch (Exception ignored) {} }
    }

    private void abortPendingSave(String message) {
        fileOperationPending = false;
        deletePendingSave();
        if (web != null) web.post(() -> web.evaluateJavascript("window.onAndroidFileSaved(false," + JSONObject.quote(message) + ")", null));
    }

    private void deletePendingSave() {
        if (pendingSaveFile != null) { try { pendingSaveFile.delete(); } catch (Exception ignored) {} }
        pendingSaveFile = null;
        pendingSaveBytes = 0L;
    }

    private String sanitizeFileName(String name) {
        String n = name == null ? "" : name.trim();
        if (n.isEmpty()) n = "ملف.ضاد";
        n = n.replaceAll("[\\\\/:*?\"<>|]", "_");
        n = n.replaceAll("[\u0000-\u001F\u007F]", "_");
        if (n.equals(".") || n.equals("..")) n = "ملف.ضاد";
        if (n.length() > 100) n = n.substring(0, 100);
        if (!n.toLowerCase(java.util.Locale.ROOT).endsWith(".ضاد") && !n.toLowerCase(java.util.Locale.ROOT).endsWith(".txt")) n += ".ضاد";
        return n;
    }

    private long utf8ByteLength(String value) {
        if (value == null || value.isEmpty()) return 0L;
        long bytes = 0L;
        for (int i = 0; i < value.length(); ) {
            final int cp = value.codePointAt(i);
            if (cp <= 0x7F) bytes += 1;
            else if (cp <= 0x7FF) bytes += 2;
            else if (cp <= 0xFFFF) bytes += 3;
            else { bytes += 4; }
            if (bytes > MAX_FILE_BYTES) return bytes;
            i += Character.charCount(cp);
        }
        return bytes;
    }

    private String safeError(Exception e) {
        if (e instanceof IllegalArgumentException || e instanceof IllegalStateException) {
            String m=e.getMessage();
            if (m!=null && (m.contains("55") || m.contains("UTF-8") || m.contains("حالة الحفظ") || m.contains("stream"))) return m;
        }
        return "تعذر إتمام العملية";
    }
}
