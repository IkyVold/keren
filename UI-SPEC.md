# Da Bronx — UI Specification

> Dokumen ini menjelaskan tampilan, hierarki visual, komponen antarmuka, responsivitas, dan perilaku interaksi UI berdasarkan implementasi aktual pada `index.html`.
>
> **Sumber acuan:** `index.html`. Jika dokumen ini berbeda dengan HTML, implementasi HTML menjadi acuan utama. Dokumen ini berfokus pada UI, bukan spesifikasi bisnis atau arsitektur aplikasi secara menyeluruh.

## 1. Identitas Visual

### 1.1 Identitas Produk

- **Nama aplikasi:** Da Bronx
- **Judul halaman:** `Da Bronx — Tactical Firearms (Demo)`
- **Karakter visual:** dark tactical, urban, tegas, modern, dan berkontras tinggi.
- **Bahasa antarmuka:** Bahasa Indonesia, dengan beberapa istilah/teks dekoratif berbahasa Inggris.
- **Jenis tampilan:** single-page website dengan navigasi anchor ke bagian halaman.

### 1.2 Palet Warna

Warna utama yang didefinisikan pada CSS:

| Token | Nilai | Penggunaan |
|---|---|---|
| `--navy` | `#0b1623` | Dasar warna navy |
| `--navy2` | `#13233a` | Permukaan/variasi navy |
| `--red` | `#b22234` | Aksen merah utama |
| `--red2` | `#8e1a29` | Variasi merah lebih gelap |
| `--steel` | `#8a97a8` | Teks/aksen abu-abu kebiruan |
| `--light` | `#f3f5f8` | Warna terang |
| `--white` | `#fff` | Permukaan atau teks putih |
| `--border` | `#dde2ea` | Garis batas pada komponen terang |
| `--green` | `#2e7d4f` | Aksen status hijau |
| `--bg` | `#070d16` | Latar utama gelap |
| `--glass` | `rgba(19,35,58,.55)` | Permukaan transparan |
| `--glass2` | `rgba(14,26,43,.8)` | Permukaan transparan lebih pekat |
| `--line` | `rgba(120,150,190,.18)` | Garis tipis pada tema gelap |
| `--txt` | `#e8edf5` | Teks utama pada tema gelap |
| `--mut` | `#93a3b8` | Teks sekunder |
| `--neon` | `#ff2d46` | Aksen merah terang |

- Radius dasar komponen menggunakan token `--radius: 10px`.
- Gunakan merah sebagai aksen penting, bukan sebagai warna dominan untuk seluruh bidang.
- Permukaan gelap, garis tipis, dan teks kontras membentuk identitas visual utama.

### 1.3 Gaya Tipografi dan Elemen

- Judul bagian menggunakan hierarki ukuran dan ketebalan yang lebih kuat daripada teks deskripsi.
- Teks sekunder menggunakan warna muted/abu-abu kebiruan.
- Label, badge, angka statistik, harga, dan status stok harus mudah dibedakan secara visual.
- Tombol utama menggunakan aksen merah atau hijau WhatsApp sesuai tujuan aksinya.
- Kartu dan panel menggunakan sudut membulat, border, serta latar kontras dengan halaman.
- Ikon pada implementasi saat ini menggunakan karakter/emoji dan elemen visual yang ditulis langsung di HTML/CSS.

## 2. Struktur Halaman

Halaman disusun vertikal dalam satu dokumen HTML. Navigasi berpindah ke bagian melalui anchor.

Urutan bagian:

1. Header dan navigasi
2. Hero / Home (`#home`)
3. Ticker informasi
4. Katalog / Arsenal (`#catalog`)
5. Call-to-action pemesanan
6. Galeri (`#gallery`)
7. Dashboard Pengelola (`#dashboard`)
8. Footer
9. Drawer keranjang/pilihan
10. Modal tambah/edit produk

## 3. Header dan Navigasi

### 3.1 Komponen

Header memuat:

- Logo teks **Da Bronx** yang mengarah ke `#home`.
- Navigasi **Home**, **Arsenal**, **Galeri**, dan **Dashboard**.
- Tombol keranjang **🛒 Pilihan** dengan angka jumlah item.

### 3.2 Perilaku

- Klik logo atau Home berpindah ke bagian Home.
- Klik Arsenal berpindah ke katalog.
- Klik Galeri berpindah ke galeri.
- Klik Dashboard berpindah ke dashboard.
- Tombol Pilihan membuka drawer keranjang.
- Angka pada tombol Pilihan menunjukkan total kuantitas item di keranjang, bukan jumlah jenis produk.

### 3.3 Tampilan Responsif

- Pada lebar layar maksimum 600px, tautan navigasi disembunyikan oleh CSS.
- Tombol Pilihan tetap menjadi akses ke keranjang.

## 4. Hero / Home

### 4.1 Konten

Bagian hero memiliki:

- Eyebrow/dekorasi teks `★ Est. 1994 · New York, USA`.
- Headline `Built for Professionals. Trusted Worldwide.`
- Deskripsi singkat berbahasa Indonesia mengenai katalog.
- Tombol **Lihat Arsenal →** menuju `#catalog`.
- Tombol **Dashboard** menuju `#dashboard`.
- Area visual hero dengan gambar/latar dan efek dekoratif, termasuk partikel.

### 4.2 Tata Letak

- Hero merupakan bagian pembuka utama setelah header.
- Pada desktop, teks dan visual hero ditampilkan dalam komposisi dua area/kolom.
- Pada lebar layar maksimum 960px, hero berubah menjadi satu kolom.

### 4.3 Interaksi

Kedua tombol melakukan navigasi ke bagian halaman; tidak melakukan transaksi atau proses backend.

## 5. Ticker

Ticker menampilkan teks promosi/informasi singkat sebagai elemen visual di antara hero dan konten katalog.

- Ticker bersifat informatif/dekoratif.
- Tidak memiliki input atau aksi pengguna.
- Gerakan/animasi ticker mengikuti implementasi CSS pada HTML.

## 6. Katalog Produk / Arsenal

### 6.1 Header Bagian

Bagian katalog menampilkan:

- Eyebrow `The Arsenal`.
- Judul **Pilih Produk**.
- Petunjuk: centang produk atau klik Tambah, lalu kirim via WhatsApp.
- Informasi jumlah produk yang ditampilkan.

### 6.2 Toolbar Katalog

Toolbar terdiri dari tiga kontrol:

| Kontrol | ID | Tampilan awal/opsi | Fungsi |
|---|---|---|---|
| Pencarian | `q` | Placeholder `Cari nama atau deskripsi...` | Memfilter produk berdasarkan nama atau deskripsi |
| Kategori | `cat` | `Semua Kategori` dan kategori yang tersedia | Memfilter berdasarkan kategori |
| Pengurutan | `sort` | `Nama A-Z`, `Harga Terendah`, `Harga Tertinggi` | Mengurutkan hasil katalog |

Ketentuan tampilan dan interaksi:

- Pencarian menerima teks.
- Pilihan kategori dibentuk dari kategori produk yang tersedia.
- Pengurutan diterapkan pada hasil yang sudah difilter.
- Saat tidak ada produk yang cocok, area katalog menampilkan keadaan kosong sesuai implementasi HTML/JavaScript.
- Kontrol harus tetap dapat digunakan pada layar sempit tanpa menyebabkan halaman melebar secara horizontal.

### 6.3 Kartu Produk

Setiap kartu produk dapat menampilkan:

1. Gambar produk; jika gambar tidak tersedia, gunakan fallback visual yang disediakan implementasi.
2. Badge kategori.
3. Badge unggulan jika `feat` bernilai true.
4. Nama produk.
5. Deskripsi singkat.
6. Harga dalam USD.
7. Informasi stok.
8. Checkbox pemilihan produk.
9. Tombol **Tambah**.
10. Tautan/tombol pemesanan WhatsApp per produk.

Perilaku:

- Checkbox menambahkan atau menghapus produk dari pilihan/keranjang.
- Tombol Tambah menambah kuantitas produk ke keranjang.
- Produk dengan stok nol tidak dapat dipilih atau ditambahkan melalui kontrol kartu katalog.
- Aksi pemesanan per produk membuka WhatsApp dengan pesan yang telah disiapkan aplikasi.
- Kartu mengikuti jumlah kolom yang ditentukan breakpoint responsif.

### 6.4 Call-to-Action Katalog

Setelah katalog terdapat area ajakan **Siap Pesan?** dengan tombol **💬 Buka Pilihan & Kirim**.

- Tombol membuka drawer keranjang/pilihan.
- Tombol tidak langsung mengirim pesan tanpa tindakan lanjutan pengguna.

## 7. Galeri

### 7.1 Konten

Bagian galeri memiliki:

- Eyebrow `Lifestyle & Culture`.
- Judul **Galeri**.
- Deskripsi singkat mengenai visual street/tactical culture.
- Dua item visual yang diberi judul:
  - **Street Style** — deskripsi urban look di outdoor setting.
  - **O Block Energy** — deskripsi sesuai teks yang tersedia pada HTML.

### 7.2 Tampilan

- Galeri disajikan sebagai kumpulan kartu/area gambar dengan judul dan keterangan.
- Pada lebar layar maksimum 700px, galeri menggunakan satu kolom.
- Gambar mengikuti rasio dan pemotongan yang didefinisikan pada CSS.

## 8. Dashboard Pengelola

### 8.1 Header Dashboard

Bagian dashboard menampilkan:

- Eyebrow `Management System`.
- Judul **Dashboard Pengelola**.
- Deskripsi ringkasan inventori Da Bronx.
- Indikator **Demo Dashboard**.
- Tombol **Reset**.
- Tombol **＋ Tambah Produk**.

### 8.2 Kartu Statistik

Dashboard menampilkan tiga statistik:

| Statistik | Makna |
|---|---|
| Total Produk | Jumlah data produk |
| Total Stok | Penjumlahan stok seluruh produk |
| Total Kategori | Jumlah kategori unik |

Pada lebar layar maksimum 600px, kartu statistik ditampilkan dalam satu kolom.

### 8.3 Tabel Produk

Tabel menampilkan data:

- Produk
- Kategori
- Harga
- Stok
- Aksi

Kolom Aksi menyediakan tindakan **Edit** dan **Delete** untuk masing-masing produk.

Perilaku:

- Edit membuka modal dengan data produk yang dipilih.
- Delete meminta konfirmasi sebelum menghapus data.
- Tombol Tambah Produk membuka modal dalam mode tambah.
- Dashboard merupakan panel pengelolaan pada halaman yang sama, bukan halaman terpisah.

## 9. Drawer Keranjang / Pilihan

### 9.1 Konten

Drawer menampilkan ringkasan produk yang dipilih, termasuk:

- Daftar item.
- Nama produk.
- Harga satuan.
- Kontrol kuantitas kurang dan tambah.
- Subtotal per item.
- Total keseluruhan.
- Input nama pelanggan (`custName`).
- Input catatan opsional (`custNote`).
- Tombol **💬 Kirim via WhatsApp**.
- Kontrol untuk menutup drawer.

### 9.2 Perilaku

- Tombol tambah/kurang mengubah kuantitas item.
- Jika kuantitas menjadi nol atau kurang, item dihapus dari keranjang.
- Total keranjang dihitung dari harga dikalikan kuantitas setiap item.
- Jumlah pada tombol header mengikuti total kuantitas.
- Tombol Kirim via WhatsApp menyusun pesan ringkasan pilihan dan membuka tautan WhatsApp.
- Pengiriman pesan tetap dilakukan oleh pengguna di aplikasi WhatsApp; website tidak mengirim pesan secara otomatis.

### 9.3 Keadaan Kosong

Jika belum ada item, drawer menampilkan keadaan keranjang kosong sesuai teks/komponen pada HTML. Kontrol pengiriman tidak boleh memberi kesan bahwa ada pesanan yang sudah dikirim.

## 10. Modal Tambah dan Edit Produk

### 10.1 Pembukaan Modal

Modal dibuka melalui tombol **Tambah Produk** atau tindakan **Edit** pada tabel dashboard.

- Mode tambah menampilkan form kosong.
- Mode edit menampilkan nilai produk yang sedang diedit.
- Tombol `×` dan **Batal** menutup modal.

### 10.2 Susunan Form

Urutan elemen form:

1. Judul modal (Tambah Produk atau Edit Produk sesuai mode).
2. Kontrol tutup `×`.
3. Area Foto Produk.
4. Petunjuk klik atau seret foto.
5. Tombol **Hapus foto** jika gambar tersedia.
6. Nama Produk.
7. Kategori.
8. Harga (USD).
9. Stok.
10. Checkbox **★ Tandai Unggulan**.
11. Deskripsi.
12. Tombol **Batal**.
13. Tombol **Simpan**.

### 10.3 Upload Gambar

- Area foto mendukung pemilihan file melalui input dan drag-and-drop.
- Format yang ditampilkan pada UI: JPG, PNG, dan WebP.
- Gambar diproses di sisi browser untuk diperkecil sebelum disimpan sebagai data URL.
- Dimensi maksimum pemrosesan gambar adalah 700 piksel pada sisi terpanjang.
- Kualitas JPEG pemrosesan adalah 0,82.
- Tombol Hapus foto menghapus gambar dari data form.
- Jika gambar tidak dipilih, produk menggunakan fallback gambar pada kartu katalog.

### 10.4 Validasi dan Pesan

- Nama dan kategori wajib diisi.
- Harga harus berupa angka dan tidak boleh negatif.
- Stok harus berupa bilangan bulat dan tidak boleh negatif.
- Pesan validasi/notifikasi ditampilkan melalui mekanisme toast yang tersedia pada implementasi.
- Form menggunakan validasi JavaScript; atribut form `novalidate` membuat validasi native browser tidak menjadi mekanisme utama.

### 10.5 Responsif

Pada lebar layar maksimum 520px, susunan field modal berubah menjadi satu kolom.

## 11. Tombol WhatsApp Mengambang

Tautan mengambang **💬 Chat WhatsApp** tersedia sebagai akses cepat.

- Tampil sebagai tombol mengambang pada halaman sesuai CSS.
- Mengarah ke WhatsApp menggunakan nomor yang dikonfigurasi di JavaScript.
- Tidak menggunakan WhatsApp Business API dan tidak mengirim pesan otomatis.

## 12. Footer

Footer menampilkan:

- Identitas Da Bronx.
- Keterangan bahwa situs merupakan demo fiksi untuk keperluan desain/tugas.
- Pernyataan bahwa nama produk merupakan merek milik pemiliknya masing-masing.
- Copyright `© 2026 Da Bronx. All rights reserved.`

Footer merupakan bagian informatif dan tidak memiliki alur input.

## 13. Responsivitas

Breakpoint yang didefinisikan pada CSS:

| Breakpoint | Perubahan UI |
|---|---|
| `max-width: 960px` | Katalog menjadi dua kolom dan hero menjadi satu kolom |
| `max-width: 700px` | Galeri menjadi satu kolom |
| `max-width: 600px` | Tautan navigasi disembunyikan dan statistik dashboard menjadi satu kolom |
| `max-width: 520px` | Form modal menjadi satu kolom |

Ketentuan umum:

- Konten harus tetap berada di dalam viewport.
- Teks panjang, nama produk, dan deskripsi tidak boleh merusak lebar kartu.
- Kontrol form dan tombol harus tetap dapat dioperasikan dengan sentuhan pada perangkat mobile.
- Jangan menambahkan breakpoint atau perubahan layout yang tidak ada pada implementasi tanpa memperbarui HTML dan dokumen ini secara bersamaan.

## 14. Status UI dan Feedback

UI menggunakan notifikasi toast untuk memberikan feedback atas operasi yang dilakukan pengguna, termasuk penyimpanan, penghapusan, reset, atau kegagalan penyimpanan.

Pedoman:

- Feedback harus sesuai dengan hasil operasi sebenarnya.
- Aksi yang membutuhkan konfirmasi (hapus dan reset) harus menampilkan konfirmasi sebelum dilanjutkan.
- Status stok dan keadaan kosong harus ditampilkan secara jelas.
- Jangan menampilkan status berhasil jika penyimpanan gagal; implementasi memberi informasi bahwa perubahan hanya bersifat sementara ketika penyimpanan lokal gagal.

## 15. Pemetaan Elemen UI ke Selector

Selector berikut berasal dari elemen HTML yang digunakan sebagai kontrol utama:

| Elemen | Selector |
|---|---|
| Pencarian katalog | `#q` |
| Filter kategori | `#cat` |
| Pengurutan | `#sort` |
| Bagian Home | `#home` |
| Bagian katalog | `#catalog` |
| Bagian galeri | `#gallery` |
| Bagian dashboard | `#dashboard` |
| Input nama pelanggan | `#custName` |
| Input catatan pesanan | `#custNote` |
| Tombol kirim WhatsApp pada drawer | `#waBtn` |
| Tombol WhatsApp mengambang | `#waFloat` |
| Form produk | `#pForm` |
| Input nama produk | `#pName` |
| Input kategori | `#pCat` |
| Input harga | `#pPrice` |
| Input stok | `#pStock` |
| Checkbox unggulan | `#pFeat` |
| Input deskripsi | `#pDesc` |
| Input file gambar | `#pFile` |
| Tombol hapus gambar | `#rmImg` |
| Tombol simpan produk | `#pSave` |

Elemen kartu produk, baris tabel, drawer, dan toast dirender/dikelola melalui JavaScript; selector dinamisnya mengikuti implementasi aktual dan tidak ditetapkan sebagai kontrak selector statis dalam dokumen ini.

## 16. Batasan UI Saat Ini

- Seluruh UI berada pada satu halaman HTML.
- Login/daftar memakai modal; navbar menampilkan tombol Masuk atau nama + badge role + Keluar. Dashboard hanya tampil untuk seller/admin; panel "Kelola Pengguna" hanya untuk admin.
- Drawer dan modal merupakan overlay pada halaman yang sama.
- Keranjang tidak dipertahankan setelah halaman dimuat ulang.
- UI tidak menyediakan halaman checkout atau pembayaran.
- Tautan WhatsApp hanya menyiapkan pesan untuk dibuka oleh pengguna.
- Tidak ada status pesanan/transaksi yang tersimpan pada server.
- UI tidak menyediakan sinkronisasi data antarperangkat.
- Tampilan dan perilaku akhir mengikuti dukungan browser terhadap HTML, CSS, JavaScript, FileReader, Image, Canvas, dan localStorage.

## 17. Kriteria Pemeriksaan UI

Pemeriksaan berikut dapat digunakan untuk memastikan tampilan sesuai dengan dokumen:

| ID | Skenario | Hasil yang diharapkan |
|---|---|---|
| UI-01 | Halaman pertama kali dibuka | Header, hero, ticker, katalog, galeri, dashboard, dan footer tersusun dalam satu halaman |
| UI-02 | Klik logo Da Bronx | Halaman menuju bagian Home |
| UI-03 | Klik Arsenal | Halaman menuju bagian katalog |
| UI-04 | Klik Galeri | Halaman menuju bagian galeri |
| UI-05 | Klik Dashboard | Halaman menuju bagian dashboard |
| UI-06 | Klik tombol Pilihan | Drawer keranjang terbuka |
| UI-07 | Lihat kartu produk | Informasi gambar/fallback, kategori, nama, deskripsi, harga, stok, dan aksi terlihat |
| UI-08 | Cari produk | Hasil katalog berubah sesuai kata pencarian |
| UI-09 | Ubah kategori | Katalog menampilkan kategori yang dipilih |
| UI-10 | Ubah pengurutan | Urutan produk berubah sesuai opsi |
| UI-11 | Pilih produk | Jumlah pilihan pada header diperbarui |
| UI-12 | Tambah kuantitas di drawer | Kuantitas dan subtotal diperbarui |
| UI-13 | Kurangi kuantitas hingga nol | Item dihapus dari drawer |
| UI-14 | Isi nama dan catatan pesanan | Nilai input dapat digunakan dalam pesan WhatsApp |
| UI-15 | Klik Kirim via WhatsApp | Browser membuka tautan WhatsApp dengan pesan yang disusun |
| UI-16 | Klik Tambah Produk | Modal form tambah terbuka |
| UI-17 | Klik Edit | Modal terbuka dengan data produk terkait |
| UI-18 | Klik Batal atau `×` | Modal tertutup tanpa menyimpan perubahan |
| UI-19 | Pilih/seret file gambar | Preview gambar tampil pada area foto |
| UI-20 | Simpan form valid | Modal tertutup dan data produk diperbarui pada UI |
| UI-21 | Simpan form tidak valid | Pesan validasi tampil dan data tidak disimpan |
| UI-22 | Klik Delete | Konfirmasi penghapusan tampil |
| UI-23 | Konfirmasi Delete | Produk hilang dari tabel dan katalog |
| UI-24 | Klik Reset | Konfirmasi reset tampil sebelum data dikembalikan |
| UI-25 | Konfirmasi Reset | Data produk kembali ke data default |
| UI-26 | Lebar layar 960px atau kurang | Hero satu kolom dan katalog dua kolom |
| UI-27 | Lebar layar 700px atau kurang | Galeri satu kolom |
| UI-28 | Lebar layar 600px atau kurang | Link navigasi tersembunyi dan statistik satu kolom |
| UI-29 | Lebar layar 520px atau kurang | Form modal satu kolom |
| UI-30 | Buka tombol WhatsApp mengambang | Tautan WhatsApp terbuka |

## 18. Aturan Pemeliharaan Dokumen

1. Perubahan struktur halaman harus memperbarui Bagian 2 dan bagian komponen terkait.
2. Perubahan warna, tipografi, radius, atau gaya komponen harus memperbarui Bagian 1.
3. Perubahan breakpoint harus memperbarui Bagian 13 dan kriteria pemeriksaan terkait.
4. Perubahan label, selector, atau susunan form harus memperbarui Bagian 10 dan Bagian 15.
5. Fitur baru tidak boleh dianggap bagian dari UI saat ini sebelum tersedia di `index.html`.
6. Hindari menuliskan perilaku yang belum diimplementasikan sebagai fakta UI.
7. Jika UI-SPEC dan HTML berbeda, catat perbedaannya lalu perbarui dokumen agar sesuai implementasi yang disepakati.

---

**Dokumen:** `UI-SPEC.md`  
**Acuan implementasi:** `index.html`  
**Jenis spesifikasi:** User Interface Specification  
