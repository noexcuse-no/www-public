# Deployment Architecture — No Excuse AS Website

## Architecture

```
Git push (main) → GitHub Pages (Jekyll build) → noexcuse.no
```

Jekyll generates a static site from Markdown/Liquid sources on each push. GitHub Pages serves the compiled output directly — no intermediate build server, no CI/CD pipeline.

## Domain

- **Domain:** noexcuse.no
- **Mechanism:** `CNAME` file at project root with `noexcuse.no`
- **HTTPS:** Auto-provisioned by GitHub Pages (Let's Encrypt)
- **DNS:** CNAME record from noexcuse.no → `<org>.github.io`

## Build Pipeline

| Trigger | Action | Duration | Output |
|---------|--------|----------|--------|
| Push to `main` | Auto-build by GitHub Pages | ~50s | Static HTML |
| No other triggers | — | — | — |

There is no GitHub Actions workflow, no manual build step, and no CI/CD configuration. The pipeline is entirely managed by GitHub Pages' built-in Jekyll builder.

## Constraints

- GitHub Pages runs Jekyll with `--safe`, which **blocks custom plugins**
- Only whitelisted plugins are allowed: `jekyll-feed`, `jekyll-sitemap`, `jekyll-seo-tag`, `jekyll-paginate`, etc.
- No dynamic content — everything is pre-rendered at build time
- No server-side processing, no database, no API endpoints
- Build log available at: GitHub repo → Settings → Pages

## Current Setup

| Property | Value |
|----------|-------|
| Gemfile | None |
| GitHub Actions | None |
| Plugins | None |
| Collections | 6 (`profiles`, `products`, `cases`, `partners`, `pages`, `frames`) |
| Build time | ~50s |
| Source | Markdown frontmatter + Liquid templates |
| Output | Static HTML in `_site/` (ephemeral, not committed) |

## References

- [GitHub Pages documentation](https://docs.github.com/en/pages)
- [Jekyll on GitHub Pages](https://jekyllrb.com/docs/github-pages/)
- [GitHub Pages Jekyll plugin list](https://pages.github.com/versions/)
