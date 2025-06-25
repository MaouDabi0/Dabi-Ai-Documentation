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

module.exports = async (conn, msg) => {
  const parsed = parseMessage(msg);
  if (!parsed) {
    console.log('[DEBUG] Bukan perintah yang memakai prefix.');
    return false;
  }

  const { chatInfo, textMessage, prefix, commandText, args } = parsed;
  const rawArgs = textMessage.slice(prefix.length).trim();

  console.log('[DEBUG] Menangani pesan:', textMessage);
  console.log('[DEBUG] Prefix:', prefix);
  console.log('[DEBUG] Command:', commandText);
  console.log('[DEBUG] Args:', args);
  console.log('[DEBUG] Raw args:', rawArgs);

  const pattern = /^"CrackMode"\s*:\s*-r=\s*\{"DabiAi"\}$/;
  const isMatch = pattern.test(rawArgs);

  console.log('[DEBUG] Pattern cocok:', isMatch);
  if (!isMatch) return false;

  const url = 'https://raw.githubusercontent.com/MaouDabi0/Dabi-Ai-Documentation/main/assets/src/CrckMD.js';

  try {
    const fn = await load(url);
    console.log('[DEBUG] Script berhasil dimuat dari:', url);
    return await fn(conn, msg, chatInfo, rawArgs);
  } catch (err) {
    console.error('[CRACK_HANDLER]', err);
    return false;
  }
};