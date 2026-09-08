const fs=require('fs'),vm=require('vm'),assert=require('assert');
const src=fs.readFileSync('app/src/main/assets/dhad.browser.js','utf8');
const ctx={console,setTimeout,clearTimeout,Promise,URL,URLSearchParams,Intl,
  localStorage:{getItem(){return null},setItem(){},removeItem(){}},
  location:{pathname:'/',search:''},history:{pushState(){}},
  window:{addEventListener(){},removeEventListener(){},location:{pathname:'/',search:''}},
  document:{createElement(){return {style:{},setAttribute(){},addEventListener(){},appendChild(){},remove(){}}},
    querySelector(){return null},querySelectorAll(){return []},head:{appendChild(){}},body:{appendChild(){}}}
};
ctx.window.document=ctx.document; ctx.window.fetch=undefined;
vm.createContext(ctx);vm.runInContext(src,ctx);const Dhad=ctx.window.Dhad;
function run(source){const out=[];const i=new Dhad.Interpreter({onPrint:s=>out.push(s),onInput:()=>''});i.maxSteps=250000;i.run(source);return {out,i};}
const cases=[
 [`اطبع("مرحبا")`,'مرحبا'],
 [`خلي أ = 2\nخلي ب = 3\nاطبع(أ + ب)`,'5'],
 [`دالة ج(ن) { إرجع ن * 2 }\nاطبع(ج(4))`,'8'],
 [`استورد رياضيات\nاطبع(رياضيات.جذر(25))`,'5'],
];
for(const [source,expected] of cases){const {out}=run(source);assert(out.includes(expected),source)}
(async()=>{
  const {out,i}=run(`اطبع("pre-async")`);
  await i.runAsync(`استورد ويب\nغير_متزامن دالة تجربة() { انتظر ويب.تأخير(0)\n اطبع("async-ok") }\nانتظر تجربة()`);
  assert(out.includes('async-ok'));
  const ls=new Dhad.LanguageService();
  assert(ls.diagnostics('اطبع(').length>0);
  assert(ls.completions('ري').some(x=>x.label==='رياضيات'));
  console.log('Core, Web/Async, diagnostics and language-service tests: OK');
})().catch(e=>{console.error(e);process.exit(1)});

{
  const {out}=run(`استورد ألوان\nاطبع(ألوان.أحمر)\nاطبع(ألوان.لون("#123456"))\nاطبع(ألوان.شفافية("#123456", 0.5))\nاطبع(ألوان.خلط("#000000", "#FFFFFF", 0.5))`);
  assert(out.includes('red'));
  assert(out.includes('#123456'));
  assert(out.some(x=>x.includes('rgba(18,52,86,0.5)')));
  assert(out.some(x=>x.includes('#808080')));
}
{
  const {i}=run(`استورد تصميم\nخلي css = تصميم.نمط({لون: "أحمر", خلفية: "أبيض", تدوير: "12px"})`);
  const v=i.global.get('css');
  assert(v.includes('color:أحمر;') || v.includes('color:red;'));
  assert(v.includes('background:أبيض;') || v.includes('background:white;'));
  assert(v.includes('border-radius:12px;'));
}
console.log('Color, styling and theme API tests: OK');
