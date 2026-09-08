package org.dhadlang.android;

import android.content.Context;
import android.os.Build;
import android.util.Log;

import org.json.JSONObject;

import java.util.concurrent.atomic.AtomicBoolean;

final class ProductionDiagnostics {
    private static final String TAG = "DhadDiagnostics";
    private static final AtomicBoolean INSTALLED = new AtomicBoolean(false);
    private static Reporter reporter = event -> { };

    interface Reporter { void report(String event); }

    static void install(Context context) {
        if (!INSTALLED.compareAndSet(false, true)) return;
        final Thread.UncaughtExceptionHandler previous = Thread.getDefaultUncaughtExceptionHandler();
        Thread.setDefaultUncaughtExceptionHandler((thread, throwable) -> {
            reportCrash(thread, throwable);
            if (previous != null) {
                try { previous.uncaughtException(thread, throwable); } catch (Throwable ignored) { }
            }
        });
    }

    static void setReporter(Reporter next) {
        if (next != null) reporter = next;
    }

    static void event(String name) {
        try {
            JSONObject o = new JSONObject();
            o.put("event", name);
            o.put("sdk", Build.VERSION.SDK_INT);
            o.put("release", BuildConfig.VERSION_NAME);
            reporter.report(o.toString());
        } catch (Exception ignored) { }
    }

    private static void reportCrash(Thread thread, Throwable throwable) {
        try {
            JSONObject o = new JSONObject();
            o.put("event", "crash");
            o.put("thread", thread == null ? "unknown" : thread.getName());
            o.put("type", throwable == null ? "unknown" : throwable.getClass().getName());
            o.put("sdk", Build.VERSION.SDK_INT);
            o.put("release", BuildConfig.VERSION_NAME);
            reporter.report(o.toString());
        } catch (Exception ignored) { }
    }

    private ProductionDiagnostics() { }
}
