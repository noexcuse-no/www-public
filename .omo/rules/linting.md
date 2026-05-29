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
