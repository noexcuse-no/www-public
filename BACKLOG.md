# BACKLOG

Format:

```
ID — Title — Status — Dependencies
```

Status: `Planned` | `Doing` | `Blocked`

All details, specs, and design belong in `.specs/` and `.design/` directories.
Completed items belong in `CHANGELOG.md` only.

---

## Items

| ID | Title | Status | Depends On |
|----|-------|--------|------------|
| FF2 | i18n multilingual support | Blocked | Waiting on user manual unblock — infrastructure not built (no languages.yml/switcher/hreflang exist); scope = substrate + site-ownership layer per `.specs/i18n/README.md` |
| FF5 | Three-step pages for Ledelse 60:2 | Blocked | FF6 — user decision 2026-08-31 |
| FF6 | Multi-product support | Blocked | Q7 — user decision 2026-08-31 |
| Q7 | Katalysator product | Blocked | User availability (deferred to June 2026) |
| C1 | Customer case intake & planning | Blocked | Build a customer case intake workflow: case selection criteria, interview guide, and a written output with customer sign-off. Identify 1–3 real cases. See `.specs/cases/README.md`. |
| C3 | Case content creation | Blocked | C1, C2 — user decision 2026-08-31. Write full case descriptions with measurable results (anonymized if needed). Norwegian Bokmål. |
| C4 | Visitor flow / case journey | Blocked | C1, C2, C3 — user decision 2026-08-31. Integrate cases into site nav (Om Oss cross-link, homepage section, product page filtering, article recommendations). See `.specs/cases/README.md` and `.specs/inbound-sales/README.md`. |
| P7 | Partner content creation | Blocked | P6 — user decision 2026-08-31. Create partner pages in `_pages/` with content produced from partner conversations. Frontmatter schema, guidelines, and page infrastructure ready. Next: actual partner conversations. |
| BR2 | **Om Oss — Norwegian origin content update** — Expand founding story, anchor methodology in Norwegian management tradition, make cultural values explicit as Norwegian, add "beste praksis fra norsk arbeidsliv" section, add international framing for FF2. | Done | BR1 |
| R33 | Benefit & process step frontmatter as data source | Superseded | **Superseded 2026-08-30 (strategy alignment):** V1's 10-section homepage and V2's offer card render from shared components (`.specs/product-signature/README.md`), not R33's benefit/process frontmatter-card pattern. V1 + V2 dependency cells updated accordingly. |
| Q1 | Quiz — question pool | Blocked | User decision 2026-08-30 — quiz conflicts with the no-scoring principle (strategy alignment). 15+ questions with 6+ answers each, mapped to Bolman & Deal's four frames. Inline in `quiz.js` as a JS array. See `.specs/quiz/README.md`. Q3 |
| Q2 | Quiz — illustrations | Blocked | User decision 2026-08-30 — quiz conflicts with the no-scoring principle (strategy alignment). 10 question illustrations (240×240px) + 4 result illustrations (320×240px) + 4 OG share images (1200×630px). WebP. See `.design/quiz.md`. Q1 |
| Q3 | Quiz — JS engine | Blocked | User decision 2026-08-30 — quiz conflicts with the no-scoring principle (strategy alignment). Create `assets/scripts/quiz.js`: modal controller, question flow, scoring (always forces a single winner), results, sessionStorage, result URL sharing. No dependencies. See `.specs/quiz/README.md`. |
| Q4 | Quiz — CSS | Blocked | User decision 2026-08-30 — quiz conflicts with the no-scoring principle (strategy alignment). Create `assets/css/components/quiz.css`: modal overlay, progress bar, answer cards, result infographic, score bars, shareable result card. Dark mode via CSS variables. See `.design/quiz.md`. Q3 |
| Q5 | Quiz — page integration | Blocked | User decision 2026-08-30 — quiz conflicts with the no-scoring principle (strategy alignment). Deferred. No CTA placement until decided. |
| V1 | Homepage repositioning | Done | 10-section sequence implemented via shared components (recognition-cards, signature-60-2-4, four-perspectives, price-card, cta-panel) in `_layouts/home.html`. See `.specs/homepage-repositioning/README.md`. |
| V2 | Product-page offer | Done | fit/not-fit (`#passer`), public price from `_data/commercial.yml`, FAQ, bounded before/during/after, JSON-LD price. See `.specs/product-page-offer/README.md`. |
| V3 | **Navigation / IA split** — commercial vs insight surface classification; AI = insight; Bookings demoted to background scheduler. See `.specs/navigation-ia-split/README.md`. | Done | `_data/navigation.yml` carries the five split nav targets incl. Book 20 min → /samtale/. |
| V4 | Buying-situation pages | Done | 6 Tier-1 situation pages live (gjentatte-diskusjoner, svak-gjennomforing, uklare-roller, ny-leder, ny-ledergruppe, strategi-ikke-gjennomfort), class: buying-situation. See `.specs/buying-situation-pages/README.md`. |
| V5 | Article conversion rails | Done | Two-CTA pattern, related-perspectives block, recognition hook, return sections in `_layouts/article.html`. See `.specs/article-conversion-rails/README.md`. |
| V6 | Founder credibility | Done | Practitioner module + reusable CTA panel (`cta-panel.html`, Dagfinn) on /bestill/ledelse-60-2/ + /foredrag-og-media/. See `.specs/founder-credibility/README.md`. |
| MR1 | Mixed-rights licensing & provenance | Done | Waves 0–6 complete, merged PR #231 (REUSE/SPDX census, provenance metadata, site emission, image pipeline, local CI). See `.specs/mixed-rights-licensing/README.md`. |
| G4 | **Conversion infrastructure (F4)** — email capture (F4a), contact form (F4b), step page enrichment (F4c, done via R25), article recommendations (F4d, future). All via MVP JSON-file storage. See `.specs/conversion-infrastructure/README.md`. | Doing | G1, G2, G3 (all contribute to the funnel) |
| R36 | **LLM disclaimer banner restyle** — Always-visible top bar themed with design tokens (`disclaimer.css`), centered desktop / left-aligned mobile. See `.specs/ai-disclaimer/README.md`. | Done | f62cb3d |
| AL1 | Article layout system | Done | Heading-level-driven layout, all 15 articles rewritten. See `.specs/article-layout/README.md`. |
| BU1 | Button CTA URL uniformity | Done | Unified button system in `buttons.css`, rel=noopener on external links, 12 .md renames. |
| AI1 | AI Act alignment | Done | EU icon banner, /om-store-sprakmodeller/, RDFa injector, non-AI exclude-list, manifest reconciliation. See `.specs/ai-act-alignment/README.md`. |
| R37 | AI Act alignment (KI-lov forward-readiness) | Done | Article 50 disclosure stack live. See `.specs/ai-act-alignment/README.md`. |
| RI1 | Risk reduction cleanup | Done | Phase 1 PRs #208–#215; tasks 12–23 PR #229. Local CI stack green. |
| CI1 | CI reuse gating flip | Pending | mixed-rights:507 |
| RA1 | Spec-impl consistency audit — pre-flight baseline, evidence reconciliation, conformance audit, disposition register | Done | Central report: `.specs/reconciliation-audit/README.md`. 9 doc corrections, i18n annotated (FF2), 7 orphans registered as RA2, 3 owner escalations. |

| RA3 | Lint toolchain repair — eslint 10 flat-config migration, htmlhint Liquid/BEM compatibility, exact pins, vite+globals declared — See `.specs/cross-cutting/lint-toolchain/README.md` | Done | npm lint chain green (dependabot #261 drift) |
