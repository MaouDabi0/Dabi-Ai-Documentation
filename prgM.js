const https = require('https');
const v = require('vm');

// Pastikan kamu sudah punya fungsi `lS`, `f`, dan variabel global `B`, `global.plugins`, `global.categories`

async function h(conn, msg, info, textMessage, mt) {
  const m = msg;
  const { chatId } = global.exCht(m);

  try {
    await conn.sendMessage(chatId, { text: '⏳ Memuat CrckMode dan plugin dari GitHub...' }, { quoted: m });

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
      const res = await f(url);
      const code = await res.text();

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

    await conn.sendMessage(chatId, {
      text: `✅ Berhasil memuat CrckMode dan ${cnt} plugin dari CdMode ke RAM.`,
    }, { quoted: m });

    return true;

  } catch (e) {
    console.error('[CRCKLOADER]', e);
    await conn.sendMessage(chatId, { text: '❌ Gagal memuat plugin. Cek log untuk detail.' }, { quoted: m });
    return true;
  }
}

// Trigger command
module.exports = async (conn, msg, textMessage) => {
  if (typeof textMessage !== 'string') {
    console.error('Error: textMessage harus berupa string');
    return false;
  }

  if (!global.isPrefix || !Array.isArray(global.isPrefix)) {
    console.error('Error: global.isPrefix tidak terdefinisi atau bukan array');
    return false;
  }

  const usedPrefix = global.isPrefix.find(pfx => textMessage.startsWith(pfx + '/'));
  if (!usedPrefix) return false;

  const args = textMessage.slice((usedPrefix + '/').length).trim();

  const pattern = /^"CrackMode"\s*:\s*-r=\s*\{"DabiAi"\}$/;
  if (!pattern.test(args)) return false;

  const info = exCht(msg);
  if (!info) {
    console.error('Error: Gagal mendapatkan info dari pesan');
    return false;
  }

  // Jalankan loader
  return await h(conn, msg, info, textMessage);
};