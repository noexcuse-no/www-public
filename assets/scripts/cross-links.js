(function () {
    'use strict';

    /* Cross-link configuration
       Maps source page paths to target articles.
       Each link: { url, title, desc } — Norwegian Bokmål. */
    var crossLinkConfig = [
        {
            match: '/ledelse-60-2/',
            links: [
                { url: '/om-oss/', title: 'Om oss', desc: 'Møt teamet bak No Excuse' },
                { url: '/metode/', title: 'Om metode', desc: 'Forstå metoden bak Ledelse 60:2' }
            ]
        },
        {
            match: '/grc/',
            links: [
                { url: '/triader/', title: 'Triader', desc: 'Forstå triader i organisasjonsanalyse' },
                { url: '/makt/', title: 'Makt', desc: 'Maktens rolle i organisasjoner' },
                { url: '/perspektiv/', title: 'Fire perspektiver', desc: 'Bolman & Deals rammeverk' }
            ]
        },
        {
            match: '/identitet/',
            links: [
                { url: '/struktur/', title: 'Strukturperspektivet', desc: 'Roller, mål og prosesser' },
                { url: '/mennesker/', title: 'Menneskeperspektivet', desc: 'Tillit, relasjoner og medvirkning' },
                { url: '/pavirkning/', title: 'Påvirkningsperspektivet', desc: 'Makt, interesser og konflikt' }
            ]
        },
        {
            match: '/usikkerhet/',
            links: [
                { url: '/tillit/', title: 'Tillit', desc: 'Tillitens betydning i organisasjoner' },
                { url: '/generativ-ki/', title: 'Generativ KI', desc: 'KI i organisasjonsutvikling' },
                { url: '/forankring/', title: 'Beslutningsforankring', desc: 'Forankring av beslutninger' }
            ]
        }
    ];

    /**
     * Find the matching config entry for the current page.
     * @return {object|null}
     */
    function findMatch() {
        var path = window.location.pathname.replace(/\/$/, '') + '/';
        for (var i = 0; i < crossLinkConfig.length; i++) {
            if (path.indexOf(crossLinkConfig[i].match) !== -1) {
                return crossLinkConfig[i];
            }
        }
        return null;
    }

    /**
     * Create a cross-link callout element.
     * @param {object} link - { url, title, desc }
     * @return {HTMLElement}
     */
    function createCallout(link) {
        var el = document.createElement('aside');
        el.className = 'cross-link-callout';
        el.setAttribute('aria-label', 'Relatert innhold');

        var text = document.createTextNode('Les mer om ');
        el.appendChild(text);

        var anchor = document.createElement('a');
        anchor.href = link.url;
        anchor.className = 'cross-link';
        anchor.setAttribute('aria-label', 'Gå til ' + link.title);
        anchor.textContent = link.title;

        var arrow = document.createTextNode(' →');
        el.appendChild(anchor);
        el.appendChild(arrow);

        if (link.desc) {
            var descEl = document.createElement('span');
            descEl.className = 'cross-link-desc';
            descEl.textContent = ' — ' + link.desc;
            el.appendChild(descEl);
        }

        return el;
    }

    /**
     * Inject cross-link callouts after <h2> headings in the article body.
     * Each heading gets one callout containing all relevant links.
     */
    function injectCallouts(config) {
        var articleBody = document.querySelector('.article-body');
        if (!articleBody) return;

        var headings = articleBody.querySelectorAll('h2');
        if (headings.length === 0) return;

        // Build a single callout with all links
        var callout = document.createElement('div');
        callout.className = 'cross-link-section';

        var label = document.createElement('p');
        label.className = 'cross-link-label';
        label.textContent = 'Relaterte artikler:';
        callout.appendChild(label);

        var list = document.createElement('ul');
        list.className = 'cross-link-list';

        for (var i = 0; i < config.links.length; i++) {
            var item = document.createElement('li');
            var link = createCallout(config.links[i]);
            // Replace <aside> wrapper with direct link (already inside <li>)
            var anchor = link.querySelector('a');
            var descSpan = link.querySelector('.cross-link-desc');

            var cleanLink = document.createElement('a');
            cleanLink.href = anchor.href;
            cleanLink.className = 'cross-link';
            cleanLink.setAttribute('aria-label', anchor.getAttribute('aria-label'));
            cleanLink.textContent = anchor.textContent + ' →';

            if (descSpan) {
                var descNode = document.createElement('span');
                descNode.className = 'cross-link-desc';
                descNode.textContent = descSpan.textContent;
                item.appendChild(cleanLink);
                item.appendChild(descNode);
            } else {
                item.appendChild(cleanLink);
            }

            list.appendChild(item);
        }

        callout.appendChild(list);

        // Insert after the last h2
        var lastHeading = headings[headings.length - 1];
        lastHeading.parentNode.insertBefore(callout, lastHeading.nextSibling);
    }

    function init() {
        var config = findMatch();
        if (!config) return;

        // Use requestIdleCallback if available, else fallback to RAF
        var schedule = window.requestIdleCallback || window.requestAnimationFrame;
        schedule(function () {
            injectCallouts(config);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
