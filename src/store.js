import { STORE_KEY, cloneDefaults } from "./products.js";

/* ===== Fungsi murni: pencarian, filter, sorting, WhatsApp (tidak mengubah input) ===== */
const norm = (v) => String(v ?? "").trim().toLowerCase();

export function filterProducts(products, { query = "", kategori = "", sort = "" } = {}) {
  const q = norm(query);
  const cat = norm(kategori);
  let list = (products || []).filter((p) => {
    const matchQ = !q || norm(p.name).includes(q) || norm(p.desc).includes(q);
    const matchC = !cat || norm(p.cat) === cat;
    return matchQ && matchC;
  });
  if (sort === "name") list = list.sort((a, b) => String(a.name).localeCompare(String(b.name), undefined, { sensitivity: "base" }));
  else if (sort === "low") list = list.sort((a, b) => a.price - b.price);
  else if (sort === "high") list = list.sort((a, b) => b.price - a.price);
  return list; // filter() sudah membuat array baru, jadi input tidak termutasi
}

/** Nomor internasional: opsional "+", spasi/strip/kurung diabaikan, 8-15 digit, tidak diawali 0. Mengembalikan digit atau melempar Error. */
export function normalizeInternationalNumber(nomor) {
  const raw = String(nomor ?? "").trim();
  if (!/^\+?[\d\s\-().]+$/.test(raw)) throw new Error("Nomor WhatsApp tidak valid: hanya angka yang diperbolehkan.");
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0")) throw new Error("Nomor harus format internasional (mis. 62812..., bukan 0812...).");
  if (digits.length < 8 || digits.length > 15) throw new Error("Nomor harus 8-15 digit.");
  return digits;
}

/** URL wa.me untuk satu produk; pesan di-encode dengan encodeURIComponent. */
export function buildWhatsAppUrl(nomor, produk) {
  const number = normalizeInternationalNumber(nomor);
  if (!produk || !produk.name) throw new Error("Produk tidak valid.");
  const harga = "$" + Number(produk.price).toLocaleString("en-US");
  const msg = `Halo Da Bronx, saya ingin memesan:\n${produk.name} (${harga})\nJumlah: 1`;
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}

/* ===== Validasi form produk ===== */
// Kategori valid: 2-30 karakter, diawali huruf/angka, hanya huruf/angka/spasi/&.- , bukan angka saja.
const CAT_RE = /^[\p{L}\p{N}][\p{L}\p{N} &.\-]*$/u;

/**
 * Memvalidasi input mentah (string dari form). Mengembalikan { error } atau { value }.
 * - nama wajib (maks 60); harga angka >= 0; stok bilangan bulat >= 0; kategori valid.
 * - kategori yang sama (tanpa membedakan huruf besar/kecil) dengan yang sudah ada memakai ejaan yang sudah ada.
 */
export function validateProduct({ name, cat, price, stock }, products = []) {
  const n = String(name ?? "").trim();
  const c = String(cat ?? "").trim().replace(/\s+/g, " ");
  const priceRaw = String(price ?? "").trim();
  const stockRaw = String(stock ?? "").trim();
  if (!n) return { error: "Nama produk wajib diisi." };
  if (n.length > 60) return { error: "Nama produk maksimal 60 karakter." };
  if (!c) return { error: "Kategori wajib diisi." };
  if (c.length < 2 || c.length > 30 || !CAT_RE.test(c) || /^\d+$/.test(c))
    return { error: "Kategori tidak valid: 2–30 karakter, huruf/angka/spasi/& . - saja, dan tidak boleh hanya angka." };
  const p = Number(priceRaw);
  if (priceRaw === "" || !Number.isFinite(p) || p < 0) return { error: "Harga tidak valid." };
  if (!/^\d+$/.test(stockRaw)) return { error: "Stok tidak valid." };
  const known = products.find((x) => norm(x.cat) === norm(c));
  return { value: { name: n, cat: known ? known.cat : c, price: p, stock: Number(stockRaw) } };
}

/* ===== Persistensi produk (localStorage) ===== */
export function loadProducts() {
  try {
    const r = localStorage.getItem(STORE_KEY);
    if (r) { const a = JSON.parse(r); if (Array.isArray(a)) return a; }
  } catch (e) { /* jatuh ke data default */ }
  return cloneDefaults();
}

/** @returns {boolean} true jika berhasil disimpan; false jika localStorage gagal. */
export function saveProducts() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state.products)); return true; }
  catch (e) { return false; }
}

/* ===== State ===== */
// cart: { productId: quantity } — hanya di memori, kosong lagi setelah reload.
export const state = { products: loadProducts(), cart: {} };

/* ===== CRUD produk ===== */
export const findProduct = (id) => state.products.find((x) => x.id === id);
export function addProduct(data) {
  state.products.push({ id: state.products.reduce((m, p) => Math.max(m, p.id), 0) + 1, ...data });
}
export function updateProduct(id, data) { Object.assign(findProduct(id), data); }
export function removeProduct(id) {
  state.products = state.products.filter((x) => x.id !== id);
  delete state.cart[id];
}
export function resetProducts() {
  state.products = cloneDefaults();
  Object.keys(state.cart).forEach((k) => delete state.cart[k]);
}

/* ===== Keranjang ===== */
export function togglePick(id, on) { if (on) state.cart[id] = state.cart[id] || 1; else delete state.cart[id]; }
export function addToCart(id) { state.cart[id] = (state.cart[id] || 0) + 1; }
export function changeQty(id, d) { state.cart[id] += d; if (state.cart[id] <= 0) delete state.cart[id]; }
