/* ============================================================
   BRAND SNAP — main.js
   Domain: thebrandsnap.in
   ============================================================ */

(function () {
  'use strict';

  /* ── Navbar scroll glass effect ── */
  var navbar = document.getElementById('navbar');
  function onScroll() {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 30);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Hamburger / mobile menu ── */
  var hamburger  = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    if (hamburger) { hamburger.classList.remove('open'); hamburger.setAttribute('aria-expanded','false'); }
  }

  function toggleMenu() {
    if (!mobileMenu) return;
    var isOpen = mobileMenu.classList.toggle('open');
    if (hamburger) { hamburger.classList.toggle('open', isOpen); hamburger.setAttribute('aria-expanded', String(isOpen)); }
  }

  if (hamburger) hamburger.addEventListener('click', toggleMenu);
  if (mobileMenu) mobileMenu.querySelectorAll('a').forEach(function(l){ l.addEventListener('click', closeMenu); });
  document.addEventListener('click', function(e){
    if (mobileMenu && mobileMenu.classList.contains('open') && navbar && !navbar.contains(e.target) && !mobileMenu.contains(e.target)) closeMenu();
  });

  /* ── Active nav link ── */
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function(a){
    var href = (a.getAttribute('href') || '').split('#')[0];
    if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
  });

  /* ── Smooth scroll (offset for fixed navbar) ── */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = this.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.pageYOffset - 82;
        window.scrollTo({ top: top, behavior: 'smooth' });
        closeMenu();
      }
    });
  });

  /* ── Scroll reveal (IntersectionObserver) ── */
  var reveals = document.querySelectorAll('[data-reveal]');
  if (reveals.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('revealed'); io.unobserve(e.target); } });
      }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
      reveals.forEach(function(el){ io.observe(el); });
    } else {
      reveals.forEach(function(el){ el.classList.add('revealed'); });
    }
  }

  /* ── Contact form → WhatsApp ── */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name   = (document.getElementById('name')         || {value:''}).value.trim();
      var phone  = (document.getElementById('phone')        || {value:''}).value.trim();
      var btype  = (document.getElementById('businessType') || {value:''}).value;
      var msg    = (document.getElementById('message')      || {value:''}).value.trim();
      if (!name || !phone) { alert('Please enter your name and phone number.'); return; }
      var text = 'Hi Brand Snap! 👋\n\nName: ' + name + '\nPhone: ' + phone + '\nBusiness Type: ' + (btype || 'Not specified') + '\n\nMessage: ' + (msg || 'I want to get my business online.') + '\n\nPlease get in touch!';
      window.open('https://wa.me/919811446304?text=' + encodeURIComponent(text), '_blank', 'noopener,noreferrer');
    });
  }

})();
