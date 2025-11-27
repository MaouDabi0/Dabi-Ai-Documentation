import fs from 'fs'

const sifatList = [ 'Baik', 'Jahat', 'Lucu', 'Pemarah', 'Penyabar', 'Pemalu', 'Percaya Diri', 'Pemberani', 'Cengeng', 'Bijaksana', 'Pintar', 'Sombong', 'Rendah Hati', 'Setia', 'Cemburuan', 'Pelit', 'Dermawan', 'Pemalas', 'kek kontol', 'Rajin', 'Sensitif' ],

cekDosa = [ 'Femboy', 'Jomok', 'Rasis', 'Memfitnah', 'Bilang bot lemah', 'Main wa dua arah', 'Menghina admin', 'Menghina Member', 'Menghina Owner', 'Merayu Admin', 'Menyiksa lalat', 'Bilang owner hitam', 'Bilang "p" doang tiap masuk grup', 'Cabul ke member', 'Ngemis di grup', 'Ngeghost pas ditanya', 'Nyepam stiker 18+', 'Nyolong status WA orang', 'Pura-pura nolep', 'Sok bijak padahal toxic', 'Toxic terus tiap malam', 'Mengejek orang tua', 'AFK pas giliran debat', 'Kirim VN napas doang', 'Promosi dagangan tanpa izin', 'Suka skip pertanyaan penting', 'Komen seenak jidat', 'Kepo tapi gak pernah bantu', 'Ngasih link phising', 'Ngegas duluan pas disapa', 'Kirim stiker mantan terus', 'Curhat terus tapi gak pernah dengerin orang', 'Ngaku anak jenderal', 'Meme tak lucu tapi dipaksa ketawa', 'Suka kirim gambar blur', 'Berantem sama bot', 'Pembokep handal', 'Kalah debat jadi femboy', 'Ngaku cewek padahal cowok', 'Jadi silent reader sejati', 'Ngaku hacker padahal script kiddie', 'Ngetag semua member tanpa alasan', 'Typo parah sampe disangka sandi rahasia', 'Tiba-tiba left grup tanpa pamit', 'Kirim foto nasi goreng jam 3 pagi', 'Gak pernah baca pinned pesan', 'Pernah menghitamkan grup', 'Kirim voice note sambil kentut', 'Join cuma buat liat PP member', 'Mainin perasaan member' ]

export default {
  sifatList,
  cekDosa
}