# Frame Pages — Bolman & Deal Perspectives

> Status: Active
> Applies to: `_pages/*.md` with `class: frame`

## Purpose

Each frame page implements one of Bolman & Deal's four leadership perspectives as a standalone Norwegian SEO article. The pages present the perspective's theory, its main elements, how it shows up in a leadership team, and how it maps to the Ledelse 60:2 methodology. They are part of the perspektiv (frames) content cluster described in `.specs/perspektiv/README.md`.

## Page Registry

| Page | Permalink | Perspective | `frame_id` | `weight` |
|------|-----------|-------------|------------|----------|
| `_pages/struktur.md` | `/struktur/` | Strukturperspektivet (Structural) | `struktur` | 1 |
| `_pages/mennesker.md` | `/mennesker/` | Menneskeperspektivet (Human Resource) | `mennesker` | 2 |
| `_pages/påvirkning.md` | `/påvirkning/` | Påvirkningsperspektivet (Political) | `påvirkning` | 3 |
| `_pages/identitet.md` | `/identitet/` | Identitetsperspektivet (Symbolic) | `identitet` | 4 |

## Architecture

Frame pages are ordinary pages in the unified `_pages/` collection. They use `layout: article` — there is no dedicated perspektiv layout, and no `_frames/` collection. The page body is authored directly in markdown; the frontmatter drives hero, structured data, sidebar questions, and card grids.

## Frontmatter Contract

### Required

| Key | Description |
|-----|-------------|
| `class: frame` | Declares the page type for queries (`site.pages \| where: "class", "frame"`) |
| `layout: article` | Renders via `_layouts/article.html` |
| `permalink` | `/struktur/` style, trailing slash, matches the frame |
| `frame_id` | Lowercase slug equal to the permalink segment and the filename |
| `category: "frame"` | Cohort grouping for card grids |
| `title` | SEO title (Norwegian Bokmål) |
| `description` | SEO description (Norwegian Bokmål) |
| `banner` | Hero banner image, `assets/images/banners/perspektiv-{id}.webp` |
| `url` | Absolute page path (matches `permalink`) |
| `og_image` | Social preview crop, `assets/images/banners/{id}-og.webp` (1200×630) |
| `hero` | Map with `image` (banner path), `alt`, `title`, `intro` |
| `json_ld` | List of Article entries (see JSON-LD below) |

### Optional (but used by all four pages)

| Key | Description |
|-----|-------------|
| `color_accent` | Per-frame accent color; feeds `--perspektiv-accent` theming and card accents |
| `card_description` | Short text for frame cards on homepage/`/emne/` topic pages |
| `detail` | Rich text shown in expanded frame cards (may contain `<strong>` citations) |
| `weight` | Sort order for card grids (1–4) |
| `topic` | Lowercase topic key for filtering (e.g. `strukturperspektivet`) |
| `grc_description` | GRC-relevant description rendered in `_includes/grc-perspective-cards.html` on the `/grc/` page |
| `questions_title` | Heading for the sidebar LLM question block |
| `questions` | List of diagnostic questions rendered in the article sidebar |

## JSON-LD

Frame pages MUST include `Article` structured data as a list entry, authored by No Excuse AS:

```yaml
json_ld:
  - type: "Article"
    name: "Strukturperspektivet i ledelse"
    description: "SEO description"
    author:
      type: "Organization"
      name: "No Excuse AS"
    about:
      - type: "Thing"
        name: "Ledelse 60:2"
      - type: "Thing"
        name: "Strukturperspektivet"
      # + perspective-specific "about" entries
```

## Rendering

- `_layouts/article.html` loads `assets/css/perspektiv-styles.css` whenever `page.frame_id` is set, and renders the hero via `_includes/hero.html` from the `hero` map.
- The `questions_title` + `questions` block renders in the article sidebar via `_includes/questions.html`.
- Frame cards on the homepage and topic pages render all `class: frame` pages sorted by `weight` (`_includes/frame-cards.html`, `_includes/frame-benefit-cards.html`), using `banner`, `card_description`, `color_accent`, `detail`, `topic`.
- `grc_description` is consumed by `_includes/grc-perspective-cards.html` on the GRC page.

## Content Structure

Body content is authored directly in each page file. Standard sections:

1. **Intro** — `## Hva er {perspektiv}perspektivet?` — 1–2 paragraphs defining the perspective in plain language.
2. **Main elements** — `## De N hovedelementene` — one `###` subsection per element, each preceded by a spot illustration and followed by two bolded evidence lines:
   - `**Tegn på god ...:**` (positive indicators)
   - `**Tegn på ...-problemer:**` (negative indicators)
3. **Challenges** — typical failure patterns and what they cost a leadership team.
4. **Vitenskapelig grunnlag** — theoretical foundation (Bolman & Deal plus perspective-specific sources).
5. **CTA** — closing call-to-action toward Ledelse 60:2 / booking.

The H2 heading text and element count vary per page (`struktur` = 3 elements, `mennesker` = 4); the pattern, not the count, is normative.

## Image Conventions

- Hero/banner: `assets/images/banners/perspektiv-{id}.webp` (16:9, no embedded text)
- OG image: `assets/images/banners/{id}-og.webp` (1200×630)
- In-body spot illustrations: `assets/images/banners/spot-{id}-{element}.webp` (e.g. `spot-struktur-roller.webp`)
- Alt text: descriptive Norwegian Bokmål, per `.specs/accessibility/README.md`

## Cross-References

- `.specs/architecture/README.md` — `class: frame` core schema and site structure (its YAML example predates the current body-driven structure; this file is authoritative for frame pages)
- `.specs/perspektiv/README.md` — perspektiv cluster / no-scoring backing
- `.specs/product-card-frontmatter/README.md` — product card data source (frames link to Ledelse 60:2)
- `.design/graphics.md` — image generation guidance