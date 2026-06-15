(function() {
    'use strict';

    /* ===== W1 Article Sidebar ===== */

    function initArticleSidebar() {
        var pager = document.querySelector('.article-pager');
        var questions = document.querySelector('.article-questions');
        var hero = document.querySelector('.hero');
        var body = document.querySelector('.article-body');

        if (!body) return;

        // --- 1. Build TOC from h2/h3 in article body ---
        var tocContainer = pager ? pager.querySelector('.js-toc-list') : null;
        var mobileTocContainer = document.querySelector('.toc-mobile-overlay .js-toc-list');
        if (tocContainer || mobileTocContainer) {
            var headings = body.querySelectorAll('h2, h3');
            var tocItems = [];

            function createTocItem(h, i) {
                var id = h.id || 'section-' + i;
                if (!h.id) h.id = id;

                var tag = h.tagName.toLowerCase();
                var text = h.textContent.trim();

                var a = document.createElement('a');
                a.className = 'toc-item toc-item--' + tag;
                a.href = '#' + id;
                a.textContent = text;
                a.dataset.target = id;
                a.addEventListener('click', function(e) {
                    e.preventDefault();
                    var target = document.getElementById(id);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
                return a;
            }

            if (tocContainer) {
                var desktopFragment = document.createDocumentFragment();
                headings.forEach(function(h, i) {
                    var a = createTocItem(h, i);
                    desktopFragment.appendChild(a);
                    tocItems.push(a);
                });
                tocContainer.appendChild(desktopFragment);

                if (tocItems.length > 0 && pager) {
                    pager.removeAttribute('hidden');
                }
            }

            if (mobileTocContainer) {
                var mobileFragment = document.createDocumentFragment();
                headings.forEach(function(h, i) {
                    var a = createTocItem(h, i);
                    a.addEventListener('click', function() {
                        if (!document.querySelector('.toc-mobile-overlay').hidden) {
                            closeMobileToc();
                        }
                    });
                    mobileFragment.appendChild(a);
                    tocItems.push(a);
                });
                mobileTocContainer.appendChild(mobileFragment);

                var toggle = document.querySelector('.toc-mobile-toggle');
                if (toggle && tocItems.length > 0) {
                    toggle.hidden = false;
                }
            }

            // --- 2. Scroll-spy: highlight active TOC item ---
            if ('IntersectionObserver' in window && tocItems.length > 0) {
                var headingEls = Array.from(headings);
                var currentIndex = 0;

                var spyObserver = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            var idx = headingEls.indexOf(entry.target);
                            if (idx !== -1) {
                                currentIndex = idx;
                                updateActive(tocItems, currentIndex);
                            }
                        }
                    });
                }, {
                    rootMargin: '-80px 0px -60% 0px',
                    threshold: 0
                });

                headingEls.forEach(function(h) {
                    spyObserver.observe(h);
                });

                // Fallback: set first item active initially
                if (tocItems.length > 0) {
                    tocItems[0].classList.add('toc-item--active');
                }
            }
        }

        // --- 3. Hero visibility observer: show questions sidebar after hero scrolls past ---
        if (questions) {
            if (hero && 'IntersectionObserver' in window) {
                var visibilityObserver = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        questions.classList.toggle('sidebar-visible', !entry.isIntersecting);
                    });
                }, { threshold: 0 });

                visibilityObserver.observe(hero);
            } else if (hero) {
                // Fallback: show after scrolling past hero
                var checkScroll = function() {
                    var heroBottom = hero.offsetTop + hero.offsetHeight;
                    questions.classList.toggle('sidebar-visible', window.scrollY > heroBottom - 100);
                };
                window.addEventListener('scroll', checkScroll, { passive: true });
                checkScroll();
            } else {
                // No hero — show immediately
                questions.classList.add('sidebar-visible');
            }
        }
    }

    function updateActive(items, activeIndex) {
        items.forEach(function(item, i) {
            item.classList.toggle('toc-item--active', i <= activeIndex);
        });
    }

    /* ===== 4. Collapsible Questions: auto-collapse on tight viewports ===== */

    function initQuestionsCollapse() {
        var card = document.querySelector('.sidebar-card--questions.is-collapsible');
        if (!card) return;

        var toggle = card.querySelector('.questions-toggle');
        var list   = card.querySelector('.questions-list');
        if (!toggle || !list) return;

        toggle.addEventListener('click', function() {
            var expanded = toggle.getAttribute('aria-expanded') === 'true';
            var next = !expanded;
            toggle.setAttribute('aria-expanded', next);
            card.classList.toggle('is-expanded', next);
            toggle.querySelector('.toggle-label').textContent = next ? 'Skjul spørsmål' : 'Vis alle spørsmål';
            toggle.classList.toggle('is-collapsed', !next);
        });

        var checkCollapse = function() {
            var cardRect = card.getBoundingClientRect();
            var viewportHeight = window.innerHeight;
            // If card bottom extends beyond viewport, default to collapsed
            if (cardRect.bottom > viewportHeight && !card.classList.contains('is-expanded')) {
                toggle.setAttribute('aria-expanded', 'false');
                toggle.querySelector('.toggle-label').textContent = 'Vis alle spørsmål';
                toggle.classList.add('is-collapsed');
            } else {
                // Default expanded
                toggle.setAttribute('aria-expanded', 'true');
                toggle.querySelector('.toggle-label').textContent = 'Skjul spørsmål';
                toggle.classList.remove('is-collapsed');
                card.classList.add('is-expanded');
            }
        };

        // Run after sidebar visibility settles
        setTimeout(checkCollapse, 300);
        window.addEventListener('resize', checkCollapse);
    }

    /* ===== Init ===== */

    /* ===== 5. Mobile TOC Modal (R34) ===== */

    var activeMobileTocToggle = null;

    function openMobileToc() {
        var overlay = document.querySelector('.toc-mobile-overlay');
        var toggle = document.querySelector('.toc-mobile-toggle');
        if (!overlay) return;

        activeMobileTocToggle = toggle;
        overlay.hidden = false;
        document.body.classList.add('no-scroll');

        var modal = overlay.querySelector('.toc-mobile-modal');
        if (modal) {
            var firstFocusable = modal.querySelector('button, a, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) firstFocusable.focus();
        }

        overlay.addEventListener('keydown', trapMobileTocFocus);
    }

    function closeMobileToc() {
        var overlay = document.querySelector('.toc-mobile-overlay');
        if (!overlay) return;

        overlay.hidden = true;
        document.body.classList.remove('no-scroll');
        overlay.removeEventListener('keydown', trapMobileTocFocus);

        if (activeMobileTocToggle) {
            activeMobileTocToggle.focus();
            activeMobileTocToggle = null;
        }
    }

    function trapMobileTocFocus(e) {
        if (e.key !== 'Tab' && e.key !== 'Escape') return;

        var overlay = document.querySelector('.toc-mobile-overlay');
        if (!overlay || overlay.hidden) return;

        var modal = overlay.querySelector('.toc-mobile-modal');
        if (!modal) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            closeMobileToc();
            return;
        }

        var focusable = modal.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;

        var first = focusable[0];
        var last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }

    function initMobileTocModal() {
        var toggle = document.querySelector('.toc-mobile-toggle');
        var overlay = document.querySelector('.toc-mobile-overlay');
        if (!toggle || !overlay) return;

        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            openMobileToc();
        });

        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeMobileToc();
            }
        });

        var closeBtn = overlay.querySelector('.toc-mobile-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeMobileToc);
        }

        var closeBottom = overlay.querySelector('.toc-mobile-close-bottom');
        if (closeBottom) {
            closeBottom.addEventListener('click', closeMobileToc);
        }
    }

    /* ===== Init ===== */

    function init() {
        initArticleSidebar();
        initQuestionsCollapse();
        initMobileTocModal();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
