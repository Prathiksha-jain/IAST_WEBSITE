// js/hash-scroll.js
(function () {
  function scrollToHash() {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const el = document.getElementById(id);
    if (el) {
      // slight delay to allow layout & images to finish
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    }
  }

  window.addEventListener('DOMContentLoaded', scrollToHash);
  window.addEventListener('hashchange', scrollToHash);
})();
