// js/main.js
(function () {
  const defaultConfig = {
    company_name: "IAST",
    floating_cta_text: "Request Proposal",
    secondary_cta_text: "CTV – Training & Workshops",
    primary_color: "#00aeff",
    accent_color: "#8000ff",
    background_color: "#0a0e27",
    text_color: "#ffffff",
    glass_opacity: 0.08,
    font_family: "Poppins",
    font_size: 15,
  };

  function applyConfig(config = {}) {
    const companyEl = document.getElementById("company-name");
    if (companyEl) companyEl.textContent = config.company_name || defaultConfig.company_name;

    const floatingEl = document.getElementById("floating-cta");
    if (floatingEl) floatingEl.textContent = config.floating_cta_text || defaultConfig.floating_cta_text;

    const secondaryBtn = document.getElementById("secondary-cta");
    if (secondaryBtn && secondaryBtn.querySelector('span')) secondaryBtn.querySelector('span').textContent = config.secondary_ct_text || defaultConfig.secondary_cta_text;

    if (document.body) {
      document.body.style.background = `linear-gradient(135deg, ${config.background_color || defaultConfig.background_color} 0%, #1a1d3a 50%, ${config.background_color || defaultConfig.background_color} 100%)`;
      document.body.style.fontFamily = `${config.font_family || defaultConfig.font_family}, sans-serif`;
    }
  }

  function setupHeroCarousel() {
    let currentHeroSlide = 0;
    let heroAutoPlayInterval;
    function showHeroSlide(index) {
      const slides = document.querySelectorAll(".hero-slide");
      const dots = document.querySelectorAll(".hero-dot");
      if (!slides.length) return;
      slides.forEach(s => s.classList.remove("hero-slide-active"));
      dots.forEach(d => d.classList.remove("hero-dot-active"));
      if (index >= slides.length) currentHeroSlide = 0;
      else if (index < 0) currentHeroSlide = slides.length - 1;
      else currentHeroSlide = index;
      slides[currentHeroSlide].classList.add("hero-slide-active");
      if (dots[currentHeroSlide]) dots[currentHeroSlide].classList.add("hero-dot-active");
    }
    window.goToHeroSlide = function (i) { showHeroSlide(i); clearInterval(heroAutoPlayInterval); startHeroAutoPlay(); };
    function nextHeroSlide() { showHeroSlide(currentHeroSlide + 1); }
    function startHeroAutoPlay() { heroAutoPlayInterval = setInterval(nextHeroSlide, 5000); }
    if (document.querySelectorAll(".hero-slide").length) startHeroAutoPlay();
  }

  function setupServicesCarousel() {
    let currentSlide = 0;
    const slidesToShow = 3;
    window.moveCarousel = function (direction) {
      const carousel = document.getElementById("servicesCarousel");
      if (!carousel) return;
      const cards = carousel.querySelectorAll(".carousel-card");
      if (!cards.length) return;
      const totalSlides = cards.length;
      const maxSlide = Math.max(0, totalSlides - slidesToShow);
      currentSlide += direction;
      if (currentSlide < 0) currentSlide = maxSlide;
      else if (currentSlide > maxSlide) currentSlide = 0;
      const cardWidth = cards[0].offsetWidth;
      const gap = 24;
      const offset = -(currentSlide * (cardWidth + gap));
      carousel.style.transform = `translateX(${offset}px)`;
    };
    if (document.getElementById("servicesCarousel")) setInterval(() => moveCarousel(1), 5000);
  }

  function setupPageNavigation() {
    window.showPage = function (pageId) {
      const allPages = document.querySelectorAll(".page-content");
      if (!allPages.length) return;
      allPages.forEach((page) => (page.style.display = "none"));
      const selectedPage = document.getElementById(pageId);
      if (selectedPage) {
        selectedPage.style.display = "block";
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.scrollToSection = function (sectionId) {
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    };
  }

  function setupForms() {
    document.addEventListener('DOMContentLoaded', function () {
      const contactForm = document.getElementById("contactForm");
      if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
          e.preventDefault();
          const submitBtn = contactForm.querySelector(".submit-btn");
          if (!submitBtn) return;
          const originalText = submitBtn.textContent;
          submitBtn.textContent = "✓ Message Sent!";
          submitBtn.style.background = "linear-gradient(135deg, #28a745 0%, #20c997 100%)";
          contactForm.reset();
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = "linear-gradient(135deg, #00aeff 0%, #0066ff 100%)";
          }, 3000);
        });
      }
      const applyButtons = document.querySelectorAll(".apply-btn");
      applyButtons.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          const originalText = this.textContent;
          this.textContent = "✓ Application Sent!";
          this.style.background = "linear-gradient(135deg, #28a745 0%, #20c997 100%)";
          setTimeout(() => {
            this.textContent = originalText;
            this.style.background = "linear-gradient(135deg, #00aeff 0%, #0066ff 100%)";
          }, 3000);
        });
      });
    });
  }

  function initMain() {
    applyConfig();
    setupHeroCarousel();
    setupServicesCarousel();
    setupPageNavigation();
    setupForms();
  }

  window.initMain = initMain;
})();
