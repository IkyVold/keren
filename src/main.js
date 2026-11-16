import "./style.css";
import { initAuth } from "./auth.js";
import { initUI, initHeroParticles, initPageFx } from "./ui.js";

// Akun & sesi harus siap (hash kata sandi bersifat async) sebelum UI dirender.
initAuth().then(() => {
  initUI();
  initHeroParticles();
  initPageFx();
});
