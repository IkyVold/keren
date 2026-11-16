# Da Bronx — Spesifikasi Aplikasi Web

**Project Type:** Web Application  
**Version:** 1.1.0 (Prototype)  
**Tech Stack:** HTML5, CSS3, Vanilla JavaScript  
**Storage:** Browser LocalStorage dan state JavaScript sementara  
**Architecture:** Client-Side Application  
**Status:** UI Prototype / Demonstration

---

## 1. Project Overview

### 1.1 Deskripsi Aplikasi

Da Bronx merupakan prototipe aplikasi web satu halaman dengan tema katalog produk dan dashboard pengelola. Aplikasi menyediakan bagian beranda, katalog, galeri, keranjang pilihan, integrasi tautan WhatsApp, serta dashboard inventori.

Pengunjung dapat mencari dan memfilter produk, mengurutkan hasil, memilih produk, mengatur kuantitas, mengisi nama dan catatan, kemudian membuka WhatsApp dengan pesan yang telah disiapkan.

Dashboard menyediakan ringkasan inventori serta fungsi tambah, edit, hapus, dan reset data produk. Data produk disimpan pada `localStorage` browser.

**Batasan demo:** Konten produk dan identitas merek ditampilkan untuk keperluan demonstrasi antarmuka. Aplikasi ini bukan sistem transaksi, pembayaran, atau pengelolaan penjualan nyata. Tidak tersedia autentikasi maupun otorisasi; dashboard dapat diakses melalui halaman yang sama.

### 1.2 Tujuan Aplikasi

- Menyediakan halaman beranda dan navigasi ke bagian aplikasi.
- Menampilkan katalog produk beserta informasi produk.
- Menyediakan pencarian, filter kategori, dan pengurutan.
- Menyediakan pemilihan produk dan pengaturan kuantitas.
- Membuat pesan pilihan produk untuk dibuka melalui WhatsApp.
- Menyediakan galeri visual.
- Menampilkan ringkasan inventori.
- Menyediakan pengelolaan data produk melalui dashboard.
- Menyimpan perubahan data produk pada browser.

---

## 2. Target Pengguna dan Hak Akses

Aplikasi tidak menerapkan sistem akun atau pembagian hak akses secara teknis. Istilah berikut menjelaskan penggunaan antarmuka, bukan role yang dilindungi autentikasi.

### 2.1 Pengunjung

Pengunjung dapat:

- Membuka beranda, katalog, dan galeri.
- Mencari produk berdasarkan nama atau deskripsi.
- Memfilter produk berdasarkan kategori.
- Mengurutkan produk berdasarkan nama atau harga.
- Melihat harga, stok, deskripsi, dan label unggulan.
- Memilih produk ke keranjang.
- Menambah atau mengurangi kuantitas pilihan.
- Mengisi nama dan catatan opsional.
- Membuka tautan WhatsApp dari kartu produk atau keranjang.

### 2.2 Pengelola Antarmuka

Pengguna dashboard dapat:

- Melihat total produk, total stok, dan total kategori.
- Melihat tabel inventori.
- Menambahkan produk.
- Mengedit produk.
- Menghapus produk setelah konfirmasi.
- Mengunggah atau menghapus foto produk.
- Mengembalikan data ke data awal melalui tombol Reset.

**Batasan akses:** Dashboard tidak dilindungi login. Siapa pun yang dapat membuka halaman dapat menggunakan fungsi pengelolaan produk pada browser tersebut.

---

## 3. Struktur Halaman dan Antarmuka

Aplikasi menggunakan satu halaman dengan navigasi anchor.

### 3.1 Header dan Navigasi

Header berisi:

- Logo Da Bronx yang mengarah ke beranda.
- Navigasi Home, Arsenal, Galeri, dan Dashboard.
- Tombol Pilihan yang membuka drawer keranjang dan menampilkan jumlah kuantitas pilihan.

Pada layar dengan lebar maksimum 600 px, tautan navigasi disembunyikan oleh CSS.

### 3.2 Beranda (Hero)

Bagian beranda menampilkan:

- Identitas dan tagline aplikasi.
- Deskripsi singkat.
- Tombol Lihat Arsenal menuju katalog.
- Tombol Dashboard menuju dashboard.
- Efek visual berupa partikel, pencahayaan, dan elemen dekoratif.

### 3.3 Ticker

Ticker menampilkan teks identitas dan tema aplikasi secara bergerak. Animasi berhenti sementara ketika pointer berada di atas ticker.

### 3.4 Katalog Produk

Katalog menampilkan kartu produk yang dirender dari array data produk. Setiap kartu dapat menampilkan:

- Foto produk jika tersedia, atau ilustrasi SVG pengganti.
- Nama dan kategori.
- Deskripsi.
- Harga dalam USD.
- Informasi stok.
- Label unggulan jika `feat` bernilai `true`.
- Checkbox pemilihan produk.
- Tombol Tambah.
- Tautan Pesan via WhatsApp.

Produk dengan stok nol tidak dapat dipilih atau ditambahkan melalui kontrol kartu. Tautan WhatsApp per produk juga diganti dengan tombol nonaktif berlabel Stok Habis.

### 3.5 Galeri

Galeri menampilkan dua gambar visual yang disematkan langsung di HTML dalam format Base64:

1. Street Style.
2. O Block Energy.

Setiap gambar memiliki teks judul dan deskripsi.

### 3.6 Dashboard

Dashboard menampilkan:

**Statistik**
- Total Produk.
- Total Stok.
- Total Kategori.

**Tabel inventori**
- Produk.
- Kategori.
- Harga.
- Stok.
- Status.
- Aksi Edit dan Hapus.

Dashboard juga menyediakan tombol Reset dan Tambah Produk.

### 3.7 Drawer Keranjang

Drawer menampilkan:

- Daftar produk yang dipilih.
- Kontrol pengurangan dan penambahan kuantitas.
- Subtotal setiap produk.
- Total seluruh pilihan.
- Input nama pelanggan.
- Input catatan opsional.
- Tautan Kirim via WhatsApp.

Drawer dapat dibuka dan ditutup melalui tombol navigasi, tombol promosi, tombol penutup, dan overlay.

### 3.8 Modal Produk

Modal digunakan untuk menambah atau mengedit produk. Formulir berisi:

- Foto produk.
- Nama produk.
- Kategori.
- Harga dalam USD.
- Stok.
- Status unggulan.
- Deskripsi.
- Area pesan validasi.
- Tombol Batal dan Simpan.

Foto dapat dipilih melalui file picker atau drag-and-drop.

---

## 4. Scope dan Spesifikasi Fitur

### 4.1 Product Catalog

- Data katalog dibaca dari variabel `products`.
- Data awal terdiri dari 8 produk.
- Kartu dirender secara dinamis ke elemen `#grid`.
- Jumlah hasil ditampilkan pada `#countLabel`.
- Foto menggunakan properti `img` jika tersedia.
- Jika `img` tidak tersedia, aplikasi menampilkan ilustrasi SVG pengganti.
- Label unggulan ditampilkan jika `feat === true`.
- Produk dengan `stock <= 0` tidak dapat dipilih atau ditambahkan melalui kartu.

### 4.2 Search

Pencarian menggunakan input `#q`.

**Aturan pencarian:**

- Pencarian memeriksa properti `name` dan `desc`.
- Pencarian tidak membedakan huruf kapital dan nonkapital.
- Spasi di awal dan akhir kata kunci dihapus.
- Pencarian menggunakan pencocokan substring (`includes`), bukan pencarian fuzzy.
- Kata kunci kosong tidak membatasi hasil pencarian.
- Pencarian berjalan bersama filter kategori dan sorting.
- Jika tidak ada hasil, aplikasi menampilkan pesan Produk Tidak Ditemukan dan tombol Reset Filter.

**Perilaku input khusus:**

- Input kosong atau hanya berisi spasi diperlakukan sebagai pencarian kosong.
- Typo tidak diperbaiki secara otomatis.
- Karakter khusus diperlakukan sebagai bagian dari kata kunci pencarian biasa.
- Tidak ada batas maksimum jumlah hasil pencarian yang ditetapkan oleh logika aplikasi.

### 4.3 Category Filter

Filter menggunakan elemen `#cat`.

- Pilihan awal adalah Semua Kategori.
- Daftar kategori dibuat dari nilai unik properti `cat` pada data produk.
- Kategori diurutkan secara alfabetis saat opsi diperbarui.
- Pencocokan kategori tidak membedakan huruf kapital.
- Produk hanya ditampilkan jika kategori produk sama dengan kategori terpilih.
- Filter kategori dapat digunakan bersamaan dengan pencarian.
- Jika kategori yang sebelumnya dipilih sudah tidak tersedia pada data produk, pilihan kembali ke Semua Kategori.

Kategori pada data awal:

- Pistol
- Tactical Pistol
- Rifle

Kategori dapat bertambah atau berubah melalui pengelolaan produk.

### 4.4 Sorting

Sorting menggunakan elemen `#sort`.

Pilihan yang tersedia:

| Value | Aturan |
|---|---|
| Kosong | Urutan data saat ini |
| `name` | Nama A–Z |
| `low` | Harga terendah ke tertinggi |
| `high` | Harga tertinggi ke terendah |

Sorting diterapkan pada hasil filter. Fungsi `filterProducts` membuat array hasil filter baru sehingga array produk utama tidak diubah oleh proses sorting.

Tidak ada aturan tie-breaker tambahan yang ditetapkan secara eksplisit untuk produk dengan nilai sorting yang sama.

### 4.5 Featured Product

- Status unggulan disimpan pada properti boolean `feat`.
- `feat: true` menampilkan label ★ UNGGULAN.
- `feat: false` atau nilai falsy tidak menampilkan label.
- Status dapat diubah melalui checkbox Tandai Unggulan pada modal produk.

### 4.6 Cart / Product Selection

State keranjang disimpan dalam objek JavaScript `cart` dengan format:

`{ productId: quantity }`

Fitur:

- Checkbox pada kartu memilih atau membatalkan pilihan produk.
- Tombol Tambah menambah kuantitas satu.
- Tombol kuantitas pada drawer menambah atau mengurangi jumlah.
- Kuantitas yang mencapai nol menghapus produk dari keranjang.
- Subtotal dihitung dari harga dikalikan kuantitas.
- Total dihitung dari seluruh subtotal.
- Jumlah pada tombol Pilihan merupakan total kuantitas, bukan jumlah jenis produk.
- Perubahan keranjang memperbarui tampilan katalog dan drawer.
- Keranjang tidak disimpan di LocalStorage.
- Keranjang kembali kosong ketika halaman dimuat ulang.

**Catatan implementasi:** Stok nol menonaktifkan pemilihan dan penambahan melalui kartu katalog. Kontrol tambah kuantitas di drawer tidak menerapkan batas maksimum berdasarkan stok.

### 4.7 WhatsApp Integration

Aplikasi menggunakan tautan eksternal `https://wa.me/`.

Konfigurasi nomor berada pada variabel:

`WHATSAPP_NUMBER`

Nilai saat ini pada HTML adalah nomor contoh:

`6281234567890`

Nomor harus diganti dengan nomor tujuan yang benar sebelum demo diarahkan ke kontak sebenarnya.

**Tautan dari kartu produk:**

- Membuat pesan untuk satu produk.
- Mencantumkan nama produk, harga, dan jumlah satu.
- Fungsi `normalizeInternationalNumber` memeriksa format nomor dan menghasilkan digit internasional.
- Pesan diubah menggunakan `encodeURIComponent`.
- Jika nomor tidak valid, tombol ditampilkan dalam keadaan nonaktif.

**Tautan dari drawer keranjang:**

- Membuat ringkasan seluruh produk yang dipilih.
- Mencantumkan nama, kuantitas, subtotal, dan total.
- Menambahkan nama jika diisi.
- Menambahkan catatan jika diisi.
- Pesan di-encode menggunakan `encodeURIComponent`.
- Tautan dibuka pada tab atau aplikasi WhatsApp melalui browser.

Tautan WhatsApp mengarahkan pengguna ke layanan eksternal. HTML tidak mengirim pesan secara otomatis dan tidak menggunakan WhatsApp Business API.

### 4.8 Dashboard dan Statistik

Statistik dihitung langsung dari array `products`:

- Total Produk: `products.length`.
- Total Stok: jumlah seluruh nilai `stock`.
- Total Kategori: jumlah kategori unik dari properti `cat`.

Tabel inventori menampilkan seluruh produk yang ada pada data saat dashboard dirender, bukan hanya hasil pencarian katalog.

Status ketersediaan:

- Tersedia jika stok lebih dari nol.
- Habis jika stok sama dengan atau kurang dari nol.

### 4.9 CRUD Produk

Fungsi pengelolaan produk sudah diimplementasikan pada HTML.

**Create**
- Tombol Tambah Produk membuka modal kosong.
- Nama dan kategori wajib diisi.
- Harga dan stok harus berupa nilai yang dapat diproses dan tidak boleh negatif.
- ID produk baru dibuat dari ID maksimum saat ini ditambah satu.
- Produk baru ditambahkan ke array `products`.

**Read**
- Data produk digunakan untuk katalog, statistik, dan tabel inventori.

**Update**
- Tombol Edit membuka modal dengan data produk yang dipilih.
- Perubahan diterapkan pada objek produk berdasarkan ID.
- Setelah disimpan, dashboard dan katalog diperbarui.

**Delete**
- Tombol Hapus meminta konfirmasi browser.
- Jika dikonfirmasi, produk dihapus dari array.
- Produk yang sama juga dihapus dari keranjang jika sedang dipilih.
- Dashboard dan katalog diperbarui.

**Reset**
- Tombol Reset meminta konfirmasi.
- Jika dikonfirmasi, data produk dikembalikan ke `DEFAULTS`.
- Keranjang dikosongkan.
- Perubahan sebelumnya pada data produk akan hilang.

### 4.10 Product Image Upload

- Input file menerima gambar (`image/*`).
- Pengguna dapat memilih file atau melakukan drag-and-drop.
- File dibaca menggunakan `FileReader`.
- Gambar diproses menggunakan elemen `Image` dan `canvas`.
- Dimensi maksimum sisi gambar adalah 700 px; rasio aspek dipertahankan.
- Hasil dikonversi menjadi JPEG dengan kualitas `0.82`.
- Hasil disimpan sebagai Data URL pada properti `img`.
- Foto dapat dihapus dari modal sebelum disimpan.
- Jika file bukan gambar atau gagal dibaca/dimuat, pesan kesalahan ditampilkan.

### 4.11 Reset dan Notifikasi

- Operasi tambah, edit, hapus, dan reset menampilkan toast.
- Operasi hapus dan reset memerlukan konfirmasi browser.
- Kesalahan validasi form ditampilkan pada area `#pErr`.
- Modal dapat ditutup melalui tombol tutup, tombol Batal, klik overlay, atau tombol Escape.

---

## 5. Data Model

### 5.1 Product Entity

| Field | Tipe | Keterangan |
|---|---|---|
| `id` | Number | Identitas unik produk pada data aplikasi |
| `name` | String | Nama produk |
| `cat` | String | Kategori produk |
| `price` | Number | Harga dalam USD |
| `stock` | Integer | Jumlah stok |
| `desc` | String | Deskripsi produk |
| `feat` | Boolean | Status produk unggulan |
| `img` | String / optional | Data URL gambar hasil pemrosesan upload |

Properti `img` tidak wajib ada pada data awal. Jika tidak tersedia, kartu menggunakan ilustrasi SVG.

### 5.2 Initial Sample Products

Data awal pada konstanta `DEFAULTS`:

| ID | Nama Produk | Kategori | Harga | Stok | Unggulan |
|---:|---|---|---:|---:|---|
| 1 | Glock 19 Gen5 | Pistol | $650 | 15 | Ya |
| 2 | Glock 17 | Pistol | $620 | 20 | Ya |
| 3 | Draco AK Pistol | Tactical Pistol | $780 | 8 | Ya |
| 4 | M4A1 Carbine | Rifle | $1,450 | 6 | Ya |
| 5 | AR-15 Tactical | Rifle | $1,100 | 10 | Tidak |
| 6 | Desert Eagle .50 | Pistol | $1,890 | 4 | Tidak |
| 7 | Beretta M9 | Pistol | $700 | 12 | Tidak |
| 8 | Colt 1911 | Pistol | $950 | 9 | Tidak |

Data di atas adalah data default. Setelah data disimpan di browser, katalog dapat menampilkan data hasil perubahan pengguna, bukan selalu delapan data awal.

### 5.3 Storage Structure

| Data | Lokasi | Persistensi |
|---|---|---|
| Data produk | `localStorage` dengan key `dabronx_products_v1` | Tersimpan pada browser |
| Data default | Konstanta `DEFAULTS` | Tersedia di kode |
| Keranjang | Objek JavaScript `cart` | Sementara selama halaman berjalan |
| Nomor WhatsApp | Variabel `WHATSAPP_NUMBER` | Konfigurasi di kode |
| Foto produk | Properti `img` pada data produk | Disimpan sebagai bagian data produk di LocalStorage |

Saat aplikasi dimuat:

1. Fungsi `loadProducts()` mencoba membaca key `dabronx_products_v1`.
2. Jika data tersedia dan berbentuk array, data tersebut digunakan.
3. Jika data tidak tersedia atau gagal dibaca, aplikasi menggunakan salinan `DEFAULTS`.

Saat produk ditambah, diedit, dihapus, atau di-reset, fungsi `saveProducts()` mencoba menyimpan array produk ke LocalStorage. Jika penyimpanan gagal, aplikasi memberi notifikasi bahwa perubahan hanya bersifat sementara.

---

## 6. Aturan Validasi Data

Validasi berikut mengikuti atribut input dan logika submit pada `index.html`.

| Field | Aturan pada antarmuka / kode |
|---|---|
| Nama | Wajib diisi setelah trim; maksimum 60 karakter pada input |
| Kategori | Wajib diisi setelah trim; maksimum 30 karakter pada input |
| Harga | Harus dapat diproses sebagai angka dan tidak boleh negatif; input memiliki `min=0` dan `step=1` |
| Stok | Harus dapat diproses sebagai integer dan tidak boleh negatif; input memiliki `min=0` dan `step=1` |
| Deskripsi | Opsional; maksimum 160 karakter pada textarea |
| Foto | Opsional; file harus dapat diproses sebagai gambar |
| Unggulan | Checkbox boolean |

Pesan validasi yang diterapkan:

- `Nama produk wajib diisi.`
- `Kategori wajib diisi.`
- `Harga tidak valid.`
- `Stok tidak valid.`

**Catatan:** Form menggunakan `novalidate`, sehingga pemeriksaan utama dilakukan oleh JavaScript saat submit. Kode harga menggunakan `parseFloat`, sedangkan stok menggunakan `parseInt`.

---

## 7. Non-Functional Requirements

### 7.1 Technology and Runtime

- Menggunakan HTML5, CSS3, dan Vanilla JavaScript.
- Tidak menggunakan React, Vue, atau framework frontend.
- Tidak membutuhkan backend API untuk fungsi yang tersedia.
- Dapat dijalankan sebagai halaman web statis melalui browser.
- Menggunakan Google Fonts melalui `@import`.
- WhatsApp memerlukan koneksi internet untuk membuka layanan eksternal.

### 7.2 Responsive Design

CSS menyediakan penyesuaian layout pada beberapa breakpoint:

- Maksimum 960 px: katalog menjadi dua kolom dan layout hero menjadi satu kolom.
- Maksimum 700 px: gambar galeri menjadi satu kolom; beberapa efek dekoratif disembunyikan.
- Maksimum 600 px: navigasi desktop disembunyikan, statistik menjadi satu kolom, dan ukuran beberapa elemen disesuaikan.
- Maksimum 520 px: form modal menjadi satu kolom.

Target penggunaan meliputi desktop, tablet, dan smartphone.

### 7.3 Usability

- Navigasi menggunakan tautan anchor ke bagian halaman.
- Kontrol pencarian, kategori, dan sorting tersedia di atas katalog.
- Jumlah hasil pencarian ditampilkan.
- Pesan hasil kosong menyediakan tombol Reset Filter.
- Keranjang menampilkan kuantitas dan total pilihan.
- Form tambah/edit menampilkan pesan validasi.
- Operasi hapus dan reset meminta konfirmasi.
- Toast digunakan sebagai umpan balik operasi.

### 7.4 Data Persistence

- Data produk disimpan pada LocalStorage browser.
- Data keranjang tidak disimpan secara permanen.
- Data produk tersimpan per browser dan origin; tidak disinkronkan antarperangkat.
- Menghapus data situs atau menggunakan browser/perangkat lain dapat membuat data tersimpan tidak tersedia.
- Jika LocalStorage gagal digunakan, perubahan produk hanya tersedia sementara selama halaman berjalan.

### 7.5 Security and Access Limitations

- Tidak tersedia autentikasi atau otorisasi.
- Dashboard dan fungsi CRUD dapat diakses dari halaman yang sama.
- Data produk disimpan di sisi klien, bukan pada server.
- Nomor WhatsApp berada di dalam JavaScript dan dapat dilihat melalui source halaman.
- Tidak ada sistem pembayaran atau pemrosesan transaksi.
- Tautan WhatsApp merupakan navigasi ke layanan eksternal.
- Aplikasi tidak menyediakan perlindungan data atau kontrol akses berbasis pengguna.

### 7.6 Performance

- Pencarian, filter, sorting, dan rendering dilakukan di browser.
- Data produk awal berjumlah delapan item.
- Foto upload diperkecil sebelum disimpan.
- Tidak ada target waktu respons atau benchmark performa yang ditetapkan pada implementasi saat ini.

### 7.7 Maintainability

- HTML, CSS, dan JavaScript saat ini berada dalam satu file `index.html`.
- Logika `Products` dan `Store` ditulis dengan pola UMD di dalam script.
- Fungsi pencarian, filter, sorting, rendering, keranjang, WhatsApp, dan CRUD dipisahkan berdasarkan tanggung jawab.
- Data default dikelompokkan dalam konstanta `DEFAULTS`.
- Nama key penyimpanan menggunakan konstanta `STORE_KEY`.

---

## 8. Application Architecture

### 8.1 Technology Stack

| Teknologi | Penggunaan |
|---|---|
| HTML5 | Struktur halaman dan komponen antarmuka |
| CSS3 | Styling, animasi, dan responsive layout |
| Vanilla JavaScript | Interaksi dan logika aplikasi |
| LocalStorage | Penyimpanan data produk pada browser |
| WhatsApp URL (`wa.me`) | Membuka pesan yang telah disiapkan |
| SVG | Ilustrasi pengganti gambar produk |
| Base64 Data URL | Penyimpanan gambar galeri dan foto produk hasil upload |
| Canvas API | Mengubah ukuran dan mengompres foto upload |
| Google Fonts | Font Inter dan Oswald |

### 8.2 Application Structure

Prototipe menggunakan satu file utama:

```text
da-bronx/
├── index.html
└── SPEC.md
```

File `index.html` memuat:

- Struktur HTML halaman.
- CSS di dalam tag `<style>`.
- Konfigurasi nomor WhatsApp.
- Modul `Products`.
- Modul `Store`.
- Data default produk.
- Proses pembacaan dan penyimpanan LocalStorage.
- Fungsi pencarian, filter, dan sorting.
- Rendering katalog dan dashboard.
- Pengelolaan keranjang.
- Pembuatan tautan WhatsApp.
- CRUD produk.
- Upload dan pemrosesan gambar.
- Efek visual dan animasi.

`catatan.md` merupakan dokumen pendukung penyusunan spesifikasi dan bukan dependensi runtime aplikasi.

---

## 9. User Flow

### 9.1 Visitor Flow — Katalog

1. Pengunjung membuka halaman.
2. Aplikasi membaca data produk dari LocalStorage atau menggunakan data default.
3. Aplikasi menampilkan beranda.
4. Pengunjung menuju katalog.
5. Pengunjung mencari produk, memilih kategori, atau mengurutkan hasil.
6. Aplikasi memperbarui kartu dan jumlah hasil.
7. Pengunjung memilih produk melalui checkbox atau tombol Tambah.
8. Aplikasi memperbarui keranjang.
9. Pengunjung membuka drawer Pilihan.
10. Pengunjung mengubah kuantitas jika diperlukan.
11. Pengunjung mengisi nama atau catatan opsional.
12. Pengunjung membuka tautan WhatsApp.
13. WhatsApp menampilkan pesan yang telah disiapkan untuk ditinjau dan dikirim oleh pengguna.

### 9.2 Product Management Flow

1. Pengguna menuju Dashboard Pengelola.
2. Aplikasi menampilkan statistik dan tabel inventori.
3. Pengguna memilih Tambah Produk atau Edit.
4. Modal produk ditampilkan.
5. Pengguna mengisi data dan, jika diperlukan, memilih foto.
6. Pengguna menekan Simpan.
7. JavaScript memvalidasi input.
8. Jika valid, array produk diperbarui.
9. Aplikasi mencoba menyimpan data ke LocalStorage.
10. Dashboard dan katalog dirender ulang.

### 9.3 Delete Flow

1. Pengguna menekan Hapus pada baris produk.
2. Browser menampilkan dialog konfirmasi.
3. Jika pengguna membatalkan, data tidak berubah.
4. Jika pengguna mengonfirmasi, produk dihapus dari array dan keranjang.
5. Aplikasi menyimpan perubahan dan memperbarui tampilan.

### 9.4 Reset Flow

1. Pengguna menekan Reset.
2. Browser menampilkan dialog konfirmasi.
3. Jika dibatalkan, data tidak berubah.
4. Jika dikonfirmasi, produk dikembalikan ke `DEFAULTS` dan keranjang dikosongkan.
5. Aplikasi mencoba menyimpan data awal dan memperbarui tampilan.

---

## 10. Acceptance Criteria

Kriteria berikut dapat diuji secara manual pada implementasi saat ini.

| ID | Skenario Uji | Expected Result |
|---|---|---|
| AC-01 | Membuka `index.html` | Halaman Da Bronx ditampilkan |
| AC-02 | Membuka halaman dengan LocalStorage kosong | Data katalog menggunakan 8 produk default |
| AC-03 | Membuka halaman dengan data produk valid di LocalStorage | Data katalog menggunakan data tersimpan |
| AC-04 | Mencari nama produk dengan huruf kecil/besar berbeda | Produk yang cocok tetap ditemukan |
| AC-05 | Mencari kata yang terdapat pada deskripsi | Produk dengan deskripsi yang mengandung kata tersebut ditemukan |
| AC-06 | Mengosongkan input pencarian | Hasil tidak dibatasi oleh kata kunci |
| AC-07 | Mencari kata yang tidak terdapat pada nama/deskripsi | Pesan Produk Tidak Ditemukan ditampilkan jika tidak ada hasil lain yang cocok |
| AC-08 | Memilih kategori tertentu | Hanya produk dengan kategori tersebut yang tampil |
| AC-09 | Menggunakan pencarian dan kategori bersamaan | Hasil memenuhi kedua kondisi |
| AC-10 | Memilih sorting Nama A–Z | Hasil diurutkan berdasarkan nama |
| AC-11 | Memilih sorting Harga Terendah | Harga diurutkan dari rendah ke tinggi |
| AC-12 | Memilih sorting Harga Tertinggi | Harga diurutkan dari tinggi ke rendah |
| AC-13 | Memilih produk yang stoknya lebih dari nol | Produk dapat masuk ke keranjang |
| AC-14 | Memeriksa produk dengan stok nol | Checkbox dan tombol Tambah nonaktif |
| AC-15 | Menambah kuantitas di drawer | Kuantitas dan total diperbarui |
| AC-16 | Mengurangi kuantitas sampai nol | Produk dihapus dari keranjang |
| AC-17 | Memilih beberapa produk | Total dihitung dari seluruh subtotal |
| AC-18 | Mengisi nama dan catatan | Informasi tersebut dimasukkan ke pesan WhatsApp |
| AC-19 | Membuka tautan WhatsApp keranjang | URL WhatsApp berisi ringkasan pilihan yang telah di-encode |
| AC-20 | Membuka tautan WhatsApp pada kartu produk | URL berisi nama produk, harga, dan jumlah satu |
| AC-21 | Membuka dashboard | Statistik dan tabel inventori ditampilkan |
| AC-22 | Menambah produk dengan data valid | Produk baru tampil pada katalog dan dashboard |
| AC-23 | Menyimpan produk tanpa nama | Pesan Nama produk wajib diisi ditampilkan |
| AC-24 | Menyimpan produk tanpa kategori | Pesan Kategori wajib diisi ditampilkan |
| AC-25 | Menyimpan harga atau stok negatif | Pesan validasi yang sesuai ditampilkan |
| AC-26 | Mengedit produk | Data produk diperbarui pada katalog dan dashboard |
| AC-27 | Menghapus produk dan mengonfirmasi | Produk dihapus dari katalog, dashboard, dan keranjang |
| AC-28 | Menghapus produk dan membatalkan konfirmasi | Data produk tidak berubah |
| AC-29 | Mengunggah file gambar yang valid | Preview gambar ditampilkan dan dapat disimpan |
| AC-30 | Mengunggah file yang bukan gambar | Pesan kesalahan file ditampilkan |
| AC-31 | Memilih Hapus foto pada modal | Preview foto dihapus |
| AC-32 | Menekan Reset dan mengonfirmasi | Data kembali ke 8 produk default dan keranjang kosong |
| AC-33 | Menekan Reset lalu membatalkan | Data tidak berubah |
| AC-34 | Memuat ulang halaman setelah perubahan produk berhasil disimpan | Data produk tetap tersedia melalui LocalStorage |
| AC-35 | Memuat ulang halaman setelah memilih produk | Keranjang kembali kosong |
| AC-36 | Mengubah lebar viewport | Layout menyesuaikan breakpoint CSS |

---

## 11. Known Limitations

Batasan yang terlihat pada implementasi saat ini:

- Tidak ada autentikasi dan otorisasi dashboard.
- Tidak ada backend, database server, atau sinkronisasi antarperangkat.
- Keranjang tidak bertahan setelah halaman dimuat ulang.
- Data LocalStorage hanya tersedia pada browser dan origin terkait.
- Kapasitas LocalStorage terbatas; foto disimpan sebagai Data URL sehingga dapat mempercepat tercapainya batas penyimpanan.
- Jika penyimpanan gagal, perubahan produk hanya bersifat sementara.
- Tidak ada batas kuantitas keranjang berdasarkan stok pada kontrol tambah kuantitas drawer.
- Pencarian menggunakan substring dan tidak memiliki koreksi typo atau pencarian fuzzy.
- Tidak ada batas maksimum hasil pencarian.
- Tidak ada target benchmark performa yang ditetapkan.
- Nomor WhatsApp masih berupa nilai contoh dan harus dikonfigurasi.
- Tautan WhatsApp tidak mengirim pesan secara otomatis.
- Tidak ada WhatsApp Business API.
- Tidak ada payment gateway, pembayaran, atau pemrosesan transaksi.
- Dashboard dapat diakses oleh pengunjung karena tidak ada sistem login.

---

## 12. Out of Scope

Fitur berikut tidak tersedia pada implementasi saat ini:

- Backend API.
- Database MySQL, PostgreSQL, atau database server lainnya.
- Sistem autentikasi dan otorisasi.
- Role-based access control.
- Multi-user dan sinkronisasi data.
- Keranjang persisten.
- Pengelolaan pesanan.
- Payment gateway dan pemrosesan pembayaran.
- WhatsApp Business API.
- Laporan penjualan.
- Riwayat transaksi.
- Deployment dan konfigurasi production.
- Pencarian fuzzy, koreksi typo, dan pemeringkatan relevansi.
- Filter harga.
- Sistem rekomendasi produk.

---

## 13. Future Development

Pengembangan berikutnya dapat dipertimbangkan, tetapi belum menjadi bagian dari implementasi saat ini:

- Memisahkan HTML, CSS, dan JavaScript ke file terpisah.
- Memindahkan penyimpanan data ke backend dan database.
- Menambahkan autentikasi serta otorisasi dashboard.
- Menambahkan batas kuantitas keranjang berdasarkan stok.
- Menambahkan validasi dan penanganan kegagalan penyimpanan yang lebih lengkap.
- Mengoptimalkan penyimpanan foto produk.
- Menambahkan pengujian otomatis untuk fungsi pencarian, filter, sorting, keranjang, dan CRUD.
- Menetapkan target performa setelah ukuran dataset dan lingkungan pengujian ditentukan.

---

## 14. Source of Truth

Jika terdapat perbedaan antara dokumen spesifikasi dan implementasi, `index.html` merupakan acuan perilaku aplikasi yang saat ini berjalan. Perubahan fitur pada kode harus diikuti dengan pembaruan dokumen ini agar spesifikasi dan implementasi tetap konsisten.

Dokumen ini menjelaskan prototipe sebagaimana diimplementasikan, bukan menjanjikan fitur yang belum tersedia.
