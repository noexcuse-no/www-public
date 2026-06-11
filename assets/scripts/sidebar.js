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
        if (tocContainer) {
            var headings = body.querySelectorAll('h2, h3');
            var tocItems = [];
            var fragment = document.createDocumentFragment();

            headings.forEach(function(h, i) {
                // Ensure heading has an id for anchor linking
                var id = h.id || 'section-' + i;
                if (!h.id) h.id = id;

                var tag = h.tagName.toLowerCase(); // 'h2' or 'h3'
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

                fragment.appendChild(a);
                tocItems.push(a);
            });

            tocContainer.appendChild(fragment);

            // Show the pager if we have TOC items
            if (tocItems.length > 0 && pager) {
                pager.removeAttribute('hidden');
            }

            // Also populate collapsible mobile TOC if present
            var mobileToc = document.querySelector('.js-toc-collapsible-list');
            if (mobileToc) {
                var cloneFragment = fragment.cloneNode(true);
                // Re-wire click handlers for cloned items
                var cloneLinks = cloneFragment.querySelectorAll('.toc-item');
                cloneLinks.forEach(function(link) {
                    var id = link.dataset.target;
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        var target = document.getElementById(id);
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            // Close the details element
                            var details = link.closest('details');
                            if (details) details.removeAttribute('open');
                        }
                    });
                });
                mobileToc.appendChild(cloneFragment);
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

    /* ===== Init ===== */

    function init() {
        initArticleSidebar();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
