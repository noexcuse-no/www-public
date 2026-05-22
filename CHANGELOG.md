# CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Vitenskapelig grunnlag page for Ledelse 60:2 with 3 parts: theoretical foundation (Bolman & Deal four frames), research-in-practice loop (FEK/NESH ethics compliance), and founder backgrounds
- Link from Ledelse 60:2 product page to the vitenskapelig grunnlag page
- `{{ content }}` support in default layout for content pages
- Surface citations: FEK generelle retningslinjer (2014), NESH retningslinjer (2021), Forskningsetikkloven (2017), Norwegian edition of Bolman & Deal (2024)
- Bibliography briefs for 5 key sources underlying Ledelse 60:2 methodology
  - Enhanced brief: Bolman & Deal — Reframing Organizations (chapter-level breakdown)
  - Brief: Pfeffer — Power (political frame playbook)
  - Brief: Blanchard & Barrett — Lead with LUV (servant leadership / HR frame)
  - Brief: Logan et al. — Tribal Leadership (culture stages / symbolic frame)
  - Brief: Hubbard — How to Measure Anything (measurement methodology)
  - Synthesis document crossing all sources with lookup vectors for AI/LLM use
- Full text extraction pipeline for .epub sources (stdlib Python, no external deps)
- Ledelse 60:2 product page redesign plan with structured content architecture
- Planned graphics generation via GPT Image 2 (hero + 7 line-art icons)
- Planned structured frontmatter fields for products (benefits, process steps, story)
- Brand design specifications (.design/ folder)
- Design specification document (SPEC.md)
- Color palette documentation (colors.md)
- Typography guidelines (typography.md)
- Page layouts and wireframes (layouts.md)
- Reusable components library (components.md)
- Brand perception and tone guide (brand-perception.md)
- Linting infrastructure: HTMLHint, Stylelint, ESLint
- Test infrastructure: Vitest with happy-dom
- Test files for dark-mode-toggle and profile-card
- AGENTS.md project documentation
- opencode.md agent rules structure

### Changed

- products.html template — planned rich section-based rendering (hero, benefits, process, story, CTA)
- products.css — planned rewrite with hero layout, benefit grid, step-flow, booking link

### Fixed

- Added alt attribute to logo image in header.html (accessibility)

### Removed

## [1.0.0] - YYYY-MM-DD

### Added

- Initial website structure for No Excuse AS
- Jekyll collections: profiles, products, cases, partners
- Modular CSS architecture with light/dark theme support
- Reusable HTML includes