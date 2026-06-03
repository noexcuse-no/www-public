# BACKLOG

Format:

```
ID — Title — Status — Dependencies
```

Status: `Planned` | `Doing` | `Done` | `Blocked`

All details, specs, and design belong in `.specs/` and `.design/` directories.
Completed items belong in `CHANGELOG.md` only.

---

## Items

| ID | Title | Status | Depends On |
|----|-------|--------|------------|
| Z1 | Company description brand audit — fix consultant-speak in all design/spec/plan files | Done | — |
| Z2.1 | Provenance JSON-LD include — create `_includes/provenance-jsonld.html` with `digitalSourceType` + `license` | Planned | — |
| Z2.2 | CC0 declarations — `<link rel="license">`, `_data/metadata.yml`, `package.json`, `_config.yml` | Planned | — |
| Z2.3 | Wire provenance-jsonld.html into page templates via `_includes/scripts.html` | Planned | Z2.1 |
| Z2.4 | Image provenance script — create `scripts/apply-provenance.sh` with exiftool batch metadata (IPTC + CC0 XMP) on all 186 WebP files | Planned | — |
| Z2.5 | AI transparency manifest — create `/.well-known/ai-transparency.json` | Planned | — |
| Z2.6 | Documentation — update `.design/graphics.md`, `.design/deployment.md`, CHANGELOG | Planned | Z2.1, Z2.2, Z2.3, Z2.4, Z2.5 |
| Y1 | Questions include — create `_includes/questions.html` component | Planned | — |
| Y2 | Questions CSS — create `assets/css/components/questions.css` with modal styles | Planned | Y1 |
| Y3 | Questions JS — create `assets/scripts/review-questions.js` with modal, providers, clipboard | Planned | Y1 |
| Y4 | Refactor 6 article pages (tillit, usikkerhet, forankring, generativ-ki, perspektiv, triader) — replace hardcoded question sections with include | Planned | Y1, Y2, Y3 |
| Y5 | Refactor frame pages — update `_layouts/perspektiv.html` + 4 frame pages | Planned | Y1, Y2, Y3 |
| Y6 | Normalize `ledelse_makt.md` — convert plain `<ul>` questions to include | Planned | Y1, Y2, Y3 |
| Y7 | Add questions to pages without them (grc, om_oss, om_metode, ledelse_60-2, 3 step pages, perspektiv/index) | Planned | Y1, Y2, Y3 |
| Y8 | Wire JS/CSS into `_includes/scripts.html` + `_includes/styles.html` | Planned | Y2, Y3 |
| Y9 | Documentation — update CHANGELOG | Planned | Y4, Y5, Y6, Y7, Y8 |
| FF4 | Citation Enhancement (kramdown footnotes + JSON-LD + JS enhancer + APA formatting) | Done | — |
| FF2 | i18n multilingual support | Blocked | Waiting on user manual unblock — infrastructure ready, content translation deferred |
| R4 | Benefit article illustrations — 52 images across 4 articles (T2 framework + T3 section + T4 micro tiers) | Done | — |
| R15 | Values illustrations — 3 T3 spot illustrations for Om Oss value cards | Done | — |
| FF5 | Three-step pages for Ledelse 60:2 | Planned | FF6 |
| FF6 | Multi-product support | Planned | Q7 |
| N4 | Identitet: layout wiring + content refinement (method-benefit integration) — spot illustrations generated and named | Done | — |
| N5 | Struktur: layout wiring + content refinement (method-benefit integration) — spot illustrations generated and named | Done | — |
| N6 | Mennesker: layout wiring + content refinement (method-benefit integration) — spot illustrations generated and named | Done | — |
| N7 | Påvirkning: layout wiring + content refinement (method-benefit integration) — spot illustrations generated and named | Done | — |
| N1 | Triader article (order: 2nd) | Done | — |
| A1 | Architecture cleanup: CSS reorganization, topic consolidation, hero/card unification | Done | — |
| N2 | Makt article (order: 1st) | Done | — |
| N3 | Perspektiv article (order: 3rd) | Done | N1, N2 |
| P5 | Migrate `_pages/ledelse_*.md` to layout system | Done | A1 |
| X2 | Dark mode consistency pass | Done | — |
| F5 | Image generation for N1-N3 | Done | — |
| F6 | Spot illustration naming cleanup — rename index-based spot images to concept-based names, move to banners/ | Done | — |
| C1 | Customer case planning & discovery | Blocked | Brainstorming session |
| C2 | Customer case intake form | Blocked | C1 |
| C3 | Case presentation design | Blocked | C1, C2 |
| C4 | Visitor flow / inbound sales journey | Blocked | C1, C2, C3 |
| Q7 | Katalysator product | Blocked | User availability (deferred to June 2026) |
| R20 | Generate and add illustrations to /perspektiv per page design rules | Done | PR #116 |
| R16 | Article illustrations — 25 images for Makt, Perspektiv, Triader (T2 framework + T3 section + T4 micro) | Done | PR #117 |
| R17 | Frame micro illustrations — 16 T4 micro spots for challenge cards on Struktur, Mennesker, Identitet, Påvirkning | Done | PR #118 |
| F7 | Uniform illustration system — 4-tier taxonomy (T1-T4), naming convention, CSS classes, future page template | Planned | — |
