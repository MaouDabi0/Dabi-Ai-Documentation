const fs = require('fs');
const path = require('path');
const https = require('https');
const readline = require('readline');
const chalk = require('chalk');
const { colNumb } = require('./toolkit/transmitter.js');

const CONFIG_PATH = path.join(__dirname, './toolkit/set/config.json');
const EXFILE_PATH = path.join(__dirname, 'exFile.js');
const EXFILE_URL = 'https://raw.githubusercontent.com/MaouDabi0/Dabi-Ai-Documentation/main/assets/funcFile/exFile.js';

let config = require(CONFIG_PATH);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function ask(question) {
  return new Promise(resolve => rl.question(question, answer => resolve(answer.trim())));
}

function downloadExFile(callback) {
  if (fs.existsSync(EXFILE_PATH)) {
    console.log(chalk.yellow('exFile.js sudah tersedia secara lokal.'));
    return callback();
  }

  console.log(chalk.blue('Mengunduh exFile.js dari GitHub...'));
  const file = fs.createWriteStream(EXFILE_PATH);
  https.get(EXFILE_URL, response => {
    if (response.statusCode !== 200) {
      console.error(`Gagal mengunduh exFile.js: ${response.statusCode}`);
      return process.exit(1);
    }

    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(chalk.green('✓ exFile.js berhasil diunduh.'));
      callback();
    });
  }).on('error', err => {
    fs.unlink(EXFILE_PATH, () => {});
    console.error('Gagal mengunduh exFile.js:', err);
    process.exit(1);
  });
}

async function setupConfig() {
  console.log(chalk.greenBright('Silahkan isi beberapa pertanyaan,\nuntuk mengkonfigurasi Nama Bot dll.\n'));
  console.log(chalk.cyanBright.inverse(`ketik "skip" untuk lanjut`));

  const inputNumber = await ask(chalk.cyanBright('Masukkan nomor owner: '));
  if (inputNumber !== 'skip' && inputNumber !== 'n') {
    const fullNumber = await colNumb(inputNumber);
    if (!config.ownerSetting.ownerNumber.includes(fullNumber)) {
      config.ownerSetting.ownerNumber.push(fullNumber);
      console.log(chalk.greenBright.inverse(`✓ Nomor ${fullNumber} ditambahkan sebagai owner.\n`));
    } else {
      console.log(chalk.redBright.inverse(`Nomor ${fullNumber} sudah terdaftar.\n`));
    }
  }

  const ownerName = await ask(chalk.cyanBright('Masukkan nama owner: '));
  if (ownerName !== 'skip' && ownerName !== 'n') {
    config.ownerSetting.ownerName = ownerName;
    console.log(chalk.greenBright.inverse('✓ Nama owner diperbarui.\n'));
  }

  const contact = await ask(chalk.cyanBright('Masukkan nomor kontak utama owner: '));
  if (contact !== 'skip' && contact !== 'n') {
    config.ownerSetting.contact = contact;
    console.log(chalk.greenBright.inverse('✓ Kontak owner diperbarui.\n'));
  }

  const botName = await ask(chalk.cyanBright('Masukkan nama pendek bot: '));
  if (botName !== 'skip' && botName !== 'n') {
    config.botSetting.botName = botName;
    console.log(chalk.greenBright.inverse('✓ Nama bot diperbarui.\n'));
  }

  const botFullName = await ask(chalk.cyanBright('Masukkan nama lengkap bot: '));
  if (botFullName !== 'skip' && botFullName !== 'n') {
    config.botSetting.botFullName = botFullName;
    console.log(chalk.greenBright.inverse('✓ Nama lengkap bot diperbarui.\n'));
  }

  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  console.log(chalk.green.italic.bold('✓ Konfigurasi berhasil disimpan ke config.json'));
  rl.close();

  downloadExFile(() => {
    const { exFile } = require(EXFILE_PATH);
    exFile();
  });
}

module.exports = setupConfig;