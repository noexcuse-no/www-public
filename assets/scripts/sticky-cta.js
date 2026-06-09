(function() {
    'use strict';

    /* ===== Sticky CTA Bar ===== */
    var stickyBar = document.getElementById('sticky-cta-bar');
    var hero = document.querySelector('.hero');

    if (stickyBar && hero) {
        var heroBottom = hero.offsetTop + hero.offsetHeight;
        var ticking = false;

        // Check for prior dismissal in this session
        if (sessionStorage.getItem('sticky-cta-dismissed') === 'true') {
            stickyBar.style.display = 'none';
        } else {
            function updateStickyBar() {
                var scrollY = window.scrollY;
                if (scrollY > heroBottom - 100) {
                    stickyBar.classList.add('is-visible');
                } else {
                    stickyBar.classList.remove('is-visible');
                }
            }

            function onScroll() {
                if (!ticking) {
                    window.requestAnimationFrame(function() {
                        updateStickyBar();
                        ticking = false;
                    });
                    ticking = true;
                }
            }

            var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
            if (!reduceMotion.matches) {
                window.addEventListener('scroll', onScroll, { passive: true });
            }

            reduceMotion.addEventListener('change', function(e) {
                if (e.matches) {
                    window.removeEventListener('scroll', onScroll);
                    stickyBar.classList.remove('is-visible');
                } else {
                    window.addEventListener('scroll', onScroll, { passive: true });
                }
            });

            // Dismiss button
            var dismissBtn = stickyBar.querySelector('.sticky-cta-dismiss');
            if (dismissBtn) {
                dismissBtn.addEventListener('click', function() {
                    stickyBar.classList.remove('is-visible');
                    stickyBar.style.display = 'none';
                    sessionStorage.setItem('sticky-cta-dismissed', 'true');
                });
            }

            // IntersectionObserver for final CTA section — hide bar when cta-section is visible
            var ctaSection = document.querySelector('.cta-section');
            if (ctaSection && 'IntersectionObserver' in window) {
                var ctaObserver = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            stickyBar.classList.remove('is-visible');
                        }
                    });
                }, { rootMargin: '0px' });
                ctaObserver.observe(ctaSection);
            }
        }
    }

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
