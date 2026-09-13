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

## Static Assets

### AI-generated Content Disclosure

The site implements a six-layer AI content provenance system:

| Layer | File | Purpose |
|-------|------|---------|
| JSON-LD @graph (per-page + per-image) | `_includes/provenance-jsonld.html` | Per-page `digitalSourceType` + per-image `ImageObject` entries in `<head>`; non-AI images excluded via `_data/image-provenance.yml` exclude-list |
| Image IPTC/XMP bytes | `scripts/apply-provenance.sh` | IPTC/XMP metadata on all WebP images (run after image generation), skipping non-AI images in the exclude-list |
| Transparency manifest | `/.well-known/ai-transparency.json` | Per-route AI scope manifest at standard `.well-known` path; editorial review status + regulatory contact |
| EU basic icon visible disclosure | `_includes/header.html` + `_includes/eu-ai-icon.html` | EU AI Act basic icon beside the banner, linking to the editorial-responsibility page. Banner only — NO image badges |
| Editorial-responsibility page | `_pages/om-store-sprakmodeller.md` | "Om KI" page documenting limited-use stance, editorial review, EU AI Act Art. 50(4) exception |
| Per-image machine-readable RDFa | `assets/scripts/ai-provenance-injector.js` | Runtime RDFa injection of `schema:digitalSourceType` on content `<img>` elements (no visible badges) |

These files are static and served directly by GitHub Pages — no server-side processing required.

### Image Generation & Metadata Pipeline

1. Generate images via EvoLink GPT Image 2 (1024×1024 PNG)
2. Convert to WebP at tier-specific resolutions via sharp/PIL
3. **Run provenance script**: `bash scripts/apply-provenance.sh` (idempotent — safe to run multiple times)
4. Commit and push

### Post-Merge Cleanup

After each PR merge, delete the feature branch both locally and on remote:

```bash
git branch -d feature/branch-name
git push origin --delete feature/branch-name
```

## References

- [GitHub Pages documentation](https://docs.github.com/en/pages)
- [Jekyll on GitHub Pages](https://jekyllrb.com/docs/github-pages/)
- [GitHub Pages Jekyll plugin list](https://pages.github.com/versions/)
