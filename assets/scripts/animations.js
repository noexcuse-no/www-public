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

/* ===== Hero Effects Dispatcher ===== */
(function() {
    'use strict';

    var effects = {};

    function register(name, handler) {
        effects[name] = handler;
    }

    // Expose register so future effects can be added outside this file
    window.HeroEffects = { register: register };

    function init() {
        var hero = document.querySelector('[data-hero-effect]');
        if (!hero) return;
        var effectName = hero.getAttribute('data-hero-effect');
        if (effects[effectName]) {
            effects[effectName](hero);
        }
    }

    // Parallax-fade: image scrolls slower, title/intro fade on scroll
    register('parallax-fade', function(hero) {
        var image = hero.querySelector('.hero-image');
        var titles = hero.querySelectorAll('.hero-title, .hero-intro');
        var scrollMax = 300;
        var ticking = false;

        function update(scrollY) {
            var progress = Math.min(scrollY / scrollMax, 1);

            if (image) {
                image.style.transform = 'translateY(' + (progress * 40) + 'px)';
            }

            titles.forEach(function(el) {
                el.style.opacity = 1 - progress;
                el.style.transform = 'translateY(' + (progress * 20) + 'px)';
            });
        }

        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    update(window.scrollY);
                    ticking = false;
                });
                ticking = true;
            }
        }

        // Track reduced motion
        var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (!reduceMotion.matches) {
            window.addEventListener('scroll', onScroll, { passive: true });
        }

        // Listen for changes to reduced motion preference
        reduceMotion.addEventListener('change', function(e) {
            if (e.matches) {
                window.removeEventListener('scroll', onScroll);
                // Reset to visible state
                update(0);
            } else {
                window.addEventListener('scroll', onScroll, { passive: true });
            }
        });
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
