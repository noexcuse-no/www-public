# Feature: Partner Presentation

> Status: **Planned** | BL: P6

## Purpose and Scope

Design how partner organizations are presented on noexcuse.no. Partners are displayed as independent channels that refer into No Excuse's services.

## Current State

| Asset | Status |
|---|---|
| Data model | Page-class: `site.pages where: "class", "partner"` — no `_config.yml` collection (removed in I2 Phase 4) |
| `_includes/partners.html` | Renders partners as logo + name grid; queries `site.pages where: "class", "partner"` |
| `assets/css/partners.css` | Basic styling — centered flex grid, logo cards with opacity hover |
| `_layouts/home.html` | Includes `partners.html` (line 13) — partners appear at bottom of homepage only |
| `_partners/` directory | Empty — no pages exist; new partners are `_pages/*.md` with `class: partner` |
| Partner frontmatter schema | Fields used: `class: "partner"`, `published: true`, `image`, `name`, `url` |

The existing `partners.html` expects each partner page to have `class: "partner"`, `published: true`, `image`, `name`, and `url` fields. Partners appear at the bottom of the homepage only, via `{% include partners.html %}` in `_layouts/home.html`.

## Partner Frontmatter Schema (Full Depth)

For `_pages/<partner-slug>.md`:

```yaml
---
class: partner
published: true
name: "Partnernavn AS"
url: "https://partner.no"
image: "assets/images/partners/partner-logo.webp"
description: "Kort beskrivelse av partneren, maks 200 tegn"
services: "Hva partneren tilbyr — konsulenttjenester, implementering, etc."
industries: "Bransjer partneren jobber med"
methodology: "Hvordan partneren bruker Ledelse 60:2 / fire perspektiver i sitt arbeid"
partner_type: "implementation"     # one of: implementation, referral, technology, alliance
funnel_roles:                      # which funnel approaches apply
  - booking
  - awareness
  - landing
  - referral
---
```

### Partner Types

The data model supports all partner types with a `partner_type` taxonomy field. Each implementation may have different content/tracking needs, but the page template handles all via optional frontmatter fields.

### Funnel Role

Partners can route visitors through different funnel approaches. Role is per-partner configurable via frontmatter. Booking links route via `/bestill/ledelse-60-2/` (the site-owned booking decision page) or `/samtale/` (20-min avklaring). Partners are positioned as independent channels that refer visitors into No Excuse's services.

### Partner Page Depth

Full profile with description, services, industries covered, joint methodology description, and co-branded cases (which live in `_pages/` with `class: case` + `partner: <partner_slug>`).

## Dependencies

- P7 (partner content creation) depends on P6
- C1–C4 (cases) may inform joint case studies with partners
- FF6 (multi-product support) may affect how partners reference products

## Related files

- `_includes/partners.html` — rendering template (currently homepage-bottom only)
- `assets/css/partners.css` — styling
- `_partners/` — collection directory (empty)
- `.specs/inbound-sales/README.md` — visitor flow/funnel tracking (partner UTM conventions)
