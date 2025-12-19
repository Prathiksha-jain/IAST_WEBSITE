

(function () {
  "use strict";

  /* -------------------------------------
   SCROLL HEADER EFFECT
  ------------------------------------- */
  function toggleScrolled() {
    const body = document.body;
    const header = document.querySelector("#header");
    if (!header) return;

    if (
      !header.classList.contains("scroll-up-sticky") &&
      !header.classList.contains("sticky-top") &&
      !header.classList.contains("fixed-top")
    ) return;

    body.classList.toggle("scrolled", window.scrollY > 100);
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /* -------------------------------------
   HAMBURGER MENU (DYNAMIC SAFE)
  ------------------------------------- */
  document.addEventListener("click", function (e) {
    const hamburger = e.target.closest("#hamburger");
    if (hamburger) {
      document.querySelector(".main-nav")?.classList.toggle("active");
    }
  });

  /* -------------------------------------
   ACTIVE NAV ITEM (ROBUST & FINAL)
   Works with dynamic navbar.html
  ------------------------------------- */
  function setActiveNav() {
    const navLinks = document.querySelectorAll(".nav-link");

    // Navbar not loaded yet → retry
    if (!navLinks.length) {
      setTimeout(setActiveNav, 50);
      return;
    }

    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
      let href = link.getAttribute("href");
      if (!href) return;

      // Clean href
      href = href.split("?")[0].split("#")[0];

      // Home page handling
      if (
        (currentPath === "/" || currentPath.endsWith("/index.html")) &&
        href === "index.html"
      ) {
        link.classList.add("active");
        return;
      }

      // Match any folder depth
      if (currentPath.endsWith(href)) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("load", setActiveNav);

  /* -------------------------------------
   PRELOADER
  ------------------------------------- */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => preloader.remove());
  }

  /* -------------------------------------
   SCROLL TOP BUTTON
  ------------------------------------- */
  const scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      scrollTop.classList.toggle("active", window.scrollY > 100);
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener("click", e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("scroll", toggleScrollTop);
  window.addEventListener("load", toggleScrollTop);

  /* -------------------------------------
   AOS INIT
  ------------------------------------- */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

  /* -------------------------------------
   GLIGHTBOX
  ------------------------------------- */
  GLightbox({ selector: ".glightbox" });

  /* -------------------------------------
   PURE COUNTER
  ------------------------------------- */
  new PureCounter();

  /* -------------------------------------
   ISOTOPE
  ------------------------------------- */
  document.querySelectorAll(".isotope-layout").forEach(layout => {
    const container = layout.querySelector(".isotope-container");
    if (!container) return;

    const iso = new Isotope(container, {
      itemSelector: ".isotope-item",
      layoutMode: layout.dataset.layout || "masonry",
      filter: layout.dataset.defaultFilter || "*",
      sortBy: layout.dataset.sort || "original-order"
    });

    layout.querySelectorAll(".isotope-filters li").forEach(filter => {
      filter.addEventListener("click", function () {
        layout.querySelector(".filter-active")?.classList.remove("filter-active");
        this.classList.add("filter-active");
        iso.arrange({ filter: this.dataset.filter });
      });
    });
  });


  /* -------------------------------------
   SWIPER
  ------------------------------------- */
  window.addEventListener("load", () => {
    document.querySelectorAll(".init-swiper").forEach(swiperEl => {
      const config = JSON.parse(
        swiperEl.querySelector(".swiper-config").innerHTML.trim()
      );
      new Swiper(swiperEl, config);
    });
  });

  /* -------------------------------------
   HASH SCROLL FIX
  ------------------------------------- */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          const offset = parseInt(getComputedStyle(section).scrollMarginTop);
          window.scrollTo({
            top: section.offsetTop - offset,
            behavior: "smooth"
          });
        }, 100);
      }
    }
  });

  (function () {
  const toc = document.querySelector(".table-of-contents");
  const wrapper = document.querySelector(".article-wrapper");

  if (!toc || !wrapper) return;

  let tocTop = toc.getBoundingClientRect().top + window.scrollY;
  let tocLeft = toc.getBoundingClientRect().left;
  let tocWidth = toc.offsetWidth;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (scrollY > tocTop - 120) {
      toc.classList.add("is-fixed");
      toc.style.left = `${tocLeft}px`;
      toc.style.width = `${tocWidth}px`;
    } else {
      toc.classList.remove("is-fixed");
      toc.style.left = "";
      toc.style.width = "";
    }
  });

  // Recalculate on resize (important)
  window.addEventListener("resize", () => {
    if (!toc.classList.contains("is-fixed")) {
      tocTop = toc.getBoundingClientRect().top + window.scrollY;
      tocLeft = toc.getBoundingClientRect().left;
      tocWidth = toc.offsetWidth;
    }
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const toc = document.querySelector(".table-of-contents");
  if (!toc) return;

  const rect = toc.getBoundingClientRect();

  toc.style.left = rect.left + "px";
}); 

})();


