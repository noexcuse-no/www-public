/**
 * Scroll Animation Controller
 * Uses Intersection Observer to trigger animations when elements enter viewport
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    // Initialize when DOM is ready
    function init() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        if (animatedElements.length === 0) {
            return;
        }

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // One-shot: disconnect after first trigger
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: CONFIG.threshold,
            rootMargin: CONFIG.rootMargin
        });

        animatedElements.forEach(function(element) {
            observer.observe(element);
        });
    }

    // Run immediately if DOM is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
