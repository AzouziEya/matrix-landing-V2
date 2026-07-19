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

  // Sticky CTA : visible dès le premier scroll, masqué sur la section réservation
  var sticky = document.getElementById("sticky-cta");
  var booking = document.getElementById("reserver");
  var scrolled = false, onBooking = false;
  function refresh() { sticky.classList.toggle("visible", scrolled && !onBooking); }
  window.addEventListener("scroll", function () {
    var past = window.scrollY > 300;
    if (past !== scrolled) { scrolled = past; refresh(); }
  }, { passive: true });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (e) { onBooking = e[0].isIntersecting; refresh(); }, { threshold: 0 }).observe(booking);
  }
})();
