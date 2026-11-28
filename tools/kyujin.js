const { chromium } = require('playwright');
const fs = require('fs');
const A = '/home/user/irodori/clients/birdie-house/assets';
const out = `${A}/kyujin`;
fs.mkdirSync(out, { recursive: true });
const img = f => `data:image/png;base64,${fs.readFileSync(`${A}/${f}`).toString('base64')}`;

const css = `
.row{padding:30px 0 !important}.row b{font-size:40px !important;width:240px !important}.row span{font-size:46px !important;line-height:1.4 !important}.row small{font-size:30px !important}.title{font-size:92px !important;margin-top:50px !important}.webt{font-size:68px !important}.webs{font-size:38px !important}.foot{font-size:36px !important;bottom:230px !important}.row{padding:24px 0 !important}.big{font:900 64px/1.2 'Noto Serif JP',serif !important;color:#c8202a;font-style:normal}
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@600;900&family=Noto+Sans+JP:wght@500;700&family=Noto+Sans+SC:wght@500;700&family=Noto+Serif+SC:wght@900&family=Noto+Sans+KR:wght@500;700&family=Noto+Serif+KR:wght@900&display=swap');
.zh .title{font-family:'Noto Serif SC',serif}.zh .row b,.zh .row span,.zh .foot{font-family:'Noto Sans SC',sans-serif}
.ko .title{font-family:'Noto Serif KR',serif}.ko .row b,.ko .row span,.ko .foot{font-family:'Noto Sans KR',sans-serif}
*{box-sizing:border-box;margin:0}
body{width:1080px;height:1920px;background:#fbf3e4;font-family:'Noto Sans JP','IPAGothic',sans-serif;color:#1b1a19;position:relative;overflow:hidden}
.frame{position:absolute;inset:36px;border:4px solid #c9a24a;border-radius:28px}
.head{position:absolute;top:190px;left:0;right:0;text-align:center}
.sun{width:70px;height:70px;border-radius:50%;background:#c8202a;margin:0 auto 18px}
.brand{font:900 54px 'Noto Serif JP',serif;letter-spacing:.08em}
.sub{font:600 24px 'Noto Serif JP',serif;color:#8a6a2a;letter-spacing:.3em;margin-top:6px}
.title{font:900 84px 'Noto Serif JP',serif;color:#c8202a;margin-top:40px}
.body{position:absolute;top:720px;left:110px;right:110px}
.row{display:flex;gap:28px;align-items:baseline;padding:15px 0;border-bottom:2px solid #e3d3b3}
.row small{font-size:26px;color:#6b5a45}.row b{flex:none;width:250px;font:700 34px 'Noto Sans JP',sans-serif;color:#c8202a}
.row span{font:500 36px/1.4 'Noto Sans JP',sans-serif}
.foot{position:absolute;bottom:270px;left:0;right:0;text-align:center;font:600 30px 'Noto Serif JP',serif;letter-spacing:.2em;color:#8a6a2a}
.pic{position:absolute;top:230px;bottom:250px;left:60px;right:60px;display:flex;align-items:center;justify-content:center}
.seat{position:absolute;top:200px;left:60px;right:60px;text-align:center}.seat img{width:100%;border-radius:18px;box-shadow:0 14px 40px rgba(60,30,10,.25)}.seat h2{font:900 64px 'Noto Serif JP',serif;color:#c8202a;margin-top:44px}.seat p{font:500 38px 'Noto Sans JP',sans-serif;margin-top:10px}
.web{position:absolute;top:640px;left:110px;right:110px;background:#fff8ec;border:4px solid #c9a24a;border-radius:28px;padding:34px 20px 30px;text-align:center}.webt{font:900 64px 'Noto Serif JP',serif;color:#c8202a;letter-spacing:.06em}.btn{display:inline-block;margin:22px 0 18px;padding:18px 90px;border-radius:16px;background:#1b1a19;color:#fff;font:700 40px 'Noto Sans JP',sans-serif}.webs{font:500 32px/1.5 'Noto Sans JP',sans-serif}
.pic img{max-width:100%;max-height:100%;border-radius:18px;box-shadow:0 14px 40px rgba(60,30,10,.25)}
`;
const head = (title) => `<div class="head"><div class="sun"></div><div class="brand">BIRDIE HOUSE</div><div class="sub">OSAKA YAKITORI DINING</div><div class="title">${title}</div></div>`;
const info = (title, rows, foot) => `<div class="frame"></div>${head(title)}<div class="body">${rows.map(([k, v]) => `<div class="row"><b>${k}</b><span>${v}</span></div>`).join('')}</div><div class="foot">${foot}</div>`;
const pic = f => `<div class="frame"></div><div class="pic"><img src="${img(f)}"></div>`;

const seat = (f,t,d) => `<div class="frame"></div><div class="seat"><img src="${img(f)}"><h2>${t}</h2><p>${d}</p></div>`;
const row=(r)=>`<div class="body" style="top:700px">${r.map(([k,v])=>`<div class="row"><b>${k}</b><span>${v}</span></div>`).join('')}</div>`;
const pages = {
  'kyujin_1': `<div class="frame"></div>${head('求ム！笑顔の仲間')}${row([
    ['お仕事','接客・ドリンクづくり<br>調理補助など'],
    ['時給','1,300円〜<br><small>※研修期間は最低賃金</small>'],
    ['時間','16:00〜24:00頃<br><small>終電はご相談ください</small>'],
    ['シフト','週1日〜OK'],
    ['歓迎','未経験・学生・副業'],
    ['身だしなみ','髪型・髪色・ネイル自由<br><small>清潔感を第一に</small>']]).replace('top:700px','top:640px')}<div class="foot">「悦びの創造」を、一緒に。</div>`,
  'kyujin_2': `<div class="frame"></div>${head('ご応募はこちら')}
  <div class="web" style="top:600px"><div class="webt">DMで「スタッフ応募」</div><div class="webs">と送ってください<br>ご質問だけでも、お気軽に</div></div>${row([
    ['特典','紹介特典 or 入社祝い金<br><i class="big">10,000円</i><br><small>3ヶ月続けたら（併用不可）</small>'],
    ['お電話','070-8499-7077'],
    ['担当','本田'],
    ['勤務地','大阪市北区浮田<br><small>天神橋筋六丁目駅 13番出口</small>']]).replace('top:700px','top:960px')}<div class="foot">粋に、遊ぶ。仲間を待っています。</div>`
};

(async () => {
  const b = await chromium.launch({ args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  for (const [name, html] of Object.entries(pages)) {
    await p.setContent(`<html><head><style>${css}</style></head><body>${html}</body></html>`, { waitUntil: 'load', timeout: 20000 }).catch(() => {});
    await p.evaluate(() => document.fonts.ready).catch(() => {});
    await p.screenshot({ path: `${out}/${name}.png` });
    console.log(name);
  }
  await b.close();
})();
