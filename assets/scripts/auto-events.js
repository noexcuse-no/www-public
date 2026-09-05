/**
 * Auto Events — Simple Analytics Events API dispatcher
 * Fires 12 site-side events per analytics-events spec
 * Cookie-free, no AI content in metadata
 */

(function () {
    'use strict';

    /* ── Constants ──────────────────────────── */
    var SA_EVENT_NAME = 'sa_event';
    var EVENTS = {
        TOPIC_LANDING_VIEW: 'topic_landing_view',
        PROBLEM_PAGE_VIEW: 'problem_page_view',
        AI_TOPIC_SELECTED: 'ai_topic_selected',
        AI_PROMPT_COPIED: 'ai_prompt_copied',
        AI_RETURN: 'ai_return',
        RELATED_TOPIC_OPENED: 'related_topic_opened',
        PRODUCT_VIEW: 'product_view',
        FIT_VIEW: 'fit_view',
        PRICE_VIEW: 'price_view',
        METHOD_VIEW: 'method_view',
        BOOKING_CLICK: 'booking_click',
        REFERRAL_SOURCE: 'referral_source'
    };

    /* ── Helpers ────────────────────────────── */
    function fireEvent(name, metadata) {
        if (typeof window.sa_event === 'function') {
            try {
                window.sa_event(name, metadata);
            } catch (_) { /* SA not ready or blocked */ }
        }
    }

    function getPageClass() {
        var body = document.body;
        if (!body) return null;
        var classes = body.className.split(' ');
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] !== 'animate-on-scroll' && classes[i] !== 'fade-in-up') {
                return classes[i];
            }
        }
        return null;
    }

    function getAcquisitionCategory() {
        try {
            var params = new URLSearchParams(window.location.search);
            var utmSource = params.get('utm_source');
            if (utmSource) return utmSource;
            var ref = document.referrer;
            if (ref) {
                var hostname = new URL(ref).hostname;
                if (hostname.includes('google')) return 'google';
                if (hostname.includes('linkedin')) return 'linkedin';
                if (hostname.includes('facebook') || hostname.includes('fb.com')) return 'facebook';
                if (hostname.includes('twitter') || hostname.includes('x.com')) return 'twitter';
                if (hostname.includes('bing')) return 'bing';
                return 'referral';
            }
            return 'direct';
        } catch (_) {
            return 'direct';
        }
    }

    function getHighestIntentSessionClass() {
        // Documented classification logic (no lead scoring)
        // Priority: booking_click > product_view > fit_view/price_view/method_view > problem_page_view > topic_landing_view
        // This is documented for analytics consumers; actual classification happens server-side
        return 'documented';
    }

    /* ── Page View Events ───────────────────── */
    function firePageViewEvents() {
        var pageClass = getPageClass();
        var acquisition = getAcquisitionCategory();
        var baseMeta = { source: window.location.pathname, acquisition: acquisition };

        if (!pageClass) return;

        switch (pageClass) {
            case 'product':
                fireEvent(EVENTS.PRODUCT_VIEW, baseMeta);
                break;
            case 'buying-situation':
                fireEvent(EVENTS.PROBLEM_PAGE_VIEW, baseMeta);
                break;
            case 'frame':
            case 'benefit':
            case 'article':
            case 'topic':
                fireEvent(EVENTS.TOPIC_LANDING_VIEW, baseMeta);
                break;
            default:
                // Other pages (home, etc.) don't fire topic_landing_view
                break;
        }
    }

    /* ── Section Visibility (IntersectionObserver) ───────────────────── */
    function observeSectionVisibility() {
        if (!('IntersectionObserver' in window)) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var target = entry.target;
                var id = target.id || target.getAttribute('data-section');
                if (!id) return;

                var meta = { section: id, source: window.location.pathname };

                switch (id) {
                    case 'passer':
                    case 'fit':
                        fireEvent(EVENTS.FIT_VIEW, meta);
                        break;
                    case 'pris':
                    case 'price':
                        fireEvent(EVENTS.PRICE_VIEW, meta);
                        break;
                    case 'prosess':
                    case 'method':
                    case 'hvordan-det-fungerer':
                        fireEvent(EVENTS.METHOD_VIEW, meta);
                        break;
                }
            });
        }, { threshold: 0.5 });

        // Observe sections with IDs or data-section attributes
        var sections = document.querySelectorAll('section[id], [data-section]');
        sections.forEach(function (section) {
            observer.observe(section);
        });
    }

    /* ── AI Topic Selection ────────────────── */
    function attachAITopicClicks() {
        var buttons = document.querySelectorAll('.ai-topic-btn');
        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var meta = {
                    topic_label: btn.dataset.topicLabel,
                    source_url: btn.dataset.sourceUrl,
                    sixty_two_url: btn.dataset.sixtyTwoUrl,
                    source: window.location.pathname
                };
                fireEvent(EVENTS.AI_TOPIC_SELECTED, meta);
            });
        });
    }

    /* ── Prompt Copy ───────────────────────── */
    function attachPromptCopy() {
        var copyBtn = document.querySelector('.copy-btn');
        if (!copyBtn) return;

        copyBtn.addEventListener('click', function () {
            var modal = document.querySelector('.review-questions-modal');
            if (!modal) return;
            var question = modal.querySelector('.modal-question');
            if (!question) return;

            var meta = {
                question_preview: question.textContent.substring(0, 100),
                source: window.location.pathname
            };
            fireEvent(EVENTS.AI_PROMPT_COPIED, meta);
        });
    }

    /* ── AI Return ─────────────────────────── */
    function checkAIReturn() {
        try {
            var params = new URLSearchParams(window.location.search);
            if (params.get('ref') === 'ai-retur') {
                var anchor = params.get('anchor') || '';
                var meta = {
                    return_anchor: anchor,
                    source: window.location.pathname
                };
                fireEvent(EVENTS.AI_RETURN, meta);
            }
        } catch (_) { /* ignore */ }
    }

    /* ── Related Topic Links ───────────────── */
    function attachRelatedTopicClicks() {
        var links = document.querySelectorAll('a[href*="/perspektiv/"], a[href*="/struktur/"], a[href*="/mennesker/"], a[href*="/pavirkning/"], a[href*="/identitet/"]');
        links.forEach(function (link) {
            link.addEventListener('click', function () {
                var meta = {
                    target_url: link.href,
                    source: window.location.pathname
                };
                fireEvent(EVENTS.RELATED_TOPIC_OPENED, meta);
            });
        });
    }

    /* ── Booking Clicks ────────────────────── */
    function attachBookingClicks() {
        var links = document.querySelectorAll('a[href*="/bestill/"], a[href*="/samtale/"]');
        links.forEach(function (link) {
            link.addEventListener('click', function () {
                var meta = {
                    target_url: link.href,
                    source: window.location.pathname
                };
                fireEvent(EVENTS.BOOKING_CLICK, meta);
            });
        });
    }

    /* ── Referral Source ───────────────────── */
    function fireReferralSource() {
        var acquisition = getAcquisitionCategory();
        if (acquisition !== 'direct') {
            fireEvent(EVENTS.REFERRAL_SOURCE, {
                source: acquisition,
                referrer: document.referrer || '',
                landing_page: window.location.pathname
            });
        }
    }

    /* ── Bootstrap ─────────────────────────── */
    function init() {
        // Fire page view event
        firePageViewEvents();

        // Fire referral source
        fireReferralSource();

        // Check AI return
        checkAIReturn();

        // Observe section visibility
        observeSectionVisibility();

        // Attach click handlers
        attachAITopicClicks();
        attachPromptCopy();
        attachRelatedTopicClicks();
        attachBookingClicks();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();