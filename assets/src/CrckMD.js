async function h(conn, msg, info, txt, mt) {
  const m = msg;
  const { chatId: id } = global.exCht(m);

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

      const code = await (await f(i.download_url)).text();
      const context = v.createContext({ module: {}, exports: {}, require });
      new v.Script(code, { filename: i.name }).runInContext(context);

      const plugin = context.module.exports || context.exports;
      if (plugin?.name) {
        global.plugins[plugin.name] = plugin;

        const tags = Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags || 'other'];
        tags.forEach(tag => {
          if (!global.categories[tag]) global.categories[tag] = [];
          global.categories[tag].push(plugin.name);
        });

        console.log(`✅ Plugin ${plugin.name} dimuat`);
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