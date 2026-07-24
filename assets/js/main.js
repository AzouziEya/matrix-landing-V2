(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Année footer
  document.getElementById("footer-year").textContent = new Date().getFullYear();

  // Cookie banner
  var banner = document.getElementById("cookie-banner");
  if (!localStorage.getItem("cookie-choice")) banner.classList.add("visible");
  banner.querySelectorAll("[data-cookie]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      localStorage.setItem("cookie-choice", btn.dataset.cookie);
      banner.classList.remove("visible");
    });
  });
  document.getElementById("manage-cookies").addEventListener("click", function () {
    localStorage.removeItem("cookie-choice");
    banner.classList.add("visible");
  });

  // Reveal au scroll (stagger par lot)
  var revealEls = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      var delay = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        setTimeout(function () { el.classList.add("in"); }, delay);
        delay += 90;
        io.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  // Compteurs KPI
  function animateCount(el) {
    var target = parseInt(el.dataset.target, 10);
    var isK = el.dataset.format === "k";
    if (reduced) {
      el.textContent = isK ? target.toLocaleString("fr-FR") : String(target);
      return;
    }
    var dur = 1400, start = null;
    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.round(target * eased);
      el.textContent = isK ? val.toLocaleString("fr-FR") : String(val);
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  var counters = document.querySelectorAll(".count");
  if ("IntersectionObserver" in window && !reduced) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        cio.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  // Barre de progression de lecture (transform uniquement)
  var progress = document.getElementById("scroll-progress");
  if (progress) {
    var ticking = false;
    function updateProgress() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var ratio = max > 0 ? Math.min(h.scrollTop / max, 1) : 0;
      progress.style.transform = "scaleX(" + ratio + ")";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(updateProgress); ticking = true; }
    }, { passive: true });
    updateProgress();
  }

  // Sticky CTA mobile : visible après le hero, masqué sur la section réservation
  var sticky = document.getElementById("sticky-cta");
  var hero = document.querySelector(".hero");
  var booking = document.getElementById("reserver");
  var pastHero = false, onBooking = false;
  function refresh() { sticky.classList.toggle("visible", pastHero && !onBooking); }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (e) { pastHero = !e[0].isIntersecting; refresh(); }, { threshold: 0 }).observe(hero);
    new IntersectionObserver(function (e) { onBooking = e[0].isIntersecting; refresh(); }, { threshold: 0 }).observe(booking);
  }

  // Modale de réservation (ouvre le calendrier iClosed)
  var modal = document.getElementById("book-modal");
  if (modal) {
    var frame = modal.querySelector("iframe");
    var lastFocus = null;
    function openModal(e) {
      if (e) e.preventDefault();
      lastFocus = document.activeElement;
      if (frame && !frame.src) frame.src = frame.dataset.src;
      modal.hidden = false;
      document.body.classList.add("no-scroll");
      var closeBtn = document.getElementById("book-modal-close");
      if (closeBtn) closeBtn.focus();
    }
    function closeModal() {
      modal.hidden = true;
      document.body.classList.remove("no-scroll");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    document.querySelectorAll(".js-book").forEach(function (btn) {
      btn.addEventListener("click", openModal);
    });
    modal.querySelectorAll("[data-book-close], #book-modal-close").forEach(function (el) {
      el.addEventListener("click", closeModal);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });
  }

  // Menu mobile
  var navToggle = document.getElementById("nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  if (navToggle && mobileNav) {
    function closeNav() {
      mobileNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Ouvrir le menu");
    }
    navToggle.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 900) closeNav();
    });
  }
})();
