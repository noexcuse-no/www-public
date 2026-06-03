# Review Questions — Feature Specification

## Purpose / Problem

The site has 11 separate question sections spread across 11 pages, implemented in 3 different patterns (frontmatter array + layout rendering, hardcoded `<ul class="question-list">`, and plain `<ul>`). This inconsistency creates maintenance overhead, no way to track user engagement, and no bridge from reading to reflection.

The goal is a single reusable **Review Questions** component that:
- Replaces all 11 existing question sections with one include
- Makes each question clickable — opening a modal to copy an AI-optimized prompt or open an AI chat service
- Adds questions to every page currently missing them (~8+ pages)
- Provides consistent styling, dark mode, and mobile behavior across the entire site

---

## Scope

### New files

| File | Purpose |
|------|---------|
| `_includes/questions.html` | Reusable Liquid include — renders question list with heading |
| `assets/css/components/questions.css` | All styling for question list, modal, provider grid, copy button |
| `assets/scripts/review-questions.js` | Vanilla JS IIFE — modal, provider selection, clipboard, cookie |
| `.specs/review-questions/README.md` | This spec |
| `.design/review-questions.md` | Design decisions document |

### Modified files

| File | Change |
|------|--------|
| `_includes/styles.html` | Add `questions.css` to the stylesheet loading order |
| `_includes/scripts.html` | Add `review-questions.js` to the script loading order |
| `_layouts/perspektiv.html` | Replace inline `<ul class="perspektiv-questions">` rendering with `{% include questions.html %}` |
| `_pages/struktur.md` | Refactor: frontmatter questions passed via joined string to include |
| `_pages/mennesker.md` | Same |
| `_pages/påvirkning.md` | Same |
| `_pages/identitet.md` | Same |
| `_pages/ledelse_tillit.md` | Replace hardcoded `<section>` with questions include |
| `_pages/ledelse_usikkerhet.md` | Same |
| `_pages/ledelse_forankring.md` | Same |
| `_pages/ledelse_generativ-ki.md` | Same |
| `_pages/ledelse_perspektiv.md` | Same |
| `_pages/ledelse_triader.md` | Same |
| `_pages/ledelse_makt.md` | Normalize: replace plain `<ul>` with questions include |
| `_pages/grc.md` | Add new questions section |
| `_pages/om_oss.md` | Add new questions section |
| `_pages/om_metode.md` | Add new questions section |
| `_pages/ledelse_60-2.md` | Add new questions section |
| `_pages/step-talk.md` | Add new questions section |
| `_pages/step-report.md` | Add new questions section |
| `_pages/step-interview.md` | Add new questions section |
| `_pages/perspektiv/index.md` | Add new questions section |
| `CHANGELOG.md` | Log the feature addition |
| `BACKLOG.md` | Track Y1–Y9 tasks |

### CSS scope

New selectors in `assets/css/components/questions.css`:

```
.review-questions              — Section container
.review-questions h2           — Section heading
.review-questions ul           — Question list
.review-questions li           — Question item (clickable)
.review-questions li .click-hint — Visual click indicator (SVG icon)
.review-questions-modal        — Modal overlay
.review-questions-modal .modal-card   — Modal content card
.review-questions-modal .modal-close  — Close button (×)
.review-questions-modal .provider-grid — 7-icon provider grid
.review-questions-modal .provider-btn  — Individual provider button
.review-questions-modal .privacy-notice — Cookie disclaimer text
.review-questions-modal .copy-btn       — Copy prompt button
.review-questions-modal .copy-btn.copied — Copied confirmation state
```

### JS scope

New functions in `assets/scripts/review-questions.js`:

```
init()              — Find question items, add click handlers, check saved cookie
openModal(q, ctx)   — Build and open modal with provider grid
closeModal()        — Close modal, restore body scroll
selectProvider(p)   — Copy prompt and optionally save preference
savePreference(p)   — Set cookie with 365-day expiry
getSavedProvider()  — Read saved cookie
buildPrompt(q, ctx) — Construct AI prompt text
copyToClipboard(t)  — Copy text with fallback
handleKeydown(e)    — Escape to close
handleOverlayClick(e) — Click outside to close
```

---

## Acceptance Criteria

### Component structure
- [ ] `_includes/questions.html` accepts `title` (string) and `questions` (pipe-separated string) parameters
- [ ] Include renders a `<section class="review-questions section container--wide animate-on-scroll fade-in-up">` container
- [ ] Each question renders as `<li class="animate-on-scroll slide-in-left stagger">` with clickable indicator
- [ ] Frame pages (`struktur.md`, `mennesker.md`, `påvirkning.md`, `identitet.md`) pass `page.questions | join: "||"` to the include

### Visual
- [ ] Questions are styled identically to existing `.question-list` / `.perspektiv-questions` (arrow bullet, border-bottom, padding)
- [ ] Each question item has a visible click indicator (chat bubble SVG icon, left of text)
- [ ] Hover state: subtle background highlight (matching `.perspektiv-questions li:hover` pattern)
- [ ] Staggered entrance animation preserved (`.stagger-parent` + `--stagger-delay`)
- [ ] Dark mode: all colors use CSS variables — no hardcoded values

### Modal
- [ ] Clicking a question opens a centered modal with dark overlay
- [ ] Modal contains: the full question text, provider selection grid, copy button, "remember choice" checkbox
- [ ] Close button (×) in top-right corner
- [ ] Escape key closes modal
- [ ] Click outside modal content closes modal
- [ ] Body scroll is disabled while modal is open
- [ ] Modal uses `--overlay-light` / `--overlay-dark` variables

### Provider grid
- [ ] 7 providers displayed: ChatGPT, Claude, Gemini, DeepSeek, Perplexity, Copilot, Grok
- [ ] Each provider has an inline monochrome SVG brand icon + name
- [ ] Grid: 2 columns on mobile (≤599px), 3 on tablet (600–899px), 4 on desktop (≥900px)
- [ ] Each provider button is minimum 44×44px touch target
- [ ] Hover state: subtle background highlight on provider button

### Clipboard / prompt
- [ ] Selecting a provider copies the prompt to clipboard
- [ ] Prompt contains: the question, page URL, page title, context about JSON-LD structured data
- [ ] Prompt is in Norwegian Bokmål
- [ ] Visual feedback: "Kopiert!" confirmation shown for 2 seconds
- [ ] Fallback for browsers without clipboard API (select text, show copy instructions)

### Cookie / privacy
- [ ] "Husk valget mitt" checkbox with explicit privacy disclaimer: "Vi lagrer kun ditt valg av KI-leverandør lokalt i nettleseren din. Ingen data sendes til våre servere."
- [ ] Cookie name: `noexcuse_ai_provider`, expiry: 365 days, path: `/`, SameSite: `Lax`
- [ ] Cookie only set when checkbox is checked
- [ ] If cookie exists, auto-select the saved provider on next modal open (but still show the provider grid)

### Page coverage
- [ ] All 4 frame pages refactored to use questions include
- [ ] All 7 article pages refactored to use questions include
- [ ] All ~8 pages without questions get a new questions section (grc, om_oss, om_metode, ledelse_60-2, 3 step pages, perspektiv/index)
- [ ] Questions are suggested for new pages, to be validated in functional user testing

### Performance
- [ ] No inline `<style>` blocks — all CSS in `questions.css`
- [ ] No inline event handlers — all JS in `review-questions.js`
- [ ] Deferred JS loading via `defer` attribute in scripts.html
- [ ] JS file uses strict IIFE pattern, same as `dark-mode-toggle.js`

### Mobile
- [ ] Touch targets ≥44×44px for all interactive elements
- [ ] Modal content card full-width on mobile (≤599px)
- [ ] Text is readable at all viewport widths

---

## Design Constraints

- All colors use CSS variables from `colors.css` — no hardcoded hex values
- No inline `<style>` or `<script>` tags
- Vanilla JavaScript only — no frameworks
- Norwegian Bokmål for all user-facing text
- Accessibility: focus trap inside modal when open
- Privacy: no data sent to any server; cookie is purely client-side
- Touch targets: minimum 44×44px (WCAG 2.2)
- Dark mode: use `var(--*)` references only, no `[data-theme="dark"]` overrides in component CSS

---

## Dependencies

- None — the component is self-contained (new include, new CSS, new JS)
- No images required (provider icons are inline SVG)

---

## Backlog References

Y1–Y9 as defined in BACKLOG.md
