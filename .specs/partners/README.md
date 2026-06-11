# Feature: Partner Presentation & Guidelines

> Status: **Blocked — needs user input** | BL: P6

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

## ⛔ Blocking — Clarifying Questions

The following questions must be answered by the product owner before implementation can begin. They affect the data model, page depth, funnel design, and human guidelines structure.

### Q1 — Partner Types

What kinds of partners are we planning for? (Multiple can apply — this affects the data model)

| Type | Description | Implication |
|------|-------------|-------------|
| Implementation | Consultancies that deliver Ledelse 60:2 to their clients | Need co-branded materials, methodology training |
| Referral | Networks that refer clients to No Excuse | Need referral tracking, commission model |
| Technology | Platform integrations (HR systems, LMS) | Need technical integration docs |
| Reseller | Sell under their own brand | Need white-label materials, pricing model |
| Alliance | Joint go-to-market with complementary services | Need co-branded landing pages |

### Q2 — Funnel Role

How should partners drive visitors through the funnel?

- [ ] **Direct booking links** (bottom-of-funnel — send ready-to-buy leads)
- [ ] **Link to articles/landing pages** (top/middle-of-funnel — partner creates awareness)
- [ ] **Dedicated co-branded landing pages** on noexcuse.no per partner
- [ ] **Current model only** (logo grid on homepage → partner's own site)
- [ ] **Combination** — describe:

### Q3 — Partner Page Depth

What should a partner page on noexcuse.no contain?

- [ ] Just logo + name + external link (current minimal model)
- [ ] Profile: description, services offered, industries covered
- [ ] Full: profile + joint methodology description + co-branded cases
- [ ] Extended: partners can contribute articles/cases published on noexcuse.no under their name

### Q4 — Conversation Flow (for Human Guidelines)

The guidelines document will be used by the No Excuse team when talking to potential partners. What should it cover?

- [ ] What we tell partners about our product and methodology
- [ ] What partners need to provide (text, images, logos, case data)
- [ ] How partners redirect visitors back to noexcuse.no
- [ ] Commercial terms overview (commission, pricing, revenue share)
- [ ] Legal/contractual requirements
- [ ] Other:

### Q5 — Scale

How many partners are realistic in the next 6–12 months?

- [ ] 1–3 — handcrafted individual pages, custom content
- [ ] 3–10 — needs a programmatic system with tiered badges, partner portal
- [ ] 10+ — needs self-serve onboarding, API-based logo import

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
