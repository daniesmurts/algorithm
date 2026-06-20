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

  // === Project viewer (lightbox) ===
  const PROJECTS = {
    case01: {
      num: 'CASE 01', title: 'ЖК Столичный',
      images: [
        'assets/gallery/case01/DSC00087-HDR-Edit.jpg',
        'assets/gallery/case01/DSC00124-Edit.jpg',
        'assets/gallery/case01/DSC00173-Edit.jpg',
        'assets/gallery/case01/DSC00175-Edit.jpg',
        'assets/gallery/case01/DSC00217-HDR-Edit.jpg',
        'assets/gallery/case01/DSC00226-Edit.jpg',
        'assets/gallery/case01/DSC00234-Edit.jpg',
        'assets/gallery/case01/DSC00244-Edit.jpg',
        'assets/gallery/case01/DSC00247-Edit.jpg',
      ],
    },
    case02: {
      num: 'CASE 02', title: 'ЖК Светлый',
      images: [
        'assets/gallery/case02/DSC00355-HDR-Edit.jpg',
        'assets/gallery/case02/DSC00360-HDR-Edit.jpg',
        'assets/gallery/case02/DSC00374-Edit.jpg',
        'assets/gallery/case02/DSC00378-Edit.jpg',
        'assets/gallery/case02/DSC00379-Edit.jpg',
        'assets/gallery/case02/DSC00384-HDR-Edit.jpg',
        'assets/gallery/case02/DSC00387-Edit.jpg',
        'assets/gallery/case02/DSC00388-Edit.jpg',
        'assets/gallery/case02/DSC00393-HDR-Edit-Edit.jpg',
        'assets/gallery/case02/DSC00397-Edit.jpg',
        'assets/gallery/case02/DSC00398-Edit.jpg',
        'assets/gallery/case02/DSC00401-Edit.jpg',
        'assets/gallery/case02/DSC00405-HDR-Edit-Edit.jpg',
        'assets/gallery/case02/DSC00419-Edit.jpg',
        'assets/gallery/case02/DSC00424-Edit.jpg',
        'assets/gallery/case02/DSC00429-HDR-Edit.jpg',
        'assets/gallery/case02/DSC00442-Edit.jpg',
        'assets/gallery/case02/DSC00451-Edit.jpg',
        'assets/gallery/case02/DSC00456-Edit.jpg',
      ],
    },
    case03: {
      num: 'CASE 03', title: 'ЖК Савин хаус',
      images: [
        'assets/gallery/case03/DSC01309-редакт.jpg',
        'assets/gallery/case03/DSC01311-редакт.jpg',
        'assets/gallery/case03/DSC01333-редакт.jpg',
        'assets/gallery/case03/DSC01355-редакт.jpg',
        'assets/gallery/case03/DSC01357-редакт.jpg',
        'assets/gallery/case03/DSC01358-редакт.jpg',
        'assets/gallery/case03/DSC01365-HDR-редакт.jpg',
        'assets/gallery/case03/DSC01367-редакт.jpg',
        'assets/gallery/case03/DSC01378-редакт.jpg',
        'assets/gallery/case03/DSC01402-HDR-редакт.jpg',
        'assets/gallery/case03/DSC01425-редакт.jpg',
        'assets/gallery/case03/DSC01426-HDR-редакт.jpg',
        'assets/gallery/case03/DSC01434-редакт.jpg',
        'assets/gallery/case03/DSC01435-редакт.jpg',
        'assets/gallery/case03/DSC01440-HDR-редакт.jpg',
        'assets/gallery/case03/DSC01459-HDR-редакт.jpg',
        'assets/gallery/case03/DSC01466-HDR-редакт.jpg',
        'assets/gallery/case03/DSC01552-HDR-редакт.jpg',
      ],
    },
    case04: {
      num: 'CASE 04', title: 'Моё царицина',
      images: [
        'assets/gallery/case04/Моё царицина -1.png',
        'assets/gallery/case04/Моё царицина -2.png',
        'assets/gallery/case04/Моё царицина -3.png',
        'assets/gallery/case04/Моё царицина -4.png',
        'assets/gallery/case04/Моё царицина -5.png',
        'assets/gallery/case04/Моё царицина -6.png',
        'assets/gallery/case04/Моё царицина -7.png',
      ],
    },
    case05: {
      num: 'CASE 05', title: 'ЖК Манхеттен',
      images: [
        'assets/gallery/case05/ЖК Манхеттен 01.png',
        'assets/gallery/case05/ЖК Манхеттен 02.png',
        'assets/gallery/case05/ЖК Манхеттен 03.png',
        'assets/gallery/case05/ЖК Манхеттен 04.png',
        'assets/gallery/case05/ЖК Манхеттен 05.png',
        'assets/gallery/case05/ЖК Манхеттен 06.png',
      ],
    },
    case06: {
      num: 'CASE 06', title: 'Дубрава',
      images: [
        'assets/gallery/case06/Дубрава -1.png',
        'assets/gallery/case06/Дубрава -2.png',
        'assets/gallery/case06/Дубрава -3.png',
        'assets/gallery/case06/Дубрава -4.png',
        'assets/gallery/case06/Дубрава -5.png',
        'assets/gallery/case06/Дубрава -6.png',
        'assets/gallery/case06/Дубрава -7.png',
      ],
    },
  };

  const viewer = document.getElementById('viewer');
  if (viewer) {
    const vNum = document.getElementById('viewerNum');
    const vTitle = document.getElementById('viewerTitle');
    const vCount = document.getElementById('viewerCount');
    const vScroll = document.getElementById('viewerScroll');
    const vClose = document.getElementById('viewerClose');

    // Zoom (full-size single image) state
    const zoom = document.getElementById('zoom');
    const zImg = document.getElementById('zoomImg');
    const zCount = document.getElementById('zoomCount');
    let current = [];   // image srcs of the open project
    let zIndex = 0;

    const showZoom = (i) => {
      if (!current.length) return;
      zIndex = (i + current.length) % current.length;
      zImg.src = current[zIndex];
      zCount.textContent = (zIndex + 1) + ' / ' + current.length;
    };
    const openZoom = (i) => {
      showZoom(i);
      zoom.classList.add('open');
      zoom.setAttribute('aria-hidden', 'false');
    };
    const closeZoom = () => {
      zoom.classList.remove('open');
      zoom.setAttribute('aria-hidden', 'true');
    };

    document.getElementById('zoomPrev').addEventListener('click', (e) => { e.stopPropagation(); showZoom(zIndex - 1); });
    document.getElementById('zoomNext').addEventListener('click', (e) => { e.stopPropagation(); showZoom(zIndex + 1); });
    document.getElementById('zoomClose').addEventListener('click', closeZoom);
    zoom.addEventListener('click', (e) => { if (e.target === zoom) closeZoom(); });

    const openViewer = (key) => {
      const p = PROJECTS[key];
      if (!p) return;
      current = p.images;
      vNum.textContent = p.num;
      vTitle.textContent = p.title;
      vCount.textContent = p.images.length + ' изобр.';
      vScroll.innerHTML = '';
      p.images.forEach((src, i) => {
        const fig = document.createElement('figure');
        fig.className = 'vshot';
        const img = document.createElement('img');
        img.alt = p.title + ' — ' + (i + 1);
        img.loading = i < 6 ? 'eager' : 'lazy';
        img.addEventListener('load', () => img.classList.add('loaded'));
        img.src = src;
        fig.appendChild(img);
        fig.addEventListener('click', () => openZoom(i));
        vScroll.appendChild(fig);
      });
      vScroll.scrollTop = 0;
      viewer.classList.add('open');
      viewer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeViewer = () => {
      viewer.classList.remove('open');
      viewer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    document.querySelectorAll('.gcase[data-case]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openViewer(el.getAttribute('data-case'));
      });
    });

    vClose.addEventListener('click', closeViewer);
    viewer.addEventListener('click', (e) => { if (e.target === viewer) closeViewer(); });
    window.addEventListener('keydown', (e) => {
      if (zoom.classList.contains('open')) {
        if (e.key === 'Escape') closeZoom();
        else if (e.key === 'ArrowLeft') showZoom(zIndex - 1);
        else if (e.key === 'ArrowRight') showZoom(zIndex + 1);
        return;
      }
      if (e.key === 'Escape' && viewer.classList.contains('open')) closeViewer();
    });
  }

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
