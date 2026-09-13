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
| `npm run scan:sensitivity` | Full-tree sensitivity scan (commercial/internal wording, PII, credentials, temp filenames) |
| `npm run scan:sensitivity:changed` | Sensitivity scan of changed content (base `origin/main`, fallback `HEAD~1`) |
| `npm run scan:secrets` | Gitleaks scan of changed content (`--redact`, base `origin/main`, fallback `HEAD~1`) |
| `npm run scan:secrets:history` | Gitleaks full-history audit (`git --log-opts=--all`, `--redact`) |
| `npm test` | Unit tests (Vitest) |
| `npm run test:secrets` | Secret-scanner smoke test (install + clean scan + redaction) |
| `npm run sanitize:media` | Image metadata hygiene check — flags GPS, serial, comments, creator (exiftool) |
| `npm run inspect:docs` | PDF document-info check — flags author, creator, producer, internal filenames |
| `npm run audit:deps` | Dependency audit — npm audit + outdated + slopsquat detection |
| `npm run check:supply-chain` | Supply-chain static analysis — eslint + semgrep (if available) + dangerous pattern scan |
| `npm run audit:site` | Post-build publication audit — scans `_site/` for internal material, local paths, secrets |
| `npm run check:stale` | Stale-reference integrity check — scans active docs for references to deleted/archived paths |
| `npm run check:docs` | Document structure validation — flags archived/superseded/obsolete/done docs in active locations |
| `npm run check:consistency` | Transparency consistency validation — checks site-level vs per-resource AI/rights assertions |
| `npm run ci` | Local CI runner — runs all checks sequentially (lint, test, scans, audits, integrity checks) |

## Tools

| Tool | Purpose |
|------|---------|
| `htmlhint` | HTML validation |
| `stylelint` | CSS linting |
| `eslint` | JavaScript linting |
| `vitest` | Unit tests |
| `gitleaks` (pinned v8.30.1) | Secret scanning — run via `npm run scan:secrets` / `npm run scan:secrets:history` |
| `exiftool` (Perl Image::ExifTool) | Media/PDF metadata inspection and sanitisation |
| `semgrep` (optional) | Static analysis security rules (install via `pipx`/`brew`) |

## Secret scanning

- Scanner: Gitleaks **pinned v8.30.1** (release binary). Re-run `npm run test:secrets` after upgrading to confirm install + redaction still hold.
- Changed-content mode (`npm run scan:secrets`): use it in CI so new commits cannot add credential-shaped strings. Bases: `origin/main` if present, else `HEAD~1`, else full tree scan.
- History audit (`npm run scan:secrets:history`): `gitleaks git --log-opts="--all"` over the full available history. If CI does full-history scans, the checkout must be `fetch-depth: 0`.
- Output is `--redact`ed — matched values must never surface in CI logs or commit messages.
- Allowlist policy (`.gitleaks.toml`): only verified false positives, prefer `commits = [...]` scope over `fingerprints`; never allowlist real credential values. Current allowlist: commit `30375a2dfb51d4455ff420a93ce534c1249d7c2f` (synthetic test strings, verified fake) + gitignored build dirs (`node_modules`, `_site`, `.git`, `.jekyll-cache`, `.playwright-mcp`).

## Prohibited Patterns

See `.design/html-templates.md` — no inline styles, no inline event handlers, no embedded `<script>` tags.

## Testing

When adding or modifying JavaScript: create corresponding unit tests in `tests/` directory, follow existing test patterns, run `npm test` before marking task complete.
