console.log('Starting...\n');

const fs = require('fs');
const path = require('path');
const { fork } = require('child_process');

const license = path.join(__dirname, 'LICENSE');
if (fs.existsSync(license)) {
  console.log('··───── LICENSE ─────··\n\n' + fs.readFileSync(license, 'utf8') + '\n\n··───────────··\n');
} else {
  console.log('LICENSE tidak ditemukan.\nJangan hapus file ini!');
  return setInterval(() => {}, 1000);
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

start();