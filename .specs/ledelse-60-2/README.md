# Ledelse 60:2 — Functional Specification

## Purpose and Scope

Redesign the Ledelse 60:2 product presence to drive both sales and brand authority among SMB leaders (5–50 employees). The product appears in two contexts:

1. **Inline section on the front page** — attractive, compact preview with quick CTA.
2. **Standalone landing page** at `/ledelse-60-2/` — full design guiding visitors through different tracks toward a tailored CTA.

## Requirements

### Sections (landing page)

1. **Hero** — Headline, hero illustration, primary CTA (book meeting)
2. **Fordeler (benefit grid)** — 2×2 grid of concrete benefits
3. **Prosess / Hvordan** — 3-step walkthrough of the method
4. **Kundesitater / cases** — Social proof from `_cases` collection, filtered by `product_tags`
5. **Vitenskapelig grunnlag** — Prominent link to `/vitenskapelig-grunnlag/`
6. **Avsluttende CTA** — Final booking call-to-action

### Inline front-page section

- Condensed version of the landing page (hero excerpt + benefits grid + CTA)
- Must not duplicate full content already visible on the page
- Links through to the full landing page

## Data Structures

### Product frontmatter (`_products/ledelse-60-2.md`)

```yaml
---
name: "Ledelse 60:2"
short_description: "En tidseffektiv modenhetsanalyse for ledergruppen"
benefits:
  - title: "Få kontroll uten byråkrati"
    description: "Styrk den tillitsbaserte ledelsen fremfor rutiner og skjema"
    icon: "assets/images/icons/benefit-control.png"
  - title: "Oppnå målbare gevinster med KI"
    description: "KI vil ikke gjøre ansatte overflødige, men de må ledes annerledes"
    icon: "assets/images/icons/benefit-ai.png"
  - title: "Bli forberedt på en usikker fremtid"
    description: "Styr unna uønskede hendelser og fang mulighetene"
    icon: "assets/images/icons/benefit-future.png"
  - title: "Forankre initiativer i ledergruppen"
    description: "Gi ledelsen innsikt i egen virksomhet for å prioritere initiativer"
    icon: "assets/images/icons/benefit-anchoring.png"
process_steps:
  - title: "1. Uforpliktende samtale"
    description: "Vi konkretiserer hva dere vil oppnå med modenhetsanalysen"
    icon: "assets/images/icons/step-talk.png"
  - title: "2. To timers strukturert intervju"
    description: "60 diagnostiske spørsmål med inntil fem ledere"
    icon: "assets/images/icons/step-interview.png"
  - title: "3. Rapport og anbefalinger"
    description: "Sammenlikning med best practice og konkrete tiltak"
    icon: "assets/images/icons/step-report.png"
story: "Hvorfor har vi laget metoden? «Ledelse 60:2» er vår tilnærming…"
booking_url: "https://outlook.office.com/bookwithme/user/…"
image: "assets/images/hero-illustration.png"
tags: "#ledelse #modenhet #analyse"
---
```

### Collection: Cases (`_cases/*.md`)

```yaml
---
title: "Case title"              # required
description: "Short description" # required
image: "assets/images/case.png"  # optional
result: "30% forbedring"         # optional — measurable outcome
customer: "Kundenavn AS"         # optional
product_tags: "#ledelse"         # optional — for filtering on product pages
---
```

### Collection: Partners (`_partners/*.md`)

```yaml
---
name: "Partner Name"            # required
url: "https://partner.no"       # required
image: "assets/images/partner-logo.png"  # required
tags: "#samarbeid"              # optional
---
```

## Frame Articles

Four frame articles implement Bolman & Deals rammeverk for leadership. Each is a standalone SEO article.

### File Structure

| File | Permalink | Topic |
|------|-----------|-------|
| `_pages/ledelse_struktur.md` | `/ledelse-60-2/struktur/` | Strukturperspektivet |
| `_pages/ledelse_mennesker.md` | `/ledelse-60-2/mennesker/` | Menneskeperspektivet |
| `_pages/ledelse_påvirkning.md` | `/ledelse-60-2/påvirkning/` | Påvirkningsperspektivet |
| `_pages/ledelse_identitet.md` | `/ledelse-60-2/identitet/` | Identitetsperspektivet |

### Content Guidelines

- Abstract: 2-3 sentences, no consultant-speak, direct Norwegian
- Body: ~1500 words, semi-formal, scannable with H2/H3 headers
- Bibliography: Cite primary sources (Bolman & Deal, Pfeffer, Hubbard, etc.)
- Illustrations: Scandinavian minimal, no text, 16:9
- Dark mode: Use CSS variables, test both themes

### Bibliography Mapping

| Article | Primary Source | Secondary Sources |
|---------|----------------|-------------------|
| Struktur | Pfeffer (2010) | Hubbard (2014), Bolman & Deal (2017) |
| Mennesker | Blanchard's framework | Blanchard & Barrett (2011) |
| Påvirkning | Pfeffer (2010) | Pfeffer's power in orgs |
| Identitet | Logan (2011) | Bolman & Deal (2017) |

See `assets/bibliography/briefs/` for synthesis of each source.

### Linking

- Frame articles linked from `/om_forskning/` (vitenskapelig grunnlag page)
- Benefit cards on Ledelse 60:2 landing page link to relevant frame articles
- Use `class="frame-link"` for styled links

---

## Dependencies

- **Graphics**: 8 assets required (1 hero illustration + 7 icons) via GPT Image 2
- **Template**: `_includes/products.html` rewrite for both inline and landing page
- **CSS**: `assets/css/products.css` rewrite with hero layout, 2×2 grid, step flow
- **Navigation**: `.specs/navigation/README.md`
- **Content**: `_products/ledelse-60-2.md` frontmatter rewrite

## Banner Specifications (v2)

### Overview

Benefits and process steps now use **mini-hero banners** instead of icons. These are abstract 16:9 horizontal illustrations that visually represent each concept, matching the style of the main hero illustration.

### Banner Files

**Benefits (4 banners):**
```
assets/images/banners/benefit-control.png
assets/images/banners/benefit-ai.png
assets/images/banners/benefit-future.png
assets/images/banners/benefit-anchoring.png
```

**Process Steps (3 banners):**
```
assets/images/banners/step-talk.png
assets/images/banners/step-interview.png
assets/images/banners/step-report.png
```

### Design Guidelines

| Property | Value |
|----------|-------|
| **Aspect Ratio** | 16:9 (horizontal) |
| **Style** | Abstract illustration, matching hero-illustration.png style |
| **Color Palette** | Brand colors (azure accent, neutral tones) |
| **Content** | Abstract/symbolic, no text |
| **File Format** | PNG with transparency |
| **Dimensions** | 1600×900 recommended, minimum 800×450 |

### Visual Direction for Each Banner

**Benefits:**
1. **"Få kontroll uten byråkrati"** — Abstract representation of trust-based leadership vs. rigid structure
2. **"Oppnå målbare gevinster med KI"** — Abstract representation of human-AI collaboration
3. **"Bli forberedt på en usikker fremtid"** — Abstract representation of forward vision/planning
4. **"Forankre initiativer i ledergruppen"** — Abstract representation of group alignment/collaboration

**Process Steps:**
1. **"Uforpliktende samtale"** — Abstract representation of dialogue/consultation
2. **"To timers strukturert intervju"** — Abstract representation of focused interview/discussion
3. **"Rapport og anbefalinger"** — Abstract representation of insights/delivery

### CSS Updates Required

```css
/* Banner dimensions */
.benefit-banner,
.process-banner {
    width: 100%;
    max-width: 400px;
    height: auto;
    aspect-ratio: 16/9;
    border-radius: 8px;
}

/* Grid adjustments */
.landing-benefits-grid {
    gap: 32px;
}

.landing-process-steps {
    gap: 32px;
}
```

### Frontmatter Update

Replace `icon` fields with `banner`:

```yaml
benefits:
  - title: "Få kontroll uten byråkrati"
    description: "..."
    banner: "assets/images/banners/benefit-control.png"
  - title: "Oppnå målbare gevinster med KI"
    description: "..."
    banner: "assets/images/banners/benefit-ai.png"
  # ... etc

process_steps:
  - title: "1. Uforpliktende samtale"
    description: "..."
    banner: "assets/images/banners/step-talk.png"
  # ... etc
```
