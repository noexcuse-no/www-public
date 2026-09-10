---
description: Commands and tools for linting and testing — prohibited patterns in .design/html-templates.md
globs: ["**/*.js", "**/*.css", "**/*.html", "tests/*"]
---

# Linting & Testing

## Commands

| Command | Purpose |
|---------|---------|
| `npm run lint` | All linters + tests |
| `npm run lint:html` | HTML validation |
| `npm run lint:css` | CSS linting |
| `npm run lint:js` | JavaScript linting |
| `npm test` | Unit tests (Vitest) |
| `npm run test:secrets` | Secret-scanner smoke test (install + clean scan + redaction) |
| `npm run sanitize:media` | Image metadata hygiene check — flags GPS, serial, comments, creator (exiftool) |
| `npm run inspect:docs` | PDF document-info check — flags author, creator, producer, internal filenames |
| `npm run audit:deps` | Dependency audit — npm audit + outdated + slopsquat detection |
| `npm run check:supply-chain` | Supply-chain static analysis — eslint + semgrep (if available) + dangerous pattern scan |
| `npm run audit:site` | Post-build publication audit — scans `_site/` for internal material, local paths, secrets |
| `npm run check:stale` | Stale-reference integrity check — scans active docs for references to deleted/archived paths |
| `npm run check:docs` | Document structure validation — flags archived/superseded/obsolete/done docs in active locations |

## Tools

| Tool | Purpose |
|------|---------|
| `htmlhint` | HTML validation |
| `stylelint` | CSS linting |
| `eslint` | JavaScript linting |
| `vitest` | Unit tests |

## Prohibited Patterns

See `.design/html-templates.md` — no inline styles, no inline event handlers, no embedded `<script>` tags.

## Testing

When adding or modifying JavaScript: create corresponding unit tests in `tests/` directory, follow existing test patterns, run `npm test` before marking task complete.
