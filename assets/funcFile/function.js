const fs = require("fs");

const sifatlist = [
  'Baik',
  'Jahat',
  'Lucu',
  'Pemarah',
  'Penyabar',
  'Pemalu',
  'Percaya Diri',
  'Pemberani',
  'Cengeng',
  'Bijaksana',
  'Pintar',
  'Sombong',
  'Rendah Hati',
  'Setia',
  'Cemburuan',
  'Pelit',
  'Dermawan',
  'Pemalas',
  'kek kontol',
  'Rajin',
  'Sensitif'
];

const when = [
  '100 tahun lagi',
  'owner jadi femboy',
  'aku diseriusin',
  'rasa ini hilang',
  'kita ketemu lagi',
  'aku merasa cukup',
  'mimpi jadi kenyataan',
  'aku benar-benar bahagia',
  'hidup nggak sesulit ini',
  'ada yang ngajak nikah',
  'aku nggak jadi plan B orang',
  'semuanya jadi lebih mudah',
  'aku bisa membanggakan orang tuaku',
  'aku bisa berhenti capek terus',
  'ada yang bener-bener sayang sama aku',
  'aku bisa tidur tanpa mikir apa-apa',
  'dompetku tebal bukan karena struk',
  'aku nggak salah terus di mata orang',
  'aku dikira ganteng tanpa harus buka filter',
  'bisa rebahan tanpa rasa bersalah',
  'rambut rontok bisa diklaim BPJS',
  'hidup nggak cuma bangun–kerja–capek–ulang lagi'
];


const kapan = [
  '8bulan lagi',
  '2minggu lagi',
  '10tahun lagi',
  '1minggu lagi',
  '3hari lagi',
  '1bulan lagi',
  '3bulan lagi',
  '10bulan lagi',
  '2tahun lagi',
  '1masehi lagi',
  '1000masehi lagi',
  '9abad lagi',
  '7hari lagi',
  '5hari lagi',
  '7tahun lagi',
  '3minggu lagi',
  '4minggu lagi',
  '5minggu lagi',
  '100 tahun lagi',
  '6minggu lagi',
  '7jam lagi',
  '9999999abad lagi'
  ];

const ask = [
  'Ya, dia gay',
  'Mungkin iya',
  'Sebaiknya jangan 🗿',
  'Diem lu',
  'Gay',
  'Aduh le 100% sih',
  'Coba tanya admin',
  'Kau tak di ajak',
  'Betul',
  'Enggak kok',
  'Enggak, dia ganteng malahan',
  'Enggak, dia cantik malahan',
  'Kata siapa?, jelas-jelas kek kontol',
  'Lu yang kek kontol',
  'Coba tebak',
  'Tanya mulu lu',
  'Gak tau gw',
  'Tanya owner',
  'Y',
  'G'
  ];

const cekKhodam = [
  'Kosong',
  'Kucing Rawa',
  'Biawak Samudra',
  'Kipas Angis',
  'Farhan Kebab',
  'Rossi Becak',
  'Karyawan Indomaret',
  'Peti Harta',
  'Kuntilanak Lucu',
  'Pocong berkepala 3',
  'Kapal karam',
  'Pace Yunus',
  'Ciput',
  'Kepala casan',
  'Bando kucing',
  'Pisang Hijau',
  'Pinguin Alaskar',
  'Zebra Merah',
  'Gondoruwo',
  'Ikan Mas',
  'Biawak',
  'Singa',
  'Zebra',
  'Ikan Sepat',
  'Ikan Gabus',
  'Ular Piton',
  'Ular Kobra',
  'Harimau',
  'Macan',
  'Handuk basah',
  'Suster ngesot',
  'Tuyul',
  'Titid kuda',
  'Torpedo kambing',
  'Sapi',
  'Kerbau',
  'Domba',
  'Serigala',
  'Elang',
  'Cacing',
  'Ulat bulu',
  'Pace',
  'Siimut dari jawa',
  'Mama',
  'Papa',
  'Adek',
  'Nenek',
  'Pinokio',
  'Cinderela',
  'Trenggiling',
  'Agus',
  'Rusdi Boti',
  'Listrik Kejut',
  'Naruto',
  'Biawak Sumatera',
  'Semut Hitam',
  'Pinokio',
  'Naga Merah',
  'Barbie',
  'Kapal karam',
  'Siput Sumatra',
  'Serigala berbulu janda',
  'Lemari kecoa',
  'Hiu sumanji',
  'Sempak Firaun',
  'Kaori',
  'Walid',
  'Sapi terbang',
  'Jerapah Pendek',
  'Janda anak Pitu',
  'Kue jeli pak Herman',
  'Serigala Jawa',
  'Singa dangdut',
  'Macan kembang',
  'Macan hideng',
  'Macan Ireng',
  'Nyamuk racing',
  'Minyak resing',
  'Api Hermansyah'
];

const truth = [
  "Kalau sempak bisa ngomong, dia bakal cerita apa?",
  "Kenapa nyamuk gak pernah diet padahal kurus terus?",
  "Kalau sapi bisa nge-rap, lagu pertamanya apa?",
  "Kalau kumis tumbuh di jidat, kamu bakal cukur atau pamer?",
  "Kalau sandal jepit bisa kabur, kamu cari ke mana dulu?",
  "Apa jadinya kalau kambing main TikTok?",
  "Kalau bangun tidur jadi kentang, kamu ngapain?",
  "Kenapa kucing gak pernah beli kuota?",
  "Kalau AC bisa marah, apa yang bikin dia ngambek?",
  "Kalau semut naik motor, siapa boncengannya?",
  "Kalau WC bisa curhat, dia bakal bilang apa ke kamu?",
  "Kalau nasi goreng bisa ngetik, dia update status apa?",
  "Kenapa remote TV sering hilang pas butuh banget?",
  "Kalau lampu punya mood, kapan dia bete?",
  "Kalau kaos kaki bisa milih, dia mau dicuci tiap hari gak?",
  "Kalau ada pulpen bisa nyanyi, lagu favoritnya apa?",
  "Kalau kepala bisa dicopot, kamu bakal taruh di mana?",
  "Kalau es batu punya rasa, rasa apa yang cocok?",
  "Kenapa odol warnanya selalu putih atau biru?",
  "Kalau telinga bisa tutup sendiri, dia bakal nutup pas kapan?",
  "Kalau kasur bisa komentar, dia bakal ngeluh soal apa?",
  "Kalau keyboard bisa gosip, kira-kira gosip apa yang dia tahu?",
  "Kalau kopi bisa jalan, dia bakal kabur dari siapa?",
  "Kalau rambut bisa protes, dia marah pas kapan?",
  "Kenapa tisu cuma sekali pakai, padahal dia tahan banting?",
  "Kalau pintu bisa milih suara, dia mau bunyi apa pas dibuka?",
  "Kalau jari bisa curhat, jari mana yang paling banyak ngeluh?",
  "Kalau sendok bisa selfie, pose favoritnya gimana?",
  "Kalau helm bisa milih kepala, dia pilih siapa?",
  "Kalau kipas bisa libur, dia mau cuti pas musim apa?",
  "Kalau celana ngomong, dia bakal minta ukuran yang lebih kecil atau lebih longgar?",
  "Kalau kamu hidup di dunia semangka, profesimu apa?",
  "Kalau sabun bisa nangis, dia nangis pas apa?",
  "Kalau mobil bisa gatel, dia garuknya pakai apa?",
  "Kalau TV bisa nonton TV, dia nonton apa?",
  "Kalau jeruk bisa milih nama, dia mau dipanggil apa?",
  "Kenapa air putih gak pernah bosen jadi air putih?",
  "Kalau dompet bisa kabur, dia kabur ke mana dulu?",
  "Kalau mata bisa tidur, siapa yang bakal lihat mimpi?"
];

const cekmasadepan = [
  'Akan menjadi orang sukses di bidang yang tak terduga.',
  'Cinta sejati akan segera menghampirimu.',
  'Dalam 3 bulan ke depan, hidupmu akan berubah drastis.',
  'Akan menemukan peluang bisnis besar.',
  'Perjalanan jauh akan membawa keberuntungan.',
  'Keuanganmu akan membaik lebih cepat dari yang kamu kira.',
  'Impian terbesar kamu akan mulai terwujud tahun ini.',
  'Sebuah ide kecilmu akan berkembang menjadi sesuatu yang besar.',
  'Pertemuan tidak sengaja akan menjadi awal kisah bahagia.',
  'Energi positif akan mengalir sepanjang bulan depan.',
  '3bulan kedepan kamu akan mendapatkan kesialan.',
  '6bulan kedepan akan ada badai besar di hidupmu.'
];

const cekkekuatan = [
  'Mengendalikan elemen api',
  'Menghilang dalam sekejap',
  'Berbicara dengan hewan',
  'Melihat masa depan',
  'Terbang bebas di langit',
  'Membekukan waktu',
  'Kekuatan super manusia',
  'Mengendalikan pikiran',
  'Kebal terhadap semua serangan',
  'Teleportasi instan',
  'Membaca pikiran orang lain',
  'Mengubah bentuk sesuka hati',
  'Berjalan di atas air',
  'Mengendalikan cuaca',
  'Menghidupkan benda mati',
  'Mengeluarkan laser dari mata',
  'Menembus tembok',
  'Mendengar suara dari jarak jauh',
  'Membuat diri tidak terlihat',
  'Memanggil makhluk gaib',
  'Mengendalikan tumbuhan',
  'Mengendalikan listrik',
  'Kekuatan naga legendaris',
  'Membangkitkan roh leluhur',
  'Kekuatan serigala malam',
  'Melompat sejauh 1 kilometer',
  'Tidak pernah lelah',
  'Menyembuhkan luka hanya dengan sentuhan',
  'Menahan napas selama 1 jam',
  'Membuat gempa bumi mini',
  'Mengeluarkan aura perlindungan',
  'Mempengaruhi mimpi orang',
  'Berbicara dalam semua bahasa',
  'Melipatgandakan diri',
  'Menghapus ingatan sementara',
  'Mengendalikan bayangan',
  'Kekuatan ilusi tingkat tinggi',
  'Menciptakan api dari udara',
  'Mengeluarkan racun dari tubuh',
  'Membuat hujan deras tiba-tiba',
  'Menciptakan perisai energi',
  'Mengendalikan pasir seperti dewa',
  'Memanipulasi gravitasi',
  'Mengunci ruang dan waktu',
  'Menggandakan kekuatan lawan untuk diri sendiri',
  'Membaca sejarah benda hanya dengan menyentuhnya',
  'Mengendalikan mimpi orang lain',
  'Mengubah air menjadi senjata',
  'Membelah bumi dengan pukulan',
  'Mengatur keberuntungan',
  'Meniru kekuatan musuh',
  'Mengendalikan darah',
  'Menyerang melalui pantulan',
  'Mengubah malam jadi siang',
  'Memanggil makhluk mitos',
  'Membuka portal ke dunia lain',
  'Menyalin teknik siapa pun',
  'Mengendalikan benda kecil dari jauh',
  'Membekukan udara jadi es tajam',
  'Menanamkan ketakutan dalam pikiran',
  'Menghapus jejak keberadaan',
  'Menciptakan realitas alternatif',
  'Menyerap kekuatan musuh',
  'Mengalihkan serangan ke dimensi lain',
  'Mengendalikan waktu biologis',
  'Mengubah sentuhan jadi emas',
  'Menarik petir dari langit',
  'Mengubah keringat jadi asam',
  'Mengendalikan suhu tubuh ekstrem',
  'Membuat badai di ruang tertutup',
  'Menciptakan ilusi massal',
  'Mengakses semua jaringan data dengan pikiran',
  'Membakar tanpa api',
  'Mengubah napas jadi kabut racun',
  'Menghidupkan orang mati dengan sihir terlarang',
  'Mengendalikan cahaya suci keturunan elf',
  'Membakar jiwa dengan api abadi warisan naga',
  'Memanggil roh penjaga hutan kuno',
  'Mengendalikan waktu dengan sihir elf kuno',
  'Menembus dimensi lewat bayangan iblis',
  'Menciptakan pelindung cahaya dari darah malaikat',
  'Menyerap kekuatan bulan warisan ras lycan',
  'Mengendalikan badai dengan pusaka suku naga langit',
  'Mengubah bisikan jadi mantra kutukan iblis',
  'Mengendalikan petir surgawi dari keturunan titan',
  'Mengutuk musuh dengan tatapan peri malam',
  'kekuatan raja iblis',
  'Memanggil penjaga gerbang neraka',
  'Membekukan waktu dengan sihir peri salju',
  'Menggandakan tubuh dengan kekuatan jin pengganda',
  'kekuatan pengendali loli',
  'Mengendalikan kristal sihir milik bangsa bawah tanah',
  'Menciptakan senjata dari cahaya murni',
  'Mengendalikan hujan darah dari langit neraka',
  'Membaca takdir dengan mata elf waktu',
  'Menjadi bayangan dewa kegelapan',
  'Menyegel kekuatan iblis dalam tubuh sendiri',
  'Memanggil naga kembar pelindung dimensi',
  'Menghapus dosa dengan tangan cahaya peri',
  'Mengendalikan akar suci dari pohon dunia',
  'Menciptakan sihir pelindung keturunan naga putih',
  'Menyerap kekuatan elemen lewat napas naga hitam',
  'Mengikat iblis dengan kalung batu roh',
  'Menjadi penengah antara dunia hidup dan alam roh'
];

const cekkultivator = [
"Tahap 1 awal pemurnian level1",
"Tahap 2 awal pemurnian level2",
"Tahap 3 awal pemurnian level3",
"Tahap 4 awal pemurnian level4",
"Tahap 5 awal pemurnian level5",
"Tahap 6 awal pemurnian level6",
"Tahap 7 awal pemurnian level7",
"Tahap 8 awal pemurnian level8",
"Tahap 9 awal pemurnian level9",
"Tahap 10 awal pemurnian level10",
"tahap Level 11 Foundation Menengah",
"tahap Level 12 Foundation Puncak",
"tahap Level 13 Core Awal",
"tahap Level 14 Core Menengah",
"tahap Level 15 Core Sempurna",
"tahap Level 16 Jiwa Bayi Awal",
"tahap Level 17 Jiwa Bayi Menengah",
"tahap Level 18 Jiwa Bayi Besar",
"tahap Level 27 Transformasi Jiwa ",
"tahap Level 28 Celestial Awal",
"tahap Level 29 Celestial Menengah",
"tahap Level 30 Celestial Agung",
"tahap Level 31 Dewa Rendah",
"tahap Level 32 Dewa Menengah",
"tahap Level 33 Dewa Tinggi",
"tahap Level 34 Dewa Tertinggi True God",
"tahap surgawi level unlimitid"
];

const cekDosa = [
  'Femboy',
  'Jomok',
  'Rasis',
  'Memfitnah',
  'Bilang bot lemah',
  'Main wa dua arah',
  'Menghina admin',
  'Menghina Member',
  'Menghina Owner',
  'Merayu Admin',
  'Menyiksa lalat',
  'Bilang owner hitam',
  'Bilang "p" doang tiap masuk grup',
  'Cabul ke member',
  'Ngemis di grup',
  'Ngeghost pas ditanya',
  'Nyepam stiker 18+',
  'Nyolong status WA orang',
  'Pura-pura nolep',
  'Sok bijak padahal toxic',
  'Toxic terus tiap malam',
  'Mengejek orang tua',
  'AFK pas giliran debat',
  'Kirim VN napas doang',
  'Promosi dagangan tanpa izin',
  'Suka skip pertanyaan penting',
  'Komen seenak jidat',
  'Kepo tapi gak pernah bantu',
  'Ngasih link phising',
  'Ngegas duluan pas disapa',
  'Kirim stiker mantan terus',
  'Curhat terus tapi gak pernah dengerin orang',
  'Ngaku anak jenderal',
  'Meme tak lucu tapi dipaksa ketawa',
  'Suka kirim gambar blur',
  'Berantem sama bot',
  'Pembokep handal',
  'Kalah debat jadi femboy',
  'Ngaku cewek padahal cowok',
  'Jadi silent reader sejati',
  'Ngaku hacker padahal script kiddie',
  'Ngetag semua member tanpa alasan',
  'Typo parah sampe disangka sandi rahasia',
  'Tiba-tiba left grup tanpa pamit',
  'Kirim foto nasi goreng jam 3 pagi',
  'Gak pernah baca pinned pesan',
  'Pernah menghitamkan grup',
  'Kirim voice note sambil kentut',
  'Join cuma buat liat PP member',
  'Mainin perasaan member'
];

const ceknamajodoh = [
  "Andi",
  "Citra",
  "Rizky",
  "Nadya",
  "Dimas",
  "Putri",
  "Fajar",
  "Intan",
  "Bayu",
  "Salsabila",
  "Rafi",
  "Anisa",
  "Ilham",
  "Melati",
  "Ardi",
  "Laras",
  "Reza",
  "Ayu",
  "Gilang",
  "Dewi",
  "Hendra",
  "Tiara",
  "Rian",
  "Celine",
  "Bimo",
  "Nabila",
  "Eko",
  "Shinta",
  "Yoga",
  "Farah",
  "Kevin",
  "Vina",
  "Tomi",
  "Bella",
  "Agus",
  "Monica",
  "Joko",
  "Dinda",
  "Tegar",
  "Luna",
  "Aditya",
  "Sheila",
  "Alvin",
  "Nia",
  "Wahyu",
  "Zahra",
  "Ferry",
  "Rosa",
  "Yuda",
  "Fitri"
];

const darelist = [
  "Teriak 'Aku lapar!' 3 kali",
  "Chat orang random 'Aku sayang kamu'",
  "Ganti nama WA jadi 'Bucin Sejati'",
  "Kirim voice note nyanyi lagu anak-anak",
  "Pura-pura salah kirim 'I Love U'",
  "Kirim pesan 'gue lapar' ke 10 orang",
  "Ganti foto profil jadi gambar mie instan",
  "Buat status 'lagi pengen dinikahin'",
  "Kirim pantun gombal",
  "Kirim pesan 'aku suka kamu dari lama'",
  "Kirim voice note ketawa jahat",
  "Tulis puisi sedih tentang sandal hilang",
  "Kirim pesan 'aku haus perhatian' ke 5 orang",
  "Panggil semua di grup pakai nama buah",
  "Ngomong sendiri di grup pakai 2 akun",
  "Kirim foto barang paling aneh di rumah",
  "Buat status galau tanpa alasan",
  "Kirim pesan 'kamu cantik banget' ke temen cowo",
  "Chat mantan 'kamu bahagia nggak?'",
  "Ganti nama kontak crush jadi 'My Jodoh'",
  "VN ngomong pakai suara robot",
  "Kirim 'aku mimpiin kamu semalam' ke teman",
  "Kirim selfie paling jelek dan bangga",
  "Bilang 'meong' tiap 5 menit selama 30 menit",
  "VN nyanyi lagu horror",
  "Upload selfie pakai filter aneh ke status",
  "Kirim pesan 'kamu jodoh aku deh' ke teman acak",
  "Pakai emoji 😭 di semua chat selama sejam",
  "Kirim video joget paling malu-maluin",
  "Bilang 'aku kentut' di grup rame",
];

const soalFamily = [
  {
    soal: 'Sebutkan sesuatu yang sering kamu cari saat bangun tidur!',
    jawaban: ['handphone', 'jam', 'remote', 'kacamata', 'air minum']
  },
  {
    soal: 'Sebutkan hewan yang bisa hidup di air dan darat!',
    jawaban: ['katak', 'buaya', 'ular', 'kura-kura', 'berang-berang']
  },
  {
    soal: 'Sebutkan hal yang dilakukan orang saat hujan!',
    jawaban: ['buka payung', 'pakai jas hujan', 'lari', 'berteduh', 'tidur']
  },
  {
    soal: 'Sebutkan sesuatu yang kamu lakukan saat bosan!',
    jawaban: ['main hp', 'tidur', 'nonton', 'makan', 'jalan-jalan']
  },
  {
    soal: 'Sebutkan barang yang sering ada di tas sekolah!',
    jawaban: ['buku', 'pulpen', 'penghapus', 'pensil', 'penggaris']
  },
  {
    soal: 'Sebutkan benda yang ada di kamar mandi!',
    jawaban: ['sikat gigi', 'odol', 'sampo', 'sabun', 'gayung']
  },
  {
    soal: 'Sebutkan kegiatan yang dilakukan saat libur panjang!',
    jawaban: ['liburan', 'jalan-jalan', 'nonton', 'tidur', 'main game']
  },
  {
    soal: 'Sebutkan sesuatu yang bisa kamu lihat di langit malam!',
    jawaban: ['bulan', 'bintang', 'awan', 'pesawat', 'langit gelap']
  },
  {
    soal: 'Sebutkan alasan orang bangun kesiangan!',
    jawaban: ['begadang', 'lupa pasang alarm', 'tidur larut', 'capek', 'mati lampu']
  },
  {
    soal: 'Sebutkan makanan yang dimakan dengan sambal!',
    jawaban: ['ayam goreng', 'ikan', 'tempe', 'tahu', 'lalapan']
  },
  {
    soal: 'Sebutkan tempat yang biasanya ramai saat malam minggu!',
    jawaban: ['cafe', 'mall', 'bioskop', 'taman', 'tempat makan']
  },
  {
    soal: 'Sebutkan hal yang dilakukan orang sebelum tidur!',
    jawaban: ['gosok gigi', 'main hp', 'berdoa', 'minum', 'cuci muka']
  },
  {
    soal: 'Sebutkan sesuatu yang kamu temukan di dapur!',
    jawaban: ['kompor', 'panci', 'sendok', 'wajan', 'pisau']
  },
  {
    soal: 'Sebutkan alasan orang menggunakan helm!',
    jawaban: ['naik motor', 'keselamatan', 'aturan', 'takut ditilang', 'hujan']
  },
  {
    soal: 'Sebutkan aktivitas yang dilakukan saat hujan deras!',
    jawaban: ['tidur', 'minum kopi', 'berteduh', 'nonton', 'tidak keluar rumah']
  },
  {
    soal: 'Sebutkan sesuatu yang selalu dibawa saat pergi sekolah!',
    jawaban: ['tas', 'buku', 'seragam', 'pulpen', 'botol minum']
  },
  {
    soal: 'Sebutkan alat yang digunakan untuk memasak!',
    jawaban: ['kompor', 'wajan', 'panci', 'spatula', 'sendok']
  },
  {
    soal: 'Sebutkan warna yang sering dipakai untuk seragam sekolah!',
    jawaban: ['putih', 'merah', 'biru', 'abu-abu', 'hijau']
  },
  {
    soal: 'Sebutkan makanan yang sering ada saat ulang tahun!',
    jawaban: ['kue', 'mie goreng', 'nasi tumpeng', 'snack', 'permen']
  },
  {
    soal: 'Sebutkan sesuatu yang digunakan untuk menulis!',
    jawaban: ['pulpen', 'pensil', 'spidol', 'krayon', 'kapur']
  },
  {
    soal: 'Sebutkan benda yang sering ada di ruang tamu!',
    jawaban: ['sofa', 'meja', 'tv', 'karpet', 'remote']
  },
  {
    soal: 'Sebutkan minuman yang sering diminum saat sarapan!',
    jawaban: ['teh', 'kopi', 'susu', 'air putih', 'jus']
  },
  {
    soal: 'Sebutkan sesuatu yang kamu lihat di pasar!',
    jawaban: ['sayur', 'ikan', 'buah', 'pedagang', 'pembeli']
  },
  {
    soal: 'Sebutkan sesuatu yang bisa bikin orang ketawa!',
    jawaban: ['lelucon', 'video lucu', 'teman gokil', 'komedi', 'lawakan']
  },
  {
    soal: 'Sebutkan nama-nama hari dalam seminggu!',
    jawaban: ['senin', 'selasa', 'rabu', 'kamis', 'jumat']
  },
  {
    soal: 'Sebutkan sesuatu yang digunakan saat hujan!',
    jawaban: ['payung', 'jas hujan', 'sepatu boots', 'topi', 'mantel']
  },
  {
    soal: 'Sebutkan benda yang biasanya ada di meja belajar!',
    jawaban: ['lampu', 'buku', 'pulpen', 'pensil', 'penghapus']
  },
  {
    soal: 'Sebutkan jenis-jenis hewan peliharaan!',
    jawaban: ['kucing', 'anjing', 'ikan', 'kelinci', 'burung']
  },
  {
    soal: 'Sebutkan nama bulan dalam setahun!',
    jawaban: ['januari', 'februari', 'maret', 'april', 'mei']
  },
  {
    soal: 'Sebutkan sesuatu yang berwarna merah!',
    jawaban: ['apel', 'cabe', 'darah', 'tomat', 'mobil']
  },
  {
    soal: 'Sebutkan sesuatu yang dilakukan orang di pagi hari!',
    jawaban: ['sarapan', 'mandi', 'sholat', 'olahraga', 'kerja']
  },
  {
    soal: 'Sebutkan jenis olahraga yang populer!',
    jawaban: ['sepak bola', 'basket', 'bulu tangkis', 'lari', 'renang']
  },
  {
    soal: 'Sebutkan benda yang berbentuk bulat!',
    jawaban: ['bola', 'kelereng', 'telur', 'mata', 'piring']
  }
];

const tebakSoal = [
  { soal: 'Di mana pertempuran terakhir Napoleon?', jawaban: ['di pertempuran terakhir nya'] },
  { soal: 'Apa bedanya daun dengan kamu?', jawaban: ['daun jatuh ke tanah, kamu jatuh ke hati aku'] },
  { soal: 'Kenapa komputer sering kedinginan?', jawaban: ['karena sering buka jendela'] },
  { soal: 'Kenapa gajah tidak bisa main komputer?', jawaban: ['karena takut mouse'] },
  { soal: 'Kenapa ikan bahagia?', jawaban: ['karena ii kan lucu'] },
  { soal: 'Apa yang dipakai dokter waktu hujan?', jawaban: ['jas hujan'] },
  { soal: 'Kenapa ayam tidak pakai internet?', jawaban: ['karena takut ke-chicken'] },
  { soal: 'Apa makanan favorit hantu?', jawaban: ['setan kentang'] },
  { soal: 'Kenapa buku tidak pernah marah?', jawaban: ['karena selalu ada halaman baru'] },
  { soal: 'Apa yang dikatakan kopi ke susu?', jawaban: ['kamu bikin aku latte'] },
  { soal: 'Kenapa tanaman tidak boleh bohong?', jawaban: ['karena nanti daunnya rontok'] },
  { soal: 'Apa yang dipelajari kentang di sekolah?', jawaban: ['kentang ajar'] },
  { soal: 'Kenapa lampu lalu lintas tidak pernah sekolah?', jawaban: ['karena udah tahu merah kuning hijau'] },
  { soal: 'Apa yang dikatakan kulkas ke kulkas lain?', jawaban: ['ada makanan di antara kita'] },
  { soal: 'Kenapa pensil tidak pernah ketinggalan?', jawaban: ['karena selalu ada titik'] },
  { soal: 'Kenapa kucing gak ikut ujian?', jawaban: ['karena takut sama guru garuk'] },
  { soal: 'Kenapa sendal sering hilang di masjid?', jawaban: ['karena dia ikhlas'] },
  { soal: 'Kenapa air mata asin?', jawaban: ['karena dia hasil dari laut emosi'] },
  { soal: 'Kenapa dinosaurus punah?', jawaban: ['karena gak update status'] },
  { soal: 'Kenapa jomblo mirip wifi?', jawaban: ['karena sinyalnya kuat tapi gak terhubung'] },
  { soal: 'Kenapa hantu gak pernah ikut lomba lari?', jawaban: ['karena mereka takut dikalahkan manusia'] },
  { soal: 'Kenapa martabak manis gak pernah galau?', jawaban: ['karena dia udah penuh rasa'] },
  { soal: 'Apa yang dilakukan bayangan saat patah hati?', jawaban: ['menghilang di kegelapan'] },
  { soal: 'Kenapa zebra gak pernah bingung?', jawaban: ['karena hidupnya hitam putih'] },
  { soal: 'Kenapa bulan betah di langit?', jawaban: ['karena belum punya rumah di bumi'] },
  { soal: 'Apa pekerjaan favorit semut?', jawaban: ['jadi asisten rumah tangga, karena mereka rajin'] },
  { soal: 'Kenapa burung bisa nyanyi?', jawaban: ['karena gak punya chat buat dibales'] },
  { soal: 'Apa makanan favorit alien?', jawaban: ['nasi goreng orbit'] },
  { soal: 'Kenapa jendela gak pernah gosip?', jawaban: ['karena dia selalu transparan'] },
  { soal: 'Apa warna favorit vampir?', jawaban: ['merah merona'] },
  { soal: 'Kenapa sandal jepit suka berantem?', jawaban: ['karena sering pisah jalan'] },
  { soal: 'Apa bedanya kamu sama matahari?', jawaban: ['matahari nyinarin bumi, kamu nyinarin hati'] },
  { soal: 'Kenapa kalender gak pernah iri?', jawaban: ['karena dia tahu waktunya sendiri'] },
  { soal: 'Kenapa hujan gak pernah main layangan?', jawaban: ['karena dia takut angin cemburu'] },
  { soal: 'Kenapa meja gak pernah curhat?', jawaban: ['karena dia cuma bisa diam'] },
  { soal: 'Kenapa kipas angin disayang banyak orang?', jawaban: ['karena dia selalu setia muter'] },
  { soal: 'Kenapa kamu gak bisa jadi tisu?', jawaban: ['karena kamu terlalu berharga untuk dibuang'] },
  { soal: 'Kenapa kalkulator gak pernah galau?', jawaban: ['karena dia selalu punya hasil'] },
  { soal: 'Kenapa hati mirip wifi publik?', jawaban: ['karena banyak yang coba nyambung tapi gak semua dapet akses'] },
  { soal: 'Kenapa jalanan gak pernah curhat?', jawaban: ['karena dia udah capek dilewatin'] },
  { soal: 'Kenapa gorengan gak pernah kuliah?', jawaban: ['karena dia udah cukup hangat buat semua'] },
  { soal: 'Apa yang selalu dateng tapi gak pernah disuruh?', jawaban: ['tagihan'] },
  { soal: 'Kenapa motor suka boncengan?', jawaban: ['karena dia takut sendiri'] },
  { soal: 'Kenapa kasur gak bisa marah?', jawaban: ['karena dia terlalu empuk'] },
  { soal: 'Kenapa jam beker selalu galak?', jawaban: ['karena tugasnya bangunin orang tidur'] },
  { soal: 'Kenapa kerupuk gak pernah ke spa?', jawaban: ['karena dia takut melempem'] },
  { soal: 'Kenapa rindu itu berat?', jawaban: ['karena gak bisa digendong rame-rame'] },
  { soal: 'Kenapa kamu cocok jadi alarm?', jawaban: ['karena kamu yang bikin aku bangun tiap pagi'] },
  { soal: 'Apa yang selalu dibawa ke mana-mana tapi gak pernah dikeluarin?', jawaban: ['beban hidup'] },
  { soal: 'Kenapa spion suka ngintip?', jawaban: ['karena dia pengen lihat masa lalu'] },
  { soal: 'Kenapa langit gak pernah curhat?', jawaban: ['karena dia lebih suka menangis diam-diam'] },
  { soal: 'Kenapa kereta gak bisa belok sembarangan?', jawaban: ['karena dia udah punya relasi yang tetap'] },
  { soal: 'Kenapa pelangi gak pernah marah?', jawaban: ['karena dia selalu ceria 7 warna'] },
  { soal: 'Kenapa ember suka galau?', jawaban: ['karena sering ditampung perasaan'] }
];

const siapaAkuSoal = [
  {
    soal: 'Setiap orang membutuhkan aku tapi mereka memberi saya pergi setiap hari.',
    jawaban: 'Uang'
  },
  {
    soal: 'Aku tak bisa dilihat tapi bisa dirasakan, aku datang saat kau sedih maupun senang.',
    jawaban: 'Perasaan'
  },
  {
    soal: 'Aku selalu di depanmu, tapi kau tak bisa menyentuhku.',
    jawaban: 'Masa depan'
  },
  {
    soal: 'Aku memiliki jari, tetapi tidak punya tangan.',
    jawaban: 'Sarung tangan'
  },
  {
    soal: 'Aku memiliki banyak halaman, tapi bukan tumbuhan.',
    jawaban: 'Buku'
  },
  {
    soal: 'Aku memiliki gigi tapi tidak bisa menggigit.',
    jawaban: 'Sisir'
  },
  {
    soal: 'Aku bisa memotong tapi tidak pernah makan.',
    jawaban: 'Pisau'
  },
  {
    soal: 'Aku punya wajah tapi tidak bisa melihat.',
    jawaban: 'Jam'
  },
  {
    soal: 'Aku tinggi di pagi hari dan pendek saat malam.',
    jawaban: 'Bayangan'
  },
  {
    soal: 'Aku bisa membawa banyak orang, tapi aku bukan rumah.',
    jawaban: 'Bus'
  },
  {
    soal: 'Aku selalu naik tapi tidak pernah turun.',
    jawaban: 'Usia'
  },
  {
    soal: 'Aku datang saat malam dan pergi saat pagi.',
    jawaban: 'Gelap'
  },
  {
    soal: 'Aku bisa terbang tapi aku bukan burung.',
    jawaban: 'Pesawat'
  },
  {
    soal: 'Aku selalu berjalan tapi tidak pernah punya kaki.',
    jawaban: 'Waktu'
  },
  {
    soal: 'Aku ada di langit, aku muncul di malam hari, aku bersinar tapi bukan matahari.',
    jawaban: 'Bintang'
  },
  {
    soal: 'Aku basah saat mengeringkan sesuatu.',
    jawaban: 'Handuk'
  },
  {
    soal: 'Aku punya banyak warna dan muncul setelah hujan.',
    jawaban: 'Pelangi'
  },
  {
    soal: 'Aku bisa melihat semuanya tapi tidak bisa bicara.',
    jawaban: 'Kamera'
  },
  {
    soal: 'Aku tak bernyawa tapi bisa membuat orang menangis saat aku pergi.',
    jawaban: 'Kenangan'
  },
  {
    soal: 'Aku bisa menyala tanpa api.',
    jawaban: 'Lampu'
  },
  {
    soal: 'Aku bisa membawamu jauh tapi aku tidak berjalan.',
    jawaban: 'Mobil'
  },
  {
    soal: 'Aku tidak punya mulut tapi bisa membuatmu menangis.',
    jawaban: 'Bawang'
  },
  {
    soal: 'Aku bisa menyala dan padam, tapi aku bukan lampu.',
    jawaban: 'Api'
  },
  {
    soal: 'Aku memiliki kepala tapi tidak punya badan.',
    jawaban: 'Koin'
  },
  {
    soal: 'Aku bisa mencatat segalanya tapi tidak bisa berpikir.',
    jawaban: 'Buku catatan'
  },
  {
    soal: 'Aku suka makan sampah dan tinggal di tempat kotor.',
    jawaban: 'Tikus'
  },
  {
    soal: 'Aku selalu menunggumu di depan rumah.',
    jawaban: 'Keset'
  },
  {
    soal: 'Aku bisa menunjukkan arah, tapi aku bukan orang.',
    jawaban: 'Kompas'
  },
  {
    soal: 'Aku kuat saat tenang, tapi lemah saat marah.',
    jawaban: 'Tali'
  },
  {
    soal: 'Aku bulat dan selalu ditendang.',
    jawaban: 'Bola'
  },
  {
    soal: 'Aku punya tangan panjang dan pendek.',
    jawaban: 'Jam'
  },
  {
    soal: 'Aku tidak punya kaki tapi bisa lari deras.',
    jawaban: 'Air'
  },
  {
    soal: 'Aku kecil tapi bisa membuatmu tidak tidur semalaman.',
    jawaban: 'Nyamuk'
  },
  {
    soal: 'Aku bisa membuka sesuatu tapi aku bukan tangan.',
    jawaban: 'Kunci'
  },
  {
    soal: 'Aku ada di wajah, tapi bukan mata atau hidung.',
    jawaban: 'Mulut'
  },
  {
    soal: 'Aku selalu bersuara tapi tidak punya mulut.',
    jawaban: 'Radio'
  },
  {
    soal: 'Aku bisa menunjukkan dirimu, tapi aku bukan kamera.',
    jawaban: 'Cermin'
  },
  {
    soal: 'Aku selalu mengikuti tapi tidak pernah mendahului.',
    jawaban: 'Bayangan'
  },
  {
    soal: 'Aku bisa kau baca tapi aku bukan buku.',
    jawaban: 'Koran'
  },
  {
    soal: 'Aku punya roda tapi tidak berjalan sendiri.',
    jawaban: 'Sepeda'
  },
  {
    soal: 'Aku menghubungkan orang dari jarak jauh.',
    jawaban: 'Telepon'
  },
  {
    soal: 'Aku muncul saat hujan dan bisa membuatmu basah.',
    jawaban: 'Genangan'
  },
  {
    soal: 'Aku bisa membawa barang di punggung manusia.',
    jawaban: 'Ransel'
  },
  {
    soal: 'Aku berisi angka dan bisa ditekan.',
    jawaban: 'Kalkulator'
  },
  {
    soal: 'Aku dingin dan disukai saat cuaca panas.',
    jawaban: 'Es krim'
  },
  {
    soal: 'Aku keras di luar tapi kuning di dalam.',
    jawaban: 'Telur'
  },
  {
    soal: 'Aku berbunyi saat ditekan, biasanya di pintu.',
    jawaban: 'Bel'
  },
  {
    soal: 'Aku bisa menyimpan makanan agar tidak basi.',
    jawaban: 'Kulkas'
  },
  {
    soal: 'Aku muncul setiap hari, membawa terang.',
    jawaban: 'Matahari'
  },
  {
    soal: 'Aku tenang di siang, gelap di malam, penuh rahasia.',
    jawaban: 'Laut'
  }
];

const susunKata = [
  { soal: 'T-E-R-K-O', tipe: 'Benda', jawaban: 'ROKET' },
  { soal: 'R-E-K-T-A-P', tipe: 'Benda', jawaban: 'KARPET' },
  { soal: 'M-I-K-A-R-E-K', tipe: 'Benda', jawaban: 'KERAMIK' },
  { soal: 'S-K-R-A-U', tipe: 'Benda', jawaban: 'KASUR' },
  { soal: 'P-U-M-A-L', tipe: 'Benda', jawaban: 'LAMPU' },
  { soal: 'K-B-U-U', tipe: 'Benda', jawaban: 'BUKU' },
  { soal: 'A-E-N-P', tipe: 'Benda', jawaban: 'PENA' },
  { soal: 'S-B-U-N-A', tipe: 'Benda', jawaban: 'SABUN' },
  { soal: 'I-S-K-R-U', tipe: 'Benda', jawaban: 'KURSI' },
  { soal: 'U-J-B-A', tipe: 'Benda', jawaban: 'BAJU' },
  { soal: 'K-A-N-I', tipe: 'Benda', jawaban: 'IKAN' },
  { soal: 'A-M-G-R-A', tipe: 'Benda', jawaban: 'GARAM' },
  { soal: 'U-L-G-A', tipe: 'Benda', jawaban: 'GULA' },
  { soal: 'U-S-A-P-I', tipe: 'Benda', jawaban: 'PISAU' },
  { soal: 'A-M-E-J', tipe: 'Benda', jawaban: 'MEJA' },
  { soal: 'M-B-K-E-T-O', tipe: 'Benda', jawaban: 'TEMBOK' },
  { soal: 'H-A-T-A-N', tipe: 'Benda', jawaban: 'TANAH' },
  { soal: 'T-N-I-U-P', tipe: 'Benda', jawaban: 'PINTU' },
  { soal: 'E-A-D-N-E-J-L', tipe: 'Benda', jawaban: 'JENDELA' },
  { soal: 'D-I-N-G-D-I-N', tipe: 'Benda', jawaban: 'DINDING' },
  { soal: 'A-L-J-A-N', tipe: 'Kata', jawaban: 'JALAN' },
  { soal: 'I-R-A-L', tipe: 'Kata', jawaban: 'LARI' },
  { soal: 'U-T-I-R-D', tipe: 'Kata', jawaban: 'TIDUR' },
  { soal: 'N-M-A-K-A', tipe: 'Kata', jawaban: 'MAKAN' },
  { soal: 'U-I-M-N-M', tipe: 'Kata', jawaban: 'MINUM' },
  { soal: 'R-E-I-B-R-D-I', tipe: 'Kata', jawaban: 'BERDIRI' },
  { soal: 'U-D-U-K-D', tipe: 'Kata', jawaban: 'DUDUK' },
  { soal: 'A-C-B-A-R-I', tipe: 'Kata', jawaban: 'BICARA' },
  { soal: 'H-A-I-L-T', tipe: 'Kata', jawaban: 'LIHAT' },
  { soal: 'E-D-G-N-R-A', tipe: 'Kata', jawaban: 'DENGAR' },
  { soal: 'A-T-Y-N-A', tipe: 'Kata', jawaban: 'TANYA' },
  { soal: 'B-A-J-W-A', tipe: 'Kata', jawaban: 'JAWAB' },
  { soal: 'K-U-S-A', tipe: 'Kata', jawaban: 'SUKA' },
  { soal: 'S-H-I-E-D', tipe: 'Kata', jawaban: 'SEDIH' },
  { soal: 'S-G-N-N-A-E', tipe: 'Kata', jawaban: 'SENANG' },
  { soal: 'L-A-H-K-E-S-O', tipe: 'Tempat', jawaban: 'SEKOLAH' },
  { soal: 'A-P-R-S-A', tipe: 'Tempat', jawaban: 'PASAR' },
  { soal: 'K-T-O-O', tipe: 'Tempat', jawaban: 'TOKO' },
  { soal: 'H-M-U-A-R', tipe: 'Tempat', jawaban: 'RUMAH' },
  { soal: 'P-T-A-N-I-A', tipe: 'Tempat', jawaban: 'PANTAI' },
  { soal: 'U-G-G-N-U-N', tipe: 'Tempat', jawaban: 'GUNUNG' },
];

module.exports = {
  sifatlist,
  when,
  kapan,
  ask,
  cekKhodam,
  truth,
  cekmasadepan,
  cekkekuatan,
  cekkultivator,
  cekDosa,
  ceknamajodoh,
  darelist,
  soalFamily,
  tebakSoal,
  siapaAkuSoal,
  susunKata
}