# A1 — Architecture Cleanup: CSS, HTML, Content Model, Images, JS

## Purpose

Consolidate all five layers — CSS, HTML templates, content model (Markdown collections), images, and JavaScript — into a single coherent architecture. The current codebase grew organically through feature-by-feature delivery, resulting in:

- Four independent hero implementations (duplicated CSS, no shared HTML partial)
- Hardcoded card HTML in pages instead of iterating a collection
- Inline `<style>` blocks remaining in `_pages/om_metode.md`
- Hardcoded color values in component CSS files that don't source from `colors.css`
- `styles-dark.css` bloated with component re-selection that could be pure variable swaps
- `products.css` mixing product, hero, landing, and card concerns — 509 lines
- `_frames/` collection duplicating topic card data that could live in one unified collection

## Scope

| Layer | Files | Outcome |
|-------|-------|---------|
| Content | `_frames/`, `_pages/om_metode.md`, `_pages/ledelse_60-2.md` | Frames migrated to `_topics/`; pages use `site.topics` iteration |
| CSS | `assets/css/*.css` | By-concern file organization; zero hardcoded colors; hero unified; cards unified; `styles-dark.css` reduced |
| HTML | `_includes/`, `_pages/*.md` | New `hero.html` and `card.html` partials; no inline `<style>` anywhere |
| Images | `assets/images/banners/` | Naming convention matching topic slugs |
| JS | `assets/js/` | No structural change — keep progressive enhancement pattern |

## Acceptance Criteria (Checklist)

### A1.1 — Topic consolidation (`_topics/` collection)

- [ ] `_config.yml` registers `_topics/` collection with `output: false`
- [ ] All `_frames/*.md` files are copied to `_topics/` with frontmatter amended to include `category: frame`
- [ ] `_topics/` items in `_config.yml` defaults have `category` field, image path, and layout reference
- [ ] Benefit cards and process step data from `_products/ledelse-60-2.md` frontmatter are migrated to `_topics/` with appropriate categories (`benefit`, `step`)
- [ ] `_frames/` directory is removed after migration
- [ ] Frame article pages (`_pages/struktur.md` etc.) continue to render correctly — their topic content is sourced from `site.topics` where `category == "frame"`, and the article page links remain `/struktur/` etc. (unchanged permalinks)
- [ ] Every card on `om_metode.md` (frame grid) and `ledelse_60-2.md` (benefit grid, process steps) is rendered via `_includes/card.html` iterating `site.topics`, not hardcoded HTML

### A1.2 — Hero unification

- [ ] `_includes/hero.html` is created — renders from page frontmatter fields: `hero.image`, `hero.title`, `hero.breadcrumb`, `hero_effect`
- [ ] `assets/css/components/hero.css` contains a single `.hero` class set that handles all hero variants (landing, science, about, frame/perspektiv)
- [ ] The 4 existing hero implementations (`.frame-hero` in `article.css`, `.about-hero` in `about.css`, `.landing-hero`/`.science-hero` in `products.css`) are removed — replaced by the shared `.hero` component
- [ ] All 12 pages with heroes (`ledelse_60-2.md`, `om_oss.md`, `om_metode.md`, `struktur.md`, `identitet.md`, `mennesker.md`, `pavirkning.md`, `forankring.md`, `generativ-ki.md`, `tillit.md`, `usikkerhet.md`, `vitenskapelig-grunnlag.md`) use the same `_includes/hero.html` include
- [ ] Hero frontmatter is added to pages missing it; redundant frontmatter is removed

### A1.3 — Card partial

- [ ] `_includes/card.html` renders one topic item from a given category — uses `topic.image`, `topic.title`, `topic.description`, `topic.cta` where applicable
- [ ] Card styling lives entirely in `assets/css/components/card.css`
- [ ] Pages pass `include.category` to iterate and render the relevant subset of topics
- [ ] Cards respect dark mode via CSS variables only (same as A1.4)
- [ ] Card layout variants (grid vs. row, icon vs. banner image) are controlled by CSS classes, not separate HTML includes

### A1.4 — CSS color hygiene

- [ ] `grep -n '#fff\|#ffffff\|#000\|#000000\|color: rgba\|background: rgba\|background-color: rgba' assets/css/*.css` returns zero matches in `article.css`, `about.css`, `products.css`, `header.css`, `navbar.css`, `footer.css`, `profiles.css`
- [ ] All visual color values use `var(--variable)` referencing `colors.css`
- [ ] `colors.css` has sufficient variable coverage for every component — no component falls back to a hardcoded color
- [ ] `styles-dark.css` is reduced from 283 lines to approximately 30 lines — only variable flips and aesthetic tweaks (gradient intensity, shadow depth) that cannot be expressed as pure variable swaps

### A1.5 — CSS file reorganization

- [ ] `assets/css/components/` directory exists with files:
  - `hero.css` — all hero layout, overlay, responsive styles
  - `card.css` — all card layout, hover, responsive styles
  - `buttons.css` — all button / CTA styles (extracted from `products.css`)
  - `header.css` — stays as-is
  - `navbar.css` — stays as-is
  - `footer.css` — stays as-is
  - `profiles.css` — stays as-is
  - `products.css` — only product-specific layout (pricing, feature comparison, product metadata)

- [ ] `article.css` is reduced to article reading layout only (typography, reading width, article-specific spacing) — no hero, no cards
- [ ] `about.css` is reduced to about-specific layout only — no hero
- [ ] `assets/css/` root files after cleanup:
  - `colors.css`, `typography.css`, `layout.css`, `animations.css`, `utilities.css` (stay)
  - `components/` (new directory — component CSS)
  - `styles-dark.css` (shrunk), `styles-light.css` (stay)
  - `article.css` (stripped), `about.css` (stripped), `products.css` (stripped)
  - `avtale.css`, `perspektiv-styles.css`, `podcast.css`, `cases.css`, `partners.css` (stay — narrow scope)

### A1.6 — Inline CSS removal

- [ ] `grep -r '<style' _pages/` returns zero matches
- [ ] `_pages/om_metode.md` has no `<style>` block — any remaining inline styles are moved to appropriate CSS files
- [ ] No page carries page-specific CSS in a `<style>` tag — page-specific overrides go to a dedicated CSS file or use existing utility classes

### A1.7 — No regressions

- [ ] `bundle exec jekyll build` exits 0
- [ ] All pages render heroes correctly (check top 3 pages: `/ledelse-60-2/`, `/om-oss/`, `/om-metode/`)
- [ ] Hero animations (parallax-fade, heroReveal) continue to work — the JS selector `.hero-image` still matches
- [ ] Frame cards, benefit cards, and process-step cards render correctly on `om_metode.md` and `ledelse_60-2.md`
- [ ] Dark mode renders correctly on all hero variants and card types
- [ ] No test regressions — `npm test` exits 0

## Implementation Order

| Step | What | Why |
|------|------|-----|
| 1 | Topic content migration | Foundation — everything depends on the unified collection |
| 2 | Hero include + CSS | Next — every page uses it, so it's a big diff to review early |
| 3 | Card include + CSS | Needs topic collection in place (step 1) |
| 4 | CSS color purge | Low risk, mechanical — can be done after structural changes settle |
| 5 | CSS file split + cleanup | Reorganize after all CSS changes are done |
| 6 | Inline CSS removal | Final cleanup |
| 7 | `styles-dark.css` shrink | Last — depends on all other CSS being clean |
| 8 | Full regression pass | Verify build, render, animations, dark mode |

## Design References

- `.design/architecture.md` — Jekyll path handling, collection patterns
- `.design/css-architecture.md` — CSS variable naming, component organization
- `.specs/architecture/README.md` — Collection registration, frontmatter schemas
- `.specs/three-step-pages/README.md` — Product page card patterns
- `.specs/multi-product/README.md` — Reusable product presentation

## Dependencies

- **None** — this is purely refactoring of existing content and styles
- **Parallel with FF1, FF2, FF4, FF6** — this cleanup should be done before or concurrent with new feature work to avoid building on the old architecture
- **Prerequisite for P5** (layout migration) — the layout migration spec assumes a clean CSS/content architecture
