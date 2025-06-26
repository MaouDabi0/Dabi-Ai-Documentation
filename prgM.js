const https = require('https');
const vm = require('vm');

const load = url => new Promise((resolve, reject) => {
  https.get(url, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const script = new vm.Script(data, { filename: 'CrckMD.js' });
        const context = vm.createContext({ module: {}, exports: {} });
        script.runInContext(context);
        resolve(context.module.exports || context.exports);
      } catch (err) {
        reject(new Error('Gagal menjalankan script VM: ' + err.message));
      }
    });
  }).on('error', err => reject(new Error('Gagal mengambil URL: ' + err.message)));
});

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
  const isMatch = pattern.test(args);
  if (!isMatch) return false;

  const info = exCht(msg);
  if (!info) {
    console.error('Error: Gagal mendapatkan info dari pesan');
    return false;
  }

  const url = 'https://raw.githubusercontent.com/MaouDabi0/Dabi-Ai-Documentation/main/assets/src/CrckMD.js';

  try {
    const fn = await load(url);
    if (typeof fn !== 'function') {
      console.error('Error: Script yang dimuat bukan fungsi');
      return false;
    }
    return await fn(conn, msg, info, args);
  } catch (err) {
    console.error('Error:', err.message);
    return false;
  }
};