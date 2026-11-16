/**
 * Konfigurasi toko dan data awal produk.
 * WHATSAPP_NUMBER: nomor pemilik, format internasional tanpa "+" (contoh Indonesia: 62812xxxxxxx).
 * GANTI dengan nomor asli sebelum dipakai.
 */
export const WHATSAPP_NUMBER = "6281234567890";
export const STORE_KEY = "dabronx_products_v1";
export const BACKUP_KEY = "dabronx_products_v1:corrupt-backup"; // salinan data rusak sebelum dipulihkan

/** sellerId merujuk id akun seller di auth.js (SEED_USERS). Produk tanpa sellerId dikelola admin. */
export const DEFAULTS = [
  { id: 1, sellerId: 2, name: "Glock 19 Gen5", cat: "Pistol", price: 650, stock: 15, desc: "Pistol kompak 9mm, populer di kalangan penegak hukum.", feat: true },
  { id: 2, sellerId: 2, name: "Glock 17", cat: "Pistol", price: 620, stock: 20, desc: "Pistol full-size 9mm, standar banyak institusi.", feat: true },
  { id: 3, sellerId: 2, name: "Draco AK Pistol", cat: "Tactical Pistol", price: 780, stock: 8, desc: "Pistol gaya AK berlaras pendek, ikonik di budaya populer.", feat: true },
  { id: 4, sellerId: 2, name: "M4A1 Carbine", cat: "Rifle", price: 1450, stock: 6, desc: "Karabin standar militer AS, ringan dan modular.", feat: true },
  { id: 5, sellerId: 3, name: "AR-15 Tactical", cat: "Rifle", price: 1100, stock: 10, desc: "Senapan semi-otomatis modular populer.", feat: false },
  { id: 6, sellerId: 3, name: "Desert Eagle .50", cat: "Pistol", price: 1890, stock: 4, desc: "Pistol gas-operated berukuran besar yang sangat dikenal.", feat: false },
  { id: 7, sellerId: 3, name: "Beretta M9", cat: "Pistol", price: 700, stock: 12, desc: "Pistol dinas militer AS selama beberapa dekade.", feat: false },
  { id: 8, sellerId: 3, name: "Colt 1911", cat: "Pistol", price: 950, stock: 9, desc: "Pistol klasik Amerika dengan sejarah panjang.", feat: false },
];

export const cloneDefaults = () => JSON.parse(JSON.stringify(DEFAULTS));
