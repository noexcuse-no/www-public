# LLM Disclaimer Banner — Restyle

> Created: 2026-07-31
> Status: In Progress
>
> **Updated 2026-08-30 (strategy alignment):** This banner is the **provenance layer** — it discloses that the site is AI-assisted. It is separate from the AI-reflection privacy layers (`.specs/privacy-communication/README.md`). The banner tells visitors the site content is AI-generated; the privacy layers tell visitors what happens to their AI-reflection conversation. Do not conflate the two. The banner's text, GitHub link, and guardrail comment stay verbatim (R36).

## Problem / Goal

The LLM disclosure banner in `_includes/header.html` is styled with inline
styles (`opacity: 0.3; background-color: yellow; rotate: 45deg;
position: fixed; ...`), which:

- Violates the project's `.htmlhintrc` rule `inline-style-disabled: true`.
- Violates the CSS conventions (no inline styles, `var()` tokens only).
- Renders as a broken-looking, hard-to-read diagonal strip that overlaps content.

Goal: restyle it as a clean, always-visible top bar above the site header,
themed with the existing design tokens, readable in both light and dark mode.

## Scope

- `_includes/header.html` — replace inline `style` with `class="ai-disclaimer"`.
  Text, GitHub link, and the guardrail comment on line 2 stay verbatim.
- `assets/css/components/disclaimer.css` — new component stylesheet
  (layout only): centered on desktop, left-aligned on mobile, link styling.
- `assets/css/styles-light.css` / `assets/css/styles-dark.css` — themed
  colors following the existing `.banner` pattern (`--banner-background/text-*`).
- `_includes/styles.html` — register the new stylesheet.

## Acceptance Criteria

- [ ] No inline styles remain in `_includes/header.html`.
- [ ] Banner renders as a full-width bar above the header, centered on desktop
      and left-aligned at ≤ 599px.
- [ ] Uses `var()` design tokens only; WCAG AA contrast in light and dark mode.
- [ ] Disclaimer text, GitHub link, and the guardrail comment are unchanged.
- [ ] `npm run lint` passes (0 errors, 0 warnings).

## Lessons Learned

<!-- Populated if item returns to Planning after attempted implementation -->
