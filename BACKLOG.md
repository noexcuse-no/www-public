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
| BR2 | Om Oss — Norwegian origin content update | Planned | BR1. Expand founding story, anchor methodology in Norwegian management tradition, make cultural values explicit as Norwegian, add "beste praksis fra norsk arbeidsliv" section, add international framing for FF2. |
| R33 | Benefit & process step frontmatter as data source | Superseded | **Superseded 2026-08-30 (strategy alignment):** V1's 10-section homepage and V2's offer card render from shared components (`.specs/product-signature/README.md`), not R33's benefit/process frontmatter-card pattern. V1 + V2 dependency cells updated accordingly. |
| Q1 | Quiz — question pool | Blocked | User decision 2026-08-30 — quiz conflicts with the no-scoring principle (strategy alignment). 15+ questions with 6+ answers each, mapped to Bolman & Deal's four frames. Inline in `quiz.js` as a JS array. See `.specs/quiz/README.md`. Q3 |
| Q2 | Quiz — illustrations | Blocked | User decision 2026-08-30 — quiz conflicts with the no-scoring principle (strategy alignment). 10 question illustrations (240×240px) + 4 result illustrations (320×240px) + 4 OG share images (1200×630px). WebP. See `.design/quiz.md`. Q1 |
| Q3 | Quiz — JS engine | Blocked | User decision 2026-08-30 — quiz conflicts with the no-scoring principle (strategy alignment). Create `assets/scripts/quiz.js`: modal controller, question flow, scoring (always forces a single winner), results, sessionStorage, result URL sharing. No dependencies. See `.specs/quiz/README.md`. |
| Q4 | Quiz — CSS | Blocked | User decision 2026-08-30 — quiz conflicts with the no-scoring principle (strategy alignment). Create `assets/css/components/quiz.css`: modal overlay, progress bar, answer cards, result infographic, score bars, shareable result card. Dark mode via CSS variables. See `.design/quiz.md`. Q3 |
| Q5 | Quiz — page integration | Blocked | User decision 2026-08-30 — quiz conflicts with the no-scoring principle (strategy alignment). Deferred. No CTA placement until decided. |
| V1 | Homepage repositioning | Planned | V3 (nav targets), product-signature (shared components). 10-section sequence (outcome hero → recognition → what changes → 60/2/4 → diagnosis-before-intervention → how it works → proof → fit → commercial info → CTA). See `.specs/homepage-repositioning/README.md`. |
| V2 | Product-page offer | Planned | product-signature (price card), bestill-booking-page (Route A/B targets). fit/not-fit, public price, FAQ, bounded before/during/after, JSON-LD price. See `.specs/product-page-offer/README.md`. |
| V3 | Navigation / IA split | Planned | —. Commercial vs insight surface classification; AI = insight; Bookings demoted to background scheduler. See `.specs/navigation-ia-split/README.md`. |
| V4 | Buying-situation pages | Planned | ai-private-reflection, analytics-events. 6 Tier-1 situations (gjentatte diskusjoner, svak gjennomføring, uklare roller, ny ledergruppe, ny leder, strategi ikke gjennomført). See `.specs/buying-situation-pages/README.md`. |
| V5 | Article conversion rails | Planned | ai-private-reflection, analytics-events, navigation-ia-split. Two-CTA pattern, related-perspectives block, recognition hook, return sections. See `.specs/article-conversion-rails/README.md`. |
| V6 | Founder credibility | Planned | bestill-booking-page, foredrag-media, product-signature. Practitioner module + reusable CTA panel (Dagfinn) on /bestill/ + /foredrag-og-media/. See `.specs/founder-credibility/README.md`. |
| CS1 | Color system review | Done | `.omo/plans/color-system-review.md` |
| R56 | Color system — variable-only dark mode refactor | Done | PR #216. Eliminated 136 `.dark-mode` selectors; variable-only mode switching via unsuffixed active variables. |
| R57 | Color system — dark card background fix | Done | PR #216. Changed dark card background from `#333333` to `#1e2a3a`. |
| R58 | Color system — WCAG contrast fixes | Done | PR #216. Fixed 7 contrast issues (focus outline, back-to-top, stat-bridge, blockquote border, gold accent, dark-mode button text). |
| R59 | Color system — documentation update | Done | PR #217. Rewrote `.design/colors.md` + `.design/css-architecture.md` to match the refactored variable architecture. |

| AL1 | Article layout system | Done | `.omo/plans/article-layout-system.md` — implemented (heading-level-driven layout, all 15 articles rewritten, `.specs/article-layout/README.md` added). Record in CHANGELOG. |
| BU1 | Button CTA URL uniformity | Done | `.omo/plans/button-cta-url-uniformity.md` — implemented (unified button system in buttons.css, rel=noopener target=_blank on external links, 12 .md files renamed to match permalinks). Record in CHANGELOG. |
| AI1 | AI Act alignment | Pending | `.omo/plans/ai-act-alignment.md` |
| RI1 | Risk reduction cleanup | Pending | `.omo/plans/risk-reduction-cleanup.md` |
| CI1 | CI reuse gating flip | Pending | mixed-rights:507 |
