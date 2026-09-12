/**
 * Go Params — Vanity URL parameter append
 * Appends utm_source and utm_medium=qr to the canonical URL
 * Runs on vanity /go/<slug>/ redirect pages
 */

(function () {
    'use strict';

    function appendUtmParams() {
        try {
            var canonicalLink = document.querySelector('link[rel="canonical"]');
            if (!canonicalLink) return;

            var canonicalUrl = canonicalLink.href;
            var url = new URL(canonicalUrl);

            // Extract slug from current path (/go/<slug>/)
            var path = window.location.pathname;
            var slugMatch = path.match(/\/go\/([^\/]+)\/?$/);
            if (!slugMatch) return;

            var slug = slugMatch[1];

            // Append UTM parameters
            url.searchParams.set('utm_source', slug);
            url.searchParams.set('utm_medium', 'qr');

            // Update the meta-refresh URL
            var metaRefresh = document.querySelector('meta[http-equiv="refresh"]');
            if (metaRefresh) {
                metaRefresh.content = '0; url=' + url.toString();
            }

            // Update the canonical link
            var canonicalLink = document.querySelector('link[rel="canonical"]');
            if (canonicalLink) {
                canonicalLink.href = url.toString();
            }

            // Update the redirect link text
            var redirectLink = document.querySelector('a[href]');
            if (redirectLink) {
                redirectLink.href = url.toString();
            }
        } catch (_) {
            // Silently fail - meta-refresh will still work with original URL
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', appendUtmParams);
    } else {
        appendUtmParams();
    }
})();