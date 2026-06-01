(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var scripts = document.querySelectorAll('script[type="application/ld+json"]');
    var ldScript = null;
    for (var i = 0; i < scripts.length; i++) {
      try {
        var data = JSON.parse(scripts[i].textContent);
        if (data.citation && Array.isArray(data.citation)) {
          ldScript = data;
          break;
        }
      } catch (_) {
        /* skip invalid JSON */
      }
    }

    if (!ldScript) return;

    var citations;
    try {
      citations = JSON.parse(ldScript.textContent).citation;
    } catch (_) {
      return;
    }

    citations.forEach(function (citation) {
      var refId = citation['@id'];
      if (!refId || refId.indexOf('#fn:') !== 0) return;

      var fnName = refId.slice(1); /* "#fn:refname" → "fn:refname" */

      /* Inject microdata on the footnote <li> */
      var li = document.getElementById(fnName);
      if (li) {
        li.setAttribute('itemscope', '');
        li.setAttribute('itemtype', 'https://schema.org/ScholarlyArticle');

        /* Embed full citation as nested JSON-LD */
        var innerScript = document.createElement('script');
        innerScript.type = 'application/ld+json';
        innerScript.textContent = JSON.stringify(citation);
        li.appendChild(innerScript);
      }

      /* Inject itemprop on all <sup> references pointing to this footnote */
      var sups = document.querySelectorAll('sup[id^="fnref:' + citation['@id'].replace('#fn:', '') + '"]');
      for (var j = 0; j < sups.length; j++) {
        sups[j].setAttribute('itemprop', 'citation');
        sups[j].setAttribute('itemid', refId);
      }
    });
  });
})();
