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
| FF2 | i18n multilingual support | Blocked | Waiting on user manual unblock — infrastructure NOT built (no languages.yml/switcher/hreflang exist); scope = substrate + commercial-layer ownership per `.specs/i18n/README.md` |
| R4 | Benefit article illustrations — 52 images across 4 articles (T2 framework + T3 section + T4 micro tiers) | Done | — |
| R15 | Values illustrations — 3 T3 spot illustrations for Om Oss value cards | Done | — |
| FF5 | Three-step pages for Ledelse 60:2 | Blocked | FF6 — user decision 2026-08-31 |
| FF6 | Multi-product support | Blocked | Q7 — user decision 2026-08-31 |
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
| A5 | **Jekyll native pages** — Convert the shadowing `pages` collection to native Jekyll pages via `include: ["_pages"]`. Fix the `name` frontmatter collision (Jekyll::Page's built-in `name` returns the filename) via `display_name` rename in 2 files + 12 template references. Deterministic `sort: "title"` on the three unsorted class-filtered lists. Structural regression test + Docker build parity over the full route set. See `.specs/jekyll-native-pages/README.md`. | Done | PR #203 |
| G1 | **Homepage overhaul (F1)** — `<h1>`, meta description, JSON-LD (Organization), hero CTA, stat bridge, article feed. Sub-features: F1a SEO Foundation, F1b Hero CTA, F1c Stat Bridge, F1d Article Feed. See `.specs/homepage-gaps/README.md`. | Done | PR #152 |
| G2 | **Om Oss improvements (F2)** — methodology link to /metode/, PostalAddress in JSON-LD. See `.specs/om-oss-gaps/README.md`. | Done | PR #153 |
| G3 | **Topical landing pages (F3)** — Organisasjonskultur (P0), Informasjonssikkerhet (P0), Endringsledelse (P1), Risikostyring (P1), Kvalitetsledelse (P2), Bærekraft/ESG (P2), Compliance (P2). See `.specs/topical-landing-pages/README.md`. | Done | PR #160 |
| G4 | **Conversion infrastructure (F4)** — email capture (F4a), contact form (F4b), step page enrichment (F4c, done via R25), article recommendations (F4d, future). All via MVP JSON-file storage. See `.specs/conversion-infrastructure/README.md`. | Done | **Closed by decision 2026-08-30 (strategy alignment), no feature work:** F4b (contact form) superseded by `/bestill/ledelse-60-2/` (site owns the commercial context; MS Bookings = background scheduler). F4a (email capture) deferred as future work. Dead MVP assets (contact.js, newsletter.js, newsletter.css + its styles.html link, empty `_data/*.json`, unreferenced `_includes/contact-form.html`) removed as the agreed disposition. G1, G2, G3 (all contribute to the funnel) |
| C1 | **Customer case intake & planning** — Intake toolkit ready at `.research/case-intake-toolkit.md` (customer scorecard, interview script, writing template, approval workflow). Next: identify 1–3 real cases and conduct interviews with customer sign-off. | Blocked | User decision 2026-08-31 |
| C2 | **Case presentation design** — Product-tag filtering infrastructure ready: `_includes/cases-cards.html` accepts `product_tag` param, product pages have `product_tag` frontmatter, `_layouts/product.html` includes filtered cases-cards. Rendering stays invisible until case content exists. See `.specs/cases/README.md`. | Done | C1 |
| C3 | **Case content creation** — Write full case descriptions with measurable results (anonymized if needed). Norwegian Bokmål. | Blocked | C1, C2 — user decision 2026-08-31 |
| C4 | **Visitor flow / inbound sales journey** — Integrate cases into site nav (Om Oss cross-link, homepage section, product page filtering, article recommendations). See `.specs/cases/README.md` and `.specs/inbound-sales/README.md`. | Blocked | C1, C2, C3 — user decision 2026-08-31 |
| P6 | **Partner presentation design & guidelines** — All 5 decisions recorded in `.specs/partners/README.md`. Partner guidelines document ready at `.research/partner-guidelines.md` covering product pitch, partner deliverables, redirect mechanism, commercial terms, and legal requirements. Frontmatter schema expanded for Full depth (description, services, industries, methodology, partner_type, funnel_roles). | Done | — |
| P7 | **Partner content creation** — Create partner pages in `_pages/` with content produced from partner conversations. Frontmatter schema, guidelines, and page infrastructure ready. Next: actual partner conversations. | Blocked | P6 — user decision 2026-08-31 |
| BR1 | **Norwegian origin brand positioning design doc** — Market-specific brand notes for FF2: all three strategies (quality signal / cultural context / humility) across Nordic markets and continental Europe. See `.design/norwegian-origin-branding.md`. | Done | design doc complete |
| BR2 | **Om Oss — Norwegian origin content update** — Expand founding story, anchor methodology in Norwegian management tradition, make cultural values explicit as Norwegian, add "beste praksis fra norsk arbeidsliv" section, add international framing for FF2. | Planned | BR1 |
| W1 | **Wide-screen sidebar — article pages** — Right-hand panel with auto-generated page index (scroll-spy, clickable), questions section (replaces bottom placement), and CTA. Fixed/sticky while scrolling, appears after hero scrolls past, matches article body background. See `.design/wide-screen-sidebar.md`. | Done | PR #160 |
| W2 | **Wide-screen sidebar — homepage** — Separate implementation for homepage layout: right panel or bottom-of-page variant showing featured articles, newsletter signup, CTA. Appears after hero-intro scrolls past. | Done | PR #160 |
| W3 | **Scroll affordances — scroll-down indicator + back-to-top fix** — Add animated chevron at bottom of hero (auto-hides on scroll) and wire the existing back-to-top button with IntersectionObserver JS (HTML/CSS already shipped but never activates). Shared JS with W1/W2. See `.design/scroll-affordances.md`. | Done | PR #151 |
| S1 | **Social preview infrastructure — per-page OG images** — Add fallback chain (`hero.image → banner → page.image → site default`) to `og:image` and `twitter:image` in `_includes/metadata.html`. Add `url` to `_config.yml` for absolute URLs. Fix broken `.png` → `.webp` reference. Add `og:image:width/height`. See `.specs/social-previews/README.md` and `.design/social-previews.md`. | Done | PR #145 |
| S2 | **Social preview image crops** — Generate dedicated 1200×630 OG image variants for top 10 article pages, homepage, 3 step pages, and profile page. Crop from existing hero/banner images. | Done | S1 |
| I1 | **Spec/design integrity audit** — Reorganize 75+ spec files and 30 design docs to distinguish active from historical. Move completed specs (Z1, Y1-Y9, FF4, R4, R15, X2, A1, P5, etc.) to `.specs/archive/`. Move content research (`.specs/shared/`, article content dirs) to `.research/`. Rename gap-analysis specs to feature specs. Fix stale references in `.specs/partners/README.md` and `.specs/cases/README.md`. Cross-reference BL ↔ specs. See `.specs/codebase-integrity/README.md` and `.design/codebase-integrity.md`. | Done | PR #159 |

| R25 | **Step pages — boilerplate content** — Add substantive body text to `/samtale/`, `/intervju/`, `/rapport/` step pages. Currently 13 lines each with only frontmatter + one image. Needs expanded lead, what-happens section, why-it-matters, prerequisites, and CTAs. See `.specs/step-pages-content/README.md`. | Done | PR #144 |
| R26 | **Dynamic crosslinking JS utility** — Create a vanilla JS script that injects contextual cross-link banners into article pages for anchor-level navigation between related topics. Does not modify `.md` content files. See `.specs/crosslinking-js/README.md`. | Done | PR #149 |
| R27 | **Production UI/UX audit** — Browser-by-browser inspection of all 42 public pages. Findings: 4 critical, 11 major, 8 minor, 8 cosmetic. See `.specs/production-ui-audit/README.md` and `.omo/plans/ui-ux-fixes-r27.md`. | Done | — |
| R28 | **Mobile header — burger menu reposition** — Move `.nav-toggle` button to the right of the logo on mobile so the header stays on a single line. Desktop layout unchanged. See `.specs/mobile-header-reposition/README.md`. | Done | PR #147 |
| R30 | **GRC perspective cards refactor** — Refactor the four GRC governance perspectives into card components using existing banner illustrations. 2×2 responsive grid. See `.specs/grc-cards-refactor/README.md`. | Done | PR #148 |
| R31 | **Broken link fixes** — Fix confirmed broken link `/triader/`. Scan all pages for other broken internal links. See `.specs/broken-link-fixes/README.md`. | Done | PR #144 |
| R32 | **LLM ask modal refactor** — Refactor the review questions modal: remove provider icons, display as list (not grid), quotation block styling for question, collapse/expand provider list based on saved preference, move copy prompt to bottom, open AI service URL on provider selection. See `.specs/llm-modal-refactor/README.md`. | Done | PR #150 |
| R33 | **Benefit & process step frontmatter as data source** — Ensure `benefits` and `process_steps` frontmatter on product pages is the authoritative source for homepage benefit/process cards. Spec documents schema, rules, and rendering flow. See `.specs/product-card-frontmatter/README.md`. | Superseded | **Superseded 2026-08-30 (strategy alignment):** V1's 10-section homepage and V2's offer card render from todo-7 shared components (`.specs/product-signature/README.md`), not R33's benefit/process frontmatter-card pattern. V1 + V2 dependency cells updated accordingly. |
| R35 | **Ledelse 60:2 — article layout migration** — Migrated product page from `product` to `article` layout. Added stat-bridge support to `article.html` layout. Added 5 diagnostic frontmatter questions with collapsible sidebar rendering. Added Dagfinn profile at page bottom. Fixed homepage CTA heading. See PR #181. | Done | PR #181 |
| R34 | **Mobile TOC as modal overlay** — Button-triggered modal overlay on screens < 1200px with toggle button, focus trap, Escape-to-close, body scroll lock, SVG icons, dark mode. See `.specs/mobile-toc-modal/README.md`. | Done | PR #187 |
| Q1 | **Quiz — question pool** — 15+ questions with 6+ answers each, mapped to Bolman & Deal's four frames. Generated by LLM with brand voice. Inline in `quiz.js` as JS array. See `.specs/quiz/README.md`. | Blocked | User decision 2026-08-30 — quiz conflicts with the no-scoring principle (strategy alignment). Q3 |
| Q2 | **Quiz — illustrations** — Generate 10 question illustrations (240×240px) + 4 result illustrations (320×240px) + 4 OG share images (1200×630px). WebP. See `.design/quiz.md`. | Blocked | User decision 2026-08-30 — quiz conflicts with the no-scoring principle (strategy alignment). Q1 |
| Q3 | **Quiz — JS engine** — Create `assets/scripts/quiz.js`: modal controller, question flow, scoring (always forces a single winner), results, sessionStorage, result URL sharing. No dependencies. See `.specs/quiz/README.md`. | Blocked | User decision 2026-08-30 — quiz conflicts with the no-scoring principle (strategy alignment). — |
| Q4 | **Quiz — CSS** — Create `assets/css/components/quiz.css`: modal overlay, progress bar, answer cards, result infographic, score bars, shareable result card. Dark mode via CSS variables. See `.design/quiz.md`. | Blocked | User decision 2026-08-30 — quiz conflicts with the no-scoring principle (strategy alignment). Q3 |
| Q5 | **Quiz — page integration** — Deferred. No CTA placement until decided. | Blocked | User decision 2026-08-30 — quiz conflicts with the no-scoring principle (strategy alignment). — |
| R36 | **LLM disclaimer banner restyle** — Replace inline-styled fixed/rotated yellow div in `_includes/header.html` with a clean, always-visible top bar themed with design tokens. Centered on desktop, left-aligned on mobile. New component CSS + theme color entries. See `.specs/ai-disclaimer/README.md`. | Done | f62cb3d |
| R37 | **Fix dark mode on profile pages** — Profile content invisible on `/dagfinn/` and unreadable on `/om-oss/` in dark mode. Add `.profile-person-title` dark override, add global table/image overflow CSS. See `.omo/plans/ui-ux-fixes-r27.md` Branch 1. | Done | — |
| R38 | **Fix horizontal scroll on mobile** — `/personvern/`, `/pavirkning/`, `/grc/` overflow at ≤390px. Add `overflow-x: auto` to tables, `max-width: 100%` to images in lists. See `.omo/plans/ui-ux-fixes-r27.md` Branch 1. | Done | — |
| R39 | **Fix `/identitet/` horizontal scroll at desktop** — 1920px/1440px dark mode overflow. Same table/image overflow root cause. See `.omo/plans/ui-ux-fixes-r27.md` Branch 1. | Done | — |
| R40 | **Fix hero height regression at 1366×768** — 23 pages affected. Update `--header-height` 85px→97px, add `--hero-gap` 39px to hero calc. See `.omo/plans/ui-ux-fixes-r27.md` Branch 2. | Done | — |
| R41 | **Fix broken images on `/grc/` and `/pavirkning/`** — Rename disk files and markdown refs from `å` to ASCII `a`. See `.omo/plans/ui-ux-fixes-r27.md` Branch 2. | Done | — |
| R42 | **Fix tag cloud slugify bug** — `_includes/tag-cloud.html:27` applies `slugify` to full path. Fix Liquid filter grouping. See `.omo/plans/ui-ux-fixes-r27.md` Branch 3. | Done | — |
| R43 | **Create missing `_tags/` files** — 10 of 14 tags lacked pages. Created `_tags/*.md` for all missing tags. See `.omo/plans/ui-ux-fixes-r27.md` Branch 3. | Done | — |
| R44 | **Fix `animations.js` initialization** — Add IntersectionObserver feature detection, scroll-listener fallbacks for back-to-top and scroll indicator. See `.omo/plans/ui-ux-fixes-r27.md` Branch 4. | Done | — |
| R45 | **Fix mobile TOC modal at 1024px** — Explicit `display` CSS was overriding `[hidden]` attribute. Add `[hidden] { display: none !important; }` guards. See `.omo/plans/ui-ux-fixes-r27.md` Branch 4. | Done | — |
| R46 | **Fix GRC card grid single-column bug** — `.card-grid--grc` was inside `@media (max-width: 900px)` block. Moved outside. See `.omo/plans/ui-ux-fixes-r27.md` Branch 5. | Done | — |
| R47 | **Increase touch targets to ≥44px** — Tag cloud padding 10px→14px, footer legal links get `min-height: 44px`. See `.omo/plans/ui-ux-fixes-r27.md` Branch 5. | Done | — |
| R48 | **Fix homepage dark mode** — Navbar links used `--nav-link-color-dark` = navy on navy background. Changed to `--primary-azure`. Added `.product-hero-content` to hero dark override. See `.omo/plans/ui-ux-fixes-r27.md` Branch 5. | Done | — |
| R49 | **Fix 6 pages horizontal scroll at 1440px dark** — `mennesker`, `pavirkning`, `baerekraft`, `samtale`, `intervju`, `grc`. Same table/image overflow root cause. See `.omo/plans/ui-ux-fixes-r27.md` Branch 1. | Done | — |
| R50 | **Update CSS breakpoint documentation** — `.design/css-architecture.md:160` claimed 1024px breakpoint. Updated to actual: 599px, 768px, 900px, 1199px. See `.omo/plans/ui-ux-fixes-r27.md` Branch 6. | Done | — |
| R51 | **Remove stale dark mode test and dead toggle CSS** — Deleted `tests/dark-mode.test.js`, removed `#dark-mode-toggle` rules from `utilities.css`. See `.omo/plans/ui-ux-fixes-r27.md` Branch 6. | Done | — |
| R52 | **Add custom 404 page and noscript fallbacks** — Created `_pages/404.md`, added `<noscript>` blocks for nav, TOC, questions in layouts. See `.omo/plans/ui-ux-fixes-r27.md` Branch 6. | Done | — |
| R53 | **Remove personal data from `_pages/dagfinn.md`** — Removed `phone` and `email` from frontmatter, added conditional rendering in `profiles.html`. See `.omo/plans/ui-ux-fixes-r27.md` Branch 6. | Done | — |
| R54 | **Add tag pages to sitemap.xml** — Added `{% for tag in site.tags %}` loop to generate `/emne/{slug}/` entries. See `.omo/plans/ui-ux-fixes-r27.md` Branch 3. | Done | — |
| R55 | **Fix URL mismatches** — `/om-metode/` → `/metode/` in `.design/` docs. `/pavirkning/` permalink already correct. See `.omo/plans/ui-ux-fixes-r27.md` Branch 6. | Done | — |
| V1 | **Homepage repositioning** — 10-section sequence (outcome hero → recognition → what changes → 60/2/4 → diagnosis-before-intervention → how it works → proof → fit → commercial info → CTA). See `.specs/homepage-repositioning/README.md`. | Planned | V3 (nav targets), product-signature (shared components) |
| V2 | **Product-page offer** — fit/not-fit, public price (kr 14 850,- eks. mva), FAQ, bounded before/during/after, JSON-LD price. See `.specs/product-page-offer/README.md`. | Planned | product-signature (price card), bestill-booking-page (Route A/B targets) |
| V3 | **Navigation / IA split** — commercial vs insight surface classification; AI = insight; Bookings demoted to background scheduler. See `.specs/navigation-ia-split/README.md`. | Planned | — |
| V4 | **Buying-situation pages** — 6 Tier-1 situations (gjentatte diskusjoner, svak gjennomføring, uklare roller, ny ledergruppe, ny leder, strategi ikke gjennomført). See `.specs/buying-situation-pages/README.md`. | Planned | ai-private-reflection, analytics-events |
| V5 | **Article conversion rails** — two-CTA pattern, related-perspectives block, recognition hook, return sections. See `.specs/article-conversion-rails/README.md`. | Planned | ai-private-reflection, analytics-events, navigation-ia-split |
| V6 | **Founder credibility** — practitioner module + reusable CTA panel (Dagfinn) on /bestill/ + /foredrag-og-media/. See `.specs/founder-credibility/README.md`. | Planned | bestill-booking-page, foredrag-media, product-signature |
| CS1 | Color system review | Pending | `.omo/plans/color-system-review.md` |
| AL1 | Article layout system | Pending | `.omo/plans/article-layout-system.md` |
| BU1 | Button CTA URL uniformity | Pending | `.omo/plans/button-cta-url-uniformity.md` |
| AI1 | AI Act alignment | Pending | `.omo/plans/ai-act-alignment.md` |
| RI1 | Risk reduction cleanup | Pending | `.omo/plans/risk-reduction-cleanup.md` |
| CI1 | CI reuse gating flip | Pending | mixed-rights:507 |
