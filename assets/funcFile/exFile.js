const fs = require('fs');
const https = require('https');
const path = require('path');
const { spawn } = require('child_process');

const setCfgPath = path.join(__dirname, 'setCfg.js');
const indexPath = path.join(__dirname, 'index.js');
const selfPath = path.join(__dirname, 'exFile.js');
const githubIndexUrl = 'https://raw.githubusercontent.com/MaouDabi0/Dabi-Ai-Documentation/main/index.js';

function exFile() {
  if (fs.existsSync(setCfgPath)) {
    fs.unlinkSync(setCfgPath);
    console.log('setCfg.js berhasil dihapus.');
  } else {
    console.log('setCfg.js tidak ditemukan.');
  }

  https.get(githubIndexUrl, res => {
    if (res.statusCode !== 200) {
      console.error(`Gagal mengunduh index.js: ${res.statusCode}`);
      process.exit(1);
    }

    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      fs.writeFileSync(indexPath, data);
      console.log('index.js berhasil diganti.');

      try {
        fs.unlinkSync(selfPath);
        console.log('exFile.js berhasil dihapus.');
      } catch (err) {
        console.error('Gagal menghapus exFile.js:', err);
      }

      console.log('Merestart bot...');

      spawn(process.argv[0], [indexPath], {
        cwd: __dirname,
        detached: true,
        stdio: 'ignore'
      }).unref();

      process.exit(0);
    });
  }).on('error', err => {
    console.error('Gagal mengunduh file:', err);
    process.exit(1);
  });
}

module.exports = { exFile };