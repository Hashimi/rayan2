document.addEventListener('DOMContentLoaded', () => {

  // ✅ SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu after click
        if (window.innerWidth <= 992) {
          hamburger.classList.remove('active');
          sideNavbar.classList.remove('active');
        }
      }
    });
  });

// Add toggle button in HTML: <button id="miniToggle">⊞</button>
document.getElementById('miniToggle')?.addEventListener('click', () => {
  document.getElementById('sideNavbar').classList.toggle('mini');
});


  // ✅ LANGUAGE SWITCHER + DIRECTION
  const faBtn = document.getElementById('fa-btn');
  const enBtn = document.getElementById('en-btn');
  const langElements = document.querySelectorAll('.lang');
  const langBtns = document.querySelectorAll('.lang-btn');
  let currentLang = 'fa';

  function updateLanguage() {
    langElements.forEach(el => {
      const newText = el.dataset[currentLang];
      if (newText) el.textContent = newText;
    });
    
    // ✅ Switch direction & navbar side
    document.documentElement.dir = currentLang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
    
    // Update active button state
    langBtns.forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${currentLang}-btn`).classList.add('active');
    
    // Save preference
    localStorage.setItem('rayan-lang', currentLang);
  }

  // Load saved language
  const savedLang = localStorage.getItem('rayan-lang');
  if (savedLang) {
    currentLang = savedLang;
  }
  updateLanguage();

  faBtn.addEventListener('click', () => { currentLang = 'fa'; updateLanguage(); });
  enBtn.addEventListener('click', () => { currentLang = 'en'; updateLanguage(); });


  // ✅ MOBILE SIDEBAR TOGGLE
  const hamburger = document.getElementById('hamburger');
  const sideNavbar = document.getElementById('sideNavbar');

  if (hamburger && sideNavbar) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      sideNavbar.classList.toggle('active');
    });

    // Close when clicking a link (mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
          hamburger.classList.remove('active');
          sideNavbar.classList.remove('active');
        }
      });
    });

    // Close when clicking outside sidebar
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 992 && 
          !sideNavbar.contains(e.target) && 
          !hamburger.contains(e.target) && 
          sideNavbar.classList.contains('active')) {
        hamburger.classList.remove('active');
        sideNavbar.classList.remove('active');
      }
    });
  }


  // ✅ LIGHTBOX (unchanged logic)
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

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(galleryItems[currentIndex].href, galleryItems[currentIndex].querySelector('img')?.alt || '');
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    openLightbox(galleryItems[currentIndex].href, galleryItems[currentIndex].querySelector('img')?.alt || '');
  });

  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  });

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox || e.target === closeBtn) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    } else if (e.key === 'ArrowLeft') {
      prevBtn.click();
    } else if (e.key === 'ArrowRight') {
      nextBtn.click();
    }
  });


  // ✅ NAVBAR SCROLL EFFECT (subtle shadow enhancement)
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      sideNavbar.style.boxShadow = window.innerWidth > 992 
        ? (document.dir === 'ltr' ? '4px 0 20px rgba(0,0,0,0.6)' : '-4px 0 20px rgba(0,0,0,0.6)')
        : '0 0 25px rgba(255,217,102,0.3)';
    } else {
      sideNavbar.style.boxShadow = window.innerWidth > 992
        ? (document.dir === 'ltr' ? '3px 0 15px rgba(0,0,0,0.5)' : '-3px 0 15px rgba(0,0,0,0.5)')
        : 'none';
    }
  });

});