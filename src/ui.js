import { WHATSAPP_NUMBER } from "./products.js";
import * as Store from "./store.js";
import * as Auth from "./auth.js";

const { state } = Store;
const $ = (s) => document.querySelector(s);
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const usd = (n) => "$" + n.toLocaleString("en-US");

const svg = `<svg viewBox="0 0 200 100" fill="none" stroke="#8a97a8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 35h120l12 8h18v16h-30l-8 12H88l-6-20H20z"/><path d="M60 59v-10"/></svg>`;

/* ===== Toast & penyimpanan ===== */
let toastTimer, memoryOnly = false;
function toast(m) {
  const el = $("#toast");
  el.textContent = m; el.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}
function persist() {
  if (!Store.saveProducts() && !memoryOnly) { memoryOnly = true; toast("Penyimpanan penuh/tidak tersedia — perubahan hanya sementara."); }
}

/* ===== Katalog ===== */
const getFiltered = () => Store.filterProducts(state.products, { query: $("#q").value, kategori: $("#cat").value, sort: $("#sort").value });
function resetFilters() { $("#q").value = ""; $("#cat").value = ""; $("#sort").value = ""; renderCatalog(); }
function syncCats() {
  const sel = $("#cat"), cur = sel.value, cats = [...new Set(state.products.map((p) => p.cat))].sort();
  sel.innerHTML = '<option value="">Semua Kategori</option>' + cats.map((c) => `<option>${esc(c)}</option>`).join("");
  sel.value = cats.includes(cur) ? cur : "";
  $("#catList").innerHTML = cats.map((c) => `<option value="${esc(c)}">`).join("");
}
function orderBtn(p) {
  if (p.stock <= 0) return `<button class="wa-card" disabled title="Stok habis">Stok Habis</button>`;
  try { return `<a class="wa-card" href="${Store.buildWhatsAppUrl(WHATSAPP_NUMBER, p)}" target="_blank" rel="noopener">💬 Pesan via WhatsApp</a>`; }
  catch (e) { return `<button class="wa-card" disabled title="${esc(e.message)}">Nomor WhatsApp belum valid</button>`; }
}
function renderCatalog() {
  syncCats();
  const cart = state.cart, list = getFiltered();
  $("#countLabel").textContent = list.length + " Produk";
  $("#grid").innerHTML = list.length ? list.map((p) => `
    <article class="card ${cart[p.id] ? "selected" : ""}">
      <div class="img">${p.img ? `<img class="ph" src="${p.img}" alt="${esc(p.name)}">` : svg}${p.feat ? '<span class="badge">★ UNGGULAN</span>' : ""}
        <input type="checkbox" class="pick" data-id="${p.id}" ${cart[p.id] ? "checked" : ""} ${p.stock <= 0 ? "disabled" : ""} aria-label="Pilih ${esc(p.name)}">
      </div>
      <div class="body">
        <span class="cat">${esc(p.cat)}</span>
        <h3>${esc(p.name)}</h3>
        <p class="by">Dijual oleh ${esc(Auth.getUserName(p.sellerId) || "Da Bronx")}</p>
        <p class="desc">${esc(p.desc)}</p>
        <div class="foot">
          <div><div class="price">${usd(p.price)}</div><div class="stock" style="${p.stock <= 0 ? "color:var(--red)" : ""}">${p.stock > 0 ? "Stok: " + p.stock : "Stok habis"}</div></div>
          <button class="add" data-action="add" data-id="${p.id}" ${p.stock <= 0 ? "disabled" : ""}>+ Tambah</button>
        </div>
        ${orderBtn(p)}
      </div>
    </article>`).join("") : `<div class="empty"><div style="font-size:42px">🔍</div><h3 style="font-family:Oswald,sans-serif;color:#fff;letter-spacing:1px;margin:6px 0">PRODUK TIDAK DITEMUKAN</h3><p>Coba kata kunci lain atau ubah filter kategori.</p><button class="btn-ghost" style="margin-top:14px" data-action="reset-filters">Reset Filter</button></div>`;
}

/* ===== Dashboard ===== */
function countTo(el, to) {
  const from = parseInt(el.textContent) || 0; if (from === to) { el.textContent = to; return; }
  const t0 = performance.now(), d = 900;
  (function step(t) { const k = Math.min(1, (t - t0) / d), e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(from + (to - from) * e); if (k < 1) requestAnimationFrame(step); })(t0);
}
const me = () => Auth.currentUser();
const allowed = (action, product) => Auth.can(me(), action, product);
function deny() { toast("Akses ditolak untuk role Anda."); }

function renderDash() {
  const ps = Auth.dashboardProducts(state.products, me());
  countTo($("#dTotal"), ps.length);
  countTo($("#dStock"), ps.reduce((a, p) => a + p.stock, 0));
  countTo($("#dCat"), new Set(ps.map((p) => p.cat)).size);
  $("#tbody").innerHTML = ps.length ? ps.map((p) => `
    <tr><td><div class="pname">${p.img ? `<img class="thumb" src="${p.img}" alt="">` : `<div class="thumb thumb-ph">🔫</div>`}<b>${esc(p.name)}</b></div></td><td>${esc(Auth.getUserName(p.sellerId) || "Da Bronx")}</td><td>${esc(p.cat)}</td><td>${usd(p.price)}</td><td>${p.stock}</td>
    <td><span class="status ${p.stock > 0 ? "" : "out"}">${p.stock > 0 ? "Tersedia" : "Habis"}</span></td>
    <td>${allowed("product.edit", p) ? `<button class="edit" data-action="edit" data-id="${p.id}">Edit</button>` : ""}${allowed("product.delete", p) ? `<button class="del" data-action="delete" data-id="${p.id}">Hapus</button>` : ""}</td></tr>`).join("") : `<tr><td colspan="7" class="empty">Belum ada produk. Klik “Tambah Produk”.</td></tr>`;
}

/* ===== Keranjang / drawer ===== */
function toggleCart(open) { $("#drawer").classList.toggle("open", open); $("#overlay").classList.toggle("open", open); }

function update() {
  renderCatalog();
  const cart = state.cart, ids = Object.keys(cart).map(Number);
  $("#cartCount").textContent = ids.reduce((a, i) => a + cart[i], 0);
  let total = 0;
  $("#cartBody").innerHTML = ids.length ? ids.map((id) => {
    const p = Store.findProduct(id); total += p.price * cart[id];
    return `<div class="item"><div><b>${esc(p.name)}</b>${usd(p.price)}</div>
      <div class="qty"><button data-action="qty" data-id="${id}" data-d="-1">−</button>${cart[id]}<button data-action="qty" data-id="${id}" data-d="1">+</button></div></div>`;
  }).join("") : `<p class="empty" style="padding:30px 0">Belum ada produk dipilih.</p>`;
  $("#cartTotal").textContent = usd(total);
  buildWA();
}

function buildWA() {
  const cart = state.cart, ids = Object.keys(cart).map(Number);
  let msg = "Halo Da Bronx, saya tertarik dengan produk berikut:\n";
  let total = 0;
  ids.forEach((id, i) => {
    const p = Store.findProduct(id); total += p.price * cart[id];
    msg += `${i + 1}. ${esc(p.name)} x${cart[id]} — ${usd(p.price * cart[id])}\n`;
  });
  if (ids.length) msg += `\nTotal: ${usd(total)}`;
  else msg = "Halo Da Bronx, saya ingin bertanya tentang produk.";
  const name = $("#custName").value.trim(), note = $("#custNote").value.trim();
  if (name) msg += `\nNama: ${name}`;
  if (note) msg += `\nCatatan: ${note}`;
  $("#waBtn").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  $("#waFloat").href = `https://wa.me/${WHATSAPP_NUMBER}`;
}

/* ===== Modal produk (tambah/edit) ===== */
let editId = null, curImg = "";
function setPreview(src) {
  curImg = src || "";
  $("#pv").style.backgroundImage = src ? `url(${src})` : "";
  $("#pv").textContent = src ? "" : "📷";
  $("#rmImg").style.display = src ? "inline" : "none";
}
function openForm(id) {
  const target = id != null ? Store.findProduct(id) : null;
  if (id != null ? !allowed("product.edit", target) : !allowed("product.create")) return deny();
  editId = id ?? null;
  const p = editId != null ? Store.findProduct(editId) : null;
  $("#mTitle").textContent = p ? "Edit Produk" : "Tambah Produk";
  $("#pName").value = p?.name || ""; $("#pCat").value = p?.cat || "";
  $("#pPrice").value = p?.price ?? ""; $("#pStock").value = p?.stock ?? "";
  $("#pDesc").value = p?.desc || ""; $("#pFeat").checked = !!p?.feat;
  $("#pFile").value = ""; $("#pErr").textContent = ""; setPreview(p?.img);
  $("#mOv").classList.add("open"); setTimeout(() => $("#pName").focus(), 50);
}
function closeForm() { $("#mOv").classList.remove("open"); }

function processImage(file) {
  return new Promise((res, rej) => {
    if (!file || !file.type.startsWith("image/")) return rej(new Error("File harus berupa gambar."));
    const fr = new FileReader();
    fr.onerror = () => rej(new Error("Gagal membaca file."));
    fr.onload = () => {
      const im = new Image();
      im.onerror = () => rej(new Error("Gambar tidak valid."));
      im.onload = () => {
        const M = 700, k = Math.min(1, M / Math.max(im.width, im.height));
        const c = document.createElement("canvas"); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
        const g = c.getContext("2d"); g.fillStyle = "#0b1623"; g.fillRect(0, 0, c.width, c.height); g.drawImage(im, 0, 0, c.width, c.height);
        res(c.toDataURL("image/jpeg", .82));
      };
      im.src = fr.result;
    };
    fr.readAsDataURL(file);
  });
}
async function handleFile(f) {
  try { setPreview(await processImage(f)); $("#pErr").textContent = ""; }
  catch (e) { $("#pErr").textContent = e.message; }
}

function submitForm(e) {
  e.preventDefault();
  if (editId != null ? !allowed("product.edit", Store.findProduct(editId)) : !allowed("product.create")) { closeForm(); return deny(); }
  const r = Store.validateProduct(
    { name: $("#pName").value, cat: $("#pCat").value, price: $("#pPrice").value, stock: $("#pStock").value },
    state.products
  );
  if (r.error) { $("#pErr").textContent = r.error; return; }
  const data = { ...r.value, desc: $("#pDesc").value.trim(), feat: $("#pFeat").checked, img: curImg };
  if (editId != null) { Store.updateProduct(editId, data); toast("Produk diperbarui ✓"); }
  else { Store.addProduct({ ...data, sellerId: me().id }); toast("Produk ditambahkan ✓"); }
  // kosongkan pencarian & filter kategori agar perubahan langsung terlihat di katalog publik
  $("#q").value = ""; $("#cat").value = "";
  persist(); closeForm(); renderDash(); update();
}
function deleteProduct(id) {
  const p = Store.findProduct(id); if (!p) return;
  if (!allowed("product.delete", p)) return deny();
  if (!confirm(`Hapus "${p.name}"?`)) return;
  Store.removeProduct(id);
  persist(); renderDash(); update(); toast("Produk dihapus");
}
function resetData() {
  if (!allowed("data.reset")) return deny();
  if (!confirm("Kembalikan semua produk ke data awal? Perubahan Anda akan hilang.")) return;
  Store.resetProducts();
  persist(); renderDash(); update(); toast("Data dikembalikan");
}


/* ===== Ekspor / impor (impor hanya admin karena mengganti seluruh data) ===== */
function exportData() {
  if (!allowed("data.export")) return deny();
  const data = Auth.dashboardProducts(state.products, me());
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
  a.download = "dabronx-produk.json"; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
async function importData(file) {
  if (!allowed("data.import")) return deny();
  if (!file) return;
  let parsed;
  try { parsed = JSON.parse(await file.text()); } catch (e) { return toast("File JSON tidak dapat dibaca."); }
  const r = Store.validateProductList(parsed);
  if (!r.ok) return toast("Impor ditolak: " + r.errors[0]);
  if (!confirm(`Ganti seluruh data dengan ${r.products.length} produk dari file?`)) return;
  if (!Store.replaceProducts(r.products)) return toast("Gagal menyimpan impor.");
  renderDash(); update(); toast("Data diimpor ✓");
}

/* ===== Auth UI ===== */
let authTab = "login";
function setAuthTab(tab) {
  authTab = tab;
  $("#authTitle").textContent = tab === "login" ? "Masuk" : "Daftar Akun";
  $("#authSubmit").textContent = tab === "login" ? "Masuk" : "Daftar";
  $("#tabLogin").setAttribute("aria-selected", tab === "login");
  $("#tabRegister").setAttribute("aria-selected", tab === "register");
  $("#aPass").autocomplete = tab === "login" ? "current-password" : "new-password";
  document.querySelectorAll("#authForm [data-only]").forEach((el) => { el.hidden = el.dataset.only !== tab; });
  $("#authErr").textContent = "";
}
function openAuth(tab = "login") { setAuthTab(tab); $("#authForm").reset(); $("#authOv").classList.add("open"); setTimeout(() => (tab === "login" ? $("#aEmail") : $("#aName")).focus(), 50); }
function closeAuth() { $("#authOv").classList.remove("open"); }

async function submitAuth(e) {
  e.preventDefault();
  const btn = $("#authSubmit"); btn.disabled = true;
  try {
    const r = authTab === "login"
      ? await Auth.login($("#aEmail").value, $("#aPass").value)
      : await Auth.register({ name: $("#aName").value, email: $("#aEmail").value, password: $("#aPass").value, role: $("#aRole").value });
    if (r.error) { $("#authErr").textContent = r.error; return; }
    closeAuth(); renderAuth(); toast(`Halo, ${r.user.name} (${Auth.ROLE_LABEL[r.user.role]})`);
    if (location.hash === "#dashboard" && !allowed("dashboard")) history.replaceState(null, "", "#home");
  } finally { btn.disabled = false; }
}
function doLogout() {
  Auth.logout(); Object.keys(state.cart).forEach((k) => delete state.cart[k]);
  if (location.hash === "#dashboard") history.replaceState(null, "", "#home");
  renderAuth(); update(); toast("Anda telah keluar");
}

function renderUsers() {
  const panel = $("#usersPanel"), show = allowed("users.manage");
  panel.hidden = !show; if (!show) return;
  $("#utbody").innerHTML = Auth.listUsers().map((u) => {
    const self = u.id === me().id;
    return `<tr><td>${esc(u.name)}${self ? " <small>(Anda)</small>" : ""}</td><td>${esc(u.email)}</td>
      <td><select data-user-role="${u.id}" aria-label="Role ${esc(u.name)}" ${self ? "disabled" : ""}>${Object.values(Auth.ROLES).map((r) => `<option value="${r}" ${r === u.role ? "selected" : ""}>${Auth.ROLE_LABEL[r]}</option>`).join("")}</select></td>
      <td>${self ? "" : `<button class="del" data-action="user-delete" data-id="${u.id}">Hapus</button>`}</td></tr>`;
  }).join("");
}

/** Sinkronkan seluruh antarmuka dengan pengguna yang sedang login. */
function renderAuth() {
  const u = me(), canDash = allowed("dashboard");
  $("#authSlot").innerHTML = u
    ? `<div class="user-chip"><span class="uname">${esc(u.name)}</span><span class="role-tag ${u.role}">${Auth.ROLE_LABEL[u.role]}</span><button class="auth-btn" data-action="logout">Keluar</button></div>`
    : `<button class="auth-btn" data-action="auth-open">Masuk</button>`;
  $("#heroLogin").hidden = !!u;
  $("#navDash").hidden = !canDash; $("#heroDash").hidden = !canDash;
  $("#dashboard").hidden = !canDash;
  document.querySelectorAll("[data-perm]").forEach((el) => { el.hidden = !allowed(el.dataset.perm); });
  if (u) $("#custName").value = $("#custName").value || u.name;
  $("#roleBadge").textContent = u ? `● ${Auth.ROLE_LABEL[u.role]}${u.role === "seller" ? " — produk saya" : ""}` : "● Demo Dashboard";
  renderDash(); renderUsers(); buildWA();
}

/* ===== Event: delegasi data-action (pengganti onclick inline) ===== */
function onClick(e) {
  const el = e.target.closest("[data-action]"); if (!el) return;
  const id = el.dataset.id !== undefined ? Number(el.dataset.id) : undefined;
  switch (el.dataset.action) {
    case "cart-open": toggleCart(true); break;
    case "cart-close": toggleCart(false); break;
    case "add": Store.addToCart(id); update(); toggleCart(true); break;
    case "qty": Store.changeQty(id, Number(el.dataset.d)); update(); break;
    case "reset-filters": resetFilters(); break;
    case "open-form": openForm(); break;
    case "close-form": closeForm(); break;
    case "edit": openForm(id); break;
    case "delete": deleteProduct(id); break;
    case "reset-data": resetData(); break;
    case "auth-open": openAuth(); break;
    case "auth-close": closeAuth(); break;
    case "auth-tab": setAuthTab(el.dataset.tab); break;
    case "auth-fill": $("#aEmail").value = el.dataset.email; $("#aPass").value = el.dataset.pass; $("#authErr").textContent = ""; break;
    case "logout": doLogout(); break;
    case "export-json": exportData(); break;
    case "import-json": if (allowed("data.import")) $("#importFile").click(); else deny(); break;
    case "user-delete": {
      const u = Auth.listUsers().find((x) => x.id === id); if (!u) break;
      if (!confirm(`Hapus akun "${u.name}"?`)) break;
      const r = Auth.removeUser(id); if (r.error) toast(r.error); else { renderUsers(); update(); toast("Akun dihapus"); }
      break;
    }
  }
}

export function initUI() {
  document.addEventListener("click", onClick);
  $("#grid").addEventListener("change", (e) => {
    if (e.target.matches("input.pick")) { Store.togglePick(Number(e.target.dataset.id), e.target.checked); update(); }
  });
  $("#drop").addEventListener("click", (e) => { if (e.target.id !== "rmImg") $("#pFile").click(); });
  $("#pFile").addEventListener("change", (e) => handleFile(e.target.files[0]));
  $("#rmImg").addEventListener("click", (e) => { e.stopPropagation(); $("#pFile").value = ""; setPreview(""); });
  ["dragover", "dragenter"].forEach((ev) => $("#drop").addEventListener(ev, (e) => { e.preventDefault(); $("#drop").classList.add("drag"); }));
  ["dragleave", "drop"].forEach((ev) => $("#drop").addEventListener(ev, (e) => { e.preventDefault(); $("#drop").classList.remove("drag"); }));
  $("#drop").addEventListener("drop", (e) => handleFile(e.dataTransfer.files[0]));
  $("#mOv").addEventListener("mousedown", (e) => { if (e.target.id === "mOv") closeForm(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeForm(); closeAuth(); } });
  $("#pForm").addEventListener("submit", submitForm);
  $("#authForm").addEventListener("submit", submitAuth);
  $("#authOv").addEventListener("mousedown", (e) => { if (e.target.id === "authOv") closeAuth(); });
  $("#importFile").addEventListener("change", (e) => { importData(e.target.files[0]); e.target.value = ""; });
  $("#utbody").addEventListener("change", (e) => {
    const sel = e.target.closest("select[data-user-role]"); if (!sel) return;
    const r = Auth.setUserRole(Number(sel.dataset.userRole), sel.value);
    if (r.error) toast(r.error); else toast("Role diperbarui ✓");
    renderUsers();
  });
  addEventListener("hashchange", () => { if (location.hash === "#dashboard" && !allowed("dashboard")) { history.replaceState(null, "", "#home"); me() ? deny() : openAuth(); } });
  ["#q", "#cat", "#sort"].forEach((s) => $(s).addEventListener("input", renderCatalog));
  ["#custName", "#custNote"].forEach((s) => $(s).addEventListener("input", buildWA));
  renderAuth(); update();
  if (location.hash === "#dashboard" && !allowed("dashboard")) { history.replaceState(null, "", "#home"); if (!me()) openAuth(); }
}

/* ===== Efek visual: partikel hero ===== */
export function initHeroParticles() {
  const hero = document.getElementById("home"), cv = document.getElementById("heroFx");
  if (!hero || !cv) return;
  const ctx = cv.getContext("2d");
  let W = 0, H = 0, dpr = 1, parts = [], run = true, mx = 0, my = 0, tx = 0, ty = 0;
  const rnd = (a, b) => a + Math.random() * (b - a);
  function make(initial) {
    const ember = Math.random() < .45;
    return {
      x: rnd(0, W), y: initial ? rnd(0, H) : H + rnd(10, 80),
      r: ember ? rnd(.8, 2.4) : rnd(.6, 1.6),
      vy: ember ? rnd(.25, .9) : rnd(.08, .3),
      vx: rnd(-.15, .35),
      ph: rnd(0, 6.28), sw: rnd(.3, 1.1),
      a: ember ? rnd(.5, 1) : rnd(.15, .45),
      hue: ember ? (Math.random() < .7 ? "rgba(255,110,90," : "rgba(255,190,120,") : "rgba(190,205,225,",
      z: rnd(.3, 1.4), ember,
    };
  }
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = hero.clientWidth; H = hero.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(110, Math.max(40, W * H / 9000)));
    parts = Array.from({ length: n }, () => make(true));
  }
  let t = 0;
  function frame() {
    if (!run) return;
    t += .016;
    tx += (mx - tx) * .05; ty += (my - ty) * .05;
    ctx.clearRect(0, 0, W, H);
    for (const p of parts) {
      p.y -= p.vy * p.z; p.x += p.vx * p.z + Math.sin(t * p.sw + p.ph) * .35 * p.z;
      if (p.y < -20 || p.x > W + 20 || p.x < -20) { Object.assign(p, make(false)); p.x = rnd(0, W); }
      const fade = Math.min(1, p.y / (H * .35)), tw = .6 + .4 * Math.sin(t * 3 + p.ph);
      const al = Math.min(1, 1.5 * p.a * fade * (p.ember ? tw : 1));
      const px = p.x + tx * 18 * p.z, py = p.y + ty * 12 * p.z;
      const g = ctx.createRadialGradient(px, py, 0, px, py, p.r * (p.ember ? 7 : 4));
      g.addColorStop(0, p.hue + al + ")"); g.addColorStop(1, p.hue + "0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, p.r * (p.ember ? 7 : 4), 0, 6.283); ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  hero.addEventListener("pointermove", (e) => { const b = hero.getBoundingClientRect(); mx = (e.clientX - b.left) / b.width - .5; my = (e.clientY - b.top) / b.height - .5; });
  addEventListener("resize", resize);
  new IntersectionObserver((es) => { const v = es[0].isIntersecting; if (v && !run) { run = true; requestAnimationFrame(frame); } else if (!v) { run = false; } }).observe(hero);
  resize(); requestAnimationFrame(frame);
}

/* ===== Efek visual: progress scroll, spotlight, reveal, tilt kartu ===== */
export function initPageFx() {
  const prog = document.getElementById("prog"), spot = document.getElementById("spot");
  addEventListener("scroll", () => { const h = document.documentElement; prog.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%"; }, { passive: true });
  addEventListener("pointermove", (e) => { spot.style.setProperty("--sx", e.clientX + "px"); spot.style.setProperty("--sy", e.clientY + "px"); }, { passive: true });
  const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: .12 });
  document.querySelectorAll(".sec-head,.tools,.promo,.gallery-item,.stat-card,.tbl").forEach((el, i) => {
    el.classList.add("rv");
    el.style.transitionDelay = (el.classList.contains("gallery-item") || el.classList.contains("stat-card")) ? ((i % 3) * 120) + "ms" : "0ms";
    io.observe(el);
  });
  const grid = document.getElementById("grid");
  const go = new IntersectionObserver((es) => {
    if (es[0].isIntersecting) {
      grid.querySelectorAll(".card").forEach((c, i) => c.style.setProperty("--i", i)); grid.classList.add("enter");
      setTimeout(() => grid.classList.remove("enter"), 1500); go.disconnect();
    }
  }, { threshold: .1 });
  go.observe(grid);
  grid.addEventListener("pointermove", (e) => {
    const c = e.target.closest(".card"); if (!c) return; const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    c.style.setProperty("--ry", ((x - .5) * 10).toFixed(2) + "deg"); c.style.setProperty("--rx", ((.5 - y) * 10).toFixed(2) + "deg");
    c.style.setProperty("--mx", (x * 100) + "%"); c.style.setProperty("--my", (y * 100) + "%");
  });
  grid.addEventListener("pointerout", (e) => { const c = e.target.closest(".card"); if (c && !c.contains(e.relatedTarget)) { c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); } });
}
