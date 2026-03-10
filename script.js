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


  // ================= MOBILE SIDEBAR TOGGLE =================
  const hamburger = document.getElementById('hamburger');
  const sideNavbar = document.getElementById('sideNavbar');
  const overlay = document.getElementById('sidebarOverlay');

  function isMobile() {
    return window.innerWidth <= 992;
  }

  function openMenu() {
    hamburger.classList.add('active');
    sideNavbar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    sideNavbar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (sideNavbar.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (hamburger && sideNavbar && overlay) {
    
    // Toggle on hamburger click
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close on overlay click
    overlay.addEventListener('click', () => {
      closeMenu();
    });

    // Close on nav link click
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        if (isMobile()) {
          closeMenu();
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMobile() && sideNavbar.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  // Close menu on resize to desktop
  window.addEventListener('resize', () => {
    if (!isMobile() && sideNavbar) {
      closeMenu();
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

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(galleryItems[currentIndex].href, galleryItems[currentIndex].querySelector('img')?.alt || '');
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    openLightbox(galleryItems[currentIndex].href, galleryItems[currentIndex].querySelector('img')?.alt || '');
  });

  closeBtn.addEventListener('click', closeLightbox);
  
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') prevBtn.click();
    else if (e.key === 'ArrowRight') nextBtn.click();
  });

});