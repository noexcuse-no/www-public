(function() {
    'use strict';

    var CONFIG = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    // Brand entrance animations — run on page load
    function initBrandAnimations() {
        // Remove animate-on-scroll from hero-branded elements so parent
        // opacity:0 doesn't hide them during brand animation sequence
        var brandSelectors = '.hero-image, .hero-title, .hero-intro';
        var branded = document.querySelectorAll(brandSelectors);
        branded.forEach(function(el) {
            el.classList.remove('animate-on-scroll');
        });

        // Fade in <main> after hero entrance
        var main = document.querySelector('main');
        if (main) {
            main.classList.add('page-transition');
        }
    }

    // Scroll-triggered animations via Intersection Observer
    function initScrollAnimations() {
        var animatedElements = document.querySelectorAll('.animate-on-scroll');

        if (animatedElements.length === 0) return;

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
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

    function init() {
        initBrandAnimations();
        initScrollAnimations();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
