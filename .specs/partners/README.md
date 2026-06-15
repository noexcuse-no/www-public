# Feature: Partner Presentation & Guidelines

> Status: **Planned — decisions recorded** | BL: P6

## Purpose and Scope

Design how partner organizations are presented on noexcuse.no and create human-facing guidelines for the No Excuse team to use when establishing and managing partner relationships. Partners should assist in driving visitors through the conversion funnel, not just sit as logo badges.

## Current State

| Asset | Status |
|---|---|
| Data model | Page-class: `site.pages where: "class", "partner"` — no `_config.yml` collection (removed in I2 Phase 4) |
| `_includes/partners.html` | Renders partners as logo + name grid; queries `site.pages where: "class", "partner"` |
| `assets/css/partners.css` | Basic styling — centered flex grid, logo cards with opacity hover |
| `_layouts/home.html` | Includes `partners.html` (line 13) — partners appear at bottom of homepage only |
| `_partners/` directory | Empty — no pages exist; new partners are `_pages/*.md` with `class: partner` |
| `.specs/partners/README.md` | Minimal stub — this rewrite supersedes it |
| Partner frontmatter schema | Fields used: `class: "partner"`, `published: true`, `image`, `name`, `url` |

The existing `partners.html` expects each partner page to have `class: "partner"`, `published: true`, `image`, `name`, and `url` fields. Partners appear at the bottom of the homepage only, via `{% include partners.html %}` in `_layouts/home.html`.

## Decisions (answered 2026-06-13)

### Q1 — Partner Types
**All five types** — Implementation, Referral, Technology, Reseller, Alliance.

The data model must support all partner types with a `partner_type` taxonomy field. Each implementation has different content/tracking needs, but the page template should handle all via optional frontmatter fields (e.g., `referral_program: true`, `white_label: true`).

### Q2 — Funnel Role
**Combination of all four approaches:**
1. Direct booking links — bottom-of-funnel, send ready-to-buy leads
2. Link to articles/landing pages — top/middle-of-funnel, partner creates awareness
3. Dedicated co-branded landing pages on noexcuse.no per partner
4. Current logo grid on homepage → partner's own site

Funnel role is per-partner configurable via frontmatter (e.g., `funnel_role: ["booking","awareness","landing","referral"]`).

### Q3 — Partner Page Depth
**Full** — profile with description, services, industries covered + joint methodology description + co-branded cases.

Partner pages include `description`, `services`, `industries`, joint methodology section, and can reference co-branded cases (which live in `_pages/` with `class: case` + `partner: <partner_slug>`).

### Q4 — Conversation Flow (Human Guidelines)
All five areas must be covered:
1. Product & methodology pitch — what we tell partners about Ledelse 60:2
2. Partner deliverables — what partners need to provide (text, images, logos, case data)
3. Redirect mechanism — how partners send visitors back to noexcuse.no
4. Commercial terms — commission, pricing, revenue share
5. Legal/contractual requirements

### Q5 — Scale
**1–3 partners** in the next 6–12 months. Handcrafted individual pages with custom content. No need for programmatic systems, tiered badges, or self-serve onboarding yet.

## Dependencies

- **Q1–Q5** must be answered before any implementation
- P7 (partner content creation) depends on P6
- C1–C4 (cases) may inform joint case studies with partners
- FF6 (multi-product support) may affect how partners reference products

## Related files

- `_includes/partners.html` — rendering template (currently homepage-bottom only)
- `assets/css/partners.css` — styling
- `_partners/` — collection directory (empty)
- `.specs/inbound-sales/README.md` — visitor flow/funnel tracking (partner UTM conventions)
