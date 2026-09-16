(function () {
    'use strict';

    // Configuration - endpoint should be set via data-newsletter-endpoint on the form
    // or via window.NEWSLETTER_ENDPOINT for external service integration
    var DEFAULT_ENDPOINT = window.NEWSLETTER_ENDPOINT || '';

    function initNewsletterForms() {
        var forms = document.querySelectorAll('.newsletter__form');
        if (!forms.length) return;

        Array.prototype.forEach.call(forms, function (form) {
            setupForm(form);
        });
    }

    function setupForm(form) {
        var emailInput = form.querySelector('.newsletter__input');
        var consentCheckbox = form.querySelector('.newsletter__checkbox');
        var submitBtn = form.querySelector('.newsletter__submit');
        var statusEl = form.querySelector('.newsletter__status');
        var errorEl = form.querySelector('.newsletter__error');
        var submitText = form.querySelector('.newsletter__submit-text');
        var submitLoading = form.querySelector('.newsletter__submit-loading');
        var endpoint = form.getAttribute('data-newsletter-endpoint') || DEFAULT_ENDPOINT;

        if (!emailInput || !consentCheckbox || !submitBtn) return;

        // Enable/disable submit based on validation
        function validateForm() {
            var emailValid = validateEmail(emailInput.value);
            var consentGiven = consentCheckbox.checked;
            var isValid = emailValid && consentGiven;

            submitBtn.disabled = !isValid;
            emailInput.setAttribute('aria-invalid', (!emailValid && emailInput.value.length > 0).toString());

            if (!emailValid && emailInput.value.length > 0) {
                errorEl.textContent = 'Ugyldig epostadresse';
                errorEl.hidden = false;
            } else {
                errorEl.hidden = true;
            }
        }

        function validateEmail(email) {
            // Simple but practical email validation
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        function setLoading(isLoading) {
            submitBtn.disabled = isLoading;
            submitText.hidden = isLoading;
            submitLoading.hidden = !isLoading;
            statusEl.hidden = true;
            statusEl.textContent = '';
            statusEl.className = 'newsletter__status';
        }

        function showStatus(message, type) {
            statusEl.textContent = message;
            statusEl.hidden = false;
            statusEl.className = 'newsletter__status newsletter__status--' + type;
        }

        function handleSubmit(e) {
            e.preventDefault();

            if (!validateEmail(emailInput.value)) {
                emailInput.focus();
                return;
            }

            if (!consentCheckbox.checked) {
                consentCheckbox.focus();
                return;
            }

            if (!endpoint) {
                showStatus('Konfigurasjon mangler: ingen endepunkt for nyhetsbrev.', 'error');
                return;
            }

            setLoading(true);

            var formData = new FormData();
            formData.append('email', emailInput.value.trim());
            formData.append('consent', 'true');
            formData.append('source', window.location.pathname);

            fetch(endpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(function (response) {
                if (response.ok) {
                    return response.json().catch(function () { return {}; });
                }
                return response.json().catch(function () { return {}; })
                    .then(function (data) {
                        throw new Error(data.message || 'Kunne ikke registrere epost');
                    });
            })
            .then(function () {
                setLoading(false);
                showStatus('Du er nå registrert på nyhetsbrevet!', 'success');
                form.reset();
                validateForm(); // Re-validate to disable button
            })
            .catch(function (err) {
                setLoading(false);
                showStatus(err.message || 'Noe gikk galt. Prøv igjen senere.', 'error');
            });
        }

        // Event listeners
        emailInput.addEventListener('input', validateForm);
        emailInput.addEventListener('blur', validateForm);
        consentCheckbox.addEventListener('change', validateForm);
        form.addEventListener('submit', handleSubmit);

        // Initial validation
        validateForm();
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNewsletterForms);
    } else {
        initNewsletterForms();
    }
})();