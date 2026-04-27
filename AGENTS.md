# Project Documentation

This file documents the architecture, patterns, and rules for the `noexcuse.no` website.

---

## Rules Structure

Rules are organized in `.opencode/rules/` for modular reusability.
Reference individual rule files via `opencode.json` instructions field.

| Category | Rules File |
|----------|------------|
| Architecture | `.opencode/rules/architecture/rules.md` |
| Naming | `.opencode/rules/naming/rules.md` |
| Frontmatter | `.opencode/rules/frontmatter/rules.md` |
| CSS | `.opencode/rules/css/rules.md` |
| JavaScript | `.opencode/rules/js/rules.md` |
| HTML | `.opencode/rules/html/rules.md` |
| Accessibility | `.opencode/rules/accessibility/rules.md` |
| Privacy | `.opencode/rules/privacy/rules.md` |
| Linting | `.opencode/rules/linting/rules.md` |
| Task Management | `.opencode/rules/task-management/rules.md` |

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
3. **Public repository**: No embarrassing or confidential information

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

## Task Management

### Files

- `VERSION` - Semver version (e.g., `1.0.0`)
- `BACKLOG.md` - Task tracking and prioritization
- `CHANGELOG.md` - Version history

### Rules

1. **On task initiation**: Read `BACKLOG.md`, `CHANGELOG.md`, `VERSION`
2. **On task completion**: Update:
   - `BACKLOG.md` - Move task to completed
   - `CHANGELOG.md` - Add entry under "[Unreleased]"
3. **Branch creation**: Before making any code modifications:
   - Create a new git branch for changes: `git checkout -b feature/description`
   - Make all changes within this branch
   - Do NOT commit directly to main branch

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