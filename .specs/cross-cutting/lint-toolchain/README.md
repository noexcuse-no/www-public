# Lint Toolchain Repair — Fix Specification

> Created: 2026-09-13
> Status: Done

## Purpose / Problem

`npm run lint` was broken on main by dependency drift: dependabot PR #261 bumped 5 dev-dependencies within caret ranges (eslint 6→10, vitest 2→5, happy-dom 14→20, stylelint 16→17, stylelint-config-standard 36→40), and htmlhint had drifted to 1.9.2 within `^1.0.0`. Consequences:

- **eslint 10** removed `.eslintrc` support — `lint:js` could not run at all
- **htmlhint 1.9.2** reported 126 errors: `id-class-value`/`class-style` `dash` regex cannot express the site's canonical BEM `--` classes; `spec-char-escape` false-positives on Liquid comparison operators; 8 `inline-style-disabled` hits (4 static violations + 4 documented dynamic-value exceptions)
- **vitest 5** requires an undeclared `vite` peer; **eslint 10** no longer bundles `globals`

## Scope

- `package.json` — exact pins for the whole lint/test toolchain (repo convention, prevents silent minor-bump behavior drift); explicit `vite@7.3.6` + `globals@17.12.0` declarations; npm-normalized away a duplicated `scripts` block (duplicate JSON keys were last-wins — runtime behavior unchanged)
- `package-lock.json` — regenerated for the pins
- `eslint.config.js` — flat-config migration of `.eslintrc.yml` (deleted): same 8 rules, `assets/scripts/**/*.js` scope, browser+node globals
- `.htmlhintrc` — three rules disabled with rationale below
- `_layouts/article.html`, `_includes/sidebar-home.html`, `assets/css/components/sidebar.css` — 4 static inline styles converted to classes (`.noscript-note`, `.sidebar-tagline`)
- `assets/scripts/*.js` — eslint `--fix` formatting (indent 4, single quotes) per the configured rules

## Rule-disabling rationale (htmlhint)

| Rule | Why unsatisfiable | Where enforcement lives instead |
|------|-------------------|--------------------------------|
| `id-class-value`, `class-style` | BEM `--` modifiers are canonical (`.omo/rules/css-conventions.md`); htmlhint's vocabularies (`underline\|dash\|hump`) cannot express them | stylelint + css-conventions rule |
| `spec-char-escape` | The scanned set is 100% Liquid templates; `{% if x.size > 0 %}` is unavoidable (no keyword comparators in Liquid) | Liquid auto-escaping + review |
| `inline-style-disabled` | 4 remaining hits are documented dynamic-value exceptions (frontmatter-driven custom properties, SVG logo internals, pre-JS hidden state) | css-conventions dynamic-value exceptions + review |

The 4 *static* inline-style violations the rule surfaced were fixed properly, not suppressed.

## Acceptance Criteria

- [x] `npm run lint` exit 0 (htmlhint 47 files/0 errors · stylelint clean · eslint 0 errors/12 warnings · vitest 260/260)
- [x] Remaining ci:local gates green: rights:check, scan:sensitivity, scan:secrets, audit:site, check:stale, check:docs, check:consistency, sanitize:media
- [x] Docker build exit 0; `noscript-note` renders in built pages
- [x] All devDependencies exact-pinned
- [x] `.eslintrc.yml` removed; flat config equivalent

## Backlog References

- RA3
