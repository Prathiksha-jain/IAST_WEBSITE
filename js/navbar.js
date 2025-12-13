// js/navbar.js
(function () {
  function setupDropdowns(nav) {
    const dropdownParents = nav.querySelectorAll('.nav-item');
    dropdownParents.forEach(parent => {
      const dropdown = parent.querySelector('.dropdown');
      const link = parent.querySelector('.nav-link');
      if (!dropdown || !link) return;

      parent.addEventListener('mouseenter', () => dropdown.classList.add('open'));
      parent.addEventListener('mouseleave', () => dropdown.classList.remove('open'));

      link.addEventListener('click', (e) => {
        const isMobile = window.matchMedia('(max-width: 900px)').matches;
        if (isMobile) {
          e.preventDefault();
          dropdown.classList.toggle('open');
        }
      });
    });
  }

  function setupActiveLink(nav) {
    const links = nav.querySelectorAll('.main-nav .nav-link');
    const currentPath = location.pathname.split('/').pop() || 'index.html';
    links.forEach(a => {
      const href = a.getAttribute('href') || '';
      const hrefPath = href.split('/').pop();
      if (hrefPath === currentPath) a.classList.add('active');
      else a.classList.remove('active');
    });
  }

  function stickyHandler(nav) {
    const stickyClass = 'nav-sticky';
    const offset = 20;
    if (window.scrollY > offset) nav.classList.add(stickyClass);
    else nav.classList.remove(stickyClass);
  }

  function initNavbar() {
    const nav = document.querySelector('nav.nav-wrapper');
    if (!nav) {
      console.warn('initNavbar: nav not found');
      return;
    }
    setupDropdowns(nav);
    setupActiveLink(nav);
    window.addEventListener('scroll', () => stickyHandler(nav));
    stickyHandler(nav);
    window.addEventListener('popstate', () => setupActiveLink(nav));
  }

  window.initNavbar = initNavbar;
})();
