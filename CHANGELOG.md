# CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.7.1] - 2026-06-04

### Changed
- **HTML→MD refactor — Page content migration**: Extracted all inline HTML from 22 `_pages/*.md` files into includes and markdown body. Created 20 new `_includes/` components (benefit-cards, step-cards, cases-cards, frame-cards, grc-perspective-cards, science-section, ethics-columns, science-highlight, science-quote, science-divider, section-illustration, framework-illustration, section-wrapper, section-container, info-box, challenge-card, challenge-grid, question-list, cta-section, tag-cloud, avtate-section, about-values, about-section, about-team, kotter-flow). Consolidated CTA, Hero, Section patterns (Phase 3). Inline styling tags (`<a class="product-cta">`, `<p class="lead">`) converted to kramdown IAL syntax in captures with `markdownify_body` support.

## [Unreleased]
- **Frame page content refactoring**: Migrated all 4 frame pages (struktur, identitet, mennesker, påvirkning) from YAML frontmatter-driven rendering to explicit markdown body. Removed all section rendering blocks from `_layouts/perspektiv.html` — content flows as `{{ content }}`. All HTML wrappers (`<div class="perspektiv-section …" markdown="1">`, `<div class="perspektiv-challenges">`, `<div class="cta-illustration …">`) replaced with pure markdown + kramdown IAL (`{: .class}`). Challenge cards use `<ul>` with IAL. CTA illustrations use markdown images instead of CSS background-image divs. Removed unused frontmatter fields (`show_spots`, `intro`, `elements`, `leader_value`, `challenges`, `questions`, `cta`, `about`) from all 4 files. Cleaned CSS: added `list-style: none; padding: 0` to challenge grid, added `.perspektiv-challenges > li` selectors for card styling, removed `.cta-illustration` rules from `perspektiv-styles.css`.
- **R23.4 — Mennesker dynamic element count**: The "tre hovedelementene" heading now renders dynamically via `{{ frame.elements | size }}`. All 4 frame alt texts updated similarly. 4th Mennesker element "Verdier og mening" now has a `spot_image` (compass/north star icon, 80×80px). Image generated via EvoLink GPT Image 2, original PNG preserved in `.design/graphics/originals/banners/`
- **R23.1 — Card hover shift removal**: Removed `transform: translateY()` from 7 hover selectors across `profiles.css`, `article.css`, `perspektiv-styles.css`, `card.css`. Hover now only deepens shadow — no lift. CTAs retain their existing hover transform (they're actions, not containers)
- **R23.2 — Profile person title**: Added `if profile.person_title` block in `_includes/profiles.html` rendering job title below name. Styled as `.profile-person-title` (0.9em, opacity 0.7, negative top margin). Applied to `/dagfinn/` with `person_title: "Daglig leder"`
- **R23.3 — Profile image white background**: Added `background: #fff` to both `.profile-image` (compact card) and `.profile-image-large` (header) in `profiles.css` for consistent white circle behind photos regardless of theme
- **R23.5 — Avtale micro-illustration reposition**: Moved all 6 micro-illustrations out of `.avtale-section-header` (flex layout) to standalone `<img>` elements with new `.avtale-micro` class (`float: right; 48×48px; margin 4px 0 8px 12px`) in `avtale.css`
- **R23.6 — Perspektiv card overflow fix**: Added `display: flow-root` to `.perspektiv-element`, `.frame-element`, `.info-box` in `article.css` for proper float containment without shadow clipping
- **R23.7 — GRC page inline style extraction**: Moved 50+ line `<style>` block (`.grc-table`, `.cta-box`, dark mode, mobile) from `_pages/grc.md` into `assets/css/article.css`. Zero inline `<style>` blocks remain across all `_pages/`
- **R23.8 — GRC perspective card enhancement**: Added frame accent colors via `style="--card-accent: #..."` with matching `border-left-color` to all 4 GRC info-boxes. Extracted inline text links into dedicated `.card-link` CTAs at bottom of each card. Added missing Mennesker CTA. Colors: Struktur=navy (#2A4D6E), Mennesker=golden yellow (#D4A836), Påvirkning=hunter green (#355E3B), Identitet=deep wine (#8E0D3C)
- **R23.9 — Tag cloud hover cleanup**: Removed `transform: translateY(-2px)` from `.tag-cloud-item:hover` in `article.css`

### Added
- **R17 — Frame challenge micro illustrations**: Generated 16 T4 (80×80px) micro images for challenge cards across all four frame pages — Struktur (role-clarification, goal-conflict, coordination, bureaucracy), Mennesker (psychological-safety, empty-values, silos, meaninglessness), Identitet (empty-values, individual-dominance, storylessness, change-fatigue), Påvirkning (invisible-power, hidden-agendas, resource-struggles, too-much-agreement). All images: EvoLink GPT Image 2 at 1024×1024 → WebP via sharp at 80×80px. Added `image:` field to each challenge in frontmatter of all four frame pages. Updated `_layouts/perspektiv.html` to render `challenge.image` as `<img class="micro-illustration">` before each challenge title. All prompts documented in `.design/graphics.md`. Merged in PR #118.
- **R3 — Profile card image enhancements**: Increased compact card image from 120px to 140px and modal image from 88px to 110px. Added 3px brand border ring (navy light / azure dark) with box-shadow elevation. Compact image now overlaps card top edge via negative margin for premium positioning. Added hover scale(1.05) effect. PR #120.
- **R18 — Product & process illustrations**: Generated 20 images across 6 pages per the 4-tier illustration system — Ledelse 60:2 product page (1 T2 process flow + 3 T4 step card micros), Metode methodology page (3 T3 section illustrations + 4 T4 ethics micros), Avtale contract page (6 T4 § section icons), and three step pages (3 T3 section illustrations). Wired into pages: T2 framework in `_pages/ledelse_60-2.md` story section, T3s in `_pages/om_metode.md` sections (teori, forskning, hvorfor), T4 ethics micros replacing emoji icons in ethics columns, T4 § icons as `avtale-section-header` flex layout in `_pages/om_avtale.md`, T3 section images on `_pages/step-{talk,interview,report}.md`. Added `micro_image` field to step page frontmatter, updated `_includes/card.html` to render it as `<img class="micro-illustration">` inside `card-step-number`. Added `.avtale-section-header` CSS to `avtale.css`. All 20 prompts documented in `.design/graphics.md` under "Product & Process Illustrations (Style 3 — R18)" section. All images regenerated via EvoLink GPT Image 2 at 1024×1024 → WebP with PIL at tier-specific sizes (T2: 800px, T3: 400px, T4: 80px square).
- **R16 — Article illustrations for Makt and Triader**: Generated 20 images — 7 for Makt (1 T2 + 2 T3 + 4 T4) and 13 for Triader (1 T2 + 8 T3 + 4 T4). All images: EvoLink GPT Image 2 at 1024×1024 → WebP via sharp at tier-specific sizes (T2: 800px, T3: 400px, T4: 80px). Makt images placed: T2 framework between intro and diagnostic tension section, T3 in power/service side sections as floats, T4 micros inline with power price bullets. Triader images placed: T2 framework between intro and dyad section, 4 T3 in structural advantages section info-boxes, 4 T3 in archetype section info-boxes (alternating float layout), 4 T4 micros in failure mode info-boxes. All prompts documented in `.design/graphics.md`.
- **R20 — Perspektiv article illustrations**: Generated 5 illustrations for `/perspektiv/` per 4-tier system — 1 T2 framework (perspektiv-t2-fire-perspektiver.webp, 800px, four frames as overlapping lenses) and 4 T3 section images (perspektiv-t3-{strukturfellen,menneskefellen,politisk-felle,symbolfellen}.webp, 400px, one per frame trap). Wired into `_pages/ledelse_perspektiv.md` with alternating float layout in the Enrammefellen section. Added `section-illustration--float-left`/`--float-right` CSS variants to `illustrations.css` with dark mode and mobile responsive support
- **R19 — Perspektiv menu link**: Added "Perspektiv" to `_data/navigation.yml` between "Ledelse 60:2" and "Om oss", linking to `/perspektiv/`
- **R21 — Hero CTA overlay on /perspektiv**: Four frame-perspective buttons (Struktur, Mennesker, Påvirkning, Identitet) as CSS grid overlay at bottom of hero banner. Uses `hero-frame-nav`/`hero-frame-link` classes in `perspektiv-styles.css` with dark mode support and mobile wrap layout
- **R22 — Frame page back-navigation**: Added "↑ Fire perspektiver" cross-navigation link in `_layouts/perspektiv.html`, linking all four frame pages back to `/perspektiv/` overview
- **R15 — Values illustrations for Om Oss**: Replaced placeholder `●` circles in `_pages/om_oss.md` value cards with 3 generated spot illustrations (`verdi-ansvarlighet.webp`, `verdi-tillit.webp`, `verdi-aerlighet.webp`). Images are 400×400px WebP, ≤15KB each, square 1:1, Scandinavian minimal style with distinct color palettes per value. Updated `assets/css/about.css` `.value-icon` to render `<img>` elements at 60×60px with `object-fit: cover` and `border-radius: var(--radius-md)`. Images use `aria-hidden="true"` and empty `alt` (decorative, per WCAG).

### Added
- **FF4 — Citation Enhancement (kramdown footnotes + JSON-LD + JS enhancer)**: Replaced ad-hoc `<sup class="citation">` HTML across 7 article pages with kramdown native `[^ref]` footnotes. Added JSON-LD `citation:` arrays to page frontmatter with full bibliographic metadata. Created `assets/scripts/citation-enhancer.js` for JS microdata injection into kramdown footnote DOM. Updated `_config.yml` with `kramdown.footnote_backlink: "↩"`. Added footnote list CSS to `assets/css/article.css`. Pages converted: usikkerhet, tillit, forankring, generativ-ki, makt, perspektiv, triader.

### Fixed
- **S0 — Perspektiv layout null sort error**: `_layouts/perspektiv.html` referenced `site.frames` (defunct collection, removed during A1 topic consolidation). Changed to `site.topics | where: "category", "frame" | sort: "id"` — fixes GitHub Pages build failure with `Cannot sort a null object`

### Added
- **N4-N7 — Frame spot illustration wiring**: Added `show_spots: true` and explicit `spot_image` fields to all four frame pages (`_pages/struktur.md`, `_pages/mennesker.md`, `_pages/påvirkning.md`, `_pages/identitet.md`). Each frame now references 4 concept-named spot illustrations (3 elements + 1 leader_value) from `assets/images/banners/spot-{frame}-{concept}.webp`. Layout `_layouts/perspektiv.html` reads these directly — no computed filenames.

### Added
- **A1.1 — Topic consolidation**: `_config.yml` registers `_topics/` collection (output:false); 11 topic files created (4 frames, 4 benefits, 3 steps); `_frames/` directory deleted; `_includes/card.html` created for 3 card variants; `_products/ledelse-60-2.md` frontmatter cleaned; `_pages/om_metode.md` and `_pages/ledelse_60-2.md` migrated to card include
- **A1.2 — Hero unification**: `_includes/hero.html` created with dual-source support (page frontmatter + include params); `assets/css/components/hero.css` created with unified `.hero` class; all 8 hardcoded hero pages migrated to `include hero.html`; `_layouts/perspektiv.html` updated to use hero include; old hero CSS removed from `article.css`, `about.css`, `products.css`, `styles-dark.css`
- **A1.3 — Card CSS**: `assets/css/components/card.css` created with `.card-grid`, `.card` base component, category variants (`.card--frame`, `.card--benefit`, `.card--numbered`), image/content/badge/link styling, `--card-accent` custom property, dark mode, responsive; linked from `_includes/styles.html`
- **A1.4 — CSS color hygiene**: Fixed `--navbar-background-*` / `--button-*` dangling outside `:root` in `colors.css`; added 24 new CSS variables (surface tints, border colors, overlays, close button, profile card, nav hover); replaced 43 hardcoded `rgba()`/hex values across 8 CSS files; fixed `.tag-count` contrast bug (`#fff` → `--primary-accent-contrast`)
- **A1.5 — CSS file reorganization**: Extracted button/CTA styles to `assets/css/components/buttons.css` (`.product-cta`, `.about-cta-button`, `.benefit-link`); stripped `products.css` (348→330 lines), `article.css` (367→325 lines), `about.css` (130→113 lines) to their core concerns; removed dead booking modal CSS
- **A1.6 — Inline CSS removal**: Extracted 350-line `<style>` block from `_pages/om_metode.md` to dedicated `assets/css/metode.css`; zero inline `<style>` blocks remain across all `_pages/` files
- **A1.7 — `styles-dark.css` shrink**: Reduced from 267 lines to 38 lines (base element overrides only); distributed 229 lines of component-specific dark mode overrides to their respective files (`products.css`, `about.css`, `article.css`, `profiles.css`, `navbar.css`, `cases.css`, `buttons.css`, `metode.css`) using `.dark-mode` class prefix
- **A1.8 — Regression pass**: All CSS braces verified matched; no hardcoded colors in refactored files; `styles.html` updated to load `buttons.css` and `metode.css`; inline style verification clean
- **B0–B4 — Benefit article improvements + frame argument integration**:
  - B0: `.frame-section` centered with `margin-inline: auto` in `typography.css`
  - B1: Tillit — autonomy added as fourth pillar, compliance≠byråkrati in system pillar
  - B2: GenKI — cultural maturity (Logan stages) and power dynamics sections added
  - B3: Usikkerhet — theater metaphor, power vacuum paragraph, structural uncertainty challenge
  - B4: Forankring — interests mapping as new dimension, psychological safety in intro, ownership in dimension 1
- **10.3-10.4 — Hero animation system + parallax-fade**: Frontmatter-driven hero effect framework with `HeroEffects` dispatcher in `animations.js`. First effect: parallax-fade — image translates up 40px on scroll (0–300px), title/intro fade out with translateY. Enabled on `/ledelse-60-2/`, `/om-oss/`, `/metode/` via `hero_effect: parallax-fade` frontmatter. `.specs/hero-animation-system/README.md` spec created
- **A1 — Architecture cleanup spec**: `.specs/architecture-cleanup/README.md` — full spec for CSS reorganization, topic consolidation, hero/card unification, color hygiene, inline CSS removal, and file restructuring across all layers
- **N4–N7 — Frame perspective article content spec**: `.specs/frame-article-content/README.md` — spec for writing body content on the four empty perspective pages (identitet, struktur, mennesker, påvirkning). BACKLOG updated with N4–N7 as Planned

### Removed
- **_pages/avtale.md** (stub): removed duplicate contract page. Both `avtale.md` and `om_avtale.md` had `permalink: /avtale/` causing a Jekyll build conflict. Kept `om_avtale.md` (full legal text)

## [1.7.0] — 2026-05-30

### Added
- **X1 — Core values infographic** (`/om-oss/`): GPT Image 2 generated banner + 3 value cards with icons for ansvarlighet, tillit, ærlighet. Prompt documented in `.design/graphics.md`
- **F7 — Photographer brief**: `.design/photography-brief.md` — full Norwegian-language brief for professional portrait photography covering brand context, photo style, technical specs, and mood references
- **10.6 — Frontpage profile filter**: Liquid tag-based filter in `_includes/profiles.html` via optional `include.tags` parameter. Frontpage filters by "ledelse"; om-oss shows all

### Changed
- **10.7 — Full-width hero**: Removed `max-width: 1100px; margin: 0 auto;` from all hero containers (`.landing-hero`, `.science-hero`, `.perspektiv-hero`/`.frame-hero`, `.about-hero`) for edge-to-edge visual treatment
- **D2 — CTA hover color-swap**: Type A/B system using `--cta-primary-*` / `--cta-secondary-*` CSS variables. Removed broken duplicate `.efit-card .product-cta` selector
- **D3 — Hero text overlay**: CSS Grid overlay with navy-to-transparent gradient `::after` on all hero types. Text colors changed to `#fff`
- **D12 — Profile image size**: Increased from 80×80px → 120px, margin 16px → 20px
- **D14 — Contact link styling**: Pill-style `.profile-phone`, `.profile-email` with background, border-radius, hover; matching expanded `.profile-contact-item`
- **10.10 — Mobile CTA widths**: `.product-cta` gets `width: 100%; box-sizing: border-box; text-align: center` on mobile breakpoint

### Fixed
- **D1 — Header background**: Always `#003060` (navy) regardless of theme — removed theme-dependent header overrides
- **D6 — Profile scrollbar visibility**: Enabled at first load instead of only after modal interaction
- **D13 — Layout shift on modal open**: `scrollbar-gutter: stable` on `html` prevents page shift when modal removes scrollbar
- **D15 — Hero missing border-radius**: `border-radius: 0 0 var(--radius-lg) var(--radius-lg)` on all hero image containers
- **10.8/10.9 — Booking direct links**: Removed `booking-modal.html` (iframe overlay, 128 lines) and all inline `openBookingModal` onclick handlers from 10 files. Booking CTAs link directly to Microsoft Bookings

### Removed
- `_includes/booking-modal.html` — iframe booking overlay replaced by direct links

## [1.6.0] - 2026-05-26

### Added

- E1-E6 article expansions: Hubbard AIE process, Idiosyncrasy Credits, Core Values + Noble Cause, "No scoring" backing, softened garbage can theory
- S1-S7 SEO foundation: dynamic sitemap.xml, canonical URLs, page-specific meta descriptions, BreadcrumbList JSON-LD, FAQPage schema, robots.txt sitemap ref, PWA manifest
- WebP image optimization: all 43 PNG images converted to WebP (avg 70% size reduction)

### Changed

- Updated all image references from .png to .webp across 16 files
- Updated metadata.html with dynamic og:title, og:description, og:url per page

### Fixed

- apple-touch-icon converted to WebP

## [1.5.0] - 2026-05-26

### Added

- Scroll-triggered animation system (`assets/css/animations.css`, `assets/scripts/animations.js`) with fadeInUp, slideInLeft, and stagger patterns via Intersection Observer
- Article hero overlay treatment with gradient overlay on banner images for all article and perspektiv pages
- Landing page hero gradient overlays (`products.css`, `about.css`)
- Button and card micro-interactions: translateY lift + shadow on hover for CTAs and cards
- Dark mode variants for all new overlay and card hover components
- Mobile responsive breakpoints for hero overlays
- Reduced motion support (`prefers-reduced-motion: reduce`) for all animations

### Changed

- Extracted inline article styles from 4 article pages into shared `assets/css/article.css`
- Unified typography scale: h2 2em, h3 1.4em, body line-height 1.7, reading width 65ch
- Updated perspektiv layout with scroll animation classes
- Updated landing page (`ledelse-60-2`) with staggered card and process step animations
- Updated about page (`om-oss`) with scroll animation classes

### Fixed

- Removed 1000+ lines of duplicated inline CSS from article markdown files
- Consistent dark mode hover shadows for all interactive cards

## [1.4.0] - 2026-05-23

### Added

- Architecture specification (`.specs/architecture/README.md`) — Jekyll patterns, path handling, collection schemas
- Design architecture doc (`.design/architecture.md`) — site structure, URL conventions
- AI knowledge base spec (`.specs/knowledge-base/README.md`) — three AI contexts documentation
- 7 mini-hero banners (16:9 abstract illustrations) via GPT Image 2: 4 benefit + 3 process step
- JSON-LD schemas in all `_pages/` frontmatter (Service, Organization, TechArticle)
- CSS variable validation tests (`tests/css-variables.test.js`)
- Generic `_includes/image.html` partial for consistent image path handling
- Box-shadow CSS variables (`--box-shadow-light`, `--box-shadow-dark`)

### Changed

- **BREAKING** Moved pages from root to `_pages/` collection (ledelse-60-2, om-oss, vitenskapelig-grunnlag)
- Refactored `_layouts/landing.html` to be generic (no hard-coded product references)
- Fixed path handling: replaced `site.baseurl` with `relative_url` filter throughout
- Updated `products.css`: banner dimensions (16:9 aspect ratio, max-width 400px), CSS variable box-shadow
- Updated `styles-dark.css`: dark variants for `.landing-*` sections and `.benefit-card`, `.process-step`, `.case-card`
- Updated `_products/ledelse-60-2.md`: `icon` → `banner` field, added `url` field
- Updated `components.md`: dark mode component requirements and checklist
- Updated `task-management/rules.md`: blocked items strategy, research preferences (prefer Kaggle)

### Fixed

- Dark mode for landing page sections (benefit-card, process-step, case-card)

## [1.3.0] - 2026-05-22

### Added

- Functional specification documents (.specs/) for Ledelse 60:2, cases, partners, navigation, and om-oss
- Hero illustration and 7 line-art icons (benefit + process-step) via GPT Image 2 generation
- Product frontmatter restructured with short_description, benefits[], process_steps[], story, tags
- Landing page for Ledelse 60:2 at /ledelse-60-2/ with full hero, benefit grid, step flow, cases, science link, and CTA
- Om oss page at /om-oss/ with company story, values, and team profiles
- Navigation bar with Ledelse 60:2 and Om oss links
- Partners collection template (_includes/partners.html) and CSS
- Case studies (_cases/) with two anonymized customer stories
- About page styles (about.css) and partners styles (partners.css)
- Development process rules in AGENTS.md (design docs, functional specs, backlog management)

### Changed

- Rewrote _products/modenhetsvurdering.md → _products/ledelse-60-2.md with structured frontmatter
- Rewrote _includes/products.html with inline hero excerpt + benefit grid + CTA
- Rewrote assets/css/products.css with hero layout, 2×2 benefit grid, landing page sections
- Updated _includes/cases.html with result/customer display
- Updated _layouts/default.html to include partners section
- Updated _includes/navbar.html with active links and revised navbar.css
- Updated BACKLOG.md — removed completed tasks (no Done section)

## [1.0.0] - YYYY-MM-DD

### Added

- Initial website structure for No Excuse AS
- Jekyll collections: profiles, products, cases, partners

