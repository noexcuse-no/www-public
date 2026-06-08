(function () {
  'use strict';

  /* ── Constants ──────────────────────────── */
  var STORAGE_KEY = 'noexcuse_ai_provider';
  var STORE_EXPIRY_DAYS = 365;

  var PROVIDERS = [
    { id: 'chatgpt', name: 'ChatGPT', url: 'https://chatgpt.com' },
    { id: 'claude', name: 'Claude', url: 'https://claude.ai' },
    { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com' },
    { id: 'deepseek', name: 'DeepSeek', url: 'https://chat.deepseek.com' },
    { id: 'perplexity', name: 'Perplexity', url: 'https://www.perplexity.ai' },
    { id: 'copilot', name: 'Copilot', url: 'https://copilot.microsoft.com' },
    { id: 'grok', name: 'Grok', url: 'https://grok.com' },
  ];

  /* ── Provider SVG icons (monochrome) ────── */
  var ICONS = {
    chatgpt:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c-1.5 0-2.7.8-3.3 2a4 4 0 00-4 4c0 .5.1 1 .3 1.5A3.5 3.5 0 003 14a3.5 3.5 0 003.5 3.5H12"/><circle cx="12" cy="12" r="1.5"/><path d="M12 3c1.5 0 2.7.8 3.3 2a4 4 0 014 4c0 .5-.1 1-.3 1.5A3.5 3.5 0 0021 14a3.5 3.5 0 01-3.5 3.5H12"/></svg>',
    claude:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4L8 20h8L12 4z"/><path d="M12 4l-4 8h8l-4-8z" opacity=".5"/></svg>',
    gemini:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.5 5.5L20 7.5l-4 4.5 1 6L12 15l-5 3 1-6-4-4.5 5.5 0L12 2z"/></svg>',
    deepseek:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18c2-3 5-5 8-5s6 2 8 5"/><path d="M4 6c2 3 5 5 8 5s6-2 8-5"/></svg>',
    perplexity:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="6"/><path d="M15.5 15.5L21 21"/><text x="9" y="14" font-size="9" font-weight="700" stroke="none" fill="currentColor">P</text></svg>',
    copilot:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 3-3 3-3-3 3-3z"/><path d="M12 13l3 3-3 3-3-3 3-3z"/><path d="M5 7l3 3-3 3-3-3 3-3z"/><path d="M19 7l3 3-3 3-3-3 3-3z"/></svg>',
    grok:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l16 16M20 4L4 20"/><circle cx="12" cy="12" r="3"/></svg>',
  };

  /* ── State ──────────────────────────────── */
  var modalEl = null;
  var currentQuestion = '';
  var selectedProvider = getSavedProvider() || '';
  var copyTimer = null;

  /* ── Init ───────────────────────────────── */
  function init() {
    if (!document.querySelector('.review-questions')) return;
    buildModal();
    attachQuestionClicks();
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
      '<p class="modal-question"></p>' +
      '<div class="provider-grid"></div>' +
      '<label class="preference-row">' +
      '<input type="checkbox" id="remember-provider" />' +
      '<span>Husk valget mitt &mdash; <em>vi lagrer kun ditt valg av KI-leverand&oslash;r lokalt i nettleseren din. Ingen data sendes til v&aring;re servere.</em></span>' +
      '</label>' +
      '<button class="copy-btn">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>' +
      '<span>Kopier prompt</span>' +
      '</button>' +
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
      btn.innerHTML = (ICONS[p.id] || '') + '<span>' + p.name + '</span>';
      btn.addEventListener('click', function () {
        selectProvider(p.id);
      });
      grid.appendChild(btn);
    });
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
  }

  /* ── Attach Question Click Handlers ─────── */
  function attachQuestionClicks() {
    var items = document.querySelectorAll('.review-questions li[data-question]');
    Array.prototype.forEach.call(items, function (li) {
      li.addEventListener('click', function () {
        openModal(li.dataset.question);
      });
      li.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(li.dataset.question);
        }
      });
    });
  }

  /* ── Open / Close Modal ─────────────────── */
  function openModal(question) {
    currentQuestion = question;
    modalEl.querySelector('.modal-question').textContent = question;
    var copyBtn = modalEl.querySelector('.copy-btn');
    copyBtn.classList.remove('is-copied');
    copyBtn.querySelector('span').textContent = 'Kopier prompt';

    var checkbox = modalEl.querySelector('#remember-provider');
    if (selectedProvider && getSavedProvider()) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }

    highlightSelected();
    document.body.style.overflow = 'hidden';
    modalEl.classList.add('is-open');
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
    }
  }

  function highlightSelected() {
    var btns = modalEl.querySelectorAll('.provider-btn');
    Array.prototype.forEach.call(btns, function (btn) {
      btn.classList.toggle('is-selected', btn.dataset.provider === selectedProvider);
    });
  }

  /* ── Save / Load Preference ─────────────── */
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
    var prompt = buildPrompt(currentQuestion);
    copyToClipboard(prompt, function () {
      var btn = modalEl.querySelector('.copy-btn');
      btn.classList.add('is-copied');
      btn.querySelector('span').textContent = 'Kopiert!';

      if (copyTimer) clearTimeout(copyTimer);
      copyTimer = setTimeout(function () {
        btn.classList.remove('is-copied');
        btn.querySelector('span').textContent = 'Kopier prompt';
        copyTimer = null;
      }, 3000);
    });
  }

  function buildPrompt(question) {
    var pageUrl = location.href;
    var pageTitle = document.title || 'noexcuse.no';

    return (
      'Oppgave: Veiled brukeren i \u00e5 utforske et sp\u00f8rsm\u00e5l om ledelse og organisasjonskultur.\n\n' +
      '**Sp\u00f8rsm\u00e5l:** ' + question + '\n\n' +
      '**Utgangspunkt:** Sp\u00f8rsm\u00e5let er fra "' + pageTitle + '" p\u00e5 noexcuse.no (' + pageUrl + '). ' +
      'Bruk innholdet p\u00e5 denne siden som kontekst for veiledningen. Siden inneholder JSON-LD strukturert data.\n\n' +
      '**Bakgrunn:** noexcuse.no hjelper ledergrupper med \u00e5 f\u00e5 bedre blikk for ' +
      'mennesker, identitet, struktur og p\u00e5virkning — basert p\u00e5 Bolman & Deals ' +
      'fire perspektiver. Kjerneproduktet er Ledelse 60:2, en kunnskapsbasert ' +
      'orientering for ledergrupper: 60 diagnostiske sp\u00f8rsm\u00e5l p\u00e5 2 timer.\n\n' +
      '**Retningslinjer:**\n' +
      '- Still oppf\u00f8lgingssp\u00f8rsm\u00e5l som hjelper brukeren \u00e5 reflektere over egen praksis\n' +
      '- Vis til relevant innhold p\u00e5 noexcuse.no som utgangspunkt for videre lesning\n' +
      '- Unng\u00e5 \u00e5 gi ferdige svar eller l\u00f8sninger — m\u00e5let er utforskning, ikke fasit\n' +
      '- Bruk norsk bokm\u00e5l, v\u00e6r konkret og praktisk rettet mot ledergrupper'
    );
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
