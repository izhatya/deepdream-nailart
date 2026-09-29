/* ===== NAVBAR SCROLL ===== */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

/* ===== MOBILE MENU ===== */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('active');
  });
});

/* ===== TABS ===== */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

/* ===== SCROLL REVEAL ===== */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ===== FORM → WHATSAPP ===== */
const NOMOR_WA = '6281234567890'; // ← GANTI nomor WA kamu (format 62xxx, tanpa + / spasi)

document.getElementById('bookingForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nama    = document.getElementById('nama').value.trim();
  const layanan = document.getElementById('layanan').value;
  const tanggal = document.getElementById('tanggal').value;
  const jam     = document.getElementById('jam').value;
  const wa      = document.getElementById('wa').value.trim();
  const catatan = document.getElementById('catatan').value.trim() || '-';

  const tglFormat = new Date(tanggal).toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  const pesan = `Halo Deep Dream, saya ${nama}, mau booking ${layanan} tanggal ${tglFormat} jam ${jam}. Catatan: ${catatan}. No. WA saya: ${wa}`;

  window.open(`https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(pesan)}`, '_blank');
});

/* ===== TAHUN FOOTER ===== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== MIN DATE = HARI INI ===== */
document.getElementById('tanggal').min = new Date().toISOString().split('T')[0];

/* ===== CONSOLE INFO ===== */
console.log('%c📸 Deep Dream Nailart', 'color:#ff4d94;font-size:16px;font-weight:bold');
console.log('%cTaruh foto di: assets/images/', 'color:#8a5d75');
console.log('  • hero.jpg          → foto utama hero');
console.log('  • about-1.jpg ... about-4.jpg → 4 foto section Tentang');
console.log('%cGanti NOMOR_WA di assets/js/script.js','color:#e91e63;font-weight:bold');

/* ============================================================
   LIGHTBOX — klik foto buat popup
   ============================================================ */
(function(){
  // Buat elemen lightbox sekali
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = `
    <button class="lightbox-close" aria-label="Tutup">&times;</button>
    <img src="" alt="">
    <span class="lightbox-hint">Tap anywhere to close</span>
  `;
  document.body.appendChild(lb);

  const lbImg = lb.querySelector('img');
  const lbClose = lb.querySelector('.lightbox-close');

  // Fungsi buka lightbox
  function openLightbox(src, alt){
    lbImg.src = src;
    lbImg.alt = alt || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';  // lock scroll body
  }

  // Fungsi tutup
  function closeLightbox(){
    lb.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lbImg.src = ''; }, 350);
  }

  // Auto-attach ke semua gambar di galeri, tile, dan orb
  const selectors = '.gal img, .tile img, .orb img';
  function attachLightbox(){
    document.querySelectorAll(selectors).forEach(img => {
      // Skip kalau udah pernah di-attach
      if (img.dataset.lbAttached === '1') return;
      img.dataset.lbAttached = '1';
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        // Skip kalau gambar kosong / gak ke-load
        if (!img.src || img.naturalWidth === 0) return;
        openLightbox(img.src, img.alt);
      });
    });
  }

  // Panggil saat load
  attachLightbox();

  // Panggil lagi kalau ada konten dinamis (buat IG feed)
  setTimeout(attachLightbox, 1500);
  setTimeout(attachLightbox, 3500);

  // Tutup kalau klik overlay / tombol close
  lb.addEventListener('click', closeLightbox);
  lbClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  // Tutup kalau tap ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lb.classList.contains('open')) {
      closeLightbox();
    }
  });

  console.log('✅ Lightbox ready — klik foto untuk popup');
})();
