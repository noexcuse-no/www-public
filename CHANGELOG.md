# CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

### Fixed

## [1.0.0] - YYYY-MM-DD

### Added

- Initial website structure for No Excuse AS
- Jekyll collections: profiles, products, cases, partners
- Modular CSS architecture with light/dark theme support
- Reusable HTML includes