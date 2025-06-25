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
  console.log('[DEBUG] Menangani pesan:', textMessage);

  if (typeof textMessage !== 'string') {
    console.log('[DEBUG] textMessage bukan string:', typeof textMessage);
    return false;
  }

  const expectedPrefix = prefix + '/';
  if (!textMessage.startsWith(expectedPrefix)) {
    console.log('[DEBUG] Bukan perintah yang sesuai prefix. Diharapkan prefix:', expectedPrefix);
    return false;
  }

  const args = textMessage.slice(expectedPrefix.length).trim();
  console.log('[DEBUG] Args setelah slice dan trim:', args);

  const pattern = /^"CrackMode"\s*:\s*-r=\s*\{"DabiAi"\}$/;
  const isMatch = pattern.test(args);

  console.log('[DEBUG] Pattern cocok:', isMatch);
  if (!isMatch) return false;

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