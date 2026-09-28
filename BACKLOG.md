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
| G4 | **Conversion infrastructure (F4)** — step page enrichment (F4c, done via R25), article recommendations (F4d, future). Newsletter email capture (F4a) removed 2026-09-17 (broke the site). All via approved external service — no repo storage. See `.specs/conversion-infrastructure/README.md`. | Doing | G1, G2, G3 (all contribute to the funnel) |
| CI1 | CI reuse gating flip | Pending | mixed-rights:507 |
