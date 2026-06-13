# CTA Frontmatter Unification

> Created: 2026-06-12
> Status: Draft

## Problem

CTA buttons are currently defined in four different frontmatter conventions:

| Convention | Used by | Pages affected |
|---|---|---|
| `hero.cta_text` + `hero.cta_url` | `hero.html` | 1 (`ledelse_60-2.md`) |
| `cta:` (heading + body, hardcoded buttons) | `article.html`, `cta-section.html` | 16 |
| `cta_a`, `cta_b`, `cta_c` | `products.html` | 1 (`ledelse_60-2.md`) |
| Hardcoded in `article.html` | sidebar CTA card | 1 template (all article pages) |

CSS class `.product-cta` is also misnamed — it's used on non-product pages (article sidebars, heroes, cards) and has nothing to do with product context.

This creates confusion about:
- Where to add a CTA for a new page
- How to override buttons without editing templates
- Which frontmatter field takes precedence when multiple are present
- How product cards on non-product pages discover the product's CTAs

## Target State

### Frontmatter schema

A single `cta` list on any page frontmatter. Zero or more items, each with `text` and `url`.

```yaml
cta:
  - text: "Bestill uforpliktende samtale"
    url: "https://outlook.office.com/book/ledelse@noexcuse.no/?ismsaljsauthenabled"
  - text: "Les mer om Ledelse 60:2 →"
    url: "/ledelse-60-2/"
```

Conventions:
- Index 0 is the primary action.
- Index 1 is the secondary action.
- Index 2+ are tertiary actions, rendered in order without assumed hierarchy.
- An empty `cta` list or omitted field means no CTA buttons on that page.
- All items are optional — the list length is unbounded but each consumer renders only as many as it has room for.

The previous `cta.heading` and `cta.body` fields are removed from the CTA concept. If a heading/body section wrapper is needed around CTA buttons, it becomes a separate frontmatter field (e.g. `cta_section_heading`) or is handled by the page's content body.

### Product CTA discovery

When a non-product page renders a product card or product sidebar, the template fetches the product's `cta` list from the canonical product page:

```liquid
{% assign product = site.pages | where: "class", "product" | first %}
{% if product.cta %}
  {% for cta in product.cta limit:2 %}
    <a href="{{ cta.url }}" class="cta {% if forloop.first %}cta--primary{% else %}cta--secondary{% endif %}">
      {{ cta.text }}
    </a>
  {% endfor %}
{% endif %}
```

This ensures:
- The product page is the single source of truth for its own CTAs.
- Cards and sideplates on other pages automatically stay in sync when the product page updates its `cta` list.
- No duplication of booking URLs or button text across 16 pages.

## Template rendering rules

| Component | Consumes | Limit | Placement |
|---|---|---|---|
| `hero.html` | `page.cta[0]` | 1 | Hero overlay, Type A styling |
| `article.html` (sidebar `.sidebar-cta`) | `page.cta[0]` + `page.cta[1]` | 2 | Right sidebar, below questions |
| `article.html` (mobile `.cta-section`) | `page.cta[0]` + `page.cta[1]` | 2 | Within article body (hidden on wide screens) |
| `products.html` (product hero) | `product.cta[0]` + `product.cta[1]` | 2 | Product page hero section |
| `products.html` (product footer) | `product.cta[2]` | 1 | Bottom of product section |
| Product card (on non-product pages) | `product.cta[0]` + `product.cta[1]` | 2 | Card footer |
| Product sidebar (on non-product pages) | `product.cta[0]` + `product.cta[1]` | 2 | Right sidebar |

Every consumer renders the first N items. Index 0 always gets `.cta--primary`, index 1 gets `.cta--secondary`. No style guessing needed.

### Pages without `cta`

If a page has no `cta` field, no CTA buttons render anywhere — hero, sidebar, or mobile section. This is the default for pages like profile pages or content-only articles that don't need a call to action.

### Pages where product cards appear

When a template renders a product card on a non-product page, it reads the product's `cta` from `site.pages`. The hosting page's own `cta` and the product's `cta` are independent — they can coexist (page CTAs in the sidebar, product CTAs in the card).

## CSS rename

| Current | New | Notes |
|---|---|---|
| `.product-cta` | `.cta` | Base class, shared styles |
| `.product-cta--secondary` | `.cta--secondary` | Type B variant |
| `.product-cta--spaced` | `.cta--spaced` | Margin variant |

The CSS stays in `buttons.css`. No file reorganization needed, just class renames.

```css
.cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: 0.5em 1.5em;
    border-radius: 4px;
    font-weight: 600;
    text-decoration: none;
    border: 2px solid;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
    background-color: #F0FFFF;
    color: #003060;
    border-color: #003060;
}

.cta--secondary {
    background-color: #003060;
    color: #F0FFFF;
    border-color: #F0FFFF;
}

.cta--spaced {
    margin-left: var(--space-md);
}
```

## Migration inventory

### Files to modify

**Frontmatter updates (16 pages):**
Each page currently using `cta:` with heading/body needs:
- `cta:` object → `cta:` list
- Remove `heading` and `body` fields
- Add CTA items with `text` and `url`
- The heading+body section text moves to where it best fits (page content, or a new `cta_section_heading` if needed)

Pages:
1. `_pages/baerekraft.md`
2. `_pages/compliance.md`
3. `_pages/endringsledelse.md`
4. `_pages/grc.md`
5. `_pages/informasjonssikkerhet.md`
6. `_pages/kultur.md`
7. `_pages/kvalitet.md`
8. `_pages/ledelse_forankring.md`
9. `_pages/ledelse_generativ-ki.md`
10. `_pages/ledelse_makt.md`
11. `_pages/ledelse_perspektiv.md`
12. `_pages/ledelse_tillit.md`
13. `_pages/ledelse_triader.md`
14. `_pages/ledelse_usikkerhet.md`
15. `_pages/risikostyring.md`
16. `_pages/ledelse_60-2.md` — also needs `cta_a/b/c` → `cta` list

**Template updates:**
| File | Change |
|---|---|
| `_includes/hero.html` | Read `page.cta[0]` instead of `hero.cta_text/url` |
| `_includes/products.html` | Read `product.cta[0..2]` instead of `cta_a/b/c` |
| `_includes/cta-section.html` | Replace with CTA list rendering or remove if superseded by article.html inline |
| `_layouts/article.html` | Read `page.cta` list for sidebar + mobile sections; remove hardcoded URLs |
| `_includes/card.html` | Read product's `cta` list from `site.pages` |

**CSS updates (7 files):**
| File | Change |
|---|---|
| `assets/css/components/buttons.css` | `.product-cta` → `.cta` |
| `assets/css/components/sidebar.css` | `.product-cta` → `.cta` |
| `assets/css/components/sticky-cta.css` | `.product-cta` → `.cta` |
| `assets/css/components/newsletter.css` | `.product-cta` → `.cta` |
| `assets/css/products.css` | `.product-cta` → `.cta` |
| `assets/css/perspektiv-styles.css` | `.product-cta` → `.cta` |
| `assets/css/avtale.css` | `.product-cta` → `.cta` |

### Files to delete

- `_includes/cta-section.html` — functionality absorbed by article.html CTA rendering

## Backward compatibility

No breaking changes during migration:
1. Add `cta` list to all pages first (frontmatter only)
2. Update templates to check `cta` list first, fall back to old fields
3. Remove old frontmatter fields once templates stop reading them
4. Rename CSS class last, after all template references are updated

Each PR only changes one layer at a time. The site stays deployable at every step.

## Acceptance criteria

- [ ] Any page with `cta: [{text, url}]` renders buttons in hero, sidebar, and mobile sections
- [ ] Product cards on non-product pages display the product's CTAs from `site.pages`
- [ ] Pages without `cta` show no CTA buttons anywhere
- [ ] Index 0 is styled `.cta--primary` (Type A), index 1 is `.cta--secondary` (Type B)
- [ ] Index 2+ are rendered in order without assumed hierarchy
- [ ] CSS class `.product-cta` no longer exists — replaced by `.cta` + modifiers
- [ ] All 16 migrated pages have correct CTA text and URLs
- [ ] `hero.cta_text`, `cta_a/b/c`, and `cta.heading/body` fields are removed from all pages
- [ ] `cta-section.html` is deleted

## Dependencies

- **CTA Design System** (`.specs/cta-design/README.md`) — visual styling rules remain unchanged
- **Layouts** (`.design/layouts.md`) — section spacing and container widths for CTA placement
- **Information Architecture** (`.design/information-architecture.md`) — no changes needed, URLs stay the same
