# Design Specification - No Excuse AS

## Project Overview
- **Company:** No Excuse AS
- **Type:** Inbound sales landing page
- **Goal:** High-converting sales landing spot for SMB leaders
- **Tone:** Direct, competent, Scandinavian minimal, anti-establishment

## Brand Character
- **Direct:** Say what we mean, no consultant-speak
- **Competent:** Proven results, real experience
- **Scandinavian minimal:** Clean, functional, no fluff
- **Anti-establishment:** Question the obvious, challenge conventions

## Target Audience
- **Industry:** All SMB, focus on logistics
- **Company size:** 5-50 employees
- **Roles:** Founders + middle management
- **Geographic:** National, Oslo/Østlandet focus
- **Persona:** Down-to-earth, no-bullshit people who may consider electric bikes and caffe lattes pretentious

## Competitive Differentiation
1. **Method** - Reflection-driven approach (60 diagnostic questions vs surveys)
2. **Language** - Direct, no corporateSpeak
3. **Price** - More accessible
4. **Speed** - 2 hours vs typical 2-week assessment

## Design Principles
- **Minimal text** - Short, punchy headlines only
- **Visual-first** - Icons, graphics, clear hierarchy
- **Direct CTAs** - One action per section
- **Mobile optimized** - Scannable content, large touch targets
- **Mobile-first** - 320px minimum breakpoint
- **Touch targets** - 44px minimum

## Feature Index

Each feature has a `[tag]` used in CHANGELOG.md and BACKLOG.md for consistent cross-referencing.
When starting work on a feature: read the listed design docs and specs first.

| Tag | Feature | Files | Design Docs | Specs |
|-----|---------|-------|------------|-------|
| `[home]` | Home page | `index.md` | `layouts.md`, `components.md`, `colors.md`, `typography.md`, `ui-upgrade.md` | — |
| `[products]` | Products (Ledelse 60:2, Katalysator) | `_products/*.md`, `_includes/products.html` | `layouts.md`, `components.md`, `colors.md`, `typography.md`, `ui-upgrade.md`, `graphics.md` | `.specs/products/`, `.specs/shared/product-katalysator.txt` |
| `[profiles]` | Team profiles | `_profiles/*.md`, `_includes/profiles.html` | `components.md`, `layouts.md`, `colors.md` | `.specs/profiles/` |
| `[perspektiv]` | Frame articles (Struktur, Mennesker, Pavirkning, Identitet) | `_pages/ledelse_*.md`, `_layouts/perspektiv.html`, `_frames/*.md` | `layouts.md`, `ui-upgrade.md`, `graphics.md`, `colors.md` | `.specs/perspektiv/` |
| `[triader]` | Triader article (N1) | `_pages/ledelse_triader.md` | `layouts.md`, `ui-upgrade.md`, `graphics.md`, `colors.md` | `.specs/triader/README.md` |
| `[makt]` | Makt article (N2) | `_pages/ledelse_makt.md` | `layouts.md`, `ui-upgrade.md`, `graphics.md`, `colors.md` | `.specs/makt/README.md` |
| `[cases]` | Case studies | `_cases/*.md`, `_includes/cases.html` | `components.md`, `colors.md` | `.specs/cases/` |
| `[partners]` | Partner logos | `_includes/partners.html` | `components.md`, `colors.md`, `layouts.md` | `.specs/partners/` |
| `[navigation]` | Navbar/navigation | `_includes/navbar.html`, `_data/navigation.yml` | `components.md`, `colors.md`, `css-architecture.md` | — |
| `[footer]` | Site footer | `_includes/footer.html` | `components.md`, `colors.md` | — |
| `[dark-mode]` | Dark mode theme toggle | `assets/css/styles-dark.css`, `assets/css/styles-light.css`, `assets/scripts/dark-mode-toggle.js` | `colors.md`, `components.md`, `css-architecture.md` | — |
| `[animations]` | Scroll-triggered animations | `assets/css/animations.css`, `assets/scripts/animations.js` | `ui-upgrade.md`, `css-architecture.md` | `.specs/ui-upgrade/README.md` |
| `[cta]` | Reusable CTA component | `_includes/cta.html` | `components.md`, `colors.md`, `ui-upgrade.md` | — |
| `[booking]` | Microsoft Bookings modal | `_includes/booking-modal.html` | `components.md` | — |
| `[logo]` | Logos/branding assets | `assets/images/noexcuse-logo-*.webp` | `graphics.md`, `colors.md` | — |
| `[seo]` | SEO foundation | `_includes/metadata.html`, `sitemap.xml`, `robots.txt`, `manifest.json` | — | — |
| `[images]` | Image generation & optimization | `assets/images/*` | `graphics.md` | — |
| `[testing]` | Test infrastructure | `tests/*`, `vitest.config.*` | `testing-architecture.md` | — |
| `[deploy]` | Deployment (GitHub Pages) | `_config.yml`, `Gemfile`, `CNAME`, `.github/**` | `deployment.md` | — |
| `[architecture]` | Code architecture & conventions | Various | `architecture.md`, `naming.md`, `css-architecture.md`, `html-templates.md`, `js-patterns.md` | `.specs/architecture/README.md` |

## Design Doc Index

| Doc | Covers |
|-----|--------|
| `colors.md` | Color palette, CSS variables, WCAG contrast |
| `typography.md` | Font family, hierarchy, line height, responsive scale |
| `layouts.md` | Page wireframes: home, products, profiles, services, breakpoints |
| `components.md` | Reusable UI: buttons, cards, navigation, footer, dark mode checklist |
| `ui-upgrade.md` | Animations, hero overlays, micro-interactions, stagger patterns, reduced motion |
| `graphics.md` | 4 illustration styles, prompt templates, image resize/optimization, alt text rules |
| `brand-perception.md` | Brand personality, tone, voice, language rules |
| `architecture.md` | Site structure, URL conventions, collection schemas |
| `css-architecture.md` | CSS module file structure, variable conventions, theme switching |
| `html-templates.md` | HTML template patterns, Liquid includes |
| `js-patterns.md` | JavaScript patterns, event handling, dark mode toggle |
| `naming.md` | File naming conventions, CSS class naming, frontmatter schemas |
| `testing-architecture.md` | Test stack rationale, patterns, anti-patterns |
| `deployment.md` | Deployment architecture, build pipeline, GitHub Pages constraints |

## Technical Requirements
- **Hosting:** GitHub Pages
- **Booking:** Microsoft Bookings
- **Analytics:** Clicky
- **CMS:** Jekyll (static)
- **Language:** Norwegian Bokmal

## Conversion Flow
1. **Primary:** Order Ledelse 60:2 directly -> select implementation date -> confirmation
2. **Secondary:** Download lead magnet / Contact / Newsletter
