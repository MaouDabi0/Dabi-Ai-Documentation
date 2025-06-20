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

    const baseRawUrl = 'https://raw.githubusercontent.com/MaouDabi0/Dabi-Ai-Documentation/main/assets/src/CdMode';
    const files = [
      'plugin1.js',
      'plugin2.js',
      'plugin3.js'
    ];

    let cnt = 0;

    for (const file of files) {
      const url = `${baseRawUrl}/${file}`;
      const code = await (await f(url)).text();

      const context = v.createContext({ module: {}, exports: {}, require });
      new v.Script(code, { filename: file }).runInContext(context);

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