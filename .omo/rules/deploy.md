---
description: Deploy checks for GitHub Pages
globs: ["_config.yml", "Gemfile", "CNAME", ".github/**/*"]
---

# Deploy Rules

## Pre-Build Checks

- Run `npm run lint` before committing — fix all errors
- Verify `{% include %}` references resolve: every include must exist in `_includes/`
- Check for Liquid syntax errors in modified `.html`/`.md` files — unclosed `{%` or `{{` will fail the build
- Run `npm test` if test files were modified

## Pre-Deploy Checks

- `CNAME` must exist at project root with domain `noexcuse.no`
- New collections must be registered in `_config.yml` under `collections:` AND have a matching `defaults:` entry
- Collection defaults must set `layout:` and `lang: no`

## Deployment

- GitHub Pages builds automatically on push to `main` — no manual build step
- Verify deployment by visiting https://noexcuse.no after push
- Build takes ~50s — check GitHub Pages settings for status

## Troubleshooting

- If site doesn't update, check **GitHub repo → Settings → Pages → Build log**
- Common build failures:
  - Unclosed Liquid tags (`{%` without `%}`, `{{` without `}}`)
  - Missing `_includes/` file referenced in a template
  - Frontmatter YAML errors (indentation, missing `---`)
  - Invalid `_config.yml` syntax
  - Referenced layout that doesn't exist in `_layouts/`
