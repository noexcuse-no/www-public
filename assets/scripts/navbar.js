(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");

  if (!toggle || !navLinks) return;

  toggle.addEventListener("click", function () {
    var expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", !expanded);
    navLinks.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
      toggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("active");
    }
  });

  // Close menu on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      toggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("active");
      toggle.focus();
    }
  });
})();
