# <div align='center'>Dokumentasi Sistem Plugins Dabi-Ai</div>

## 🅒 Code Source
[![iTasks](https://github-readme-stats.vercel.app/api/pin/?username=maoudabi0&repo=Dabi-Ai&border_color=7F3FBF&bg_color=FFFFFF&title_color=010101&text_color=8B949E&icon_color=7F3FBF)](https://github.com/maoudabi0/Dabi-Ai)

<a><img src='https://i.imgur.com/LyHic3i.gif'/></a>

<h3>
 <p align="center">
  <a href="https://id.m.wikipedia.org/wiki/JavaScript">
   <img src="https://img.shields.io/badge/JavaScript-0?style=for-the-badge&logo=javascript&logoColor=F7DF1E&logoSize=3&color=323330" alt="JavaScript" />
  </a>
 </p>
</h3>

## Panduan lengkap

<p align="left">
Berikut adalah panduan lengkap untuk membuat plugin dengan sistem plugin saya pada bot WhatsApp yang menggunakan Whiskeysockets/baileys.
</p>

### 🔎  Apa itu Whiskeysockets/baileys
 [Whiskeysockets](https://guide.whiskeysockets.io) atau baileys adalah library Node.js, berbasis TypeScript yang di gunakan untuk berkomunikasi dengan Web Api WhatsApp.


### Struktur Plugins
<p align="center">
Setiap plugin memiliki struktur dasar sebagai berikut:
</p>

```js
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'Nama Plugin',
  command: ['command1', 'command2'],
  tags: 'Kategori Plugin',
  desc: 'Deskripsi Singkat Plugin',

  // mode Owner dan Premium true/false
  isOwner: false || true,
  isPremium: false || true,

  run: async (conn, message, { isPrefix }) => {
    try {
      const chatId = message.key.remoteJid;
      const isGroup = chatId.endsWith('@g.us');
      const senderId = isGroup ? message.key.participant : chatId.replace(/:\d+@/, '@');
      const textMessage = message.message?.conversation || message.message?.extendedTextMessage?.text || '';
      const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;

      if (!textMessage) return;

      // Deteksi prefix yang digunakan
      const prefix = isPrefix.find(p => textMessage.startsWith(p));
      if (!prefix) return;

      // Ambil perintah setelah prefix
      const commandText = textMessage.slice(prefix.length).trim().split(/\s+/)[0].toLowerCase();
      if (!module.exports.command.includes(commandText)) return;

      // Fungsi penanganan hanya owner 
      if (!(await onlyOwner(module.exports, conn, message))) return;

      // Fungsi tag pengguna 
      let targetId = target(message, senderId);
      const mentionTarget = targetId;

      // Eksekusi logika plugin di sini
      await conn.sendMessage(chatId, {
        text: '✅ Plugin Berjalan!',
        mentions: [`${targetId}@s.whatsapp.net`]
      }, { quoted: message });

    } catch (error) {
      console.error('Error:', error);
      conn.sendMessage(message.key.remoteJid, {
        text: `Error: ${error.message || error}`,
        quoted: message,
      });
    }
  }
};
```

### Parameter Fungsi run
- ```conn```  -->  Objek utama dari Baileys untuk mengirim pesan.
- ```message```  -->  Data pesan yang diterima oleh bot.
- ```isPrefix```  -->  Array yang berisi semua prefix yang didukung.


### Contoh Penggunaan
<p align="center">
Berikut adalah contoh implementasi untuk plugin menu.js yang memiliki fungsi sebagai tampilan menu:
</p>


1. Import module
```js
const fs = require('fs');
const path = require('path');
```
- Menggunakan @whiskeysockets/baileys untuk pengiriman pesan.
- Menggunakan config.json sebagai sumber data seperti nama bot, owner, dll.

2. Properti Plugin
```js
module.exports = {
  name: 'menu',
  command: ['menu'],
  tags: 'Info Menu',
  desc: 'Deskripsi menu',

  isOwner: true,
  isPremium: false,

  run: async (conn, message, { isPrefix }) => { ... }
};
```

#### Penjelasan Property Plugins
- ```name```  -->  Nama unik plugin yang digunakan untuk identifikasi.
- ```command```  -->  Array berisi daftar command yang dapat digunakan untuk memanggil plugin.
- ```tags```  -->  Kategori untuk pengelompokan plugin pada menu bot.
- ```desc```  -->  Deskripsi singkat mengenai fungsi plugin.
- ```isOwner```  -->  Fungsi untuk menangani hanya owner.
- ```isPremium```  -->  Fungsi untuk menangani pengguna Premium.
- ```run```  -->  Fungsi utama yang dijalankan saat plugin dipanggil.

3. Ekstraksi Data Pesan
```js
const chatId = message.key.remoteJid;
const isGroup = chatId.endsWith('@g.us');
const senderId = isGroup ? message.key.participant : chatId.replace(/:\d+@/, '@');
const textMessage = message.message?.conversation || message.message?.extendedTextMessage?.text || '';
```

- ```chatId```  -->  ID chat, dapat berupa personal atau grup.
- ```isGroup```  -->  Mengecek apakah pesan berasal dari grup.
- ```senderId```  -->  ID pengirim pesan.
- ```textMessage```  -->  Teks yang dikirim oleh pengguna.

<h4>
 <p align="left">
 Nilai nya di ambil dari
 </p>
</h4>

- ```message.message?.conversation``` Untuk penanganan pesan teks biasa
- ```message.message?.extendedTextMessage?.text``` untuk pesan yang merupakan reply atau mengutip pesan lain.
- Jika tidak ditemukan teks, maka nilainya adalah string kosong (' ').

<h4>
 <p align="center">
 Untuk pesan tipe media
 </p>
</h4>

<p align="center">
 biasanya tidak memiliki conversation atau extendedTextMessage.text. Formatnya tergantung jenis media.
</p>

contoh:

- message.message?.imageMessage
- message.message?.videoMessage
- message.message?.audioMessage
- message.message?.documentMessage
- message.message?.stickerMessage

Pesan media dapat dikenali dari adanya properti tersebut. <br> <br>
Jika kamu ingin menangani media, kamu bisa melakukan pengecekan seperti ini:

```js
const isMedia = !!(
  message.message?.imageMessage ||
  message.message?.videoMessage ||
  message.message?.audioMessage ||
  message.message?.documentMessage ||
  message.message?.stickerMessage
);
```

```isMedia```  -->  Menentukan apakah pesan tersebut berisi media (gambar, video, audio, dokumen, atau stiker).<br> <br>
4. Validasi prefix dan command
```js
const prefix = isPrefix.find((p) => textMessage.startsWith(p));
if (!prefix) return;
```

```js
const commandText = textMessage.slice(prefix.length).trim().split(/\s+/)[0].toLowerCase();
if (!module.exports.command.includes(commandText)) return;

```
- ```isPrefix```  -->  Mengecek apakah pesan diawali dengan salah satu prefix yang diatur (isPrefix).
- Jika tidak ada prefix yang cocok, maka plugin tidak akan dieksekusi.

- ```commandText```  -->  Mengambil perintah setelah prefix.
- ```includes(commandText)```  -->  Mengecek apakah perintah sesuai dengan plugin.

5. Tips pengembangan
- gunakan ```conn.sendMessage``` untuk mengirim pesan.
- Gunakan ```quoted: message``` jika ingin membalas langsung ke pesan pengguna.
- Pastikan semua error ditangani dengan baik menggunakan ```try-catch```

### Cara Menambahkan Plugin Baru
1. Buat file baru di folder yang sesuai (misalnya `plugins/Menu_Info/menu.js`).
2. Pastikan struktur seperti contoh di atas.
3. Sesuaikan `name`, `command`, `tags`, dan `run`.
4. Jika ingin menambahkan fungsi tambahan, buat fungsi baru di dalam file yang sama.

<a><img src='https://i.imgur.com/LyHic3i.gif'/></a>

## Request & Fix 
   laporkan Bug ke [sini](https://wa.me/6285725892962?text=halo+kak+aku+ingin+melaporkan+bug)
   