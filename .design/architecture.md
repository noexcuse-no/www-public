# Architecture — No Excuse AS Website

## Site Structure

```
www-public/
├── _pages/              # Standalone content pages
├── _layouts/            # Page templates (default, perspektiv, tag)
├── _includes/           # Reusable HTML partials (hero, card, header, footer, profiles, styles, scripts, metadata)
├── _products/           # Product frontmatter data
├── _profiles/           # Team member profiles
├── _topics/             # Topic content — frames, benefits, process steps (output: false)
├── _tags/               # Tag landing pages (one per tag, output: page)
├── _data/               # Site-wide data (metadata.yml)
├── assets/
│   ├── css/             # Modular stylesheets
│   │   └── components/  # Component-specific CSS (hero.css, card.css)
│   ├── images/          # Graphics (spot illustrations, banners, heroes)
│   └── scripts/         # JavaScript (vanilla, no frameworks)
├── .specs/              # Functional specifications
├── .design/             # Design documentation
└── tests/               # Test files
```

## Collections

| Directory | Purpose | Output |
|-----------|---------|--------|
| `_pages/` | Content pages (ledelse-60-2, om-oss, frame articles, etc.) | Static HTML at `/:permalink/` |
| `_products/` | Product frontmatter data (used by includes) | None (data only) |
| `_profiles/` | Team member profiles | Static HTML at `/profiles/:name/` |
| `_topics/` | Topic cards — frames (4), benefits (4), process steps (3) | None (data only) |
| `_tags/` | Tag landing pages | Static HTML at `/emne/:tag/` |

### `_topics/` — Unified topic collection

Replaced the old `_frames/` collection. Each topic has a `category` field (`frame`, `benefit`, or `step`). Steps also carry a `step_number` (1–3) for ordering.

Used by `_includes/card.html` via `site.topics | where: "category", "<type>"` filtering and by `_layouts/perspektiv.html` for hero data.

### `_tags/` — Tag index pages

Created for the emne (topic/tag) landing system. Each file in `_tags/` generates a page at `/emne/:tag/` listing all articles with that tag.

## Pages

| URL | File | Layout | Purpose |
|-----|------|--------|---------|
| `/` | `index.md` | default | Frontpage |
| `/ledelse-60-2/` | `_pages/ledelse_60-2.md` | default | Product landing |
| `/om-oss/` | `_pages/om_oss.md` | default | About us |
| `/om-metode/` | `_pages/om_metode.md` | default | Method overview with frame/benefit/step cards |
| `/perspektiv/` | `_pages/ledelse_perspektiv.md` | perspektiv | Scientific background |
| `/triader/` | `_pages/ledelse_triader.md` | perspektiv | Triads concept article |
| `/struktur/` | `_pages/struktur.md` | perspektiv | Frame: Structure |
| `/mennesker/` | `_pages/mennesker.md` | perspektiv | Frame: People |
| `/identitet/` | `_pages/identitet.md` | perspektiv | Frame: Identity |
| `/pavirkning/` | `_pages/pavirkning.md` | perspektiv | Frame: Influence |
| `/forankring/` | `_pages/ledelse_forankring.md` | perspektiv | Benefit: Anchoring |
| `/tillit/` | `_pages/ledelse_tillit.md` | perspektiv | Benefit: Trust |
| `/makt/` | `_pages/ledelse_makt.md` | perspektiv | Benefit: Control/Power |
| `/generativ-ki/` | `_pages/ledelse_generativ-ki.md` | perspektiv | Benefit: Generative AI |
| `/usikkerhet/` | `_pages/ledelse_usikkerhet.md` | perspektiv | Benefit: Uncertainty |
| `/emne/:tag/` | `_tags/:tag.md` | tag | Tag landing page |

## URL Conventions

| Pattern | Example |
|---------|---------|
| Pages: `/:permalink/` | `/ledelse-60-2/`, `/struktur/` |
| Products: `/produkt/:name/` | `/produkt/ledelse-60-2/` |
| Profiles: `/profiler/:name/` | `/profiler/dagfinn/` |
| Tags: `/emne/:tag/` | `/emne/tillit/` |

## Layouts

| Layout | Use For | Key Features |
|--------|---------|--------------|
| `default` | Standard pages | Header, navbar, profiles, products, footer sections |
| `perspektiv` | Frame/benefit articles | Hero from topic data, article content, question sections, CTA |
| `tag` | Tag landing pages | Tag cloud, filtered article list |

The `perspektiv` layout sources its hero from `page.topic_hero` frontmatter referencing `site.topics`, and wraps content in `.perspektiv-section` / `.perspektiv-element` classes for article styling.

## CSS Architecture

See `.design/css-architecture.md` for the full breakdown. Key patterns:

- **Component CSS** in `assets/css/components/` — `hero.css`, `card.css`
- **Theme via variables** — `--*-light` / `--*-dark` pairs in `colors.css`, no component re-selection
- **Zero hardcoded colors** — all visual color values use `var(--variable)` from `colors.css`

## Includes

| Include | Purpose | Source Pattern |
|---------|---------|----------------|
| `hero.html` | Page hero with image, title, breadcrumb | Dual-source: page frontmatter OR include params |
| `card.html` | Topic card with image, title, description | Iterates `site.topics` with `include.category` filter |
| `header.html` | Site header with logo + navbar | — |
| `profiles.html` | Team profile cards | Iterates `site.profiles` |
| `styles.html` | CSS link tags | Lists all stylesheets including `components/` |
| `scripts.html` | JavaScript includes | — |
| `metadata.html` | SEO meta tags | Reads `_data/metadata.yml` |

## JavaScript

Vanilla JS only, no frameworks:
- `dark-mode-toggle.js` — Theme switching via `[data-theme="dark"]` attribute
- `profile-card.js` — Profile expansion modal
- `animations.js` — Scroll-triggered animations (Intersection Observer)

## Navigation

- Header banner with logo and navbar
- Links to main pages (Ledelse 60:2, Om oss, Metode)
- Dark mode toggle in header
- Frame/benefit articles linked from method page and cross-references

## Build & Deploy

- **Build:** GitHub Pages (automatic Jekyll build)
- **Host:** noexcuse.no
- **CMS:** Jekyll (static site generator)
