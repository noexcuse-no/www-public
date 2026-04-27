# Linting and Testing

## Available Commands

```bash
npm run lint        # All linters + tests
npm run lint:html   # HTML validation
npm run lint:css   # CSS linting
npm run lint:js   # JS linting
npm test           # Unit tests (Vitest)
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