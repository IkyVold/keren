/**
 * Autentikasi & otorisasi (role-based access control) — SISI KLIEN, UNTUK DEMO.
 *
 * PENTING: tidak ada server. Akun & sesi disimpan di localStorage browser, jadi siapa pun yang
 * membuka DevTools dapat mengubahnya. Ini membatasi ANTARMUKA, bukan keamanan sungguhan.
 * Untuk produksi, autentikasi dan pengecekan izin wajib dilakukan di backend.
 *
 * Role:
 *  - admin  : mengelola semua produk, semua pengguna, impor/reset data.
 *  - seller : mengelola HANYA produk miliknya sendiri (tambah/edit/hapus/ekspor).
 *  - buyer  : menelusuri katalog, memilih produk, memesan via WhatsApp. Tidak punya akses dashboard.
 *  - (tamu) : belum login; sama seperti buyer tanpa identitas.
 */
export const ROLES = { ADMIN: "admin", SELLER: "seller", BUYER: "buyer" };
export const ROLE_LABEL = { admin: "Admin", seller: "Seller", buyer: "Buyer" };
export const REGISTRABLE_ROLES = [ROLES.BUYER, ROLES.SELLER]; // admin tidak bisa dibuat lewat pendaftaran publik

export const USERS_KEY = "dabronx_users_v1";
export const SESSION_KEY = "dabronx_session_v1";

/** Akun contoh (id stabil; DEFAULTS di products.js merujuk id seller 2 & 3). Hanya untuk demo. */
export const SEED_USERS = [
  { id: 1, name: "Admin Da Bronx", email: "admin@dabronx.test", role: "admin", password: "admin123" },
  { id: 2, name: "Seller Uptown", email: "seller@dabronx.test", role: "seller", password: "seller123" },
  { id: 3, name: "Seller Downtown", email: "seller2@dabronx.test", role: "seller", password: "seller123" },
  { id: 4, name: "Buyer Demo", email: "buyer@dabronx.test", role: "buyer", password: "buyer123" },
];

/* ===== Matriks izin ===== */
const PERMS = {
  admin: new Set(["dashboard", "product.create", "product.edit.any", "product.delete.any", "data.export", "data.import", "data.reset", "users.manage"]),
  seller: new Set(["dashboard", "product.create", "product.edit.own", "product.delete.own", "data.export"]),
  buyer: new Set(),
};

/**
 * Apakah `user` boleh melakukan `action`? `product` hanya diperlukan untuk izin edit/delete.
 * Aksi: dashboard | product.create | product.edit | product.delete | data.export | data.import | data.reset | users.manage
 */
export function can(user, action, product) {
  if (!user || !PERMS[user.role]) return false;
  const perms = PERMS[user.role];
  if (action === "product.edit" || action === "product.delete") {
    const base = action;
    if (perms.has(`${base}.any`)) return true;
    return perms.has(`${base}.own`) && !!product && product.sellerId === user.id;
  }
  return perms.has(action);
}

/** Produk yang tampil di dashboard: admin = semua, seller = miliknya saja, lainnya = kosong. */
export function dashboardProducts(products, user) {
  if (!user) return [];
  if (user.role === ROLES.ADMIN) return products;
  if (user.role === ROLES.SELLER) return products.filter((p) => p.sellerId === user.id);
  return [];
}

/* ===== Penyimpanan ===== */
let users = [];
let current = null;
let memoryOnly = false;

const safeUser = (u) => (u ? { id: u.id, name: u.name, email: u.email, role: u.role } : null);

function read(key) { try { return localStorage.getItem(key); } catch (e) { memoryOnly = true; return null; } }
function write(key, val) { try { localStorage.setItem(key, val); return true; } catch (e) { memoryOnly = true; return false; } }
function remove(key) { try { localStorage.removeItem(key); } catch (e) { /* abaikan */ } }
export const isMemoryOnly = () => memoryOnly;

function saveUsers() { return write(USERS_KEY, JSON.stringify(users)); }

/* ===== Hash kata sandi (SHA-256 + salt; fallback lemah bila crypto.subtle tidak tersedia) ===== */
function makeSalt() {
  const c = globalThis.crypto;
  if (c?.getRandomValues) return [...c.getRandomValues(new Uint8Array(12))].map((b) => b.toString(16).padStart(2, "0")).join("");
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(`${salt}:${password}`);
  if (globalThis.crypto?.subtle) {
    const buf = await crypto.subtle.digest("SHA-256", data);
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  let h = 5381; for (const b of data) h = ((h << 5) + h + b) >>> 0;
  return "weak-" + h.toString(16);
}
function sameHash(a, b) { // perbandingan waktu-tetap sederhana
  if (a.length !== b.length) return false;
  let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

function validUserList(data) {
  return Array.isArray(data) && data.length > 0 && data.every((u) =>
    u && Number.isInteger(u.id) && u.id > 0 && typeof u.name === "string" && typeof u.email === "string" &&
    PERMS[u.role] && typeof u.salt === "string" && typeof u.hash === "string") &&
    new Set(data.map((u) => u.id)).size === data.length &&
    new Set(data.map((u) => u.email)).size === data.length &&
    data.some((u) => u.role === ROLES.ADMIN);
}

/** Wajib dipanggil (dan ditunggu) sekali saat aplikasi mulai. Memuat/menyemai akun dan memulihkan sesi. */
export async function initAuth() {
  let loaded = null;
  const raw = read(USERS_KEY);
  if (raw !== null) { try { const d = JSON.parse(raw); if (validUserList(d)) loaded = d; } catch (e) { /* data rusak → semai ulang */ } }
  if (!loaded) {
    loaded = [];
    for (const s of SEED_USERS) {
      const salt = makeSalt();
      loaded.push({ id: s.id, name: s.name, email: s.email, role: s.role, salt, hash: await hashPassword(s.password, salt) });
    }
    users = loaded; saveUsers();
  } else users = loaded;
  const sid = Number(read(SESSION_KEY));
  current = Number.isInteger(sid) ? users.find((u) => u.id === sid) || null : null;
  if (!current) remove(SESSION_KEY);
  return safeUser(current);
}

/* ===== Sesi ===== */
export const currentUser = () => safeUser(current);
export const getUserName = (id) => users.find((u) => u.id === id)?.name || null;
export const listUsers = () => users.map(safeUser);

const normEmail = (e) => String(e ?? "").trim().toLowerCase();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function startSession(u) { current = u; write(SESSION_KEY, String(u.id)); }

export async function login(email, password) {
  const u = users.find((x) => x.email === normEmail(email));
  // selalu hitung hash supaya waktu respons tidak membocorkan apakah email terdaftar
  const h = await hashPassword(String(password ?? ""), u ? u.salt : "x");
  if (!u || !sameHash(h, u.hash)) return { error: "Email atau kata sandi salah." };
  startSession(u);
  return { user: safeUser(u) };
}

export async function register({ name, email, password, role }) {
  const n = String(name ?? "").trim().replace(/\s+/g, " ");
  const e = normEmail(email);
  const pw = String(password ?? "");
  if (n.length < 2 || n.length > 40) return { error: "Nama harus 2–40 karakter." };
  if (!EMAIL_RE.test(e) || e.length > 80) return { error: "Format email tidak valid." };
  if (pw.length < 6 || pw.length > 72) return { error: "Kata sandi harus 6–72 karakter." };
  if (!REGISTRABLE_ROLES.includes(role)) return { error: "Role tidak valid. Pilih Buyer atau Seller." };
  if (users.some((u) => u.email === e)) return { error: "Email sudah terdaftar." };
  const salt = makeSalt();
  const u = { id: users.reduce((m, x) => Math.max(m, x.id), 0) + 1, name: n, email: e, role, salt, hash: await hashPassword(pw, salt) };
  users.push(u);
  if (!saveUsers()) { users.pop(); return { error: "Penyimpanan penuh/tidak tersedia — akun tidak dapat dibuat." }; }
  startSession(u);
  return { user: safeUser(u) };
}

export function logout() { current = null; remove(SESSION_KEY); }

/* ===== Manajemen pengguna (hanya admin; dicek ulang di sini, bukan hanya di UI) ===== */
const adminCount = () => users.filter((u) => u.role === ROLES.ADMIN).length;

export function setUserRole(targetId, role) {
  if (!can(current, "users.manage")) return { error: "Akses ditolak." };
  if (!PERMS[role]) return { error: "Role tidak valid." };
  const t = users.find((u) => u.id === targetId);
  if (!t) return { error: "Pengguna tidak ditemukan." };
  if (t.id === current.id) return { error: "Anda tidak dapat mengubah role akun sendiri." };
  if (t.role === ROLES.ADMIN && role !== ROLES.ADMIN && adminCount() <= 1) return { error: "Minimal harus ada satu admin." };
  const old = t.role; t.role = role;
  if (!saveUsers()) { t.role = old; return { error: "Gagal menyimpan perubahan." }; }
  return { user: safeUser(t) };
}

export function removeUser(targetId) {
  if (!can(current, "users.manage")) return { error: "Akses ditolak." };
  const t = users.find((u) => u.id === targetId);
  if (!t) return { error: "Pengguna tidak ditemukan." };
  if (t.id === current.id) return { error: "Anda tidak dapat menghapus akun sendiri." };
  if (t.role === ROLES.ADMIN && adminCount() <= 1) return { error: "Minimal harus ada satu admin." };
  const before = users;
  users = users.filter((u) => u.id !== targetId);
  if (!saveUsers()) { users = before; return { error: "Gagal menyimpan perubahan." }; }
  return { ok: true };
}
