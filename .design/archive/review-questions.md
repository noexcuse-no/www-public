# Review Questions Component — Design Decisions

## Overview

A reusable, interactive question component that replaces all ad-hoc question sections across the site. Each question is clickable — opening a modal with AI chat service selection and prompt-to-clipboard. Designed as a bridge from reading to reflection: the user encounters a diagnostic question about their organization, and with one click they can take it to their preferred AI tool for guided exploration — where the AI coaches them through the question rather than answering it outright.

---

## Component Architecture

### Include: `_includes/questions.html`

```
{% include questions.html
   title="Spørsmål for å kartlegge tillitsnivået"
   questions="Hvor ofte gir du feedback…?,Hva ville skjedd hvis…?"
   id="tillit-questions"
%}
```

Parameters:

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | yes | `<h2>` heading text |
| `questions` | string | yes | Pipe-separated (`\|\|`) list of question strings |
| `id` | string | no | Optional anchor ID for the section |

The pipe separator (`||`) is chosen over comma because questions naturally contain commas. Frame pages pass their frontmatter array as `page.questions | join: "||"`.

### Rendering

```html
<section class="review-questions section container--wide animate-on-scroll fade-in-up">
  <h2>{{ title }}</h2>
  <ul class="stagger-parent">
    {% for q in questions_array %}
    <li class="animate-on-scroll slide-in-left stagger"
        data-question="{{ q | escape }}">
      <svg class="click-hint" ...><!-- chat bubble icon --></svg>
      <span>{{ q }}</span>
    </li>
    {% endfor %}
  </ul>
</section>
```

Each `<li>` is a click target. The `data-question` attribute carries the text for the JS to read on click.

### Placement Pattern

On article pages: the include sits at the bottom of the `.md` file, just above the CTA include. This preserves the existing content flow:

```
<!-- Article content -->
{{ content }}

<!-- Questions -->
{% include questions.html title="..." questions="..." %}

<!-- CTA -->
{% include cta.html %}

<!-- Profiles (optional) -->
{% include profiles.html tags="..." %}
```

On frame pages (`perspektiv.html`): the inline `<ul class="perspektiv-questions">` at lines 141-148 is replaced with the include, passing `frame.questions | join: "||"` as the questions parameter.

---

## Modal Design

### States

| State | Trigger | Visual |
|-------|---------|--------|
| Closed | Default | Hidden, no overlay |
| Opening | Click on question item | Fade-in overlay, scale-up modal card |
| Open — choose provider | Modal visible, no selection yet | Provider grid enabled, copy + save options shown |
| Open — copied | Provider selected | "Kopiert!" confirmation, auto-close after 3s or manual close |
| Closing | × / Escape / overlay click | Fade-out overlay, scale-down modal card |

### Layout

```
┌──────────────────────────────────────┐
│  [×]                               ← close button
│                                      │
│  "Hvor ofte gir du feedback…?"     ← question text
│                                      │
│  ┌──────┐  ┌──────┐  ┌──────┐     ← provider grid
│  │ChatGPT│  │Claude │  │Gemini │     (7 providers, 2-4 columns)
│  └──────┘  └──────┘  └──────┘
│  ┌──────┐  ┌──────┐  ┌──────┐
│  │DeepS. │  │Perpl. │  │Copil. │
│  └──────┘  └──────┘  └──────┘
│  ┌──────┐
│  │ Grok │
│  └──────┘
│                                      │
│  ☐ Husk valget mitt                ← checkbox
│  (Vi lagrer kun ditt valg av        ← privacy disclaimer
│   KI-leverandør lokalt…)
│                                      │
│  [ 📋 Kopier prompt ]              ← copy button
│                                      │
└──────────────────────────────────────┘
```

### Provider Grid

7 providers in a responsive grid:

```
Mobile (≤599px):   2 columns × 4 rows
Tablet (600-899px): 3 columns × 3 rows (last row has 1)
Desktop (≥900px):   4 columns × 2 rows (last row has 3)
```

Each provider button:

```
┌──────────┐
│  [icon]  │  ← 28×28px monochrome SVG
│  Name    │  ← 0.85em text
└──────────┘
Min size: 80×56px (well above 44×44px touch target)
```

### Click-Hint Icon

Each question item shows a small chat bubble SVG icon (16×16px, `--primary-accent` color) to the left of the text, indicating clickability. The icon pulses subtly on hover.

---

## JavaScript Architecture

### File: `assets/scripts/review-questions.js`

Pattern: strict IIFE, following `dark-mode-toggle.js` conventions.

```javascript
(function() {
    'use strict';

    // ── Constants ──────────────────────────────────
    const STORAGE_KEY = 'noexcuse_ai_provider';
    const COOKIE_EXPIRY_DAYS = 365;

    const PROVIDERS = [
        { id: 'chatgpt',    name: 'ChatGPT',    url: 'https://chatgpt.com' },
        { id: 'claude',     name: 'Claude',     url: 'https://claude.ai' },
        { id: 'gemini',     name: 'Gemini',     url: 'https://gemini.google.com' },
        { id: 'deepseek',   name: 'DeepSeek',   url: 'https://chat.deepseek.com' },
        { id: 'perplexity', name: 'Perplexity',  url: 'https://www.perplexity.ai' },
        { id: 'copilot',    name: 'Copilot',    url: 'https://copilot.microsoft.com' },
        { id: 'grok',       name: 'Grok',        url: 'https://grok.com' },
    ];

    // ── State ──────────────────────────────────────
    let modalEl = null;
    let currentQuestion = '';
    let savedProvider = getSavedProvider();

    // ── Lifecycle ──────────────────────────────────
    function init() { ... }
    function buildModal() { ... }
    function openModal(question) { ... }
    function closeModal() { ... }

    // ── Provider ───────────────────────────────────
    function selectProvider(id) { ... }
    function savePreference(id) { ... }
    function getSavedProvider() { ... }
    function deleteCookie() { ... }

    // ── Clipboard ──────────────────────────────────
    function buildPrompt(question) { ... }
    function copyToClipboard(text) { ... }

    // ── Bootstrap ──────────────────────────────────
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
```

### Prompt Template

```
Oppgave: Veiled brukeren i å utforske et spørsmål om ledelse og organisasjonskultur.

**Spørsmål:** {question}

**Utgangspunkt:** Spørsmålet er fra "{page_title}" på noexcuse.no ({page_url}).
Bruk innholdet på denne siden som kontekst for veiledningen. Siden inneholder
JSON-LD strukturert data.

**Bakgrunn:** noexcuse.no hjelper ledergrupper med å få bedre blikk for
mennesker, identitet, struktur og påvirkning — basert på Bolman & Deals
fire perspektiver. Kjerneproduktet er Ledelse 60:2, en kunnskapsbasert
orientering for ledergrupper: 60 diagnostiske spørsmål på 2 timer.

**Retningslinjer:**
- Still oppfølgingsspørsmål som hjelper brukeren å reflektere over egen praksis
- Vis til relevant innhold på noexcuse.no som utgangspunkt for videre lesning
- Unngå å gi ferdige svar eller løsninger — målet er utforskning, ikke fasit
- Bruk norsk bokmål, vær konkret og praktisk rettet mot ledergrupper
```

### Clipboard API

Primary: `navigator.clipboard.writeText()`. Fallback for older browsers:
1. Create a temporary `<textarea>`
2. Set its value to the prompt text
3. Append to body, select, execCommand('copy')
4. Remove the textarea
5. Show "Kopiert!" feedback either way

---

## Provider Icons

7 inline monochrome SVG brand icons, all in a single `stroke="currentColor"` / `fill="none"` style, at 24×24px viewBox. Each is a simplified representation of the provider's brand mark:

| Provider | SVG Concept | Description |
|----------|-------------|-------------|
| ChatGPT | Chat bubble with sparkle | Oval bubble, 3 dots inside |
| Claude | Stylized "A" with diamond | Anthropic-inspired interlocking shapes |
| Gemini | 4-pointed star | The classic Gemini star shape |
| DeepSeek | Whale tail / wave | Simplified whale tail or water ripple |
| Perplexity | Magnifying glass over "P" | Searcher metaphor |
| Copilot | Butterfly / Star | Microsoft Copilot butterfly mark |
| Grok | Stylized "X" | The xAI / Grok mark |

All rendered as `<svg>` elements inline in the JS (stored in a map by provider ID). The SVG is cloned into each provider button when the modal opens.

---

## Cookie & Privacy

| Property | Value |
|----------|-------|
| Name | `noexcuse_ai_provider` |
| Value | Provider ID (`chatgpt`, `claude`, etc.) |
| Expiry | 365 days from setting |
| Path | `/` |
| SameSite | `Lax` |
| Secure | Only if `location.protocol === 'https:'` |

The cookie is only set when the user explicitly checks "Husk valget mitt" before or after selecting a provider. The privacy disclaimer text:

> *"Vi lagrer kun ditt valg av KI-leverandør lokalt i nettleseren din. Ingen data sendes til våre servere."*

This appears next to the checkbox in the modal, in small muted text (0.85em, `--text-color-subtle-*`).

No user data, page history, or behavioral tracking is stored.

---

## CSS Architecture

### File: `assets/css/components/questions.css`

Follows the same pattern as other component CSS files (`hero.css`, `card.css`, `buttons.css`, `illustrations.css`).

Key design decisions:

| Decision | Rationale |
|----------|-----------|
| Single component file | All question-related styles in one place |
| CSS variables only | Dark mode via `var(--*)` — no `[data-theme]` overrides |
| `.review-questions` prefix | Avoids collision with existing `.question-list`, `.perspektiv-questions`, `.frame-questions` |
| No `!important` | Cascade and specificity only |
| `.stagger-parent` + `--stagger-delay` | Preserves existing entrance animation pattern |

### Dark Mode

No `[data-theme="dark"]` overrides in `questions.css`. All theme-aware colors reference CSS variables:

```css
.review-questions li {
    border-bottom-color: var(--border-color-light);
    color: var(--text-color-light);
}
.review-questions-modal .modal-card {
    background: var(--box-background-light);
    color: var(--text-color-light);
}
```

The `styles-dark.css` already handles the variable swap via `[data-theme="dark"]`.

---

## Page List: Questions Content

### Existing pages (refactoring — preserve existing questions)

| Page | Current heading | Questions preserved? |
|------|----------------|---------------------|
| `struktur.md` | Spørsmål strukturperspektivet kan hjelpe dere å besvare | ✅ (from frontmatter) |
| `mennesker.md` | Spørsmål menneskeperspektivet kan hjelpe dere å besvare | ✅ (from frontmatter) |
| `påvirkning.md` | Spørsmål påvirkningsperspektivet kan hjelpe dere å besvare | ✅ (from frontmatter) |
| `identitet.md` | Spørsmål identitetsperspektivet kan hjelpe dere å besvare | ✅ (from frontmatter) |
| `ledelse_tillit.md` | Spørsmål for å kartlegge tillitsnivået | ✅ |
| `ledelse_usikkerhet.md` | Spørsmål for å kartlegge kulturen | ✅ |
| `ledelse_forankring.md` | Spørsmål for å forbedre beslutningstaking | ✅ |
| `ledelse_generativ-ki.md` | Spørsmål for å evaluere KI-ledelsen | ✅ |
| `ledelse_perspektiv.md` | Spørsmål for multiframe-diagnostikk | ✅ |
| `ledelse_triader.md` | Spørsmål for å kartlegge triader i din organisasjon | ✅ |
| `ledelse_makt.md` | Spørsmål for selvdiagnose | ✅ |

### New pages (suggested questions — for user testing review)

| Page | Suggested heading | Suggested questions |
|------|-------------------|---------------------|
| `grc.md` | Spørsmål for å kartlegge GRC-modenhet | (5 questions TBD) |
| `om_oss.md` | Spørsmål for å bli kjent med No Excuse | (5 questions TBD) |
| `om_metode.md` | Spørsmål for å vurdere metodikken | (5 questions TBD) |
| `ledelse_60-2.md` | Spørsmål for å vurdere ledelsesanalysen | (5 questions TBD) |
| `step-talk.md` | Spørsmål før en ledelsessamtale | (5 questions TBD) |
| `step-report.md` | Spørsmål for å tolke rapporten | (5 questions TBD) |
| `step-interview.md` | Spørsmål før kartleggingssamtalen | (5 questions TBD) |
| `perspektiv/index.md` | Hvilket perspektiv passer dere? | (5 questions TBD) |

Questions for new pages will be drafted during implementation (task Y7) and reviewed in functional user testing.

---

## Rationale

### Why an include, not a frontmatter-only approach?

Consistency across two fundamentally different page types: frame pages (where questions come from `page.questions` frontmatter array) and article pages (where questions are hardcoded in the `.md` body). An include abstracts both into the same rendering path.

### Why pipe-separated, not YAML array?

The include needs to accept questions as a flat string parameter. Pipe (`||`) is unlikely to appear in question text. Frame pages convert their frontmatter array with `join: "||"`.

### Why a modal instead of inline expansion?

A modal provides space for the provider selection grid, privacy notice, and copy button without disrupting the page layout. It also gives a focused, dialog-like interaction — the user is leaving the page to reflect with an AI tool, and the modal reinforces that transition.

### Why no server-side component?

The component is purely client-side. No data is sent to noexcuse.no servers. The cookie is entirely local. This aligns with the site's privacy-first approach and avoids GDPR compliance complexity.

### Why 7 providers?

Covers the current major AI chat services without overwhelming choice. Each is a well-known, publicly accessible tool. The list can be extended later without changing the component architecture.
