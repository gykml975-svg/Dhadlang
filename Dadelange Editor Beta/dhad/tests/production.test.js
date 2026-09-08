const fs=require('fs'),assert=require('assert'),vm=require('vm');
const root=process.cwd();
const read=p=>fs.readFileSync(p,'utf8');
const manifest=read('app/src/main/AndroidManifest.xml');
const gradle=read('app/build.gradle');
const activity=read('app/src/main/java/org/dhadlang/android/MainActivity.java');
const example=read('examples/موقع_متجر.ضاد');
const index=read('app/src/main/assets/index.html');

assert(manifest.includes('android:usesCleartextTraffic="false"'));
assert(manifest.includes('android:networkSecurityConfig="@xml/network_security_config"'));
const networkConfig=read('app/src/main/res/xml/network_security_config.xml');
assert(networkConfig.includes('cleartextTrafficPermitted="false"'));
assert(networkConfig.includes('certificates src="system"'));
assert(manifest.includes('@mipmap/ic_launcher'));
assert(gradle.includes('minifyEnabled true') && gradle.includes('shrinkResources true'));
assert(gradle.includes('signingConfigs.release'));
assert(activity.includes('MAX_FILE_BYTES = 55L * 1024L * 1024L'));
assert(activity.includes('setAllowUniversalAccessFromFileURLs(false)'));

assert(activity.includes('setAllowContentAccess(false)'));
assert(activity.includes('MIXED_CONTENT_NEVER_ALLOW'));
assert(activity.includes('TRUSTED_PAGE.equals(uri.toString())'));
assert(activity.includes('mailto'));
assert(activity.includes('ACTION_SENDTO'));
assert(activity.includes('ACTION_DIAL'));
assert(!activity.includes('takePersistableUriPermission'));
assert(activity.includes('pendingSaveBytes > MAX_FILE_BYTES'));
assert(activity.includes('beginSaveFile'));
assert(activity.includes('appendSaveChunk'));
assert(activity.includes('finishSaveFile'));
assert(activity.includes('beginAndroidFileOpen'));
assert(activity.includes('appendAndroidFileChunk'));
assert(activity.includes('finishAndroidFileOpen'));
assert(gradle.includes("testInstrumentationRunner 'androidx.test.runner.AndroidJUnitRunner'"));
assert(gradle.includes("androidx.test.ext:junit:1.2.1"));
assert(gradle.includes("versionCode 1") && gradle.includes("versionName '8.5.9Beta'"));
assert(activity.includes('ProductionDiagnostics.install(this)'));
assert(index.includes('clipboard:false'));
assert(activity.includes('TRUSTED_PAGE.equals(url)'));
assert(activity.includes('pendingSaveFile'));
assert(example.includes('استورد ويب') && example.includes('ويب.صفحة'));
assert(index.includes('aria-live="polite"'));
assert(index.includes('MAX_PROJECT_BYTES=120*1024*1024'));
assert(index.includes('new Blob([editor.value]).size>MAX_SOURCE_LENGTH'));
assert(index.includes('function sanitizeProjectName'));
assert(index.includes('function sanitizeFileName'));
assert(index.includes('workspaceReady=hydrateLargeFiles()'));
assert(index.includes('return persistCurrentFile().then'));


const src=read('app/src/main/assets/dhad.browser.js');
assert(src.includes("runtime.requireCapability('network')") && src.includes("WebSocket"));
assert(src.includes("runtime.requireCapability('storage')") && src.includes("حفظ_منتجات"));
const ctx={console,setTimeout,clearTimeout,Promise,URL,URLSearchParams,Intl,
  localStorage:{getItem(){return null},setItem(){},removeItem(){}},
  location:{pathname:'/',search:''},history:{pushState(){}},
  window:{addEventListener(){},removeEventListener(){},location:{pathname:'/',search:''}},
  document:{createElement(){return {style:{},setAttribute(){},addEventListener(){},appendChild(){},remove(){}}},querySelector(){return null},querySelectorAll(){return []},head:{appendChild(){}},body:{appendChild(){}}}};
ctx.window.document=ctx.document;
vm.createContext(ctx); vm.runInContext(src,ctx);
const Dhad=ctx.window.Dhad;
const i=new Dhad.Interpreter({onPrint:()=>{},onInput:()=>''});
const output=[];
const interpreter=new Dhad.Interpreter({onPrint:v=>output.push(String(v)),onInput:()=>''});
try { interpreter.run(example); } catch(e) { console.error(e); process.exit(1); }
assert(output.join('\n').includes('<!doctype html>'));
assert(output.join('\n').includes('متجر ضاد'));

const runFnMatch=index.match(/function run\(\)\{[\s\S]*?\n\}/);
assert(runFnMatch, 'run() function not found in index.html');
const runFn=runFnMatch[0];
assert(!/clearConsole\(\);consoleState\.textContent=(largeEditorMode\?|["'`])/.test(runFn),
  'run() must not call clearConsole() before printing output — it reinserts the "press run" placeholder above real results');
assert(runFn.includes('consoleBody.replaceChildren()'),
  'run() must clear consoleBody directly (without the empty-state placeholder) before appending execution output');
console.log('Production hardening, adaptive icon, diagnostics and Dhad web example: OK');
