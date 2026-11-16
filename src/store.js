import { STORE_KEY, BACKUP_KEY, cloneDefaults } from "./products.js";

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
export const isValidCategory = (c) => c.length >= 2 && c.length <= 30 && CAT_RE.test(c) && !/^\d+$/.test(c);

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
  if (!isValidCategory(c))
    return { error: "Kategori tidak valid: 2–30 karakter, huruf/angka/spasi/& . - saja, dan tidak boleh hanya angka." };
  const p = Number(priceRaw);
  if (priceRaw === "" || !Number.isFinite(p) || p < 0) return { error: "Harga tidak valid." };
  if (!/^\d+$/.test(stockRaw)) return { error: "Stok tidak valid." };
  const known = products.find((x) => norm(x.cat) === norm(c));
  return { value: { name: n, cat: known ? known.cat : c, price: p, stock: Number(stockRaw) } };
}

/* ===== Validasi struktur & tipe data tersimpan / impor ===== */
const IMG_RE = /^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/=]+$/; // img disisipkan ke atribut src, jadi dibatasi ketat

/** Validasi satu record produk (tipe ketat). @returns {{value}|{errors:string[]}} */
function validateRecord(r, i) {
  const at = `Produk #${i + 1}`, errors = [];
  if (r === null || typeof r !== "object" || Array.isArray(r)) return { errors: [`${at}: harus berupa objek.`] };
  if (!Number.isInteger(r.id) || r.id <= 0) errors.push(`${at}: id harus bilangan bulat > 0.`);
  const name = typeof r.name === "string" ? r.name.trim() : "";
  if (!name || name.length > 60) errors.push(`${at}: nama harus teks 1–60 karakter.`);
  const cat = typeof r.cat === "string" ? r.cat.trim().replace(/\s+/g, " ") : "";
  if (!isValidCategory(cat)) errors.push(`${at}: kategori tidak valid.`);
  if (typeof r.price !== "number" || !Number.isFinite(r.price) || r.price < 0) errors.push(`${at}: harga harus angka ≥ 0.`);
  if (typeof r.stock !== "number" || !Number.isInteger(r.stock) || r.stock < 0) errors.push(`${at}: stok harus bilangan bulat ≥ 0.`);
  if (r.desc !== undefined && (typeof r.desc !== "string" || r.desc.length > 160)) errors.push(`${at}: deskripsi harus teks maks 160 karakter.`);
  if (r.sellerId !== undefined && (!Number.isInteger(r.sellerId) || r.sellerId <= 0)) errors.push(`${at}: sellerId harus bilangan bulat > 0.`);
  if (r.feat !== undefined && typeof r.feat !== "boolean") errors.push(`${at}: feat harus true/false.`);
  if (r.img !== undefined && r.img !== "" && (typeof r.img !== "string" || !IMG_RE.test(r.img))) errors.push(`${at}: img harus data URL gambar (png/jpeg/webp/gif).`);
  if (errors.length) return { errors };
  const value = { id: r.id, name, cat, price: r.price, stock: r.stock, desc: r.desc ?? "", feat: r.feat ?? false };
  if (r.img) value.img = r.img;
  if (r.sellerId !== undefined) value.sellerId = r.sellerId;
  return { value };
}

/** Validasi seluruh daftar. Satu record rusak = seluruh daftar ditolak. @returns {{ok:boolean, products?:object[], errors:string[]}} */
export function validateProductList(data) {
  if (!Array.isArray(data)) return { ok: false, errors: ["Data harus berupa array produk."] };
  const products = [], errors = [], ids = new Set();
  data.forEach((raw, i) => {
    const r = validateRecord(raw, i);
    if (r.errors) { errors.push(...r.errors); return; }
    if (ids.has(r.value.id)) { errors.push(`Produk #${i + 1}: id ${r.value.id} duplikat.`); return; }
    ids.add(r.value.id); products.push(r.value);
  });
  return errors.length ? { ok: false, errors } : { ok: true, products, errors };
}

/* ===== Persistensi produk (localStorage) ===== */
function parseProducts(raw) {
  try { return validateProductList(JSON.parse(raw)); }
  catch (e) { return { ok: false, errors: ["JSON tidak dapat dibaca."] }; }
}

/** @returns {{products:object[], notice:string|null}} notice terisi bila data rusak / penyimpanan tidak tersedia. */
export function loadProducts() {
  let raw;
  try { raw = localStorage.getItem(STORE_KEY); }
  catch (e) { return { products: cloneDefaults(), notice: "Penyimpanan lokal tidak tersedia — perubahan hanya sementara." }; }
  if (raw === null) return { products: cloneDefaults(), notice: null };
  const r = parseProducts(raw);
  if (r.ok) return { products: r.products, notice: null };
  const defaults = cloneDefaults();
  let backedUp = false;
  try { localStorage.setItem(BACKUP_KEY, raw); backedUp = true; } catch (e) { /* tidak ada ruang */ }
  try { localStorage.setItem(STORE_KEY, JSON.stringify(defaults)); } catch (e) { /* tetap pakai di memori */ }
  return {
    products: defaults,
    notice: `Data produk tersimpan rusak (${r.errors[0].replace(/\.$/, "")}). Data contoh dipulihkan.` + (backedUp ? ` Salinan data rusak disimpan di kunci "${BACKUP_KEY}".` : ""),
  };
}

/** @returns {boolean} true jika berhasil disimpan; false jika localStorage gagal (data lama tidak berubah). */
export function saveProducts(list = state.products) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(list)); return true; }
  catch (e) { return false; }
}

/** Mengganti seluruh produk (impor). Disimpan DULU; jika gagal, state dan data lama tidak disentuh. */
export function replaceProducts(list) {
  if (!saveProducts(list)) return false;
  state.products = list;
  Object.keys(state.cart).forEach((k) => delete state.cart[k]);
  return true;
}

/* ===== State ===== */
// cart: { productId: quantity } — hanya di memori, kosong lagi setelah reload.
const loaded = loadProducts();
export const state = { products: loaded.products, cart: {}, loadNotice: loaded.notice };

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
