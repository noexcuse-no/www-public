# CTA Frontmatter — Current Contract

> Created: 2026-06-12
> Status: Current contract (unification complete)

## Purpose

Defines how call-to-action buttons are declared in page/product frontmatter and consumed by templates. This is the canonical contract for CTA frontmatter; the visual styling rules live in `.specs/cta-design/README.md`.

## Frontmatter schema

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
- Heading/body-section text around a CTA group is a separate frontmatter field (e.g. `cta_section_heading`) or part of the page content body.

## Product CTA discovery

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
- No duplication of booking URLs or button text across pages.

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

Every consumer renders the first N items. Index 0 always gets `.cta--primary`, index 1 gets `.cta--secondary`.

### Pages without `cta`

If a page has no `cta` field, no CTA buttons render anywhere — hero, sidebar, or mobile section. This is the default for pages like profile pages or content-only articles that don't need a call to action.

### Pages where product cards appear

When a template renders a product card on a non-product page, it reads the product's `cta` from `site.pages`. The hosting page's own `cta` and the product's `cta` are independent — they can coexist (page CTAs in the sidebar, product CTAs in the card).

## Dependencies

- **CTA Design System** (`.specs/cta-design/README.md`) — visual styling rules
- **Layouts** (`.design/layouts.md`) — section spacing and container widths for CTA placement
- **Information Architecture** (`.design/information-architecture.md`) — URLs stay the same