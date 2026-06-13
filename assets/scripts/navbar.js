(function () {
  "use strict";

  var toggles = document.querySelectorAll(".nav-toggle, .burger-pill");
  var overlay = document.querySelector(".nav-overlay");
  var closeBtn = document.querySelector(".nav-overlay-close");

  if (!toggles.length || !overlay) return;

  var activeToggle = null;

  function open(toggle) {
    activeToggle = toggle;
    toggle.setAttribute("aria-expanded", "true");
    overlay.setAttribute("aria-hidden", "false");
    overlay.classList.add("active");
    document.body.classList.add("no-scroll");
  }

  function close() {
    if (activeToggle) {
      activeToggle.setAttribute("aria-expanded", "false");
      activeToggle.focus();
    }
    overlay.setAttribute("aria-hidden", "true");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }

  Array.prototype.forEach.call(toggles, function (toggle) {
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) {
        close();
      } else {
        open(toggle);
      }
    });
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
