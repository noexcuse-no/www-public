# Project Documentation

This file documents the architecture, patterns, and rules for the `noexcuse.no` website.

---

## Rules Architecture

Two mechanisms deliver rules into context, designed for different purposes:

### 1. Standing Directives — `opencode.json > instructions` (always in context)

The `instructions` array in `.opencode/opencode.json` contains **plain-string directives** that are always loaded into the system prompt. They cover only what cannot be delegated to contextual rules:

- **Public repo security** (no secrets, no personal data) — catastrophic if missed, no natural Read trigger
- **Read triggers** for task management — `Read BACKLOG.md, CHANGELOG.md, VERSION` on git ops and task completion — without these, `.omo/rules/task-management.md` would never fire

Everything else (accessibility, linting, brand voice, etc.) is delegated to `.omo/rules/*.md` — fired automatically when you Read the relevant file type.

### 2. Contextual Rules — `.omo/rules/*.md` (fire on Read events)

The `rules-injector` plugin scans `.omo/rules/` (and other standard directories) for `.md` files with YAML frontmatter. When you `Read` a file, matching rules are appended as `[Rule: path]` blocks to the Read output.

Matching is controlled by frontmatter — only 4 keys are recognized:

| Key | Effect |
|-----|--------|
| `alwaysApply: true` | Rule fires on every Read |
| `globs: [...]` | Picomatch globs against file's relative path or basename |
| `paths: [...]` | Same as globs (merged) |
| `applyTo: [...]` | Same as globs (merged) |

Available rule files:

| File | Trigger | Scope |
|------|---------|-------|
| `.omo/rules/accessibility.md` | `**/*.html`, `**/*.md` | WCAG AA, Norwegian language, alt text, dark mode, touch targets |
| `.omo/rules/brand-voice.md` | `**/*.html`, `**/*.md`, `_includes/*`, `_profiles/*`, `_products/*` | Tone, style, anti-patterns for content |
| `.omo/rules/css-conventions.md` | `assets/css/*.css` | CSS variable naming, theme patterns, file organization |
| `.omo/rules/frames.md` | `_frames/*` | Frame page frontmatter, JSON-LD Article schema |
| `.omo/rules/frontmatter.md` | `_profiles/*`, `_products/*` | Profile and product frontmatter schemas |
| `.omo/rules/jekyll.md` | `_config.yml` | Jekyll collection registration, defaults, build checks |
| `.omo/rules/linting.md` | `**/*.js`, `**/*.css`, `**/*.html`, `tests/*` | Lint/test commands, tools, config, prohibited patterns |
| `.omo/rules/pages.md` | `_pages/*` | Page frontmatter, permalink, JSON-LD structured data |
| `.omo/rules/linting.md` | `**/*.js`, `**/*.css`, `**/*.html`, `tests/*` | Lint/test commands, tools, config, prohibited patterns |
| `.omo/rules/privacy.md` | `_data/*`, `_includes/*`, `_config*`, `**/*.html`, `**/*.js`, `**/*.yml` | Public repo data handling, tracking consent |
| `.omo/rules/task-management.md` | `BACKLOG.md`, `CHANGELOG.md`, `VERSION` | Branch naming, commits, PR workflow, versioning |
| `.omo/rules/rules-authoring.md` | `.omo/rules/*` | Meta-guide for writing effective rule files |

Design/architecture documents live in `.design/*.md` — loaded on demand via READ from scenarios.

### Workflow

1. Standing directives from `instructions` are always in context (system prompt)
2. When you Read a file, rules-injector appends matching `.omo/rules/*.md` content
3. Scenario-specific action mapping uses `.opencode/lookup.json`
4. Design/architecture documents live in `.design/*.md` — loaded on demand

### Lookup — `.opencode/lookup.json`

Maps action types to reads/checks/runs/updates. Reference this file directly (not via instructions) when determining what to verify for a given task type (css, js, html, commit, etc.).

## Quick Reference

### On Task Initiation

1. Read `BACKLOG.md`, `CHANGELOG.md`, `VERSION`
2. Read relevant `.design/` and `.specs/` documents
3. Check git branch with `git branch && git log --oneline -3`

### Brand Voice

- Direct, competent, Scandinavian minimal, anti-establishment
- No consultant-speak (avoid "bærekraftig", "verdiøking", "helhetlig")
- Write like a knowledgeable colleague, not a corporation

### Technical Requirements

- Language: Norwegian Bokmål (all content)
- Dark mode: Use CSS variables from `colors.css`; test both themes
- Touch targets: minimum 44×44px
- Images: No embedded text (multilingual site); use descriptive alt attributes

### State Management

- **Branch state**: git branch + commit messages
- **Task state**: BACKLOG.md (current work, blocked items)
- **Completed state**: CHANGELOG.md under "[Unreleased]"
- **Documentation**: .design/ (visual/UX), .specs/ (functional) — invariant, no branch-specific content

---

## Directory Structure

```
www-public/
├── _config.yml           # Jekyll configuration (collections defined)
├── _data/
│   └── metadata.yml     # Site-wide metadata (title, SEO, contact info)
├── _includes/          # Reusable HTML partials
│   ├── cases.html
│   ├── footer.html
│   ├── header.html
│   ├── metadata.html
│   ├── navbar.html
│   ├── podcast.html
│   ├── products.html
│   ├── profiles.html
│   ├── scripts.html
│   └── styles.html
├── _layouts/
│   └── default.html    # Main page template
├── _products/         # Product/service pages (Markdown with frontmatter)
├── _profiles/        # Team member profiles (Markdown with frontmatter)
├── assets/
│   ├── css/           # Stylsheet modules
│   ├── images/        # Images and logos
│   └── scripts/       # JavaScript files
├── index.md           # Home page content
└── tests/             # Test files
```

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| HTML includes | snake_case.html | `profiles.html` |
| YAML data files | snake_case.yml | `metadata.yml` |
| CSS modules | kebab-case.css | `dark-mode-toggle.js` |
| JavaScript files | kebab-case.js | `dark-mode-toggle.js` |
| Markdown content | snake_case.md | `dagfinn.md` |

---

## Frontmatter Schema

### Profile (`_profiles/*.md`)

```yaml
---
name: "Full Name"
image: "assets/images/profile.png"
phone: "+4799999999"
email: "name@noexcuse.no"
linkedin: "https://linkedin.com/in/..."
booking_url: "https://..."
tags: "#tag1 #tag2"
bio: "Biography text..."
---
```

### Product (`_products/*.md`)

```yaml
---
name: "Product Name"
description: "<p>HTML description...</p>"
booking_url: "https://..."
image: "assets/images/product.png"
---
```

---

## CSS Architecture

### Module Structure (13 files)

| Category | Files |
|----------|-------|
| Base | `colors.css`, `typography.css`, `layout.css` |
| Components | `profiles.css`, `products.css`, `cases.css`, `podcast.css` |
| Layout | `header.css`, `footer.css`, `navbar.css` |
| Themes | `styles-light.css`, `styles-dark.css` |
| Utilities | `utilities.css` |

### CSS Custom Properties

Defined in `colors.css`:
- Light mode: `--background-color-light`, `--text-color-light`, etc.
- Dark mode: `--background-color-dark`, `--text-color-dark`, etc.
- Accent: `--primary-accent`, `--primary-accent-contrast`

### Theme Support

Light/dark mode via CSS variable switching:
- Light theme: `styles-light.css`
- Dark theme: `styles-dark.css`
- Use `var(--property)` for all colors

---

## JavaScript Patterns

### Vanilla JS (No Frameworks)

Scripts are DOM-centric with inline event handlers:

**`dark-mode-toggle.js`**
- Toggles `dark-mode` class on body
- Controls dark stylesheet enabled state

**`profile-card.js`**
- Toggles `.profile-expanded` / `.profile-compact` visibility
- Manages `active` / `inactive` classes

---

## HTML Templates

### Include Usage

```liquid
{% include metadata.html %}
{% include styles.html %}
{% include header.html %}
{% for profile in site.profiles %}
  {% include profiles.html %}
{% endfor %}
```

### Metadata

All SEO/social meta tags in `_includes/metadata.html`, populated from `_data/metadata.yml`.

---

## Accessibility Requirements (Norway/WCAG)

1. **Language attribute**: All pages must have `lang="no"`
2. **Alt text**: All images require descriptive alt attribute
3. **Semantic HTML**: Use proper `<header>`, `<main>`, `<footer>`, `<nav>`
4. **Color contrast**: Both light and dark themes must pass WCAG AA

---

## Privacy Considerations

1. **No personal data in public**: Contact info only in `_data/metadata.yml`
2. **No tracking scripts**: Without consent placeholders
3. **Public repository**: No embarrassing or confidential information, API keys or proprietary content

---

## Linting and Testing

### Available Commands

```bash
npm run lint        # All linters + tests
npm run lint:html   # HTML validation
npm run lint:css   # CSS linting
npm run lint:js   # JS linting
npm test           # Unit tests (Vitest)
```

### Tooling

| Tool | Purpose |
|------|---------|
| `htmlhint` | HTML validation |
| `stylelint` | CSS linting |
| `eslint` | JavaScript linting |
| `vitest` | Unit tests |

### Configuration Files

| File | Purpose |
|------|---------|
| `.htmlhintrc` | HTML validation rules |
| `stylelint.config.mjs` | CSS linting config |
| `eslint.config.mjs` | JS linting config |
| `vitest.config.mjs` | Test runner config |

---

## Development Process

### Design Documents

Design specifications live in `.design/` (see `SPEC.md` for index). Before planning or implementing work, read all relevant design documents to ensure alignment. Update design documents when decisions change the visual, UX, or brand direction. Never change design documents without user confirmation for proposed changes.

### Functional Specifications

Maintain structured requirements beyond what fits in a backlog item for all features, keep a functional specification document in `.specs/<feature>/README.md`. This document should describe:
- Purpose and scope
- Requirements and acceptance criteria, including mandatory tests
- Data structures and schemas (frontmatter, collections, etc.)
- Applicable design rules, including for generative image prompting
- Dependencies and related components

Read the relevant functional spec before starting work on a feature. Update it when requirements evolve during implementation.

### Backlog Management

- **Approved tasks and features** must be written to `BACKLOG.md` under "To Do" before implementation begins.
- **Initiated tasks and features** must be written to `BACKLOG.md` under "In Progress" (a) after switching to correct git branch and (b) before editing any files implementation begins.
- **On completion**: Remove the item from `BACKLOG.md` (instead of moving to "Completed" or "Done") and add a changelog entry under "[Unreleased]". This avoids duplication between backlog and changelog.
- Keep "Completed" section empty — completed work lives only in `CHANGELOG.md`.

## Task Management

### Files

- `VERSION` - Semver version (e.g., `1.0.0`)
- `BACKLOG.md` - Task tracking and prioritization
- `CHANGELOG.md` - Version history

### Rules

1. **On task initiation**: Read `BACKLOG.md`, `CHANGELOG.md`, `VERSION`, relevant `.design/` and `.specs/` documents.
2. **Progress reporting**: Always show currently running task progress to the user using the `todowrite` tool before beginning work, and update status as tasks complete.
3. **On task completion**: Update:
   - `BACKLOG.md` - Remove the completed item (no "Completed" section)
   - `CHANGELOG.md` - Add entry under "[Unreleased]"
4. **Branch creation**: Before making any code modifications:
   - Create a new git branch for changes: `git checkout -b feature/description`
   - Make all changes within this branch
   - Do NOT commit directly to main branch
5. **Releases**: When planned work is finished for a branch:
   - Write new tests as needed, run all tests, fix any errors
   - Update documentation as necessary - never modify .spec or .design without asking user!
   - Fetch any upstream changes to main branch, fix inconsistencies, create a PR
   - If the user has specifically demanded to be asked for confirmation of a successful release, wait
   - If else, after submitting the PR do move the entry out of "[Unreleased]" in the CHANGELOG.md - it is now released


### Version Bumping

When making changes, determine version bump type:
- **Major** (X.0.0): Breaking changes
- **Minor** (1.X.0): New features
- **Patch** (1.0.X): Bug fixes

Update `VERSION` file accordingly.

---

## Build and Deployment

- **Build**: GitHub Pages (automatic on commit)
- **Source**: Jekyll static site
- **Host**: noexcuse.no

---

## Language

- Primary: Norwegian (Bokmål)
- Code: English (identifiers, comments)

## Markdown

- Footnotes use Pandoc style: `[^ref]` inline and `[^ref]: Content` at bottom of file.