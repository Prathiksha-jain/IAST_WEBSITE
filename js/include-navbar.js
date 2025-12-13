// js/include-navbar.js
(async function () {
  try {
    const resp = await fetch('navbar.html', { cache: 'no-store' });
    if (!resp.ok) throw new Error('Could not load navbar.html');
    const html = await resp.text();

    // inject navbar at top of body
    let root = document.getElementById('navbar-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'navbar-root';
      document.body.insertBefore(root, document.body.firstChild);
    }
    root.innerHTML = html;

    // helper: get file + optional hash from a href string
    const parseHref = (href) => {
      if (!href) return { file: '', hash: '' };
      try {
        const u = new URL(href, window.location.origin);
        return { file: (u.pathname.split('/').pop() || 'index.html'), hash: (u.hash || '') };
      } catch (e) {
        // fallback for relative hrefs
        const parts = href.split('#');
        return { file: (parts[0].split('/').pop() || 'index.html'), hash: parts[1] ? '#' + parts[1] : '' };
      }
    };

    const currentFile = (window.location.pathname.split('/').pop() || 'index.html');

    // Make dropdown-item and nav-link clicks smart
    const handleAnchorClick = (el) => {
      el.addEventListener('click', (e) => {
        const href = el.getAttribute('href') || '';
        const { file: targetFile, hash: targetHash } = parseHref(href);

        if (targetFile === currentFile && targetHash) {
          // same page + hash -> smooth scroll
          e.preventDefault();
          const id = targetHash.slice(1);
          const targetEl = document.getElementById(id);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // update url hash without jumping
            history.replaceState(null, '', targetHash);
          } else {
            // element not present right now — still update hash
            history.replaceState(null, '', targetHash);
          }
        } // else: different page -> let browser navigate (no preventDefault)
      });
    };

    // Attach handlers to dropdown items and top-level nav links
    const dropdownItems = root.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(handleAnchorClick);

    const navLinks = root.querySelectorAll('.nav-link');
    navLinks.forEach(handleAnchorClick);

    // Hover open/close for dropdowns
    const navItems = root.querySelectorAll('.nav-item');
    navItems.forEach((item) => {
      item.addEventListener('mouseenter', () => item.classList.add('open'));
      item.addEventListener('mouseleave', () => item.classList.remove('open'));
    });

    // Accessibility: open on focus, close on blur
    const focusables = root.querySelectorAll('.nav-link, .dropdown-item');
    focusables.forEach((f) => {
      f.addEventListener('focus', (e) => {
        const parent = e.target.closest('.nav-item');
        if (parent) parent.classList.add('open');
      });
      f.addEventListener('blur', (e) => {
        const parent = e.target.closest('.nav-item');
        if (parent) parent.classList.remove('open');
      });
    });

  } catch (err) {
    console.error('Navbar include error:', err);
  }
})();
