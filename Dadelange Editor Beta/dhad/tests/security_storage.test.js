const fs=require('fs'),vm=require('vm'),assert=require('assert');
const src=fs.readFileSync('app/src/main/assets/dhad.browser.js','utf8');
const ctx={console,setTimeout,clearTimeout,Promise,URL,URLSearchParams,Intl,
  localStorage:{getItem(){return null},setItem(){},removeItem(){}},sessionStorage:{getItem(){return null},setItem(){},removeItem(){}},
  location:{pathname:'/',search:'',href:'file:///android_asset/index.html'},history:{pushState(){},replaceState(){}},
  window:{addEventListener(){},removeEventListener(){},location:{pathname:'/',search:'',href:'file:///android_asset/index.html'},open(){throw new Error('popup should be gated')}},
  document:{createElement(){return {style:{},setAttribute(){},addEventListener(){},appendChild(){},remove(){}}},querySelector(){return null},querySelectorAll(){return []},head:{appendChild(){}},body:{appendChild(){}}}};
ctx.window.document=ctx.document; ctx.window.fetch=undefined; vm.createContext(ctx); vm.runInContext(src,ctx);
const D=ctx.window.Dhad;
assert(D.KIND_LABELS_AR.PermissionError);
let denied=false;
try { const i=new D.Interpreter({}); i.run('استورد ويب\nويب.طلب("https://example.com")'); } catch(e) { denied=e.kind==='PermissionError'; }
assert(denied,'network must be denied by default');
let deniedStorage=false;
try { const i=new D.Interpreter({}); i.run('استورد ويب\nويب.تخزين_محلي("x", "y")'); } catch(e) { deniedStorage=e.kind==='PermissionError'; }
assert(deniedStorage,'storage must be denied by default');
const allowed=new D.Interpreter({capabilities:{network:true,storage:true,popup:true,navigation:true}});
assert.doesNotThrow(()=>allowed.run('استورد ويب\nخلي س = ويب.تخزين_محلي("x","y")'));
console.log('Explicit capability grants: OK');
console.log('Security capability gates: OK');

assert(D.KIND_LABELS_AR.PermissionError === 'صلاحية مرفوضة');

let wsDenied=false;
try { new D.Interpreter({}).run('استورد ويب\nخلي س = ويب.WebSocket("wss://example.com")'); } catch(e) { wsDenied=e.kind==='PermissionError'; }
assert(wsDenied,'WebSocket must be denied by default');
let chunkDenied=false;
try { new D.Interpreter({}).run('استورد ويب\nخلي س = ويب.تحميل_حزمة("https://example.com/mod.js")'); } catch(e) { chunkDenied=e.kind==='PermissionError'; }
assert(chunkDenied,'dynamic module loading must be denied by default');
let cartDenied=false;
try { new D.Interpreter({}).run('استورد متجر\nمتجر.السلة()'); } catch(e) { cartDenied=e.kind==='PermissionError'; }
assert(cartDenied,'store persistence must be denied by default');
let clipboardDenied=false;
try { new D.Interpreter({}).run('استورد ويب\nويب.نسخ("x")'); } catch(e) { clipboardDenied=e.kind==='PermissionError'; }
assert(clipboardDenied,'clipboard must be denied by default');
console.log('Security capability bypass regression checks: OK');


const fakeDoc={
  createElement(name){ return {tagName:String(name).toUpperCase(),style:{setProperty(){},removeProperty(){}},setAttribute(){},appendChild(){},addEventListener(){},removeEventListener(){}}; },
  querySelector(){return null},querySelectorAll(){return []},head:{appendChild(){}},body:{appendChild(){}},
  createDocumentFragment(){return {appendChild(){}}}
};
let dangerousTagDenied=false;
try { new D.Interpreter({domDocument:fakeDoc,domWindow:{location:{pathname:'/',search:'',href:'dhad://sandbox/'},history:{pushState(){},replaceState(){}},addEventListener(){},open(){}}}).run('استورد ويب\nويب.إنشاء("script")'); } catch(e) { dangerousTagDenied=e.kind==='PermissionError'; }
assert(dangerousTagDenied,'dangerous executable DOM tags must be denied');
console.log('DOM execution isolation checks: OK');
