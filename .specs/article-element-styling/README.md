# Article Element Styling

> Created: 2026-09-03
> Status: Done

## Problem / Goal

Refine article element visuals (headings, blockquotes, tables, cards) to the subtle, typography-driven brand direction, and delete dead CSS that renders on zero pages.

## Scope

- `assets/css/typography.css` — h4/h5 heading scale, blockquote unification
- `assets/css/article.css` — section dividers, table zebra striping, card hover refinement, `.info-box` deletion
- `assets/css/metode.css` — full file deletion (all selectors dead)
- `_includes/styles.html` — remove metode.css `<link>`
- `.design/css-architecture.md` — document element styling system + dead CSS removal

## Acceptance Criteria

- [x] h4/h5 headings have designed sizes (h4 1.15em/600, h5 1em/600, mobile 1em/0.9em)
- [x] Section divider: 1px border-top `var(--border-color)` on `h2:not(:first-of-type)`
- [x] Blockquote: single definition in typography.css with `var(--accent-color)` border, no article.css override
- [x] Table: zebra striping via `nth-child(even)` + `var(--surface-subtle)`, caption styling, horizontal scroll preserved
- [x] Card hover: base `var(--shadow-xs)` → hover `var(--shadow-sm)`, `transition: box-shadow 0.2s ease`, no transform
- [x] `assets/css/metode.css` deleted entirely (all selectors dead)
- [x] `.info-box` block removed from article.css
- [x] metode.css `<link>` removed from styles.html

## Lessons Learned

- The `.info-box` block's only consumer was `metodikk-callout.html`, included only by `_layouts/product.html`, and zero pages use `layout: product` — safe to delete.
- `metode.css` selectors (frame-item/founder-card family) were rendered on zero pages — safe to delete entirely.
- `_layouts/product.html` and `_includes/metodikk-callout.html` remain in the repo unused — future cleanup candidates.
- The color plan's `--frame-struct/human/political/symbol` variables become unreferenced after the metode.css deletion — left in place (harmless); future cleanup decision.