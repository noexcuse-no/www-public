# Social Media & Chat Preview Optimization

> **Status:** Draft — needs spec implementation | BL: S1

## Purpose

Ensure every page on noexcuse.no generates correct, platform-optimized previews when shared on social media (Facebook, LinkedIn, X/Twitter), in chat apps (Slack, Discord, Telegram, Signal, WhatsApp, iMessage), and in web search results.

## Current State

| Component | Status | Problem |
|---|---|---|
| `_includes/metadata.html` | Exists with OG + Twitter tags | All use site-level defaults — no per-page variation |
| `og:image` | Single image (`og-image.webp`, 1200×622) | Same image for every page — article shares show generic logo |
| `og:title` | `page.title` | No site suffix — reads as "Om metodikk" instead of "Om metodikk — No Excuse AS" |
| `og:description` | `page.description` fallback chain | Correct logic but depends on pages having good descriptions |
| `og:type` | `page.json_ld[0].type` fallback | Dynamic ✓ — Article/TechArticle/Service correctly set |
| `twitter:card` | `summary_large_image` | Correct value ✓ |
| `og:image:width/height` | Missing | Platforms can't reserve space → layout shifts in feed |
| `og:image.png` reference | Broken | `metadata.yml` references `.png` file that doesn't exist — only `.webp` exists |
| Per-page hero images | 16 pages with `hero.image` | Available but not used as OG image |
| Step page banners | 3 step pages with `banner` frontmatter | Available but not used as OG image |
| JSON-LD structured data | 15 pages with Article/TechArticle/Service | Missing WebPage for pages without article-type JSON-LD |

## Per-Platform Requirements

### Facebook / LinkedIn
- **Image:** 1200×630px (1.91:1 ratio), ≤8MB, JPEG or WebP
- Uses `og:title`, `og:description`, `og:image`
- LinkedIn also reads `article:author` and `article:published_time` from OG
- `og:locale: nb_NO` ✓ already set

### X / Twitter
- `twitter:card: summary_large_image` ✓ — shows large image preview
- Uses `twitter:title`, `twitter:description`, `twitter:image` — currently all site defaults
- Images render at ~1200×600 in timeline (2:1)

### Slack
- **Image:** ≥400×400px minimum; prefers 1200×630
- Fetches OG tags via Slack crawler (cache-clearing requires `?t=` parameter)
- Shows `og:title`, `og:description`, `og:image`
- Falls back to first `<img>` tag in page if OG missing

### Discord
- Uses Open Graph protocol (same tags as Facebook)
- Image minimum: 256×256px
- Shows large image with `summary_large_image` or when image ≥300px wide
- Caches aggressively — uses `?v=` for cache busting

### Telegram / Signal / WhatsApp
- All use Open Graph protocol (`og:title`, `og:description`, `og:image`)
- Image minimum: 256×256px (Telegram), 300×300px (WhatsApp)
- Telegram favors square-ish images but accepts 1.91:1

### iMessage / SMS
- iOS uses Open Graph (Safari's Link Presentation)
- Image: prefers 1200×630
- Shows fallback to page title + URL if OG missing

### Google Search (Rich Snippets)
- Uses JSON-LD structured data primarily
- Meta description shown in search results (length: 150–160 characters ✓ already truncated)
- Title tag shown as blue link header
- Article schema enables headline + image in rich results
- Organization schema enables site name in search results

## Per-Page Image Strategy

Build a fallback chain for `og:image` in `_includes/metadata.html`:

```
page.hero.image → page.banner → page.image → site.data.metadata.og_image
```

### Coverage analysis

| Page type | Pages | Has hero.image | Has banner | Has image | Fallback |
|---|---|---|---|---|---|
| Article pages (identitet, struktur, etc.) | 4 frames | ✅ | — | — | hero.image |
| Article pages (tillit, makt, etc.) | 8 articles | ✅ | — | — | hero.image |
| Article pages (grc, om_metode) | 2 | ✅ | — | — | hero.image |
| Product page (ledelse-60-2) | 1 | ✅ | — | ✅ (same) | hero.image |
| Step pages (samtale, intervju, rapport) | 3 | ❌ | ✅ | — | page.banner |
| Profile page (dagfinn) | 1 | ❌ | — | ✅ | page.image |
| Emneoversikt | 1 | simple:true | — | — | Site default |
| Homepage | 1 | ❌ | — | — | Site default |
| Om Oss | 1 | ✅ | — | — | hero.image |
| Om Metode | 1 | ✅ | — | — | hero.image |
| Frame pages (struktur, mennesker, etc.) | 4 | ✅ | — | — | hero.image |

**Result:** 17/23 pages would get a unique OG image from existing frontmatter. 6 would use the site default (homepage, emneoversikt, 3 step pages, and anything else without hero).

## Image Generation Requirements

### Default OG image (`og-image.webp`)
- **Current:** 1200×622 — needs to be 1200×630 (1.91:1)
- **Content:** Company name + tagline + Nordic landscape background (existing design)
- **Used as fallback** for pages without hero/banner/image

### Per-page OG images (future)
- For high-traffic pages (homepage, top articles), generate dedicated 1200×630 variants from hero images
- Hero images are already 1920px wide (T1 hero size) — they have sufficient resolution for cropping to 1200×630
- Crop position: center-center (hero images are already composed for full-width display)
- This is a design task, not an automation task — use the existing image generation pipeline (gpt-image-2-gen) to create social-optimized crops

## Required Code Changes

### 1. `_includes/metadata.html` — Per-page OG image fallback chain

```liquid
{% assign page_og_image = page.hero.image | default: page.banner | default: page.image | default: site.data.metadata.og_image %}
{% assign page_og_image_url = page_og_image | relative_url | prepend: site.url %}
```

Then update `og:image` and `twitter:image` to use `page_og_image_url`.

`site.url` needs to be defined in `_config.yml` as `https://noexcuse.no` for absolute URLs (required by OG protocol).

### 2. `_includes/metadata.html` — Add image dimensions

```html
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

### 3. `_includes/metadata.html` — Title suffix for clarity

```liquid
{% assign og_title = page.title | append: " — No Excuse AS" %}
```

Optional — helps context in chat previews where title alone can be ambiguous.

### 4. `_data/metadata.yml` — Fix broken reference

Change `og_image: "https://noexcuse.no/assets/images/og-image.png"` to `og_image: "https://noexcuse.no/assets/images/og-image.webp"`

### 5. `_config.yml` — Add `url` for absolute URL generation

```yaml
url: "https://noexcuse.no"
```

### 6. Generate missing OG image crops

- Homepage: hero-intro background could become OG image
- Top article pages: crop hero images to 1200×630
- Step pages: crop banner images to 1200×630 (or use site default)

## Priority

| Priority | Component | Effort | Impact |
|---|---|---|---|
| P0 | Per-page OG image fallback chain (Liquid change) | 1 file, ~10 lines | High — every shared page gets a unique preview |
| P0 | Fix metadata.yml `.png` → `.webp` | 1 line | High — broken reference on every page |
| P0 | Add `url` to `_config.yml` | 1 line | High — required for absolute OG image URLs |
| P1 | Add `og:image:width` + `og:image:height` | 2 lines | Medium — prevents layout shift in feed |
| P1 | Add title suffix " — No Excuse AS" | 1 line | Medium — context in chat previews |
| P2 | Generate per-page OG image crops | Image generation task | Medium — hero images work as-is, but optimized crops improve quality |

## Related files

- `_includes/metadata.html` — OG tag template (needs fallback chain + dimensions)
- `_data/metadata.yml` — site-level OG defaults (needs .webp fix)
- `_config.yml` — needs `url:` for absolute URLs
- `assets/images/og-image.webp` — default OG image (1200×622, needs 1200×630)
