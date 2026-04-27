# OpenCode Agent Rules

This file defines rules and patterns for OpenCode agents working on this codebase.

---

## Project Context

- **Type**: Jekyll static site for Norwegian consulting company
- **Tech**: HTML, CSS (modular), vanilla JS, YAML, Liquid templates
- **Hosting**: GitHub Pages (automatic build on commit)
- **Language**: Norwegian (Bokmål) content, English code

---

## Mandatory Pre-Task Actions

Before starting ANY task, agents MUST:

1. **Read task files**: Read `BACKLOG.md`, `CHANGELOG.md`, and `VERSION`
2. **Understand context**: Note any in-progress or blocked tasks
3. **Check for conflicts**: Ensure task doesn't overlap with existing work
4. **Create branch**: Create a new git branch before making code changes:
   ```bash
   git checkout -b feature/description
   ```
   - All changes must be made within this branch
   - Do NOT make changes directly on main branch

---

## Task Completion Requirements

When completing ANY task, agents MUST:

1. **Run validation**:
   ```bash
   npm run lint
   npm test
   ```

2. **Update tracking**:
   - Move task in `BACKLOG.md` from "To Do" / "In Progress" to "Done"
   - Add entry to `CHANGELOG.md` under "[Unreleased]"
   - Update `VERSION` if applicable (major/minor/patch)

3. **Verify changes**: Ensure linting passes with no errors

---

## Code Patterns

### Frontmatter Schema

**Profile** (`_profiles/*.md`):
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

**Product** (`_products/*.md`):
```yaml
---
name: "Product Name"
description: "<p>HTML description...</p>"
booking_url: "https://..."
image: "assets/images/product.png"
---
```

### CSS Usage

Always use CSS custom properties from `colors.css`:
- `var(--primary-accent)`
- `var(--background-color-light)` / `var(--background-color-dark)`
- `var(--text-color-light)` / `var(--text-color-dark)`

### JavaScript

Keep scripts DOM-centric following existing patterns in:
- `assets/scripts/dark-mode-toggle.js`
- `assets/scripts/profile-card.js`

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| HTML includes | snake_case.html | `profiles.html` |
| CSS files | kebab-case.css | `dark-mode-toggle.js` |
| JavaScript | kebab-case.js | `dark-mode-toggle.js` |
| YAML files | snake_case.yml | `metadata.yml` |
| Markdown | snake_case.md | `dagfinn.md` |

---

## Accessibility Rules

Always enforce:
- `lang="no"` on `<html>` tag
- Descriptive `alt` text on all images
- Semantic HTML (`<header>`, `<main>`, `<footer>`, `<nav>`)
- Color contrast in both light and dark themes

---

## Privacy Rules

- NEVER add personal data beyond what exists in frontmatter schema
- NEVER add tracking scripts or analytics without consent placeholders
- NO confidential or embarrassing information
- Contact info only in `_data/metadata.yml`

---

## Separation of Concerns

Follow the architecture:
- **Function**: `_includes/*.html` (reusable components)
- **Layout**: `_layouts/*.html` (page templates)
- **Data**: `_data/`, `_profiles/`, `_products/`, `_cases/`

No inline styles or inline scripts - use separate files.

---

## Testing Rules

When adding new JavaScript:
1. Create unit tests in `tests/` directory
2. Follow existing test patterns
3. Run `npm test` before marking task complete

Test patterns use Vitest + happy-dom for DOM simulation.

---

## Version Bumping Guide

| Change Type | Bump | Example |
|------------|------|---------|
| Breaking change | Major | 1.0.0 → 2.0.0 |
| New feature | Minor | 1.0.0 → 1.1.0 |
| Bug fix | Patch | 1.0.0 → 1.0.1 |

Update `VERSION` file to reflect change type.

---

## Prohibited Actions

1. **Do not modify** existing configuration files without reading them first
2. **Do not skip** linting or testing
3. **Do not commit** without updating BACKLOG/CHANGELOG
4. **Do not commit** directly to main branch - always use a feature branch
5. **Do not add** external dependencies without approval
6. **Do not use** frameworks (React, Vue, etc.) - keep it vanilla