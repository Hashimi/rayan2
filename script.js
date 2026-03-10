document.addEventListener('DOMContentLoaded', () => {

  // ================= LANGUAGE SWITCHER =================
  const faBtn = document.getElementById('fa-btn');
  const enBtn = document.getElementById('en-btn');
  const langElements = document.querySelectorAll('.lang');
  const langBtns = document.querySelectorAll('.lang-btn');
  let currentLang = localStorage.getItem('rayan-lang') || 'fa';

  function updateLanguage() {
    langElements.forEach(el => {
      const newText = el.dataset[currentLang];
      if (newText) el.textContent = newText;
    });
    
    document.documentElement.dir = currentLang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
    
    langBtns.forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${currentLang}-btn`).classList.add('active');
    
    localStorage.setItem('rayan-lang', currentLang);
  }

  updateLanguage();
  faBtn.addEventListener('click', () => { currentLang = 'fa'; updateLanguage(); });
  enBtn.addEventListener('click', () => { currentLang = 'en'; updateLanguage(); });


  // ================= MOBILE SIDEBAR =================
  const hamburger = document.getElementById('hamburger');
  const sideNavbar = document.getElementById('sideNavbar');
  const overlay = document.getElementById('sidebarOverlay');

  function isMobile() {
    return window.innerWidth <= 992;
  }

  function toggleMenu() {
    if (!hamburger || !sideNavbar || !overlay) return;
    
    const isActive = sideNavbar.classList.contains('active');
    
    if (isActive) {
      hamburger.classList.remove('active');
      sideNavbar.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      hamburger.classList.add('active');
      sideNavbar.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', toggleMenu);
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (isMobile()) toggleMenu();
    });
  });

  window.addEventListener('resize', () => {
    if (!isMobile() && sideNavbar) {
      sideNavbar.classList.remove('active');
      hamburger?.classList.remove('active');
      overlay?.classList.remove('active');
      document.body.style.overflow = '';
    }
  });


  // ================= SMOOTH SCROLL =================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  // ================= LIGHTBOX =================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const closeBtn = document.querySelector('.lightbox .close');
  const prevBtn = document.querySelector('.lightbox .prev');
  const nextBtn = document.querySelector('.lightbox .next');
  const caption = document.querySelector('.lightbox .caption');
  const galleryItems = document.querySelectorAll('.gallery-item');
  let currentIndex = 0;

  if (lightbox && galleryItems.length > 0) {
    
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', e => {
        e.preventDefault();
        currentIndex = index;
        openLightbox(item.href, item.querySelector('img')?.alt || '');
      });
    });

    function openLightbox(src, alt = '') {
      lightbox.classList.add('active');
      lightboxImg.src = src;
      caption.textContent = alt;
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeLightbox);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        openLightbox(galleryItems[currentIndex].href, galleryItems[currentIndex].querySelector('img')?.alt || '');
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        openLightbox(galleryItems[currentIndex].href, galleryItems[currentIndex].querySelector('img')?.alt || '');
      });
    }

    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });
  }

});