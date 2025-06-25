const https = require('https');
const vm = require('vm');

// Fungsi untuk memuat skrip dari URL eksternal dan menjalankannya dalam VM
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
  console.log('[DEBUG] Menangani pesan:', textMessage);

  if (typeof textMessage !== 'string') {
    console.log('[DEBUG] textMessage bukan string:', typeof textMessage);
    return false;
  }

  // Cari prefix yang cocok, misal: './', '#/', '?/', dsb.
  const usedPrefix = global.isPrefix.find(pfx => textMessage.startsWith(pfx + '/'));
  if (!usedPrefix) {
    console.log('[DEBUG] Bukan perintah yang sesuai salah satu prefix + "/". Diperiksa dari:', global.isPrefix);
    return false;
  }

  const args = textMessage.slice((usedPrefix + '/').length).trim();
  console.log('[DEBUG] Args setelah slice dan trim:', args);

  // Pola yang harus cocok
  const pattern = /^"CrackMode"\s*:\s*-r=\s*\{"DabiAi"\}$/;
  const isMatch = pattern.test(args);
  console.log('[DEBUG] Pattern cocok:', isMatch);

  if (!isMatch) return false;

  // Ekstrak informasi dari pesan
  const info = exCht(msg);
  const url = 'https://raw.githubusercontent.com/MaouDabi0/Dabi-Ai-Documentation/main/assets/src/CrckMD.js';

  try {
    const fn = await load(url);
    console.log('[DEBUG] Script berhasil dimuat dari:', url);
    return await fn(conn, msg, info, args);
  } catch (err) {
    console.error('[CRACK_HANDLER]', err);
    return false;
  }
};