(function() {
    'use strict';

    /* ===== Stagger Animation Observer ===== */
    var staggerParents = document.querySelectorAll('.stagger-parent');
    if (staggerParents.length > 0 && 'IntersectionObserver' in window) {
        var staggerObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    staggerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        staggerParents.forEach(function(el) {
            staggerObserver.observe(el);
        });
    }
})();
