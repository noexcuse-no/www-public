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
| Z2.1–Z2.6 | Provenance & transparency pipeline — JSON-LD, CC0, exiftool script, AI transparency manifest, docs | Done | PR #137, PR #139, PR #140, PR #141 |
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
| F7 | Uniform illustration system — 4-tier taxonomy (T1-T4), naming convention, CSS classes, future page template | Done | PR #138 |
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
| A3 | **AI Agent Instruction Cheat Sheets** — Create markdown cheat sheets for visitor AI agents assisting leaders in charting organizational leadership, perspectives, GRC. Covers: org context types, 5 agent roles (Diagnostician, Reframer, Synthesizer, Devil's Advocate, Coach), critical perspectives Q&A prep (Bolman & Deal, Ledelse 60:2, No Excuse AS), structured conversation format, brand voice, and noexcuse.no link index. | Done | — |
| A4 | **Alt Text Accessibility Fix** — Add descriptive alt text (Norwegian Bokmål) to 88 markdown images across 13 `_pages/*.md` files that currently have empty `![](path)`. All images are content-bearing spot illustrations. Full inventory with proposed alt text in `.specs/alt-text-audit/README.md`. Design guidelines in `.design/alt-text.md`. | Done | PR #146 |
| G1 | **Homepage overhaul (F1)** — `<h1>`, meta description, JSON-LD (Organization), hero CTA, stat bridge, article feed. Sub-features: F1a SEO Foundation, F1b Hero CTA, F1c Stat Bridge, F1d Article Feed. See `.specs/homepage-gaps/README.md`. | Done | PR #152 |
| G2 | **Om Oss improvements (F2)** — methodology link to /metode/, PostalAddress in JSON-LD. See `.specs/om-oss-gaps/README.md`. | Done | PR #153 |
| G3 | **Topical landing pages (F3)** — Organisasjonskultur (P0), Informasjonssikkerhet (P0), Endringsledelse (P1), Konflikthåndtering (P1), Risikostyring (P1), Kvalitetsledelse (P2), Bærekraft/ESG (P2), Compliance (P2). See `.specs/topical-landing-pages/README.md`. | Planned | G1 (architecture consistency) |
| G4 | **Conversion infrastructure (F4)** — email capture (F4a), contact form (F4b), step page enrichment (F4c), article recommendations (F4d, future). All via MVP JSON-file storage. See `.specs/conversion-infrastructure/README.md`. | Planned | G1, G2, G3 (all contribute to the funnel) |
| C1 | **Customer case intake & planning** — Identify 1–3 real cases with customer sign-off. Create case entries in `_cases/`. | Planned | — |
| C2 | **Case presentation design** — Wire `_includes/cases.html` with populated cases. Verify product-tag filtering. | Planned | C1 |
| C3 | **Case content creation** — Write full case descriptions with measurable results (anonymized if needed). Norwegian Bokmål. | Planned | C1, C2 |
| C4 | **Visitor flow / inbound sales journey** — Integrate cases into site nav (Om Oss cross-link, homepage section, product page filtering, article recommendations). See `.specs/cases/README.md` and `.specs/inbound-sales/README.md`. | Planned | C1, C2, C3 |
| P6 | **Partner presentation design & guidelines** — Partner page layout, funnel integration, human guidelines for partner conversations. Contains 5 blocking questions (partner types, funnel role, page depth, conversation flow, scale) that must be answered by product owner. See `.specs/partners/README.md`. | Blocked | Needs user input — Q1-Q5 in `.specs/partners/README.md` |
| P7 | **Partner content creation** — Create partner pages in `_partners/` with content produced from partner conversations. | Blocked | P6 |
| BR1 | **Norwegian origin brand positioning design doc** — Market-specific brand notes for FF2: all three strategies (quality signal / cultural context / humility) across Nordic markets and continental Europe. See `.design/norwegian-origin-branding.md`. | Planned | — |
| BR2 | **Om Oss — Norwegian origin content update** — Expand founding story, anchor methodology in Norwegian management tradition, make cultural values explicit as Norwegian, add "beste praksis fra norsk arbeidsliv" section, add international framing for FF2. | Planned | BR1 |
| W1 | **Wide-screen sidebar — article pages** — Right-hand panel with auto-generated page index (scroll-spy, clickable), questions section (replaces bottom placement), and CTA. Fixed/sticky while scrolling, appears after hero scrolls past, matches article body background. See `.design/wide-screen-sidebar.md`. | Planned | — |
| W2 | **Wide-screen sidebar — homepage** — Separate implementation for homepage layout: right panel or bottom-of-page variant showing featured articles, newsletter signup, CTA. Appears after hero-intro scrolls past. | Planned | — |
| W3 | **Scroll affordances — scroll-down indicator + back-to-top fix** — Add animated chevron at bottom of hero (auto-hides on scroll) and wire the existing back-to-top button with IntersectionObserver JS (HTML/CSS already shipped but never activates). Shared JS with W1/W2. See `.design/scroll-affordances.md`. | Done | PR #151 |
| S1 | **Social preview infrastructure — per-page OG images** — Add fallback chain (`hero.image → banner → page.image → site default`) to `og:image` and `twitter:image` in `_includes/metadata.html`. Add `url` to `_config.yml` for absolute URLs. Fix broken `.png` → `.webp` reference. Add `og:image:width/height`. See `.specs/social-previews/README.md` and `.design/social-previews.md`. | Done | PR #145 |
| S2 | **Social preview image crops** — Generate dedicated 1200×630 OG image variants for top 10 article pages, homepage, 3 step pages, and profile page. Crop from existing hero/banner images. | Planned | S1 |
| I1 | **Spec/design integrity audit** — Reorganize 75+ spec files and 30 design docs to distinguish active from historical. Move completed specs (Z1, Y1-Y9, FF4, R4, R15, X2, A1, P5, etc.) to `.specs/archive/`. Move content research (`.specs/shared/`, article content dirs) to `.research/`. Rename gap-analysis specs to feature specs. Fix stale references in `.specs/partners/README.md` and `.specs/cases/README.md`. Cross-reference BL ↔ specs. See `.specs/codebase-integrity/README.md` and `.design/codebase-integrity.md`. | Done | PR #159 |

| R25 | **Step pages — boilerplate content** — Add substantive body text to `/samtale/`, `/intervju/`, `/rapport/` step pages. Currently 13 lines each with only frontmatter + one image. Needs expanded lead, what-happens section, why-it-matters, prerequisites, and CTAs. See `.specs/step-pages-content/README.md`. | Done | PR #144 |
| R26 | **Dynamic crosslinking JS utility** — Create a vanilla JS script that injects contextual cross-link banners into article pages for anchor-level navigation between related topics. Does not modify `.md` content files. See `.specs/crosslinking-js/README.md`. | Done | PR #149 |
| R27 | **Production UI/UX audit** — Browser-by-browser inspection of all ~20 public pages on the production site. Check layout, dark mode, interactivity, images, typography, mobile/tablet, JSON-LD, questions component, animations. Document findings as table, create BL items + specs for non-trivial fixes. See `.specs/production-ui-audit/README.md`. | Planned | — |
| R28 | **Mobile header — burger menu reposition** — Move `.nav-toggle` button to the right of the logo on mobile so the header stays on a single line. Desktop layout unchanged. See `.specs/mobile-header-reposition/README.md`. | Done | PR #147 |
| R30 | **GRC perspective cards refactor** — Refactor the four GRC governance perspectives into card components using existing banner illustrations. 2×2 responsive grid. See `.specs/grc-cards-refactor/README.md`. | Done | PR #148 |
| R31 | **Broken link fixes** — Fix confirmed broken link `/triader/`. Scan all pages for other broken internal links. See `.specs/broken-link-fixes/README.md`. | Done | PR #144 |
| R32 | **LLM ask modal refactor** — Refactor the review questions modal: remove provider icons, display as list (not grid), quotation block styling for question, collapse/expand provider list based on saved preference, move copy prompt to bottom, open AI service URL on provider selection. See `.specs/llm-modal-refactor/README.md`. | Done | PR #150 |
