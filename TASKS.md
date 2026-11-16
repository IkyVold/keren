# Da Bronx — Task Checklist

> Task list ini disusun dari `SPEC.md`, `UI-SPEC.md`, dan implementasi aktual `index.html`.
>
> **Acuan utama:** `index.html` untuk perilaku yang sudah ada. Item bertanda `[x]` berarti implementasinya ditemukan di HTML/JavaScript/CSS, bukan berarti sudah lulus pengujian manual. Item `[ ]` adalah verifikasi yang masih perlu dijalankan.

## 1. Setup dan Struktur Aplikasi

- [x] Gunakan HTML5 sebagai struktur halaman.
- [x] Gunakan CSS3 untuk styling, layout, animasi, dan breakpoint responsif.
- [x] Gunakan Vanilla JavaScript tanpa React, Vue, atau framework frontend.
- [x] Jalankan aplikasi sebagai halaman statis melalui browser.
- [x] Satukan struktur HTML, CSS, dan JavaScript dalam `index.html`.
- [x] Sediakan modul `Products` dan `Store` dengan pola UMD di dalam script.
- [x] Sediakan data produk awal melalui konstanta `DEFAULTS`.
- [x] Gunakan `localStorage` dengan key `dabronx_products_v1` untuk menyimpan data produk.

## 2. Layout, Navigasi, dan Identitas Visual

- [x] Buat identitas visual Da Bronx dengan tema dark tactical/urban.
- [x] Terapkan warna navy, merah, steel, teks terang, dan aksen neon sesuai token CSS.
- [x] Gunakan font Inter dan Oswald melalui Google Fonts.
- [x] Buat demo bar dan header sticky.
- [x] Buat logo Da Bronx yang menuju `#home`.
- [x] Buat navigasi anchor Home, Arsenal, Galeri, dan Dashboard.
- [x] Buat tombol Pilihan dengan indikator total kuantitas keranjang.
- [x] Buat bagian Hero/Home dengan headline, deskripsi, dan tombol navigasi.
- [x] Buat ticker informasi/promosi.
- [x] Buat indikator progress scroll, spotlight, reveal animation, dan efek partikel hero.
- [x] Buat footer dengan keterangan demo dan copyright.
- [x] Buat tombol WhatsApp mengambang.
- [ ] Verifikasi seluruh tautan anchor mengarah ke bagian yang benar.
- [ ] Verifikasi header sticky dan tombol Pilihan tetap dapat digunakan pada desktop dan mobile.

## 3. Katalog Produk

- [x] Render kartu katalog secara dinamis dari array `products` ke `#grid`.
- [x] Tampilkan jumlah hasil melalui `#countLabel`.
- [x] Tampilkan gambar produk dari `img` jika tersedia.
- [x] Tampilkan ilustrasi SVG fallback jika produk tidak memiliki gambar.
- [x] Tampilkan kategori, nama, deskripsi, harga USD, dan informasi stok.
- [x] Tampilkan badge unggulan jika `feat` bernilai `true`.
- [x] Sediakan checkbox untuk memilih produk.
- [x] Sediakan tombol Tambah untuk memasukkan produk ke keranjang.
- [x] Nonaktifkan checkbox dan tombol Tambah jika stok produk nol atau kurang.
- [x] Tampilkan tombol Stok Habis untuk produk yang stoknya nol atau kurang.
- [x] Sediakan keadaan kosong Produk Tidak Ditemukan dan tombol Reset Filter.
- [ ] Verifikasi kartu produk menampilkan seluruh informasi dan aksi dengan benar.
- [ ] Verifikasi produk tanpa gambar menggunakan fallback SVG.
- [ ] Verifikasi produk dengan stok nol tidak dapat dipilih atau ditambahkan dari kartu katalog.

## 4. Pencarian, Filter, dan Pengurutan

- [x] Sediakan input pencarian `#q`.
- [x] Cari berdasarkan properti `name` dan `desc`.
- [x] Abaikan perbedaan huruf besar/kecil.
- [x] Hapus spasi di awal dan akhir kata kunci melalui normalisasi.
- [x] Gunakan pencocokan substring (`includes`), bukan fuzzy search.
- [x] Sediakan filter kategori `#cat`.
- [x] Bentuk opsi kategori dari nilai unik `cat` pada data produk.
- [x] Urutkan opsi kategori secara alfabetis.
- [x] Kembalikan filter ke Semua Kategori jika kategori terpilih tidak lagi tersedia.
- [x] Sediakan sorting Nama A–Z, Harga Terendah, dan Harga Tertinggi melalui `#sort`.
- [x] Terapkan sorting setelah pencarian dan filter kategori.
- [x] Buat hasil filter sebagai array baru tanpa mengubah array produk utama.
- [ ] Uji pencarian berdasarkan nama dengan variasi kapitalisasi.
- [ ] Uji pencarian berdasarkan deskripsi.
- [ ] Uji kata kunci kosong dan input yang hanya berisi spasi.
- [ ] Uji kata kunci yang tidak ditemukan dan tombol Reset Filter.
- [ ] Uji pencarian dan filter kategori secara bersamaan.
- [ ] Uji ketiga opsi sorting dan pastikan data utama tidak berubah urutannya.

## 5. Keranjang / Drawer Pilihan

- [x] Simpan state keranjang pada objek JavaScript `cart` dengan format `productId: quantity`.
- [x] Tambahkan atau hapus pilihan melalui checkbox kartu.
- [x] Tambahkan kuantitas melalui tombol Tambah.
- [x] Buka drawer setelah tombol Tambah digunakan.
- [x] Sediakan kontrol tambah dan kurang kuantitas di drawer.
- [x] Hapus item dari keranjang saat kuantitas mencapai nol atau kurang.
- [x] Hitung subtotal berdasarkan harga dikalikan kuantitas.
- [x] Hitung total dari seluruh subtotal item.
- [x] Tampilkan total kuantitas pada tombol Pilihan di header.
- [x] Perbarui tampilan katalog dan drawer ketika keranjang berubah.
- [x] Sediakan keadaan keranjang kosong.
- [x] Sediakan input nama pelanggan `#custName`.
- [x] Sediakan input catatan opsional `#custNote`.
- [x] Sediakan tombol kirim WhatsApp `#waBtn`.
- [x] Sediakan mekanisme buka/tutup drawer melalui kontrol dan overlay sesuai implementasi.
- [x] Biarkan keranjang bersifat sementara dan kosong kembali setelah halaman dimuat ulang.
- [ ] Uji pemilihan beberapa produk dan perhitungan total kuantitas.
- [ ] Uji perubahan kuantitas, subtotal, dan total.
- [ ] Uji penghapusan item saat kuantitas menjadi nol.
- [ ] Uji keadaan kosong dan pastikan tidak ada indikasi pesanan telah dikirim.
- [ ] Uji drawer dapat ditutup melalui seluruh kontrol penutup yang tersedia.

> **Batasan yang disengaja:** kontrol tambah kuantitas di drawer belum membatasi kuantitas berdasarkan stok. Keranjang juga tidak disimpan ke LocalStorage.

## 6. Integrasi WhatsApp

- [x] Sediakan konfigurasi `WHATSAPP_NUMBER`.
- [x] Gunakan tautan eksternal `https://wa.me/`.
- [x] Buat pesan WhatsApp untuk satu produk dari kartu katalog.
- [x] Sertakan nama produk, harga, dan kuantitas satu pada pesan per produk.
- [x] Encode pesan menggunakan `encodeURIComponent`.
- [x] Validasi format nomor internasional melalui `normalizeInternationalNumber`.
- [x] Buat pesan ringkasan keranjang yang berisi produk, kuantitas, subtotal, dan total.
- [x] Sertakan nama pelanggan jika diisi.
- [x] Sertakan catatan jika diisi.
- [x] Perbarui tautan WhatsApp ketika nama atau catatan berubah.
- [x] Sediakan tautan WhatsApp mengambang.
- [x] Gunakan navigasi eksternal; aplikasi tidak mengirim pesan secara otomatis dan tidak menggunakan WhatsApp Business API.
- [ ] Ganti nomor contoh `6281234567890` dengan nomor tujuan yang benar sebelum demo diarahkan ke kontak sebenarnya.
- [ ] Uji format nomor valid dan tidak valid.
- [ ] Uji isi URL dan pesan WhatsApp dari kartu produk.
- [ ] Uji isi URL dan pesan WhatsApp dari drawer, termasuk nama dan catatan.
- [ ] Pastikan pengguna tetap meninjau dan mengirim pesan dari WhatsApp sendiri.

## 7. Galeri

- [x] Buat bagian Galeri dengan dua item visual.
- [x] Tampilkan item Street Style beserta judul dan deskripsi.
- [x] Tampilkan item O Block Energy beserta judul dan deskripsi.
- [x] Sematkan gambar galeri pada HTML sebagai data Base64.
- [x] Terapkan pemotongan gambar menggunakan aturan CSS yang tersedia.
- [ ] Verifikasi kedua gambar dan keterangan tampil dengan benar.
- [ ] Verifikasi galeri berubah menjadi satu kolom pada lebar layar maksimum 700px.

## 8. Dashboard dan Statistik Inventori

- [x] Buat dashboard pada bagian `#dashboard` dalam halaman yang sama.
- [x] Tampilkan indikator Demo Dashboard.
- [x] Sediakan tombol Reset.
- [x] Sediakan tombol Tambah Produk.
- [x] Hitung Total Produk dari `products.length`.
- [x] Hitung Total Stok dari penjumlahan properti `stock`.
- [x] Hitung Total Kategori dari jumlah kategori unik.
- [x] Tampilkan tabel inventori berisi produk, kategori, harga, stok, status, dan aksi.
- [x] Tampilkan status Tersedia jika stok lebih dari nol.
- [x] Tampilkan status Habis jika stok sama dengan atau kurang dari nol.
- [x] Tampilkan keadaan kosong jika tidak ada produk.
- [x] Tampilkan seluruh produk pada dashboard, terlepas dari filter katalog.
- [x] Terapkan animasi angka statistik melalui `countTo`.
- [ ] Verifikasi ketiga statistik sesuai data produk aktual.
- [ ] Verifikasi tabel menampilkan semua produk dan status stok yang tepat.
- [ ] Verifikasi tabel tetap dapat diakses pada layar sempit melalui overflow horizontal.

## 9. CRUD Produk

### 9.1 Create

- [x] Buka modal kosong melalui tombol Tambah Produk.
- [x] Validasi nama dan kategori wajib diisi.
- [x] Validasi harga harus berupa angka dan tidak boleh negatif.
- [x] Validasi stok harus berupa integer dan tidak boleh negatif.
- [x] Buat ID produk baru dari ID maksimum saat ini ditambah satu.
- [x] Tambahkan produk baru ke array `products`.
- [ ] Uji penambahan produk valid dan pastikan tampil di katalog serta dashboard.
- [ ] Uji submit tanpa nama, tanpa kategori, harga negatif, dan stok negatif.

### 9.2 Read

- [x] Gunakan data `products` untuk katalog.
- [x] Gunakan data `products` untuk statistik dashboard.
- [x] Gunakan data `products` untuk tabel inventori.
- [ ] Verifikasi data yang sama tampil konsisten pada katalog, statistik, dan tabel.

### 9.3 Update

- [x] Buka modal edit dengan data produk yang dipilih.
- [x] Isi form dengan nilai produk saat ini.
- [x] Terapkan perubahan pada objek berdasarkan ID.
- [x] Render ulang dashboard dan katalog setelah penyimpanan.
- [ ] Uji edit setiap field dan pastikan perubahan tampil pada semua area terkait.
- [ ] Uji pembatalan modal edit dan pastikan data tidak berubah.

### 9.4 Delete

- [x] Tampilkan konfirmasi browser sebelum penghapusan.
- [x] Hapus produk dari array jika pengguna mengonfirmasi.
- [x] Hapus produk terkait dari keranjang.
- [x] Simpan perubahan dan render ulang dashboard serta katalog.
- [ ] Uji konfirmasi hapus dan pastikan produk hilang dari katalog, tabel, dan keranjang.
- [ ] Uji pembatalan hapus dan pastikan data tidak berubah.

### 9.5 Reset

- [x] Tampilkan konfirmasi sebelum reset.
- [x] Kembalikan data produk ke `DEFAULTS` jika dikonfirmasi.
- [x] Kosongkan keranjang ketika reset dikonfirmasi.
- [x] Simpan data hasil reset dan perbarui tampilan.
- [ ] Uji reset dan pastikan delapan produk default kembali tampil.
- [ ] Uji pembatalan reset dan pastikan data tidak berubah.

## 10. Modal Produk dan Upload Foto

- [x] Sediakan modal tambah/edit dengan judul sesuai mode.
- [x] Sediakan area preview foto produk.
- [x] Sediakan pemilihan file melalui file picker.
- [x] Sediakan drag-and-drop gambar.
- [x] Periksa bahwa file yang diproses merupakan gambar.
- [x] Baca file menggunakan `FileReader`.
- [x] Muat gambar menggunakan `Image`.
- [x] Ubah ukuran gambar agar sisi terpanjang maksimum 700px dengan rasio aspek dipertahankan.
- [x] Proses gambar menggunakan `canvas`.
- [x] Simpan hasil pemrosesan sebagai JPEG Data URL dengan kualitas `0.82`.
- [x] Sediakan tombol Hapus foto.
- [x] Gunakan fallback gambar pada kartu jika foto tidak tersedia.
- [x] Tampilkan pesan kesalahan ketika file bukan gambar atau gagal dibaca/dimuat.
- [x] Sediakan tombol Batal, Simpan, dan kontrol tutup modal.
- [x] Tutup modal melalui tombol tutup, Batal, klik overlay, atau tombol Escape.
- [x] Fokuskan input nama setelah modal dibuka.
- [x] Tampilkan pesan validasi pada area `#pErr`.
- [ ] Uji upload gambar JPG, PNG, dan WebP.
- [ ] Uji drag-and-drop dan file picker.
- [ ] Uji file non-gambar dan gambar yang gagal dimuat.
- [ ] Uji preview, hapus foto, simpan foto, dan fallback tanpa foto.
- [ ] Uji penutupan modal melalui semua mekanisme yang tersedia.

## 11. Penyimpanan dan Feedback

- [x] Baca data produk dari LocalStorage saat aplikasi dimuat.
- [x] Gunakan salinan `DEFAULTS` jika data tidak tersedia atau tidak dapat dibaca sebagai array.
- [x] Simpan perubahan produk ke LocalStorage.
- [x] Tangani kegagalan penyimpanan dan tampilkan informasi bahwa perubahan hanya sementara.
- [x] Sediakan toast untuk operasi tambah, edit, hapus, dan reset.
- [x] Tampilkan pesan validasi pada form produk.
- [ ] Uji pemuatan awal ketika LocalStorage kosong.
- [ ] Uji pemuatan ketika LocalStorage berisi array produk valid.
- [ ] Uji persistensi setelah tambah/edit/hapus lalu reload halaman.
- [ ] Uji kondisi LocalStorage tidak tersedia atau gagal menyimpan.
- [ ] Pastikan tidak ada toast sukses palsu ketika penyimpanan gagal.

## 12. Responsive Design

- [x] Pada maksimum 960px, ubah katalog menjadi dua kolom.
- [x] Pada maksimum 960px, terapkan aturan layout hero yang tersedia di CSS.
- [x] Pada maksimum 700px, ubah galeri menjadi satu kolom.
- [x] Pada maksimum 600px, sembunyikan tautan navigasi desktop.
- [x] Pada maksimum 600px, ubah statistik dashboard menjadi satu kolom.
- [x] Pada maksimum 520px, ubah form modal menjadi satu kolom.
- [x] Terapkan overflow horizontal pada pembungkus tabel inventori.
- [ ] Uji viewport desktop.
- [ ] Uji viewport tablet dan breakpoint 960px.
- [ ] Uji breakpoint 700px, 600px, dan 520px.
- [ ] Pastikan tidak ada horizontal overflow yang tidak disengaja pada halaman.
- [ ] Pastikan tombol dan kontrol form tetap dapat digunakan dengan sentuhan.

## 13. Acceptance Test / Regression Checklist

Gunakan daftar ini untuk pemeriksaan akhir setelah perubahan kode.

- [ ] **AC-01–AC-03:** Halaman terbuka dan sumber data awal/LocalStorage dipilih dengan benar.
- [ ] **AC-04–AC-07:** Pencarian nama/deskripsi, normalisasi, hasil kosong, dan reset filter berjalan benar.
- [ ] **AC-08–AC-12:** Filter kategori, kombinasi filter, dan ketiga sorting berjalan benar.
- [ ] **AC-13–AC-17:** Pemilihan produk, batas stok pada kartu, kuantitas, subtotal, dan total keranjang berjalan benar.
- [ ] **AC-18–AC-20:** Pesan WhatsApp memuat data pilihan dan informasi pelanggan dengan encoding yang benar.
- [ ] **AC-21–AC-28:** Dashboard, tambah, validasi, edit, hapus, dan konfirmasi berjalan benar.
- [ ] **AC-29–AC-31:** Upload, validasi file, preview, dan hapus foto berjalan benar.
- [ ] **AC-32–AC-33:** Reset dan pembatalan reset berjalan benar.
- [ ] **AC-34–AC-35:** Data produk bertahan setelah reload, sedangkan keranjang kembali kosong.
- [ ] **AC-36:** Layout menyesuaikan perubahan ukuran viewport.

## 14. Batasan dan Fitur di Luar Scope

Item berikut **bukan task implementasi untuk versi prototype saat ini**. Jangan menambahkannya sebagai fitur wajib tanpa perubahan scope dan spesifikasi.

- [ ] Backend API dan database server.
- [x] ~~Autentikasi, otorisasi, dan role-based access control.~~ Kini tersedia sebagai simulasi sisi klien (admin/seller/buyer) — lihat SPEC.md bagian 2. Autentikasi server tetap di luar scope.
- [ ] Sinkronisasi multi-user atau antarperangkat.
- [ ] Penyimpanan keranjang secara persisten.
- [ ] Checkout, pembayaran, payment gateway, atau pemrosesan transaksi.
- [ ] Pengelolaan pesanan dan riwayat transaksi.
- [ ] WhatsApp Business API atau pengiriman pesan otomatis.
- [ ] Filter harga.
- [ ] Fuzzy search, koreksi typo, atau ranking relevansi.
- [ ] Rekomendasi produk.
- [ ] Laporan penjualan.
- [ ] Deployment dan konfigurasi production.

## 15. Catatan Implementasi dan Perbedaan Dokumen

1. `index.html` menjadi source of truth untuk perilaku dan tampilan yang sedang berjalan.
2. `SPEC.md` dan `UI-SPEC.md` menjelaskan prototype; task di atas tidak mengasumsikan adanya backend atau fitur transaksi.
3. Nomor WhatsApp pada kode masih berupa nomor contoh `6281234567890`; konfigurasi nomor tujuan merupakan prasyarat sebelum demonstrasi ke kontak nyata.
4. Keranjang hanya berada di memori JavaScript dan tidak bertahan setelah reload.
5. Kuantitas pada drawer belum dibatasi berdasarkan stok; ini merupakan batasan implementasi yang terdokumentasi, bukan bug yang harus diam-diam diubah dalam task ini.
6. UI-SPEC menyebut komposisi hero dua kolom pada desktop dan perubahan menjadi satu kolom pada breakpoint 960px. CSS aktual pada `index.html` menetapkan `.hero-grid{display:block}`; karena itu, jangan menganggap layout dua kolom sebagai pekerjaan yang sudah ada atau mengubahnya tanpa keputusan perubahan UI.
7. Task pengujian ditandai belum selesai karena keberadaan kode saja tidak membuktikan skenario telah diuji.

## 16. Kandidat Pengembangan Berikutnya (Opsional)

Prioritas berikut berasal dari bagian Future Development pada `SPEC.md`; semuanya memerlukan keputusan scope tersendiri.

- [ ] Pisahkan HTML, CSS, dan JavaScript ke file terpisah.
- [ ] Pertimbangkan backend dan database untuk penyimpanan terpusat.
- [ ] Tambahkan autentikasi dan otorisasi jika dashboard digunakan untuk pengelolaan nyata.
- [ ] Pertimbangkan batas kuantitas keranjang berdasarkan stok.
- [ ] Lengkapi validasi dan penanganan kegagalan penyimpanan.
- [ ] Optimalkan strategi penyimpanan foto produk.
- [ ] Tambahkan pengujian otomatis untuk pencarian, filter, sorting, keranjang, dan CRUD.
- [ ] Tetapkan target performa setelah dataset dan lingkungan pengujian ditentukan.

---

**Dokumen:** `TASKS.md`  
**Project:** Da Bronx  
**Basis:** `SPEC.md` + `UI-SPEC.md` + `index.html`  
**Jenis dokumen:** Implementation checklist dan manual QA checklist
