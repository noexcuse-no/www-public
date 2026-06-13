(function () {
    'use strict';

    var scrollBtn = document.querySelector('.carousel-btn--scroll');
    var hero = document.querySelector('.hero');
    var articleBody = document.querySelector('.article-body');
    var iconDown = scrollBtn && scrollBtn.querySelector('.carousel-icon-down');
    var iconUp = scrollBtn && scrollBtn.querySelector('.carousel-icon-up');

    if (!scrollBtn || !hero) return;

    var isAffixed = false;
    var headerHeight = 85; // matches --header-height

    function toggleAffix() {
        var heroBottom = hero.getBoundingClientRect().bottom;

        if (heroBottom <= 0 && !isAffixed) {
            // Hero scrolled past — affix the button
            scrollBtn.classList.add('is-affixed');
            iconDown.style.display = 'none';
            iconUp.style.display = '';
            scrollBtn.setAttribute('aria-label', 'Rull til toppen');
            isAffixed = true;
        } else if (heroBottom > 0 && isAffixed) {
            // Hero back in view — return to hero position
            scrollBtn.classList.remove('is-affixed');
            iconDown.style.display = '';
            iconUp.style.display = 'none';
            scrollBtn.setAttribute('aria-label', 'Rull til innhold');
            isAffixed = false;
        }
    }

    scrollBtn.addEventListener('click', function () {
        if (isAffixed) {
            // Scroll back to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Scroll down past hero to article content
            var target = articleBody || document.querySelector('.article-layout');
            if (target) {
                var rect = target.getBoundingClientRect();
                var targetPos = rect.top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        }
    });

    // Listen on scroll with passive flag for performance
    window.addEventListener('scroll', toggleAffix, { passive: true });
    toggleAffix(); // set initial state
})();
