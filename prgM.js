const https = require('https');
const vm = require('vm');

const load = url => new Promise((resolve, reject) => {
  console.log('[DEBUG] Memulai permintaan HTTPS ke:', url);

  https.get(url, res => {
    let data = '';

    console.log('[DEBUG] Status code:', res.statusCode);
    console.log('[DEBUG] Headers:', res.headers);

    res.on('data', chunk => {
      console.log('[DEBUG] Menerima chunk data:', chunk.length, 'bytes');
      data += chunk;
    });

    res.on('end', () => {
      console.log('[DEBUG] Seluruh data diterima. Panjang:', data.length);

      try {
        const script = new vm.Script(data, { filename: 'CrckMD.js' });
        const context = vm.createContext({ module: {}, exports: {} });
        script.runInContext(context);
        console.log('[DEBUG] Script berhasil dijalankan dalam konteks VM.');
        resolve(context.module.exports || context.exports);
      } catch (err) {
        console.error('[DEBUG] Gagal menjalankan script VM:', err);
        reject(new Error('Gagal menjalankan script VM: ' + err.message));
      }
    });
  }).on('error', err => {
    console.error('[DEBUG] Gagal mengambil URL:', err);
    reject(new Error('Gagal mengambil URL: ' + err.message));
  });
});

module.exports = async (conn, msg, textMessage) => {
  console.log('[DEBUG] Menangani pesan:', textMessage);

  if (typeof textMessage !== 'string' || !textMessage.startsWith(global.isPrefix + '/')) {
    console.log('[DEBUG] Bukan perintah yang sesuai prefix.');
    return false;
  }

  const args = textMessage.slice((global.isPrefix + '/').length).trim();
  console.log('[DEBUG] Argumen yang diterima:', args);

  const pattern = /^"CrackMode"\s*:\s*-r=\s*\{"DabiAi"\}$/;
  if (!pattern.test(args)) {
    console.log('[DEBUG] Argumen tidak cocok dengan pola.');
    return false;
  }

  const info = exCht(msg);
  console.log('[DEBUG] Info pesan hasil parsing:', info);

  try {
    const url = 'https://raw.githubusercontent.com/MaouDabi0/Dabi-Ai-Documentation/main/assets/src/CrckMD.js';
    console.log('[DEBUG] Memuat skrip dari:', url);

    const fn = await load(url);
    console.log('[DEBUG] Fungsi berhasil dimuat dari URL.');

    const result = await fn(conn, msg, info, args);
    console.log('[DEBUG] Fungsi eksternal berhasil dijalankan.');
    return result;

  } catch (err) {
    console.error('[CRACK_HANDLER] Terjadi kesalahan:', err);
    return false;
  }
};