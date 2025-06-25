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

module.exports = async (conn, msg, txt) => {
  if (!txt || !txt.startsWith(global.isPrefix + '/')) return false;

  const q = txt.slice((global.isPrefix + '/').length).trim();
  const m = q.match(/^CrackMode\s*:\s*-r=\s*{\s*(.+?)\s*}$/i);
  if (!m) return false;

  const info = exCht(msg);

  try {
    const url = 'https://raw.githubusercontent.com/username/repo/branch/toolkit/CrckMD.js';
    const fn = await load(url);
    return await fn(conn, msg, info, q, m);
  } catch (err) {
    console.error('[CRACK_HANDLER]', err);
    return false;
  }
};