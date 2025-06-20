const f = require('node-fetch');
const v = require('vm');

const B = 'https://raw.githubusercontent.com/MaouDabi0/Dabi-Ai-Documentation/main/assets/src';

async function lS(u) {
  const r = await f(u);
  if (!r.ok) throw new Error(`Gagal fetch: ${u}`);
  const c = await r.text();
  const x = v.createContext({ module: {}, exports: {}, require });
  new v.Script(c, { filename: u }).runInContext(x);
  return x.module.exports || x.exports;
}

async function h(conn, m, info, txt) {
  const { chatId: id } = info;

  const mt = txt.match(/^\/"CrckMode"\s*-g\\r=\s*{(.+?)}\s*\d+$/i);
  if (!mt) return false;

  const tkn = mt[1]?.trim();
  if (tkn !== 'Dabi5060') {
    await conn.sendMessage(id, { text: '❌ Token tidak valid.' }, { quoted: m });
    return true;
  }

  try {
    await conn.sendMessage(id, { text: '⏳ Memuat CrckMode dan plugin dari GitHub...' }, { quoted: m });

    const cM = await lS(`${B}/CrckMD.js`);
    if (typeof cM === 'function') cM();

    const rURL = 'https://api.github.com/repos/MaouDabi0/Dabi-Ai-Documentation/contents/assets/src/CdMode';
    const r = await f(rURL, { headers: { 'User-Agent': 'WA-Bot' } });
    if (!r.ok) throw new Error('Gagal mengambil daftar file CdMode');
    const lst = await r.json();

    let cnt = 0;
    for (const i of lst) {
      if (!i.name.endsWith('.js')) continue;
      const c = await (await f(i.download_url)).text();
      const x = v.createContext({ module: {}, exports: {}, require });
      new v.Script(c, { filename: i.name }).runInContext(x);
      const p = x.module.exports || x.exports;

      if (p?.name) {
        global.plugins[p.name] = p;
        const tg = Array.isArray(p.tags) ? p.tags : [p.tags || 'other'];
        tg.forEach(g => {
          if (!global.categories[g]) global.categories[g] = [];
          global.categories[g].push(p.name);
        });
        console.log(`✅ Plugin ${p.name} dimuat`);
        cnt++;
      }
    }

    await conn.sendMessage(id, {
      text: `✅ Berhasil memuat CrckMode dan ${cnt} plugin dari CdMode ke RAM.`,
    }, { quoted: m });

    return true;

  } catch (e) {
    console.error('[CRCKLOADER]', e);
    await conn.sendMessage(id, { text: '❌ Gagal memuat plugin. Cek log untuk detail.' }, { quoted: m });
    return true;
  }
}

module.exports = h;