# Codebase Integrity & Technical Debt Cleanup

> **Status:** I1 — Done (PR #159), I2 — Done (PR #158)
> 
> Two workstreams: ensure specs match reality and code is cleanly modularized.

## Part A — Spec/Design Integrity Audit (I1) — Completed

### Changes Made

| Action | Details |
|--------|---------|
| **Content research → `.research/`** | Moved `shared/`, `ledelse-60-2/`, `grc/`, `generativ-ki/`, `frames/` from `.specs/` to `.research/` |
| **Archived completed specs** | 24 specs for Done BL items moved to `.specs/archive/` |
| **Renamed gap-analysis specs** | `homepage-gaps` → `homepage-overhaul`, `om-oss-gaps` → `om-oss-forbedringer`, `conversion-gaps` → `conversion-infrastructure`, `missing-landing-pages` → `topical-landing-pages` |
| **Fixed stale references** | `.specs/partners/README.md` and `.specs/cases/README.md` now match actual page-class implementation |
| **Archived superseded design docs** | `review-questions.md`, `citation-enhancement.md`, `c2pa-cc0-licensing.md`, `visual-polish-r23.md` moved to `.design/archive/` |

### Current State

**Active specs** in `.specs/`:
- `.specs/accessibility/`
- `.specs/architecture/`
- `.specs/booking-direct-links/`
- `.specs/brand-trait-reconciliation/`
- `.specs/cases/` — updated (page-class model)
- `.specs/codebase-integrity/`
- `.specs/conversion-infrastructure/` (renamed from `conversion-gaps`)
- `.specs/cta-design/`
- `.specs/emne/`
- `.specs/hero-layout-fixes/`
- `.specs/homepage-overhaul/` (renamed from `homepage-gaps`)
- `.specs/html-to-md-refactor/`
- `.specs/i18n/`
- `.specs/image-optimization/`
- `.specs/inbound-sales/`
- `.specs/ledelse-60-2-ui-ux/`
- `.specs/makt/`
- `.specs/metode-overhaul/`
- `.specs/mobile-cta-widths/`
- `.specs/multi-product/`
- `.specs/navigation/`
- `.specs/om-oss-forbedringer/` (renamed from `om-oss-gaps`)
- `.specs/om-oss/`
- `.specs/partners/` — updated (page-class model)
- `.specs/perspektiv/`
- `.specs/privacy/`
- `.specs/production-ui-audit/`
- `.specs/profile-card-redesign/`
- `.specs/profile-card-test-fixes/`
- `.specs/profile-filter/`
- `.specs/profile-modal-redesign/`
- `.specs/profile-tag-formatting/`
- `.specs/regression-fixes-phase6/`
- `.specs/regressions/`
- `.specs/security/`
- `.specs/semantic-metadata/`
- `.specs/seo/`
- `.specs/social-previews/`
- `.specs/technical-debt/` — archived
- `.specs/three-step-pages/`
- `.specs/topical-landing-pages/` (renamed from `missing-landing-pages`)
- `.specs/triader/`
- `.specs/ui-upgrade/`
- `.specs/usikkerhet-rename/`
- `.specs/usikkerhet/`

**.specs/archive/** contains 24 archived specs from Done BL items.

**.research/** contains 5 directories with content research/bibliography materials.

**.design/archive/** now contains 5 files: `plan-v0.md`, `review-questions.md`, `citation-enhancement.md`, `c2pa-cc0-licensing.md`, `visual-polish-r23.md`.

### Remaining Observations (not in I1 scope)

- `_includes/sticky-cta.html` + `sticky-cta.js` — has CSS and JS but no dedicated spec
- `_includes/stat-bridge.html` — no dedicated spec
- Responsive/mobile behavior — no comprehensive spec
- `.specs/seo/README.md` overlaps with `.specs/social-previews/README.md` — consolidation deferred

---

## Part B — Technical Debt Cleanup (I2)

### Current State

**43 includes** in `_includes/` — 16 orphaned (never included anywhere)
**25 CSS files** in `assets/css/` — 3 dead/orphaned, others with mixing concerns
**5 JavaScript files** — 1 with dead code (unused `.back-to-top` wiring)
**5 layouts** — clean but some include orphaned references
**2 collections** registered in `_config.yml` with zero content

### 1. Orphaned Includes (37% of total)

These files exist on disk but are never `{% include %}` from any layout or page:

| File | Notes |
|---|---|
| `_includes/about-section.html` | Likely old Om Oss content, superseded by inline frontmatter |
| `_includes/about-values.html` | Same — old value cards, superseded by inline markdown |
| `_includes/avtale-page.html` | Part of old avtale implementation |
| `_includes/avtale-section.html` | Same |
| `_includes/cases.html` | Superseded by `cases-cards.html` — renders identical content with different class names |
| `_includes/challenge-card.html` | Never used — was intended for frame challenge grids but the grid is rendered structurally (h4-based) |
| `_includes/ethics-columns.html` | Old ethics section component, superseded by inline content |
| `_includes/framework-illustration.html` | Superseded by `section-wrapper.html` or inline illustrations |
| `_includes/podcast.html` | **Entire body is HTML-commented out** — dead code. But `podcast.css` is still loaded. |
| `_includes/section-container.html` | Wrapper — never used |
| `_includes/section-illustration.html` | Illustration include — never used directly |
| `_includes/section-wrapper.html` | Generic section builder — never used |
| `_includes/science-divider.html` | Part of old science section pattern |
| `_includes/science-highlight.html` | Same |
| `_includes/science-quote.html` | Same |
| `_includes/science-section.html` | Same |

### 2. Orphaned/Dead CSS

| File | Lines | Problem |
|---|---|---|
| `assets/css/about.css` | 2 | Completely empty — all content notes say "moved to article.css". Zero actual CSS rules. Still loaded in `styles.html`. |
| `assets/css/podcast.css` | 13 | Styles `.podcast` and `.embed-container` — the only file using these classes is `podcast.html` which is entirely commented out. Dead CSS. |
| `assets/css/cases.css` | 22 | Styles `.cases` and `.case` classes. The orphaned `cases.html` include uses them. The active `cases-cards.html` uses `.landing-cases-grid` and `.case-card` — not `.cases`/`.case`. CSS is loaded but matches nothing. |

### 3. CSS Mixing Concerns

Several CSS files mix concerns that should be separated:

| File | Lines | Issues |
|---|---|---|
| `assets/css/article.css` | 528 | Mixes article-body styles, CTA section, tag cloud, info boxes, tables, blockquotes, ordered step lists, value card icons, ethics columns, footnotes — at least 10 distinct concerns |
| `assets/css/products.css` | 617 | Largest CSS file. Mixes product layout, benefit cards, step cards, stat bridge, feature lists, hero CTA overrides |
| `assets/css/profiles.css` | 496 | Large — profile cards, filter UI, modal overlays, animations |
| `assets/css/perspektiv-styles.css` | 101 | Only used by frame pages (frame_id set). Could be componentized. |

**Good separation:** `components/hero.css` (100 lines), `components/buttons.css` (88 lines), `components/card.css` (151 lines), `components/questions.css` (302 lines), `components/illustrations.css` (63 lines) — these are cleanly modular.

### 4. Dead JavaScript

**`.back-to-top` button** — HTML in `_layouts/default.html` line 16, CSS in `layout.css` lines 14–52. The `.is-visible` class exists in CSS but **no JavaScript ever adds it**. The button is permanently invisible. The IntersectionObserver toggles in `sticky-cta.js` are for the sticky CTA bar, not the back-to-top button.

### 5. Empty Collections

| Collection | Registered in `_config.yml` | Directory | Content files |
|---|---|---|---|
| `cases` | Yes (`output: true`) | `_cases/` | Empty |
| `partners` | Yes (`output: true`) | `_partners/` | Empty |

The `_includes/partners.html` and `_includes/cases-cards.html` both check `{% if collection.size > 0 %}` before rendering, so they correctly render nothing. But the CSS for both is loaded on every page.

### 6. Include/Collection Model Mismatch

- `_includes/partners.html` queries `site.pages where: class: "partner"` — but `_config.yml` registers `partners:` as a Jekyll collection. If someone adds `_partners/partner.md`, the include **won't find it** because it queries pages, not the collection.
- Same issue with `_includes/cases-cards.html` — queries `site.pages where: class: "case"` instead of `site.cases`. The `_cases/` collection exists but is never used.
- `_includes/profiles.html` queries `site.pages where: class: "profile"` — profiles are in `_pages/` as pages, which works, but `_profiles/` directory doesn't exist.

### 7. Duplicate Concerns

- `.specs/partners/README.md` and `.specs/cases/README.md` — both describe collection-based models, but implementation uses page-class model. Spec and implementation disagree.
- `.specs/social-previews/README.md` overlaps with `.specs/seo/README.md` — SEO spec should be updated or consolidated.

### 8. Inline Styles (CSS Convention Violation)

A few instances of inline `style` attributes exist:
- `_includes/cases-cards.html` line 10: `style="--stagger-delay: 100ms;"`
- `_includes/card.html` line 7: `style="{% if topic.color_accent %}--card-accent: {{ topic.color_accent }};{% endif %}"`

These are CSS custom properties set inline, which is an accepted pattern for dynamic values but still violates the `no inline styles` convention in `.omo/rules/css-conventions.md`.

### Proposed Actions (I2)

**Phase 1 — Remove dead code (safe, no behavior change):**
1. Delete 16 orphaned includes
2. Delete `about.css`, `podcast.css`, `cases.css` (and remove from `styles.html`)
3. Confirm no page breaks from removing these

**Phase 2 — Fix broken code (restore intended behavior):**
4. Wire `.back-to-top` JS toggle (IntersectionObserver or scroll listener)
5. Fix `.specs/partners/README.md` to match actual implementation (page query, not collection)
6. Fix `.specs/cases/README.md` to match actual implementation

**Phase 3 — DRY and modularize:**
7. Extract distinct concerns from `article.css` into separate component files:
   - `article-body.css` (core article styles)
   - `cta-section.css` (CTA section — currently mixed into article.css)
   - `tag-cloud.css` (tag cloud — currently mixed into article.css)
   - `footnotes.css` (footnotes — currently mixed into article.css)
8. Review `products.css` (617 lines) for extraction opportunities
9. Review `profiles.css` (496 lines) for extraction opportunities

**Phase 4 — Collection model alignment:**
10. Decide: use Jekyll collections (`_cases/`, `_partners/`) or page-class model (`site.pages where: class: "case"`)? Then make implementation + spec consistent.
11. Clean up `_config.yml` — remove orphaned collection registrations if not using them

**Phase 5 — Documentation:**
12. Update `.specs/partners/README.md` with correct implementation details
13. Update `.specs/cases/README.md` with correct implementation details
14. Create spec for `.back-to-top` behavior
15. Update `.design/css-architecture.md` if CSS file structure changes

### Excluded from scope

- Page `.md` content files — explicitly requested not to be touched
- BL items that are already Planned/Done — no re-prioritization
- Actual implementation — this is a planning document for future cleanup work
