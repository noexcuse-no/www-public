# Technical Debt — Cleanup Specification

## Purpose / Problem

The codebase has accumulated 16 orphaned includes (37% of `_includes/`), 3 dead CSS files that load on every page but contain no active styles, a shipped-but-never-activated `.back-to-top` button, and CSS files that mix multiple unrelated concerns into single files. Two empty Jekyll collections are registered in `_config.yml` but queried via a different model (page-class). Specs reference the wrong model.

This is not a feature — it's cleanup. The site will look and behave identically after each phase, with smaller, more maintainable files.

## Scope

Files and directories to be changed across 5 phases:

### Phase 1 — Remove dead code

Delete these 16 includes:
- `_includes/about-section.html`
- `_includes/about-values.html`
- `_includes/avtale-page.html`
- `_includes/avtale-section.html`
- `_includes/cases.html`
- `_includes/challenge-card.html`
- `_includes/ethics-columns.html`
- `_includes/framework-illustration.html`
- `_includes/podcast.html`
- `_includes/section-container.html`
- `_includes/section-illustration.html`
- `_includes/section-wrapper.html`
- `_includes/science-divider.html`
- `_includes/science-highlight.html`
- `_includes/science-quote.html`
- `_includes/science-section.html`

Delete these 3 CSS files:
- `assets/css/about.css`
- `assets/css/podcast.css`
- `assets/css/cases.css`

And remove their references from:
- `_includes/styles.html`

### Phase 2 — Fix broken code

- `_layouts/default.html` — `.back-to-top` button exists with CSS but no JS toggles `.is-visible`; add IntersectionObserver or scroll listener
- `.specs/partners/README.md` — fix to match page-class implementation (already covered in I1)
- `.specs/cases/README.md` — fix to match page-class implementation (already covered in I1)

### Phase 3 — CSS modularization

- `assets/css/article.css` — extract distinct concerns into separate files
- `assets/css/products.css` — extract opportunities
- `assets/css/profiles.css` — extract opportunities
- `_includes/styles.html` — add new component CSS references
- `assets/css/components/` — target directory for extracted CSS

### Phase 4 — Collection model alignment

- `_config.yml` — remove `cases:` and `partners:` collection registrations (keep page-class model)

### Phase 5 — Documentation

- Create `.specs/back-to-top/README.md` if non-trivial behavior is added
- Update `.design/css-architecture.md` if CSS file structure changes significantly

## Design Documents

- `.design/codebase-integrity.md` — full analysis with file-level details

## Acceptance Criteria

### Phase 1
- [ ] All 16 orphaned includes deleted — confirmed by `ls _includes/` and grep for `{% include` references
- [ ] All 3 dead CSS files deleted — confirmed by `ls assets/css/`
- [ ] `_includes/styles.html` no longer references `about.css`, `podcast.css`, or `cases.css`
- [ ] `bundle exec jekyll build` succeeds with no Liquid errors about missing includes
- [ ] Site renders identically — no visual regressions on homepage, article pages, Om Oss, produkter, emne, frame pages

### Phase 2
- [ ] `.back-to-top` button becomes visible when scrolling down past ~1 viewport height
- [ ] `.back-to-top` button scrolls to top when clicked
- [ ] `.back-to-top` button hides again when at top of page
- [ ] No new JavaScript errors in browser console
- [ ] `.specs/partners/README.md` and `.specs/cases/README.md` describe actual implementation (covered by I1 spec)

### Phase 3
- [ ] `article.css` is reduced (extracted concerns removed) — verified by file size/lines
- [ ] Extracted CSS files are loaded in `styles.html` in correct order
- [ ] No visual regressions on articles that use extracted styles (CTA section, tag cloud, footnotes, etc.)
- [ ] `products.css` and `profiles.css` show measurable size reduction
- [ ] All CSS still uses CSS variables from `colors.css` — no hardcoded colors introduced
- [ ] `lsp_diagnostics` clean on all modified CSS files

### Phase 4
- [ ] `_config.yml` has no `cases:` or `partners:` under `collections:`
- [ ] `_includes/partners.html` still works (queries `site.pages where: class: "partner"`)
- [ ] `_includes/cases-cards.html` still works (queries `site.pages where: class: "case"`)
- [ ] Build succeeds with no Jekyll warnings about orphaned collection directories

### Phase 5
- [ ] `.design/css-architecture.md` reflects current CSS file organization
- [ ] New or updated specs written for any behavior that changed

## Backlog References

I2

## Dependencies

- I1 should be completed first (spec/design integrity audit) — spec file references need to be accurate before implementation
- Phase 2 depends on Phase 1 (clean slate before fixing)
- Phase 3 depends on Phase 2 (documentation first)
- Phase 4 independent — can be done any time

## Design Constraints

- Zero visual or behavioral change to the live site
- All CSS must continue using CSS variables from `colors.css`
- No inline `style=""` attributes introduced
- Page `.md` content files must not be touched
- Touch targets: minimum 44×44px (for back-to-top)
- Dark mode must work with any newly extracted CSS files
- Must follow existing CSS naming conventions from `.omo/rules/css-conventions.md`
- Every `{% include %}` reference must resolve — verify with `bundle exec jekyll build`
