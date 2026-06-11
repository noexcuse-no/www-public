/**
 * Newsletter signup form handler
 * MVP: stores submissions in localStorage with manual export.
 * Replace with API endpoint (Formspree, Mailchimp, etc.) for production.
 */
(function () {
    'use strict';

    const FORM_SELECTOR = '.js-newsletter-form';
    const EMAIL_SELECTOR = '#newsletter-email';
    const ERROR_SELECTOR = '.js-email-error';
    const SUCCESS_SELECTOR = '.js-newsletter-success';
    const STORAGE_KEY = 'noexcuse_newsletter_subscribers';

    function getSubscribers() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch {
            return [];
        }
    }

    function saveSubscriber(email) {
        const subscribers = getSubscribers();
        subscribers.push({
            email: email,
            timestamp: new Date().toISOString(),
            source: window.location.pathname
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(subscribers));
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(input, errorEl) {
        input.closest('.form-group').classList.add('input-error');
        errorEl.classList.add('form-error--visible');
    }

    function clearError(input, errorEl) {
        input.closest('.form-group').classList.remove('input-error');
        errorEl.classList.remove('form-error--visible');
    }

    document.addEventListener('DOMContentLoaded', function () {
        var form = document.querySelector(FORM_SELECTOR);
        if (!form) return;

        var emailInput = form.querySelector(EMAIL_SELECTOR);
        var emailError = form.querySelector(ERROR_SELECTOR);
        var successEl = document.querySelector(SUCCESS_SELECTOR);
        var consentInput = form.querySelector('#newsletter-consent');
        var submitBtn = form.querySelector('button[type="submit"]');

        // Real-time validation on blur
        emailInput.addEventListener('blur', function () {
            if (emailInput.value && !validateEmail(emailInput.value)) {
                showError(emailInput, emailError);
            } else {
                clearError(emailInput, emailError);
            }
        });

        emailInput.addEventListener('input', function () {
            if (emailInput.value && validateEmail(emailInput.value)) {
                clearError(emailInput, emailError);
            }
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var valid = true;

            // Validate email
            if (!emailInput.value || !validateEmail(emailInput.value)) {
                showError(emailInput, emailError);
                valid = false;
            } else {
                clearError(emailInput, emailError);
            }

            // Validate consent
            if (consentInput && !consentInput.checked) {
                valid = false;
                consentInput.closest('.consent-group').style.color = 'var(--error-color, #c62828)';
            } else if (consentInput) {
                consentInput.closest('.consent-group').style.color = '';
            }

            if (!valid) return;

            // Store submission
            saveSubscriber(emailInput.value.trim());

            // Show success
            form.style.display = 'none';
            if (successEl) {
                successEl.classList.add('form-success--visible');
            }
        });
    });
})();
