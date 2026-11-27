const { chromium } = require('playwright');
const S=process.argv[2];const OUT=process.argv[4];
const css=`@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,500;6..96,700&family=Zen+Antique&family=Zen+Old+Mincho:wght@700;900&display=swap');
*{margin:0;box-sizing:border-box}html,body{width:1080px;height:1920px;background:transparent;position:relative;overflow:hidden}
.fr{position:absolute;inset:40px;border:3px solid #c9a24a;outline:1px solid rgba(201,162,74,.6);outline-offset:-14px}
.mast{position:absolute;top:170px;left:0;right:0;text-align:center;font:500 230px/0.9 'Bodoni Moda';color:#f3e6c8;letter-spacing:-.02em;text-shadow:0 4px 20px rgba(0,0,0,.6)}
.house{position:absolute;top:385px;left:0;right:0;text-align:center;font:700 40px 'Bodoni Moda';letter-spacing:.9em;padding-left:.9em;color:#c9a24a}
.orn{position:absolute;left:0;right:0;text-align:center;color:#c9a24a;font:400 36px serif;letter-spacing:.4em;text-shadow:0 2px 8px rgba(0,0,0,.8)}
.grad{position:absolute;left:0;right:0;bottom:0;height:640px;background:linear-gradient(rgba(14,10,8,0),rgba(14,10,8,.82) 45%)}.tgrad{position:absolute;left:0;right:0;top:0;height:640px;background:linear-gradient(rgba(14,10,8,.82) 50%,rgba(14,10,8,0))}.cap{position:absolute;left:70px;right:70px;top:1470px;text-align:center;font:400 88px/1.35 'Zen Antique';color:#f3e6c8;text-shadow:0 3px 16px rgba(0,0,0,.95),0 0 6px rgba(0,0,0,.9)}
.cap b{color:#e0b85a;font-weight:400}
.sub{display:block;font:700 44px 'Zen Old Mincho';margin-top:18px;color:#f3e6c8}
.card{position:absolute;inset:0;background:radial-gradient(#2a1d14,#0e0a08)}
.e1{position:absolute;top:640px;left:0;right:0;text-align:center;font:400 104px 'Zen Antique';color:#f3e6c8}
.e2{position:absolute;top:830px;left:0;right:0;text-align:center;font:700 120px 'Bodoni Moda';color:#c8202a}
.e3{position:absolute;top:1060px;left:0;right:0;text-align:center;font:700 46px/1.7 'Zen Old Mincho';color:#f3e6c8}
.e4{position:absolute;top:1400px;left:160px;right:160px;text-align:center;font:700 50px 'Zen Old Mincho';color:#c9a24a;border:3px solid #c9a24a;padding:24px 0}`;
const c=(t,o=true)=>`<div class="grad"></div><div class="fr"></div>${o?'<div class="orn" style="top:1405px">✦</div>':''}<div class="cap">${t}</div>`;
const P=JSON.parse(require('fs').readFileSync(process.argv[3],'utf8'));for(const k in P){if(P[k].startsWith('C:'))P[k]=c(P[k].slice(2));}
const END='';
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1080,height:1920}});
for(const[k,v] of Object.entries(P)){await p.setContent(`<html><head><style>${css}</style></head><body>${v}</body></html>`,{waitUntil:'networkidle',timeout:20000}).catch(()=>{});await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:`${OUT}/${k}.png`,omitBackground:true});}
await b.close();})();
