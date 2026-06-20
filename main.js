// === v2 Architectural Noir — theme, reveals, nav, progress ===
(() => {
  const root = document.documentElement;

  // Theme: dark default for v2
  const stored = localStorage.getItem('algorithm-theme-v2');
  root.setAttribute('data-theme', stored === 'dark' ? 'dark' : 'light');
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('algorithm-theme-v2', next);
  });

  // Reveals
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });
  document.querySelectorAll('.reveal, .rmask').forEach((el) => io.observe(el));

  // Nav scrolled + progress
  const nav = document.getElementById('nav');
  const progress = document.getElementById('progress');
  const onScroll = () => {
    const h = document.documentElement;
    const pct = h.scrollTop / (h.scrollHeight - h.clientHeight);
    if (progress) progress.style.width = (pct * 100).toFixed(2) + '%';
    if (nav) nav.classList.toggle('scrolled', h.scrollTop > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Horizontal gallery: translate vertical wheel to horizontal when hovering
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    gallery.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const atStart = gallery.scrollLeft <= 0 && e.deltaY < 0;
        const atEnd = Math.ceil(gallery.scrollLeft + gallery.clientWidth) >= gallery.scrollWidth && e.deltaY > 0;
        if (!atStart && !atEnd) { gallery.scrollLeft += e.deltaY; e.preventDefault(); }
      }
    }, { passive: false });
  }
})();
