(function () {
    'use strict';

    /* ── Constants ──────────────────────────── */
    var STORAGE_KEY = 'noexcuse_ai_provider';
    var STORE_EXPIRY_DAYS = 365;

    var PROVIDERS = [
        { id: 'chatgpt', name: 'ChatGPT', url: 'https://chatgpt.com', capability: 'community-prefill' },
        { id: 'claude', name: 'Claude', url: 'https://claude.ai', capability: 'official-prefill' },
        { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com', capability: 'copy-open' },
        { id: 'deepseek', name: 'DeepSeek', url: 'https://chat.deepseek.com', capability: 'copy-open' },
        { id: 'perplexity', name: 'Perplexity', url: 'https://www.perplexity.ai', capability: 'community-prefill' },
        { id: 'copilot', name: 'Copilot', url: 'https://copilot.microsoft.com', capability: 'copy-open' },
        { id: 'grok', name: 'Grok', url: 'https://grok.com', capability: 'community-prefill' }
    ];

    /* ── Shared Critical-Reflection Meta-Prompt ──────────────────────────── */
    var META_PROMPT = (
        'Oppgave: Veiled brukeren i å utforske et spørsmål om ledelse og organisasjonskultur.\n\n' +
        '**Spørsmål:** {{QUESTION}}\n\n' +
        '**Utgangspunkt:** Spørsmålet er fra "{{TOPIC_LABEL}}" på noexcuse.no ({{SOURCE_URL}}). ' +
        'Bruk innholdet på denne siden som kontekst for veiledningen. Siden inneholder JSON-LD strukturert data.\n\n' +
        '**Bakgrunn:** No Excuse AS hjelper ledergrupper med å få bedre blikk for ' +
        'mennesker, identitet, struktur og påvirkning — basert på Bolman & Deals ' +
        'fire perspektiver. Kjerneproduktet er Ledelse 60:2, en kunnskapsbasert ' +
        'orientering for ledergrupper: 60 diagnostiske spørsmål på 2 timer ' +
        '(https://noexcuse.no/ledelse-60-2/).\n\n' +
        '**AI-agent instruksjoner:** Se https://noexcuse.no/assets/ai-agent-cheat-sheet.md for full rollebeskrivelse (Diagnostiker, Omrammer, Syntetisør, Djevelens Advokat, Coach), samtaleoppskrifter, merkevarestemme og sideindeks.\n\n' +
        '**Retningslinjer:**\n' +
        '- Still oppfølgingsspørsmål som hjelper brukeren å reflektere over egen praksis\n' +
        '- Vis til relevant innhold på noexcuse.no som utgangspunkt for videre lesning\n' +
        '- Unngå å gi forhastede svar eller premature løsninger — målet er utforskning, ikke fasit\n' +
        '- Bruk norsk bokmål, vær konkret og praktisk rettet mot ledergrupper\n' +
        '- Vær direkte, kompetent og kortfattet — skandinavisk minimalistisk. Ingen konsulentspråk (unngå: synergi, verdiskapning, helhetlig, skreddersydde løsninger)\n' +
        '- Still én ting om gangen. Korte setninger. Konkrete eksempler.\n\n' +
        '**Kritisk refleksjon (8 regler):**\n' +
        '1. Still ÉN ting om gangen.\n' +
        '2. Be om konkrete nylige eksempler.\n' +
        '3. Skille evidens / observasjon / tolkning / antakelse.\n' +
        '4. Utfordr forhastede konklusjoner.\n' +
        '5. Vurder de fire perspektivene (Struktur, Mennesker, Påvirkning, Identitet).\n' +
        '6. Generer alternative hypoteser.\n' +
        '7. INGEN scoring, diagnostisering, navn, sensitive data, eller leverandør-anbefaling.\n' +
        '8. Avslutt med å forklare opprinnelsen av spørsmålene + valgfri retursti til noexcuse.no.\n\n' +
        '**Retursti:** Denne refleksjonen er startet fra noexcuse.no — en nettside for ledelsesdiagnostikk. ' +
        'Du kan gå tilbake til {{SIXTY_TWO_URL}} hvis du vil utforske videre.'
    );

    /* ── State ──────────────────────────────── */
    var modalEl = null;
    var currentTopic = null;
    var selectedProvider = getSavedProvider() || '';
    var copyTimer = null;
    var isCollapsed = false;

    /* ── Init ───────────────────────────────── */
    function init() {
        if (!document.querySelector('.review-questions')) return;
        buildModal();
        attachTopicClicks();
    }

    /* ── Build Modal DOM ────────────────────── */
    function buildModal() {
        modalEl = document.createElement('div');
        modalEl.className = 'review-questions-modal';
        modalEl.setAttribute('role', 'dialog');
        modalEl.setAttribute('aria-modal', 'true');
        modalEl.setAttribute('aria-label', 'Velg KI-verktøy');

        modalEl.innerHTML =
            '<div class="modal-card">' +
            '<button class="modal-close" aria-label="Lukk">&times;</button>' +
            '<blockquote class="modal-question"></blockquote>' +
            '<p class="modal-topic-label"></p>' +
            '<div class="provider-grid"></div>' +
            '<div class="provider-selected" hidden>' +
            '<span class="provider-selected-name"></span>' +
            '<button class="change-provider-btn">Skift leverandør</button>' +
            '</div>' +
            '<label class="preference-row">' +
            '<input type="checkbox" id="remember-provider" />' +
            '<span>Husk valget mitt &mdash; <em>vi lagrer kun ditt valg av KI-leverandør lokalt i nettleseren din. Ingen data sendes til våre servere.</em></span>' +
            '</label>' +
            '<button class="copy-btn">Kopier prompt</button>' +
            '</div>';

        document.body.appendChild(modalEl);
        attachModalEvents();
        renderProviders();
    }

    /* ── Render Provider Buttons ────────────── */
    function renderProviders() {
        var grid = modalEl.querySelector('.provider-grid');
        grid.innerHTML = '';
        PROVIDERS.forEach(function (p) {
            var btn = document.createElement('button');
            btn.className = 'provider-btn' + (p.id === selectedProvider ? ' is-selected' : '');
            btn.dataset.provider = p.id;
            btn.setAttribute('aria-label', p.name);
            btn.textContent = p.name;
            btn.addEventListener('click', function () {
                selectProvider(p.id);
            });
            grid.appendChild(btn);
        });
    }

    /* ── Collapse / Expand ──────────────────── */
    function collapseList() {
        isCollapsed = true;
        var grid = modalEl.querySelector('.provider-grid');
        var selected = modalEl.querySelector('.provider-selected');
        var provider = getProvider(selectedProvider);
        if (provider) {
            selected.querySelector('.provider-selected-name').textContent = provider.name;
        }
        grid.hidden = true;
        selected.hidden = false;
    }

    function expandList() {
        isCollapsed = false;
        var grid = modalEl.querySelector('.provider-grid');
        var selected = modalEl.querySelector('.provider-selected');
        grid.hidden = false;
        selected.hidden = true;
    }

    function getProvider(id) {
        for (var i = 0; i < PROVIDERS.length; i++) {
            if (PROVIDERS[i].id === id) return PROVIDERS[i];
        }
        return null;
    }

    /* ── Modal Events ────────────────────────── */
    function attachModalEvents() {
        modalEl.querySelector('.modal-close').addEventListener('click', closeModal);
        modalEl.addEventListener('click', function (e) {
            if (e.target === modalEl) closeModal();
        });
        document.addEventListener('keydown', function onEscape(e) {
            if (e.key === 'Escape' && modalEl.classList.contains('is-open')) {
                closeModal();
            }
        });
        modalEl.querySelector('.copy-btn').addEventListener('click', copyPrompt);
        modalEl.querySelector('.change-provider-btn').addEventListener('click', expandList);
    }

    /* ── Attach Topic Click Handlers ─────── */
    function attachTopicClicks() {
        var items = document.querySelectorAll('.ai-topic-btn');
        Array.prototype.forEach.call(items, function (btn) {
            btn.addEventListener('click', function () {
                openModal({
                    label: btn.dataset.topicLabel,
                    question: btn.dataset.openingQuestion,
                    sourceUrl: btn.dataset.sourceUrl,
                    sixtyTwoUrl: btn.dataset.sixtyTwoUrl
                });
            });
            btn.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal({
                        label: btn.dataset.topicLabel,
                        question: btn.dataset.openingQuestion,
                        sourceUrl: btn.dataset.sourceUrl,
                        sixtyTwoUrl: btn.dataset.sixtyTwoUrl
                    });
                }
            });
        });
    }

    /* ── Open / Close Modal ─────────────────── */
    function openModal(topic) {
        currentTopic = topic;
        modalEl.querySelector('.modal-question').textContent = topic.question;
        modalEl.querySelector('.modal-topic-label').textContent = topic.label;
        var copyBtn = modalEl.querySelector('.copy-btn');
        copyBtn.classList.remove('is-copied');
        copyBtn.textContent = 'Kopier prompt';

        var checkbox = modalEl.querySelector('#remember-provider');
        var saved = getSavedProvider();
        if (saved && selectedProvider === saved) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }

        highlightSelected();
        selectedProvider = saved || '';

        // Collapse if saved preference exists and checkbox is checked
        if (selectedProvider && checkbox.checked) {
            collapseList();
        } else {
            expandList();
        }

        document.body.style.overflow = 'hidden';
        modalEl.classList.add('is-open');

        // If saved preference exists, auto-open on modal open
        if (selectedProvider && checkbox.checked) {
            openProviderUrl(selectedProvider);
        }
    }

    function closeModal() {
        modalEl.classList.remove('is-open');
        document.body.style.overflow = '';
        if (copyTimer) {
            clearTimeout(copyTimer);
            copyTimer = null;
        }
    }

    /* ── Provider Selection ─────────────────── */
    function selectProvider(id) {
        selectedProvider = id;
        highlightSelected();

        var checkbox = modalEl.querySelector('#remember-provider');
        if (checkbox.checked) {
            savePreference(id);
        } else {
            clearPreference();
        }

        // Auto-open the URL and close modal
        openProviderUrl(id);
    }

    function openProviderUrl(id) {
        var provider = getProvider(id);
        if (!provider) return;

        var url = buildPromptUrl(provider, currentTopic);
        window.open(url, '_blank', 'noopener,noreferrer');
        closeModal();
    }

    function buildPromptUrl(provider, topic) {
        var prompt = buildPrompt(topic);
        var baseUrl = provider.url;

        switch (provider.capability) {
            case 'official-prefill':
                // Claude: official prefill URL
                return baseUrl + '/?q=' + encodeURIComponent(prompt);
            case 'community-prefill':
                // ChatGPT, Perplexity, Grok: best-effort prefill
                var separator = baseUrl.indexOf('?') === -1 ? '?' : '&';
                return baseUrl + separator + 'q=' + encodeURIComponent(prompt);
            case 'copy-open':
            default:
                // Gemini, DeepSeek, Copilot: copy prompt and open home/chat page
                copyToClipboard(prompt, function () {
                    // Clipboard copy handled in callback
                });
                return baseUrl;
        }
    }

    function highlightSelected() {
        var btns = modalEl.querySelectorAll('.provider-btn');
        Array.prototype.forEach.call(btns, function (btn) {
            btn.classList.toggle('is-selected', btn.dataset.provider === selectedProvider);
        });
    }

    /* ── Save / Load / Clear Preference ─────── */
    function savePreference(id) {
        try {
            var d = new Date();
            d.setTime(d.getTime() + STORE_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
            var expires = 'expires=' + d.toUTCString();
            var cookie = STORAGE_KEY + '=' + encodeURIComponent(id) + ';' + expires + ';path=/;SameSite=Lax';
            if (location.protocol === 'https:') cookie += ';Secure';
            document.cookie = cookie;
        } catch (_) { /* cookie may be blocked */ }
    }

    function clearPreference() {
        try {
            var expires = 'expires=Thu, 01 Jan 1970 00:00:00 GMT';
            document.cookie = STORAGE_KEY + '=;' + expires + ';path=/;SameSite=Lax';
        } catch (_) { /* cookie may be blocked */ }
        selectedProvider = '';
    }

    function getSavedProvider() {
        try {
            var match = document.cookie.match(new RegExp('(?:^|;\\s*)' + STORAGE_KEY + '=([^;]*)'));
            return match ? decodeURIComponent(match[1]) : '';
        } catch (_) {
            return '';
        }
    }

    /* ── Copy Prompt ────────────────────────── */
    function copyPrompt() {
        if (!currentTopic) return;
        var prompt = buildPrompt(currentTopic);
        copyToClipboard(prompt, function () {
            var btn = modalEl.querySelector('.copy-btn');
            btn.classList.add('is-copied');
            btn.textContent = 'Kopiert!';

            if (copyTimer) clearTimeout(copyTimer);
            copyTimer = setTimeout(function () {
                btn.classList.remove('is-copied');
                btn.textContent = 'Kopier prompt';
                copyTimer = null;
            }, 3000);
        });
    }

    function buildPrompt(topic) {
        var pageUrl = location.href;
        var pageTitle = document.title || 'noexcuse.no';

        return META_PROMPT
            .replace('{{QUESTION}}', topic.question)
            .replace('{{TOPIC_LABEL}}', topic.label)
            .replace('{{SOURCE_URL}}', location.origin + topic.sourceUrl)
            .replace('{{SIXTY_TWO_URL}}', location.origin + topic.sixtyTwoUrl);
    }

    function copyToClipboard(text, callback) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(callback).catch(function () {
                fallbackCopy(text, callback);
            });
        } else {
            fallbackCopy(text, callback);
        }
    }

    function fallbackCopy(text, callback) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        ta.style.top = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        try {
            document.execCommand('copy');
            callback();
        } catch (_) { /* copy failed */ }
        document.body.removeChild(ta);
    }

    /* ── Bootstrap ──────────────────────────── */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();