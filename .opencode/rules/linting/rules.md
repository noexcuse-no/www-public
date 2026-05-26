# Linting and Testing

> **Activation:** Read this file if you are going to committe endringer, endre JavaScript, or endre CSS/HTML.

## Available Commands

```bash
npm run lint        # All linters + tests
npm run lint:html   # HTML validation
npm run lint:css    # CSS linting
npm run lint:js     # JS linting
npm test            # Unit tests (Vitest)
```

## Tooling

| Tool | Purpose |
|------|---------|
| `htmlhint` | HTML validation |
| `stylelint` | CSS linting |
| `eslint` | JavaScript linting |
| `vitest` | Unit tests |

## Configuration Files

| File | Purpose |
|------|---------|
| `.htmlhintrc` | HTML validation rules |
| `stylelint.config.mjs` | CSS linting config |
| `eslint.config.mjs` | JS linting config |
| `vitest.config.mjs` | Test runner config |

## Testing Rules

When adding new JavaScript:
1. Create unit tests in `tests/` directory
2. Follow existing test patterns
3. Run `npm test` before marking task complete

Test patterns use Vitest + happy-dom for DOM simulation.