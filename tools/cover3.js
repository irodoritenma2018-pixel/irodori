// Fashion-magazine cover style (Didone masthead) for BIRDIE HOUSE feed (1080x1440)
const { chromium } = require('playwright');
const fs = require('fs');
const P = '/home/user/irodori/clients/birdie-house/assets/photos';
const out = process.argv[2];
const items = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'));
const img = f => `data:image/jpeg;base64,${fs.readFileSync(`${P}/${f}`).toString('base64')}`;
const css = `
@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,500;6..96,700&family=Noto+Sans+JP:wght@700;900&family=Shippori+Mincho+B1:wght@800&display=swap');
*{margin:0;box-sizing:border-box}
body{width:1080px;height:1440px;position:relative;overflow:hidden;background:#111}
.ph{position:absolute;inset:0;background-size:cover;background-repeat:no-repeat}
.shade{position:absolute;inset:0;background:linear-gradient(rgba(0,0,0,.35) 0,rgba(0,0,0,0) 28%,rgba(0,0,0,0) 62%,rgba(0,0,0,.62) 100%)}
.mast{position:absolute;top:18px;left:0;right:0;text-align:center;font:500 300px/0.86 'Bodoni Moda',serif;font-variation-settings:'opsz' 96;color:var(--mc,#c8202a);letter-spacing:-.035em;white-space:nowrap}
.house{position:absolute;top:276px;left:0;right:0;text-align:center;font:700 34px 'Bodoni Moda',serif;letter-spacing:.9em;padding-left:.9em;color:var(--mc,#c8202a)}
.issue{position:absolute;top:340px;left:52px;color:#fff;font:700 22px/1.25 'Noto Sans JP';text-shadow:0 1px 8px rgba(0,0,0,.6)}
.issue b{display:block;font:700 76px/1 'Bodoni Moda',serif}
.lines{position:absolute;right:52px;top:350px;width:auto;max-width:620px;white-space:nowrap;text-align:right;color:#fff;font:900 30px/1.3 'Noto Sans JP';text-shadow:0 2px 10px rgba(0,0,0,.65)}
.lines p{margin-bottom:22px}.lines .lb{display:block;font:700 22px/1.4 'Noto Sans JP';color:#f1d8a6}.lines .pr{display:block;font:900 60px/1.05 'Noto Sans JP';color:#fff}.lines .nt{display:block;font:700 20px/1.5 'Noto Sans JP';color:#fff;opacity:.9}
.lines small{display:block;font:700 20px/1.4 'Noto Sans JP';color:#f1d8a6}
.head{position:absolute;left:44px;right:44px;bottom:128px;text-align:left;font:900 128px/1 'Noto Sans JP';color:var(--hc,#d9a86c);letter-spacing:-.02em;white-space:nowrap;text-shadow:0 3px 16px rgba(0,0,0,.45)}
.catch{position:absolute;left:48px;right:48px;bottom:268px;font:700 40px/1.2 'Shippori Mincho B1',serif;color:#fff;white-space:nowrap;text-shadow:0 2px 12px rgba(0,0,0,.7)}
.tag{position:absolute;left:48px;right:48px;bottom:50px;font:700 50px/1.2 'Noto Sans JP';white-space:nowrap;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.6)}
`;
(async () => {
  const b = await chromium.launch({ args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1440 } });
  for (const it of items) {
    const lines = (it.lines || []).map(([s, t]) => `<p>${s ? `<small>${s}</small>` : ''}${t}</p>`).join('');
    const html = `<div class="ph" style="background-image:url(${img(it.photo)});background-position:${it.pos || 'center'};background-size:${it.zoom || 'cover'}"></div><div class="shade"></div>
<div class="mast" style="--mc:${it.mc || '#c8202a'}">BIRDIE</div><div class="house" style="--mc:${it.mc || '#c8202a'}">HOUSE</div>
<div class="issue"><b>${it.no}</b>${it.issue||"December<br>2026<br>天六・浮田"}</div>
<div class="lines">${it.right||lines}</div>
${it.catch?`<div class="catch">${it.catch}</div>`:""}<div class="head" style="--hc:${it.hc||'#d9a86c'}">${it.head}</div><div class="tag">${it.tag}</div>`;
    await p.setContent(`<html><head><style>${css}</style></head><body>${html}</body></html>`, { waitUntil: 'networkidle', timeout: 20000 }).catch(() => {});
    await p.evaluate(() => document.fonts.ready);
    await p.evaluate(() => { for (const sel of ['.mast', '.head', '.tag', '.catch']) { const m = document.querySelector(sel); if(!m) continue; let s = parseFloat(getComputedStyle(m).fontSize); while (m.scrollWidth > m.clientWidth && s > 40) { s -= 4; m.style.fontSize = s + 'px'; } } });
    await p.screenshot({ path: `${out}/${it.name}.jpg`, type: 'jpeg', quality: 92 });
    console.log(it.name);
  }
  await b.close();
})();
