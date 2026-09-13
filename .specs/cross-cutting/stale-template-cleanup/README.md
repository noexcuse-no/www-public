# Stale Template Cleanup — Fix Specification

> Created: 2026-09-13
> Status: Ready

## Purpose / Problem

Seven template files are confirmed orphans: zero live references across all build inputs (`_layouts/`, `_includes/`, `_pages/`, `index.md`, `_config.yml`, `_includes/styles.html`, `_includes/scripts.html`). They were superseded by the article-layout migration (R35, PR #181) and the homepage cleanup (1.10.0) but never deleted.

## Scope (files verified orphaned 2026-09-13)

| File | Former role | Superseded by |
|------|-------------|---------------|
| `_layouts/perspektiv.html` | Frame perspective layout | `layout: article` + `perspektiv-styles.css` (frames spec) |
| `_layouts/product.html` | Product layout | `layout: article` on `_pages/ledelse-60-2.md` (R35) |
| `_includes/article-feed.html` | Homepage article feed | Homepage cleanup (CHANGELOG 1.10.0) |
| `_includes/benefit-cards.html` | Benefit article cards | Inline list-based rendering (1.10.0 CTA consolidation) |
| `_includes/products.html` | Homepage products section | Shared components (signature-60-2-4, recognition-cards, price-card, cta-panel) |
| `_includes/sidebar-home.html` | Homepage sidebar | Homepage cleanup (CHANGELOG 1.10.0) |
| `_includes/step-cards.html` | Process step cards | Inline list-based rendering (1.10.0) |

Secondary-pattern evidence: each file's unique CSS classes (`perspektiv-section`, `section-heading`, `sidebar-featured-articles`, `product-hero`) have zero references outside the candidate file. Shared classes (`card-grid`, `section`) are defined in retained files (`card.css`, `layout.css`) and are unaffected.

## Acceptance Criteria

- [ ] All 7 files deleted in one commit
- [ ] `grep -r "article-feed\|benefit-cards\|sidebar-home\|step-cards\|perspektiv.html\|layout: product" _layouts/ _includes/ _pages/ index.md` → no live template references
- [ ] Docker Jekyll build exit 0, route set unchanged (no page referenced these)
- [ ] `npx vitest run` stays green
- [ ] CHANGELOG entry under [Unreleased] → Removed

## Backlog References

- RA2
