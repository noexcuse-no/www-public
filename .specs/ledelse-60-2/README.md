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

## Dependencies

- **Graphics**: 8 assets required (1 hero illustration + 7 icons) via GPT Image 2
- **Template**: `_includes/products.html` rewrite for both inline and landing page
- **CSS**: `assets/css/products.css` rewrite with hero layout, 2×2 grid, step flow
- **Navigation**: `.specs/navigation/README.md`
- **Content**: `_products/ledelse-60-2.md` frontmatter rewrite
