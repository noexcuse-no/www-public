# CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
- Modular CSS architecture with light/dark theme support
- Reusable HTML includes