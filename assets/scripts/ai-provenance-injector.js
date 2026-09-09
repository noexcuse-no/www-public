/**
 * ai-provenance-injector.js — Injects RDFa provenance attributes on AI-generated content images.
 * 
 * Reads exclude-list from <script id="ai-provenance-exclude-list" type="application/json">
 * injected by provenance-jsonld.html. Injects RDFa attributes on AI-generated images only.
 * NO visible badges — RDFa-only.
 * 
 * Respects:
 * - data-ai-provenance="false" opt-out per image
 * - data-ai-provenance-processed idempotency guard
 * - prefers-reduced-data media query
 * - Required RDFa prefixes on <html> (schema:, iptc:)
 */

(function() {
  'use strict';

  // Configuration
  const EXCLUDE_LIST_ID = 'ai-provenance-exclude-list';
  const PROCESSED_ATTR = 'data-ai-provenance-processed';
  const OPT_OUT_ATTR = 'data-ai-provenance';
  const PREFIX_ATTR = 'prefix';
  const REQUIRED_PREFIXES = ['schema:', 'iptc:'];

  // RDFa attributes to inject
  const DIGITAL_SOURCE_TYPE_URI = 'http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia';
  const LICENSE_URI = 'https://creativecommons.org/publicdomain/zero/1.0/';

  function init() {
    // Check for required RDFa prefixes on <html>
    const htmlPrefix = document.documentElement.getAttribute('prefix') || '';
    const hasSchemaPrefix = htmlPrefix.includes('schema:');
    const hasIptcPrefix = htmlPrefix.includes('iptc:');
    
    if (!hasSchemaPrefix || !hasIptcPrefix) {
      console.warn('ai-provenance-injector: Required RDFa prefixes (schema:, iptc:) not found on <html> prefix attribute. Skipping injection.');
      return;
    }

    // Check prefers-reduced-data
    if (window.matchMedia && window.matchMedia('(prefers-reduced-data: reduce)').matches) {
      return;
    }

    // Load exclude-list from JSON blob
    const excludeListScript = document.getElementById(EXCLUDE_LIST_ID);
    let excludeList = {};
    
    if (excludeListScript) {
      try {
        excludeList = JSON.parse(excludeListScript.textContent);
      } catch (e) {
        console.warn('ai-provenance-injector: Failed to parse exclude-list JSON:', e);
        return;
      }
    } else {
      console.warn('ai-provenance-injector: Exclude-list script not found. Skipping injection.');
      return;
    }

    // Find all content images
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Skip if already processed
      if (img.hasAttribute(PROCESSED_ATTR)) {
        return;
      }
      
      // Skip if explicitly opted out
      if (img.getAttribute(OPT_OUT_ATTR) === 'false') {
        return;
      }
      
      // Get image src
      const src = img.getAttribute('src');
      if (!src) return;
      
      // Normalize src for exclude-list matching
      const normalizedSrc = normalizeSrc(src);
      
      // Check exclude-list
      if (excludeList[normalizedSrc]) {
        return;
      }
      
      // Inject RDFa attributes
      injectRDFa(img);
      
      // Mark as processed
      img.setAttribute(PROCESSED_ATTR, 'true');
    });
  }

  function normalizeSrc(src) {
    // Remove protocol and domain for matching against exclude-list paths
    return src.replace(/^https?:\/\/[^/]+/, '').replace(/^\//, '');
  }

  function injectRDFa(img) {
    // Inject digitalSourceType
    img.setAttribute('property', 'schema:digitalSourceType');
    img.setAttribute('content', 'http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia');
    
    // Inject license (using a second property attribute via dataset approach)
    // Note: Multiple property attributes on same element - we use a workaround
    img.dataset.aiDigitalSourceType = DIGITAL_SOURCE_TYPE_URI;
    img.dataset.aiLicense = LICENSE_URI;
    
    // Set the primary property/content pair (last one wins for property attribute)
    img.setAttribute('property', 'schema:license');
    img.setAttribute('content', 'https://creativecommons.org/publicdomain/zero/1.0/');
    
    // Also set digitalSourceType via a custom attribute for CSS/JS access
    img.setAttribute('data-digital-source-type', DIGITAL_SOURCE_TYPE_URI);
  }

  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();