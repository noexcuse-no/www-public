# Feature: Social Media & Chat Preview Optimization

> **Status:** Done for R1–R4; R6 done via S2 (top 10 articles + homepage + 3 step pages + profile). R5 (title suffix) evaluated and not adopted. BL: S1, S2 (completed; records in CHANGELOG).

## Problem

Every page on noexcuse.no shares the same generic OG image when shared on social media, in chat apps, and in search results. Article shares show the company logo instead of the article's hero image, reducing click-through rates and making links harder to identify in chat threads.

## Scope

Ensure that every URL on noexcuse.no generates correct, platform-optimized previews for:

- **Social media:** Facebook, LinkedIn, X/Twitter
- **Chat apps:** Slack, Discord, Telegram, Signal, WhatsApp, iMessage
- **Search:** Google rich snippets via JSON-LD + meta description

## Requirements

### R1 — Per-page OG image (P0)

`_includes/metadata.html` MUST use a fallback chain for `og:image` and `twitter:image`:

```
page.hero.image → page.banner → page.image → site.data.metadata.og_image
```

Each fallback value MUST be converted to an absolute URL (prepend `site.url` + `relative_url`).

### R2 — Fix broken OG image reference (P0)

`_data/metadata.yml` references `og-image.png` — this file does not exist. ONLY `og-image.webp` exists. Change the reference to `.webp`.

### R3 — Add `url` to Jekyll config (P0)

`_config.yml` MUST define `url: "https://noexcuse.no"` for generating absolute OG image URLs. (Currently missing — only `relative_url` filter exists, which cannot produce absolute URLs.)

### R4 — Image dimensions (P1)

Add `og:image:width="1200"` and `og:image:height="630"` meta tags after `og:image`.

### R5 — Title suffix (P1)

Optionally append ` — No Excuse AS` to `og:title` and `twitter:title` for context in chat previews. Evaluate whether this makes titles too long (>60 chars in some cases).

### R6 — OG image crops (P2)

Generate dedicated 1200×630 OG image variants for:
- Homepage (hero-intro section or site image)
- Top 5–10 article pages (crop hero images to 1.91:1)
- 3 step pages (crop banner images to 1.91:1)
- Profile page (crop dagfinn.webp to 1.91:1 — landscape crop from portrait)

## Implementation Order

1. `_config.yml`: Add `url: "https://noexcuse.no"`
2. `_data/metadata.yml`: Change `og-image.png` → `og-image.webp`
3. `_includes/metadata.html`: Add fallback chain for `og:image` + `twitter:image`
4. `_includes/metadata.html`: Add `og:image:width` + `og:image:height`
5. Build verification: share a half-dozen pages in Slack/Discord to test
6. Image generation: create per-page OG crops (design task)

## Dependencies

- None — all changes are in `_includes/metadata.html`, `_data/metadata.yml`, and `_config.yml`
- No CSS, no JS, no layout changes
- No new includes needed

## Acceptance Criteria

- [ ] Sharing any article page in Slack/Discord shows the article's hero image as preview
- [ ] Sharing the homepage shows site OG image
- [ ] Sharing a step page shows the page's banner image or falls back to site OG image
- [ ] Sharing the profile page shows the profile image (or site OG image as fallback)
- [ ] `og:image:width` and `og:image:height` are present in page source
- [ ] `_data/metadata.yml` references `.webp` not `.png`
- [ ] All OG/Twitter image URLs are absolute (`https://noexcuse.no/...`)
- [ ] Jekyll build exit 0
- [ ] No new HTML validation errors

## Rejected alternatives

- **Server-side dynamic OG image generation** (e.g., Vercel OG, Puppeteer) — Overkill for a static Jekyll site. Hero images already exist and look good.
- **Manual `og:image` per page** — Would require adding frontmatter to every page. The fallback chain auto-derives from existing frontmatter.
