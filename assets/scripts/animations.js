(function() {
    'use strict';

    // Brand entrance animations — run on page load
    function initBrandAnimations() {
        // Fade in <main> after hero entrance
        var main = document.querySelector('main');
        if (main) {
            main.classList.add('page-transition');
        }
    }

    function init() {
        initBrandAnimations();
    }

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

/* ===== Scroll Affordances ===== */
(function() {
    'use strict';

    function init() {
        var hero = document.querySelector('.hero');
        var scrollCue = document.querySelector('.scroll-indicator');
        var backToTop = document.querySelector('.back-to-top');

        // Scroll cue: hide when hero scrolls out of view
        if (hero && scrollCue) {
            new IntersectionObserver(function(entries) {
                if (!entries[0].isIntersecting) {
                    scrollCue.classList.add('is-hidden');
                }
            }).observe(hero);
        }

        // Back-to-top: show after scrolling past one viewport height
        if (backToTop) {
            var sentinel = document.createElement('div');
            sentinel.style.position = 'absolute';
            sentinel.style.top = '0';
            sentinel.style.left = '0';
            sentinel.style.width = '1px';
            sentinel.style.height = '1px';
            document.body.appendChild(sentinel);

            var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

            // rootMargin extends viewport 100vh upward so the sentinel at
            // document top stays "intersecting" for the first viewport of scroll
            new IntersectionObserver(function(entries) {
                var isPastViewport = !entries[0].isIntersecting;
                backToTop.classList.toggle('is-visible', isPastViewport);
                if (isPastViewport && reduceMotion.matches) {
                    document.documentElement.style.scrollBehavior = 'auto';
                } else if (isPastViewport) {
                    document.documentElement.style.scrollBehavior = 'smooth';
                }
            }, { rootMargin: '100vh 0px 0px 0px' }).observe(sentinel);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
