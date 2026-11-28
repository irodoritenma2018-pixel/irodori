// 「串、全部見せます」リール用フレーム（1080x1920）
const { chromium } = require('playwright');
const fs = require('fs');
const P = '/home/user/irodori/clients/birdie-house/assets/photos';
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const K = [['8930','つくね','パリッとピーマンと'],['8933','セセリ','トマトクリームチーズ'],['8934','柿','マスカルポーネ'],['8938','ハツ','九州醤油'],['8936','カブ','梅肉大葉'],['8932','もも','タレ焼き'],['8940','サツマイモ','ハニーチーズ'],['8974','ヤゲン軟骨','コーヒーペッパー'],['8935','里芋','味噌炙り'],['8971','豚タン','レモン'],['8975','レンコン','うに醤油'],['8972','はらみ','山椒おろし'],['8973','さつま揚げ','自家製だし醤油'],['8937','ササミ','しぎ焼き'],['8976','雲仙ハム','粒マスタード'],['8977','ズリ','無添加塩'],['8931','手羽','無添加塩']];
const img = f => `data:image/jpeg;base64,${fs.readFileSync(`${P}/IMG_${f}.jpeg`).toString('base64')}`;
const css = `@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,500;6..96,700&family=Zen+Antique&family=Zen+Old+Mincho:wght@700;900&display=swap');
*{margin:0;box-sizing:border-box}body{width:1080px;height:1920px;position:relative;overflow:hidden;background:radial-gradient(#2a1d14,#0e0a08)}
.fr{position:absolute;inset:40px;border:3px solid #c9a24a;outline:1px solid rgba(201,162,74,.6);outline-offset:-14px}
.ph{position:absolute;left:80px;right:80px;top:600px;height:720px;background-size:cover;background-position:center;border:3px solid #c9a24a;box-shadow:0 0 0 10px rgba(14,10,8,.9),0 0 0 12px rgba(201,162,74,.5)}
.no{position:absolute;top:230px;left:0;right:0;text-align:center;font:700 44px 'Bodoni Moda';letter-spacing:.3em;padding-left:.3em;color:#c9a24a}
.nm{position:absolute;top:300px;left:90px;right:90px;text-align:center;font:400 112px/1.2 'Zen Antique';color:#f3e6c8;text-shadow:0 3px 16px rgba(0,0,0,.9)}
.sb{position:absolute;top:450px;left:90px;right:90px;text-align:center;font:700 50px 'Zen Old Mincho';color:#e0b85a}
.mast{position:absolute;top:250px;left:0;right:0;text-align:center;font:500 230px/0.9 'Bodoni Moda';color:#f3e6c8;letter-spacing:-.02em}
.house{position:absolute;top:465px;left:0;right:0;text-align:center;font:700 40px 'Bodoni Moda';letter-spacing:.9em;padding-left:.9em;color:#c9a24a}
.big{position:absolute;left:90px;right:90px;text-align:center;font:400 120px/1.3 'Zen Antique';color:#f3e6c8;text-shadow:0 3px 16px rgba(0,0,0,.9)}
.big b{color:#e0b85a;font-weight:400}.s2{position:absolute;left:90px;right:90px;text-align:center;font:700 52px/1.6 'Zen Old Mincho';color:#f3e6c8}
.orn{position:absolute;left:0;right:0;text-align:center;color:#c9a24a;font:400 36px serif;letter-spacing:.4em}
.grid{position:absolute;left:80px;right:80px;top:600px;height:720px;display:grid;grid-template-columns:repeat(4,1fr);gap:6px;opacity:.55}.grid div{background-size:cover;background-position:center}`;
const pages = {};
pages.k00 = `<div class="grid">${K.slice(0,16).map(k=>`<div style="background-image:url(${img(k[0])})"></div>`).join('')}</div><div class="fr"></div><div class="orn" style="top:200px">✦ BIRDIE HOUSE ✦</div><div class="big" style="top:280px">串、<b>全部</b><br>見せます。</div><div class="s2" style="top:1380px;opacity:0">.</div>`;
K.forEach((k,i)=>{ pages['k'+String(i+1).padStart(2,'0')] = `<div class="ph" style="background-image:url(${img(k[0])})"></div><div class="fr"></div><div class="no">No.${String(i+1).padStart(2,'0')}</div><div class="nm">${k[1]}</div><div class="sb">${k[2]}</div>`; });
pages.k98 = `<div class="fr"></div><div class="orn" style="top:330px">✦ ─── ✦</div><div class="big" style="top:420px">この中から、<br><b>お任せ</b>で<br>一本ずつ。</div><div class="s2" style="top:1010px">「ストップ」と言うまで。<br>焼鳥は75分間・最大16本</div>`;
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1080,height:1920}});
for(const[k,v] of Object.entries(pages)){await p.setContent(`<html><head><style>${css}</style></head><body>${v}</body></html>`,{waitUntil:'networkidle',timeout:20000}).catch(()=>{});await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:`${OUT}/${k}.png`});}
await b.close();})();
