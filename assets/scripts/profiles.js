(function () {
    'use strict';

    var openDialog = null;
    var opener = null;

    function focusables(dialog) {
        return dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
    }

    function open(dialog, trigger) {
        if (openDialog) {
            close();
        }
        openDialog = dialog;
        opener = trigger;
        dialog.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        var closeBtn = dialog.querySelector('.profile-close');
        if (closeBtn) {
            closeBtn.focus();
        }
    }

    function close() {
        if (!openDialog) {
            return;
        }
        openDialog.classList.remove('active');
        if (opener) {
            opener.setAttribute('aria-expanded', 'false');
            opener.focus();
        }
        openDialog = null;
        opener = null;
        document.body.style.overflow = '';
    }

    function init() {
        var triggers = document.querySelectorAll('.profile-more-btn');
        if (triggers.length === 0) {
            return;
        }

        triggers.forEach(function (trigger) {
            var profile = trigger.closest('.profile');
            var dialog = profile ? profile.querySelector('.profile-expanded') : null;
            if (!dialog) {
                return;
            }
            trigger.addEventListener('click', function () {
                open(dialog, trigger);
            });
        });

        document.querySelectorAll('.profile-expanded .profile-close').forEach(function (closeBtn) {
            closeBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                close();
            });
        });

        document.querySelectorAll('.profile-expanded').forEach(function (dialog) {
            dialog.addEventListener('click', function (e) {
                if (e.target === dialog) {
                    close();
                }
            });
        });

        document.addEventListener('keydown', function (e) {
            if (!openDialog) {
                return;
            }
            if (e.key === 'Escape') {
                close();
                return;
            }
            if (e.key !== 'Tab') {
                return;
            }
            var focusable = Array.prototype.slice.call(focusables(openDialog));
            if (focusable.length === 0) {
                return;
            }
            var first = focusable[0];
            var last = focusable[focusable.length - 1];
            var active = document.activeElement;
            if (e.shiftKey && (active === first || !openDialog.contains(active))) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && active === last) {
                e.preventDefault();
                first.focus();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
