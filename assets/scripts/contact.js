/**
 * Contact form handler
 * MVP: stores submissions in localStorage with manual export.
 * Replace with API endpoint for production.
 */
(function () {
    'use strict';

    var FORM_SELECTOR = '.js-contact-form';
    var NAME_SELECTOR = '#contact-name';
    var EMAIL_SELECTOR = '#contact-email';
    var MESSAGE_SELECTOR = '#contact-message';
    var SUCCESS_SELECTOR = '.js-contact-success';
    var STORAGE_KEY = 'noexcuse_contact_messages';

    function getMessages() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    function saveMessage(data) {
        var messages = getMessages();
        messages.push({
            name: data.name,
            email: data.email,
            message: data.message,
            timestamp: new Date().toISOString(),
            source: window.location.pathname
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(input, errorSelector) {
        var errorEl = input.closest('.form-group').querySelector(errorSelector);
        if (errorEl) {
            input.closest('.form-group').classList.add('input-error');
            errorEl.classList.add('form-error--visible');
        }
    }

    function clearError(input, errorSelector) {
        var errorEl = input.closest('.form-group').querySelector(errorSelector);
        if (errorEl) {
            input.closest('.form-group').classList.remove('input-error');
            errorEl.classList.remove('form-error--visible');
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        var form = document.querySelector(FORM_SELECTOR);
        if (!form) return;

        var nameInput = form.querySelector(NAME_SELECTOR);
        var emailInput = form.querySelector(EMAIL_SELECTOR);
        var messageInput = form.querySelector(MESSAGE_SELECTOR);
        var consentInput = form.querySelector('#contact-consent');
        var successEl = document.querySelector(SUCCESS_SELECTOR);

        // Real-time validation on blur
        nameInput.addEventListener('blur', function () {
            if (!nameInput.value.trim()) {
                showError(nameInput, '.js-name-error');
            } else {
                clearError(nameInput, '.js-name-error');
            }
        });

        emailInput.addEventListener('blur', function () {
            if (emailInput.value && !validateEmail(emailInput.value)) {
                showError(emailInput, '.js-email-error');
            } else {
                clearError(emailInput, '.js-email-error');
            }
        });

        emailInput.addEventListener('input', function () {
            if (emailInput.value && validateEmail(emailInput.value)) {
                clearError(emailInput, '.js-email-error');
            }
        });

        messageInput.addEventListener('blur', function () {
            if (!messageInput.value.trim()) {
                showError(messageInput, '.js-message-error');
            } else {
                clearError(messageInput, '.js-message-error');
            }
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var valid = true;

            // Validate name
            if (!nameInput.value.trim()) {
                showError(nameInput, '.js-name-error');
                valid = false;
            } else {
                clearError(nameInput, '.js-name-error');
            }

            // Validate email
            if (!emailInput.value || !validateEmail(emailInput.value)) {
                showError(emailInput, '.js-email-error');
                valid = false;
            } else {
                clearError(emailInput, '.js-email-error');
            }

            // Validate message
            if (!messageInput.value.trim()) {
                showError(messageInput, '.js-message-error');
                valid = false;
            } else {
                clearError(messageInput, '.js-message-error');
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
            saveMessage({
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageInput.value.trim()
            });

            // Show success
            form.style.display = 'none';
            if (successEl) {
                successEl.classList.add('form-success--visible');
            }
        });
    });
})();
