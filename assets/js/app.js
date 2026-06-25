/* Rx Challenger — vanilla JS
   Sticky nav, reveal-on-scroll, mobile menu, smooth scroll,
   FAQ, cookie banner, floating social, PWA install, forms
   ========================================================== */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. Sticky header (adds .scrolled after 24px)
     ---------------------------------------------------------- */
  var header = document.querySelector('.site-header');
  var scrolling = false;
  function onScroll() {
    if (header) {
      if (window.scrollY > 24) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    scrolling = false;
  }
  window.addEventListener('scroll', function () {
    if (!scrolling) {
      scrolling = true;
      window.requestAnimationFrame(onScroll);
    }
  }, { passive: true });

  /* ----------------------------------------------------------
     2. Reveal-on-scroll (IntersectionObserver)
     ---------------------------------------------------------- */
  var reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if ('IntersectionObserver' in window && reveals.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else if (reveals.length) {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ----------------------------------------------------------
     3. Mobile nav
     ---------------------------------------------------------- */
  var menuToggle = document.querySelector('.menu-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  var mobileClose = document.querySelector('.mobile-close');
  function openMenu() {
    if (mobileNav) {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }
  function closeMenu() {
    if (mobileNav) {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
  if (menuToggle) menuToggle.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  /* ----------------------------------------------------------
     4. Smooth scroll for same-page anchors
     ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href').slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ----------------------------------------------------------
     5. FAQ accordion
     ---------------------------------------------------------- */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var wasOpen = item.classList.contains('open');
      // close all in same group
      var group = btn.closest('.faq-list');
      if (group) {
        group.querySelectorAll('.faq-item').forEach(function (it) {
          it.classList.remove('open');
        });
      }
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ----------------------------------------------------------
     6. Floating social — hide when footer visible
     ---------------------------------------------------------- */
  var floating = document.querySelector('.floating-social');
  var footer = document.querySelector('.site-footer');
  function updateFloating() {
    if (!floating || !footer) return;
    var rect = footer.getBoundingClientRect();
    if (rect.top < window.innerHeight - 16) {
      floating.classList.add('hidden');
    } else {
      floating.classList.remove('hidden');
    }
  }
  window.addEventListener('scroll', function () {
    if (!scrolling) {
      scrolling = true;
      window.requestAnimationFrame(updateFloating);
    }
  }, { passive: true });
  /* also wait a frame so first paint shows the buttons */
  window.requestAnimationFrame(updateFloating);
  window.addEventListener('load', updateFloating);

  /* ----------------------------------------------------------
     7. Cookie consent
     ---------------------------------------------------------- */
  var STORAGE_KEY = 'rx_consent';
  var banner = document.querySelector('.cookie-banner');
  function getConsent() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function setConsent(v) {
    try { localStorage.setItem(STORAGE_KEY, v); } catch (e) {}
  }
  if (banner && !getConsent()) {
    setTimeout(function () { banner.classList.add('show'); }, 1500);
    banner.querySelector('[data-accept]') &&
      banner.querySelector('[data-accept]').addEventListener('click', function () {
        setConsent('accepted');
        banner.classList.remove('show');
      });
    banner.querySelector('[data-decline]') &&
      banner.querySelector('[data-decline]').addEventListener('click', function () {
        setConsent('declined');
        banner.classList.remove('show');
      });
    banner.querySelector('[data-preferences]') &&
      banner.querySelector('[data-preferences]').addEventListener('click', function () {
        setConsent('preferences');
        banner.classList.remove('show');
        if (window.rxOpenPreferenceCenter) window.rxOpenPreferenceCenter();
      });
  }

  /* ----------------------------------------------------------
     8. Contact form (front-end only — no backend)
     ---------------------------------------------------------- */
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#email').value.trim();
      var email = form.querySelector('#email').value.trim();
      var message = form.querySelector('#message').value.trim();
      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      var submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      setTimeout(function () {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        alert('Thank you for reaching out! We\'ll be in touch soon.');
      }, 800);
    });
  }

  /* ----------------------------------------------------------
     9. PWA install prompt
     ---------------------------------------------------------- */
  var deferredPrompt = null;
  var pwaPrompt = document.querySelector('.pwa-prompt');
  var pwaBtn = document.querySelector('[data-pwa-install]');
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    if (pwaPrompt && getConsent() !== 'declined') {
      setTimeout(function () { pwaPrompt.classList.add('show'); }, 4000);
    }
  });
  if (pwaBtn) {
    pwaBtn.addEventListener('click', function () {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function () { deferredPrompt = null; });
      } else if (pwaPrompt) {
        pwaPrompt.classList.add('show');
      }
    });
  }
  document.querySelector('[data-pwa-close]') &&
    document.querySelector('[data-pwa-close]').addEventListener('click', function () {
      if (pwaPrompt) pwaPrompt.classList.remove('show');
    });
  window.addEventListener('appinstalled', function () {
    deferredPrompt = null;
    if (pwaPrompt) pwaPrompt.classList.remove('show');
  });

  /* ----------------------------------------------------------
     10. Blog reading progress bar
     ---------------------------------------------------------- */
  var progressBar = document.querySelector('.reading-progress-bar');
  var article = document.querySelector('.article-body');
  if (progressBar && article) {
    window.addEventListener('scroll', function () {
      var scrollTop = window.pageYOffset;
      var docHeight = article.scrollHeight + article.offsetTop - window.innerHeight;
      var pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      progressBar.style.width = pct + '%';
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     11. Auto-pause any autoplay videos when off-screen
     ---------------------------------------------------------- */
  if ('IntersectionObserver' in window) {
    var videos = document.querySelectorAll('video[autoplay]');
    var vidObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var v = entry.target;
        if (!entry.isIntersecting) v.pause();
        else if (v.paused) v.play().catch(function () {});
      });
    }, { threshold: 0.25 });
    videos.forEach(function (v) { vidObs.observe(v); });
  }
})();
