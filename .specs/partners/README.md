# Feature: Partner Presentation

> Status: **Planned** | BL: P6

## Purpose and Scope

Define the public partner page contract for how partner organizations are
presented on noexcuse.no. Partner pages are published in `_pages/` and rendered
as a logo + name grid on the homepage.

## Data Model

- Page-class model: `site.pages where: "class", "partner"` — no `_config.yml` collection
- New partners are `_pages/*.md` with `class: partner`

## Frontmatter Schema

For `_pages/<partner-slug>.md`:

```yaml
---
class: partner
published: true
name: "Partnernavn AS"
url: "https://partner.no"
image: "assets/images/partners/partner-logo.webp"
---
```

| Field | Required | Description |
|-------|----------|-------------|
| `class` | yes | `partner` |
| `published` | yes | `true` renders the partner |
| `name` | yes | Partner organization name (alt text source) |
| `url` | yes | Link target — the partner's own site |
| `image` | yes | Partner logo, rendered via `relative_url` |

## Rendering

`_includes/partners.html`:

- Queries `site.pages | where: "class", "partner" | where: "published", true`
- Renders nothing unless at least one published partner page exists
- Output: a `<section id="partners">` with heading "Våre samarbeidspartnere"
  and a `.partners-grid` of `.partner-card` links, each with:
  - `<img src="{{ partner.image | relative_url }}" alt="{{ partner.name }}">`
  - `<span class="partner-name">{{ partner.name }}</span>`

Inclusion point:

- `_layouts/home.html` — `{% include partners.html %}` — partners appear at
  the bottom of the homepage only.

## Links

- Partner cards link to `partner.url` (the partner's own site)
- All partner links: `target="_blank"` with `rel="noopener"`

## Logo Requirements

- Logo is rendered via `relative_url` — files live in `assets/images/partners/`
- `alt` text is the partner name

## Styling

CSS lives in `assets/css/partners.css` — centered flex grid, logo cards with
opacity hover.

## Accessibility

- Partner links use `rel="noopener"` on `target="_blank"` (no reverse tabnabbing)
- Logo `alt` text always present (partner name)
- Site-wide WCAG AA rules apply (see `.specs/accessibility/README.md`)

## Validation

- [ ] Jekyll build exit 0
- [ ] `npm test` passes
- [ ] `lsp_diagnostics` clean on `_includes/partners.html` and changed files

## Related Files

- `_includes/partners.html` — rendering template (homepage-bottom only)
- `assets/css/partners.css` — styling
- `_layouts/home.html` — inclusion point