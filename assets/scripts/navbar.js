(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var overlay = document.querySelector(".nav-overlay");
  var closeBtn = document.querySelector(".nav-overlay-close");

  if (!toggle || !overlay) return;

  function open() {
    toggle.setAttribute("aria-expanded", "true");
    overlay.setAttribute("aria-hidden", "false");
    overlay.classList.add("active");
    document.body.classList.add("no-scroll");
  }

  function close() {
    toggle.setAttribute("aria-expanded", "false");
    overlay.setAttribute("aria-hidden", "true");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
    toggle.focus();
  }

  toggle.addEventListener("click", function () {
    var expanded = toggle.getAttribute("aria-expanded") === "true";
    if (expanded) {
      close();
    } else {
      open();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", close);
  }

  // Close on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      close();
    }
  });

  // Close when a nav link is clicked (mobile)
  overlay.addEventListener("click", function (e) {
    if (e.target.tagName === "A" && overlay.classList.contains("active")) {
      close();
    }
  });
})();
