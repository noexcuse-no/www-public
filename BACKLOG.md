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
| Z2.1 | Provenance JSON-LD include — create `_includes/provenance-jsonld.html` with `digitalSourceType` + `license` | Done | PR #137 |
| Z2.2 | CC0 declarations — `<link rel="license">`, `_data/metadata.yml`, `package.json`, `_config.yml` | Done | PR #137 |
| Z2.3 | Wire provenance-jsonld.html into page templates via `_includes/scripts.html` or equivalent | Done | Z2.1 → wired in `_layouts/default.html` <head> (equivalent) |
| Z2.4 | Image provenance script — create `scripts/apply-provenance.sh` with exiftool batch metadata (IPTC + CC0 XMP) on all 186 WebP files | Done | PR #139 |
| Z2.5 | AI transparency manifest — create `/.well-known/ai-transparency.json` | Doing | PR #140 |
| Z2.6 | Documentation — update `.design/graphics.md`, `.design/deployment.md`, CHANGELOG | Planned | Z2.1, Z2.2, Z2.3, Z2.4, Z2.5 |
| Y1 | Questions include — create `_includes/questions.html` component | Done | — |
| Y2 | Questions CSS — create `assets/css/components/questions.css` with modal styles | Done | Y1 |
| Y3 | Questions JS — create `assets/scripts/review-questions.js` with modal, providers, clipboard | Done | Y1 |
| Y4 | Refactor 6 article pages (tillit, usikkerhet, forankring, generativ-ki, perspektiv, triader) — replace hardcoded question sections with frontmatter-driven include | Done | Y1, Y2, Y3 |
| Y5 | Refactor frame pages — update article layout + 4 frame pages with frontmatter questions | Done | Y1, Y2, Y3 |
| Y6 | Normalize `ledelse_makt.md` — convert hardcoded question section to frontmatter | Done | Y1, Y2, Y3 |
| Y7 | Add questions to pages without them (grc, om_metode, perspektiv/index) | Done | Y1, Y2, Y3 |
| Y8 | Wire JS/CSS into `_includes/scripts.html` + `_includes/styles.html` | Done | Y2, Y3 |
| Y9 | Documentation — update CHANGELOG | Done | Y4, Y5, Y6, Y7, Y8 |
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
| F7 | Uniform illustration system — 4-tier taxonomy (T1-T4), naming convention, CSS classes, future page template | Doing | — |
| R24.1 | **CTA buttons missing** — added CTA frontmatter to home page and ledelse 60:2; added cta-section include to home layout | Done | PR #131 |
| R24.2 | **Content below hero blank** — root cause: `.animate-on-scroll` set `opacity: 0` on entire content wrapper; if IntersectionObserver failed to fire, content stayed hidden. Removed scroll-triggered opacity system entirely. | Done | — |
| R24.3 | **Images broken on avtale page** — fixed kramdown empty title syntax, added print-only logo wrapper + CSS | Done | PR #131 |
| R24.4 | **Card grid styling regression** — added `.info-box` light mode styling for GRC perspective cards | Done | PR #131 |
| R24.5 | **Cross-linking scan** — added links from om_metode/om_oss to /perspektiv/, makt → /usikkerhet/ + /tillit/, forankring → /makt/, generativ-ki → /usikkerhet/ + /makt/ | Done | — |
| R24.6 | **Illustration opportunity scan** — completed audit; all pages have good illustration coverage | Done | — |
| R24.7 | **Mobile hamburger menu** — revised to full-screen modal overlay with close button, body scroll lock, Escape-to-close, featured CTA kept outside overlay | Done | — |
| R24.8 | **Hero sizing fix** — `height: 100vh` → `calc(100vh - var(--header-height))` so hero doesn't extend below first viewport | Done | — |
| R24.9 | **Hero image regeneration** — Perspektiv and GRC heroes regenerated as Style 1 (three silhouettes in Nordic landscape, 4K) to match Om Oss/Om Metode/Ledelse 60:2 | Done | — |
| R24.10 | **Featured nav styling** — "Ledelse 60:2" emphasized in main menu with `.nav-featured` CTA pill | Done | — |
| U1 | **Hero primary CTA** — add `.product-cta` button in hero overlay linking to booking | Done | — |
| U2 | **Plain text CTAs to styled buttons** — convert inline links in article body to `.product-cta` buttons | Done | U1 |
| U3 | **Section headers between card grids** — add `<h2>` headings above benefit grid and step grid | Done | — |
| U4 | **Visual section separation** — subtle background on step grid section to distinguish from benefits | Done | U3 |
| U5 | **Redundant CTA consolidation** — remove duplicate inline CTA from article body bottom | Done | — |
| U6 | **Dedicated "Om metodikk" callout** — extract `/metode/` link into info-box callout after process image | Done | — |
| U9 | **Footer navigation links** — add site nav links (Perspektiv, GRC, Om oss) to footer | Done | — |
| U10 | **Process image alt text** — update T2 process flow alt text to describe the three steps | Done | — |
| U11 | **Sticky CTA bar on scroll** — persistent bottom bar with booking button, dismissible, hides on footer overlap | Done | U1 |
| U12 | **Hero → card bridge (stat row)** — "4 perspektiver · 60 spørsmål · 2 timer" between hero and benefit grid | Done | — |
| U13 | **Step cards as numbered timeline** — horizontal connector line between step cards, prominent numbered badges, mobile vertical timeline | Done | U4 |
