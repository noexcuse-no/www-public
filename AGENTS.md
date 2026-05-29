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

## Documentation Map

Reference information — read relevant sections on demand.

- **Design docs** (`.design/*.md`): Prose — brand, visual, architecture decisions. See `.design/architecture.md` for the full conventions guide.
- **Specs** (`.specs/<feature>/README.md`): Structured requirements with purpose, scope, and acceptance criteria.
- **Architecture & naming:** `.design/architecture.md`, `.design/naming.md`
- **CSS architecture:** `.design/css-architecture.md`, `.design/colors.md`
- **Frontmatter schemas:** `.specs/architecture/README.md` (profiles, products, pages)
- **Frame pages:** `.specs/frames/README.md`
- **JavaScript patterns:** `.design/js-patterns.md`
- **HTML templates:** `.design/html-templates.md`
- **Accessibility:** `.specs/accessibility/README.md`
- **Privacy:** `.specs/privacy/README.md`
- **Brand voice:** `.design/brand-perception.md`
- **Linting & testing:** `.omo/rules/linting.md`, `.omo/rules/testing.md` (commands), `.design/testing-architecture.md` (patterns)
- **Task management:** `.omo/rules/task-management.md`
- **Cross-link map:** `.design/information-architecture.md`
- **Image generation prerequisites:** `.design/graphics.md`
- **Brand & visual decisions:** `.design/brand-perception.md`, `.design/colors.md`, `.design/graphics.md`, `.design/ui-upgrade.md`
- **Build & deployment:** `.design/deployment.md`, `.omo/rules/deploy.md`
- **Spec discipline:** `.omo/rules/spec-discipline.md`