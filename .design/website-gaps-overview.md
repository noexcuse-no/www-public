# Website Feature Analysis — Overview

> **Status:** Analysis complete, refined into feature specs (April 2026)
> **Refinement note:** Initial gap analysis identified 20+ findings. After review, 6 items were removed from scope (team on Om Oss, cases as standalone finding, testimonials, partners, FAQ, pricing). Remaining items reframed as **features** with dedicated spec files.

This document summarizes the feature areas analyzed across the site: homepage, Om Oss, missing topical landing pages, conversion infrastructure, and customer cases. Each has a dedicated feature spec in `.specs/`.

## Feature Summary

### F1 — Homepage Overhaul (BL: G1)

**Spec:** `.specs/homepage-gaps/README.md`

The homepage is the weakest page on the site from both a crawler and visitor perspective:

| # | Finding | Type |
|---|---------|------|
| F1a | **No `<h1>`** — uses `<h2>`, accessibility + SEO violation | SEO |
| F1a | **No meta description** — falls back to generic tagline | SEO |
| F1a | **No JSON-LD** — no structured data (every other page type has it) | Crawler |
| F1b | **No hero CTA** — no call-to-action button above the fold | Conversion |
| F1c | **No stat bridge** — trust signal ("4 perspektiver · 60 spørsmål · 2 timer") missing from front page | Trust |
| F1d | **No article feed** — 14+ content pages invisible from the homepage | Content |
| — | **No email capture** — no way to re-engage visitors | *(deferred to F4a)* |

**Sub-features:** F1a SEO Foundation, F1b Hero CTA, F1c Stat Bridge, F1d Article Feed

### F2 — Om Oss Improvements (BL: G2)

**Spec:** `.specs/om-oss-gaps/README.md`

| # | Finding | Type |
|---|---------|------|
| F2a | **No methodology link** — /metode/ is not referenced from Om Oss | Content |
| F2b | **No PostalAddress in JSON-LD** — no structured address for local SEO | SEO |

**Removed from scope:** team section, cases, testimonials, partners, FAQ — all deferred.

### F3 — Topical Landing Pages (BL: G3)

**Spec:** `.specs/missing-landing-pages/README.md`

#### Bolman & Deal / Leadership domain
| Missing landing | Where content exists | Priority |
|---|---|---|
| Organisasjonskultur | /usikkerhet/, /identitet/, /tillit/ | P0 |
| Endringsledelse | /usikkerhet/ (Kotter) | P1 |
| Konflikthåndtering | /pavirkning/, /forankring/ | P1 |

#### GRC domain
| Missing landing | Where content exists | Priority |
|---|---|---|
| Informasjonssikkerhet | /grc/ (ISO 27001, DORA, NIS2) | P0 |
| Risikostyring | /grc/ | P1 |
| Kvalitetsledelse | /grc/ (ISO 9001) | P2 |
| Bærekraft / ESG | /grc/ (Miljø) | P2 |
| Compliance / Samsvar | /grc/ | P2 |

### F4 — Conversion Infrastructure (BL: G4)

**Spec:** `.specs/conversion-gaps/README.md`

The site has a **top-and-bottom-only funnel**: awareness via articles → booking link. The entire middle (interest → consideration → trust) is absent:

| # | Finding | Phase |
|---|---------|-------|
| F4a | **No email/newsletter capture** — no way to re-engage visitors | 1 |
| F4b | **No contact form** — only third-party Outlook booking | 1 |
| F4c | **Step pages empty** — Samtale/Intervju/Rapport have no body text, no CTA | 1 |
| F4d | **No article recommendations** — no "neste steg" for visitors | 2 |

### C1-C4 — Customer Cases (BL: C1-C4)

**Spec:** `.specs/cases/README.md`

Cases are the highest-impact trust signal the site can publish for a <1-year-old consulting company:
- Collection (`_cases`) exists but is empty
- `_includes/cases.html` renders an empty section
- Tag-based filtering infrastructure exists but is untested
- **C1:** intake & planning | **C2:** content | **C3:** presentation | **C4:** visitor flow integration

### Design Principles

1. **Crawler-first foundation** — h1, meta description, JSON-LD before any design changes
2. **Progressive disclosure** — homepage hooks → article content → landing pages → booking
3. **Low-friction capture** — newsletter signup in footer and inline in articles, not just at the booking stage
4. **Trust stacking (when ready)** — cases + methodology + team work together to overcome the new-company trust deficit
5. **Content hub** — homepage surfaces articles as the primary navigation pattern, not a list of products

### Related spec files

- `.specs/homepage-gaps/README.md` — Homepage Overhaul (F1)
- `.specs/om-oss-gaps/README.md` — Om Oss Improvements (F2)
- `.specs/missing-landing-pages/README.md` — Topical Landing Pages (F3)
- `.specs/conversion-gaps/README.md` — Conversion Infrastructure (F4)
- `.specs/cases/README.md` — Customer Cases (C1-C4)
- `.specs/inbound-sales/README.md` — Visitor flow / inbound sales journey (C4 integration)

### Changes from initial analysis (refinement April 2026)

**Removed from scope:**
- Dedicated team section on Om Oss (only Dagfinn is realistic; adding fabricated team members is dishonest)
- Cases as standalone finding (is C1-C4, not a new gap)
- Testimonials section on Om Oss (premature without case content)
- Partner logos (irrelevant without established partnerships)
- Top-level FAQ page (lowest priority of all identified gaps)
- Pricing page (complex, would constrain future product evolution)

**Reframed as features, not gaps:**
- All remaining findings are now organized as feature families with sub-features
- Each feature has a dedicated spec file with acceptance criteria
- All features are tracked in BACKLOG.md with their own IDs
