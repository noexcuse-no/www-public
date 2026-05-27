# CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `_layouts/default.html` — base template with shared boilerplate (metadata, styles, conditional breadcrumb-schema, header, footer, booking-modal, scripts)
- `page.html` and `home.html` now inherit from `default` — eliminates boilerplate duplication
- Breadcrumb-schema include is conditional via `page.breadcrumb` frontmatter (default: true, opt-out: false)
- `.omo/rules/testing.md` — Vitest + happy-dom test patterns, conventions, and coverage expectations
- `.omo/rules/deploy.md` — pre-build/deploy checks, deployment workflow, and troubleshooting for GitHub Pages
- `.design/testing-architecture.md` — testing stack rationale (Vitest vs jsdom vs Playwright), patterns, anti-patterns
- `.design/deployment.md` — deployment architecture: Jekyll → GitHub Pages → noexcuse.no, domain setup, constraints
- Specifications for N1-N3 new articles: `.specs/triader/README.md`, `.specs/makt/README.md`, `.specs/perspektiv/README.md`
- Rule activation tree in AGENTS.md — conditional branching table for 7 scenarios (CSS, JS, HTML, new page, commit, visual, image changes)
- `.opencode/opencode.json` → `rules` key — 8 triggers, 14 operation lifecycle hooks (pre_check, constraints, post_verify) inlined from former `rules.json`
- `_includes/cta.html` — reusable CTA component with configurable heading, body text, booking URL, and secondary link
- `_data/navigation.yml` — data-driven navigation source-of-truth
- `assets/css/profiles.css` — extracted inline `<style>` from `_includes/profiles.html` (287 lines)
- Frontmatter defaults for all collections in `_config.yml`
- SVG logo assets: `assets/images/noexcuse-logo-dark.svg` (dark logo for light header), `assets/images/noexcuse-logo-light.svg` (light logo for dark header), horizontal variants in `.design/graphics/`
- `tests/setup.js` — injected CSS custom properties from colors.css for happy-dom test environment (22 CSS variable tests fixed, 31/31 bestått)

### Changed

- P2.3 Image include adoption — cancelled; project convention is direct `<img>` with `relative_url` (old `_includes/image.html` was dead code)
- P3.1 Plugin integration — cancelled; GitHub Pages restricts plugins, custom SEO/sitemap implementations suffice
- AGENTS.md — rules architecture documentation updated with accurate rule file table and mechanism descriptions
- `"Les mer →"` benefit card links restyled as pill buttons with accent color, hover lift effect, and 44px minimum touch target
- Benefit cards redesigned with image + content separation, flexbox layout, and enhanced shadows
- Navbar links increased to 44px touch targets with hover background and dark mode support
- Header stacks vertically on mobile (<600px) for better logo + navigation fit
- `.opencode/rules/triggers.json` created then inlined as `instructions[0]` in `.opencode/opencode.json` — triggers + operations now live directly in the instructions array
- `.opencode/rules/triggers.json` — deleted (content inline in `instructions[0]`)
- All 10 `.opencode/rules/*/rules.md` — converted to `rules.json` format, `.md` files deleted
- `.opencode/opencode.json` `rules` key — replaced by `instructions` array: `instructions[0]` = inline triggers/operations, `instructions[1..5]` = `$ref` objects to concrete-constraint rule files (frontmatter, accessibility, privacy, linting, task-management)
- 6 architecture/design JSON rule files — migrated from `.opencode/rules/*/rules.json` to `.design/*.md`: naming.md, css-architecture.md, js-patterns.md, html-templates.md (architecture.md already existed)
- `.opencode/rules/architecture/`, `naming/`, `css/`, `js/`, `html/` — directories deleted
- All 10 `.opencode/rules/*/rules.md` — activation headers rewritten in English with standard format (pre-JSON migration)
- `_includes/navbar.html` — reads navigation from `site.data.navigation` instead of hardcoded links
- `_includes/profiles.html` — inline `<style>` removed, now references external `assets/css/profiles.css`
- `colors.css` — full design token system: shadow elevation scale (xs→xl), spacing scale (4px-base), border-radius scale, border tokens, content width variables
- Dark mode consolidated: all `.dark-mode` selectors moved from 7 component files → `styles-dark.css` (0 remaining)
- `article.css` + `perspektiv-styles.css` consolidated: `.perspektiv-*` aliasert som comma-separated selectors alongside `.frame-*`; perspektiv-styles.css slanket fra 303→79 linjer (kun unike overrides)
- Alle hardcodede box-shadows, border-radius og spacing-verdier erstattet med CSS-variabler (`var(--shadow-*)`, `var(--radius-*)`, `var(--space-*)`)
- `.design/css-architecture.md` — updated with complete token system, dark mode consolidation pattern, and component alias conventions

### Fixed

- Perspektiv frame lookup changed from URL parsing (`split: '/' | last`) to explicit `page.frame_id` frontmatter — fixes empty H1 and broken images on trailing-slash URLs
- `profiles.css`: `var(--box-shadow-light-hover)` → `var(--box-shadow-hover-light)` (hover shadow på profile-compact fungerte ikke)
- Manglende CSS-variabler `--navbar-background-*`, `--button-background-*` definert i colors.css
- "Les mer om metoden" CTA endret fra `product-cta--secondary` til primary `product-cta` i `_pages/ledelse_60-2.md`
- Fjernet referanse til `science-research.webp` i `_pages/om_metode.md` og slettet filen
- Benefit-kort margins forbedret i `assets/css/products.css` — min-height 100% på kort, CSS-variabler for padding, margin-regel for `.product-cta`

### Removed

- Dead code: `styles.css.old`, `profile-card.js`, `_includes/image.html`

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