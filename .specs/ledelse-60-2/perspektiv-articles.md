# Perspektiv Articles — Functional Specification

## Purpose

Define a reusable hybrid architecture for the 4 Norwegian perspective articles (`struktur`, `mennesker`, `påvirkning`, `identitet`). Reduce duplication while preserving editorial flexibility.

---

## Architecture Overview

```
_frames/                    # New collection (metadata only, no body)
  struktur.md
  mennesker.md
  påvirkning.md
  identitet.md

_layouts/
  perspektiv.html           # Single layout for all frame articles

_pages/
  ledelse_struktur.md       # Lightweight — layout reference + content blocks
  ledelse_mennesker.md
  ledelse_påvirkning.md
  ledelse_identitet.md

_includes/
  perspektiv-styles.css     # Extracted CSS (shared across all articles)
```

---

## Frontmatter Schema: `_frames/*.md`

```yaml
---
id: struktur                           # Unique identifier (matching filename without .md)
title: "Strukturperspektivet i ledelse"
description: "Lær hvordan strukturperspektivet kan hjelpe ledergruppen..."

json_ld:
  type: Article
  name: "Strukturperspektivet i ledelse"
  description: "Hvordan ledere bruker strukturperspektivet..."
  author:
    type: Organization
    name: "No Excuse AS"
  about:
    - type: "Thing"
      name: "Ledelse 60:2"
    - type: "Thing"
      name: "Strukturperspektivet"
    - type: "Thing"
      name: "Organisasjonsstruktur"

hero:
  banner_image: perspektiv-struktur.png
  alt: "Strukturperspektivet i ledelse"
  breadcrumb: "← Ledelse 60:2"
  intro: "Handler om å skape et system der oppgaver, roller og mål henger sammen. Når strukturen fungerer, merkes det ikke. Når den ikke fungerer, merkes det umiddelbart."

intro:
  heading: "Hva er strukturperspektivet?"
  body: |
    Tenk på en organisasjon som en maskin med mange deler som må fungere sammen.
    Strukturperspektivet ser ledelse som design og vedlikehold av denne maskinen...

elements:
  - title: "Roller og ansvar"
    body: |
      Hvem gjør hva? Roller er de minste meningsfulle enhetene i en organisasjon.
    signs:
      positive: "Ledere kan beskrive sine ansvarsområder presist..."
      negative: "«Det er ikke min jobb» eller «Hvem skal jeg egentlig spørre?»..."
  - title: "Mål og koordinering"
    body: |
      Organisasjoner eksisterer for å oppnå noe. Mål er det som gir retning...
    signs:
      positive: "Mål i ulike avdelinger forsterker hverandre..."
      negative: "Silotenking. Mål som konkurrerer med hverandre..."
  - title: "Prosesser og regler"
    body: |
      Prosesser er hvordan arbeid faktisk utføres. Regler er de formelle og uformelle normene...
    signs:
      positive: "Folk vet hvordan de skal få ting gjort..."
      negative: "Unødvendig byråkrati. Prosesser som ble laget for et problem..."

leader_value:
  heading: "Hvorfor struktur betyr noe for ledergruppen"
  body: |
    Strukturperspektivet er kanskje det minst «sexy» av de fire perspektivene...

challenges:
  - title: "Uklar rolleavklaring"
    body: "To personer som tror de eier samme område..."
  - title: "Målkonflikter"
    body: "Avdeling A optimaliserer for sin målsetting som bremser avdeling B..."
  - title: "Koordineringsproblemer"
    body: "Mye tid brukes på å samordne arbeid som burde vært koordinert fra start..."
  - title: "Byråkratisk byrde"
    body: "Prosesser som ble laget for å løse et reelt problem..."

questions:
  - "Er det områder der ansvar er uklart eller overlappende?"
  - "Finnes det mål i organisasjonen som motvirker hverandre?"
  - "Bruker ledelsen tid på koordinering som burde vært unødvendig?"
  - "Har vi bygd strukturer som støtter vekst — eller strukturer som begrenser den?"
  - "Er det regler og prosesser som ble laget for et problem som ikke lenger eksisterer?"

cta:
  image: illustrasjon-struktur-cta.png
  alt: "Illustrasjon for kartlegging av struktur"
  heading: "Få kartlagt ledergruppens strukturelle modenhet"
  body: |
    Ledelse 60:2 inneholder 15 spørsmål som handler om strukturperspektivet...
  booking_url: "https://outlook.office.com/book/ledelse@noexcuse.no/..."

about:
  heading: "Det vitenskapelige grunnlaget"
  body: |
    Strukturperspektivet i Ledelse 60:2 bygger på Lee Bolman og Terrence Deals...
  link_text: "Les det vitenskapelige grunnlaget for Ledelse 60:2 →"
  link_url: "/forskning/"

color_accent: "#4A90D9"
---
```

---

## Page Schema: `_pages/ledelse_*.md`

Each page file is minimal — only frontmatter and content blocks that differ from schema:

```yaml
---
layout: perspektiv
permalink: /struktur/
---

<section class="perspektiv-section">
  <h2>Ekstra seksjon kun for struktur</h2>
  <p>Dette er en custom seksjon som bare finnes i struktur-artikkelen.</p>
</section>
```

Or with no custom sections (pure schema-driven):

```yaml
---
layout: perspektiv
title: "Strukturperspektivet i ledelse"
permalink: /struktur/
---
<!-- No body content — fully driven by _frames/struktur.md frontmatter -->
```

---

## Layout: `_layouts/perspektiv.html`

Renders all standard sections from `_frames/` collection frontmatter. Uses `page.url` to lookup matching frame data.

```liquid
{% assign frame_id = page.url | split: '/' | last %}
{% assign frame = site.frames | where: "id", frame_id | first %}

<!-- Hero Section -->
<section class="perspektiv-hero">
  <div class="perspektiv-hero-image">
    <img src="{{ frame.hero.banner_image | relative_url }}" alt="{{ frame.hero.alt }}">
  </div>
  <div class="perspektiv-hero-content">
    <p class="perspektiv-breadcrumb">{{ frame.hero.breadcrumb }}</p>
    <h1>{{ frame.title }}</h1>
    <p class="perspektiv-intro">{{ frame.hero.intro }}</p>
  </div>
</section>

<!-- Intro Section -->
<section class="perspektiv-section">
  <h2>{{ frame.intro.heading }}</h2>
  {{ frame.intro.body | markdownify }}
</section>

<!-- Three Elements with illustration -->
<section class="perspektiv-section">
  <h2>De tre hovedelementene</h2>
  <img src="/assets/images/banners/illustrasjon-{{ frame.id }}-hovedelementer.png" alt="..." class="section-illustration">
  {% for element in frame.elements %}
  <div class="perspektiv-element">
    <h3>{{ element.title }}</h3>
    {{ element.body | markdownify }}
    <p><strong>Tegn på god {{ element.title | downcase }}:</strong> {{ element.signs.positive }}</p>
    <p><strong>Tegn på {{ element.title | downcase }}-problemer:</strong> {{ element.signs.negative }}</p>
  </div>
  {% endfor %}
</section>

<!-- ... remaining sections ... -->
```

---

## CSS Architecture: `_includes/perspektiv-styles.css`

Extract from current embedded `<style>` blocks. Rename classes:

| Current | Target |
|---------|--------|
| `.frame-hero` | `.perspektiv-hero` |
| `.frame-section` | `.perspektiv-section` |
| `.frame-element` | `.perspektiv-element` |
| `.frame-challenges` | `.perspektiv-challenges` |
| `.frame-challenge` | `.perspektiv-challenge` |
| `.frame-questions` | `.perspektiv-questions` |
| `.frame-cta` | `.perspektiv-cta` |
| `.frame-about` | `.perspektiv-about` |
| `.frame-link` | `.perspektiv-link` |

Add dark mode variants for all classes.

---

## Image Rename Specification

Rename all banner files from `frame` to `perspektiv`:

| Current | Target |
|---------|--------|
| `assets/images/banners/frame-struktur.png` | `perspektiv-struktur.png` |
| `assets/images/banners/frame-mennesker.png` | `perspektiv-mennesker.png` |
| `assets/images/banners/frame-påvirkning.png` | `perspektiv-påvirkning.png` |
| `assets/images/banners/frame-identitet.png` | `perspektiv-identitet.png` |

Illustration files remain named `illustrasjon-X-Y.png` (already using Norwegian terms).

---

## Cross-Reference Updates

After rename, update all references:

1. **Image paths in frontmatter** — update `hero.banner_image` to `perspektiv-X.png`
2. **CSS class names** — `.frame-*` → `.perspektiv-*`
3. **Internal links** — any hardcoded `/frame-X/` URLs → `/perspektiv-X/`
4. **navbar.html** — any `/frame-X/` links → `/perspektiv-X/`

---

## Benefits

1. **Single source of truth** for perspective structure and metadata
2. **Consistent rendering** across all 4 articles
3. **Easy to extend** — new perspective articles just add frontmatter
4. **CSS extracted** to stylesheet — no duplication
5. **Editorial flexibility** — custom sections possible via page body content
6. **Norwegian terminology** throughout (`perspektiv`, `illustrasjon`)

---

## Dependencies

- `_config.yml` — add `frames` collection with `output: false`
- `assets/css/perspektiv-styles.css` — extracted and renamed CSS
- `_layouts/perspektiv.html` — new layout file
- `_frames/` — 4 new frontmatter files
- Image renames in `assets/images/banners/`

---

## Acceptance Criteria

1. All 4 perspective articles render correctly with same structure
2. No duplicate CSS in article files (all in stylesheet)
3. Dark mode works on all articles
4. Images renamed and paths updated
5. Internal links work correctly
6. Layout renders all 8 sections from frontmatter
7. Custom content in page body renders after standard sections

---

## Implementation Status

**Completed 2026-05-26.** All acceptance criteria met:

- ✅ `_frames/` collection created with structured frontmatter for all 4 articles
- ✅ `_layouts/perspektiv.html` renders all sections from `site.frames`
- ✅ CSS extracted to `assets/css/perspektiv-styles.css` with `.perspektiv-*` classes
- ✅ 4 article pages rewritten as lightweight files using `layout: perspektiv`
- ✅ Images renamed: `frame-X.png` → `perspektiv-X.png`
- ✅ Cross-references updated in `om_metode.md`
- ✅ `article.css` updated with `.perspektiv-*` classes for future reuse
- ✅ Dark mode variants included in extracted stylesheet

### Deviation from Original Spec

1. **CSS location**: Moved from `_includes/perspektiv-styles.css` to `assets/css/perspektiv-styles.css` for proper static asset serving
2. **Collection output**: Set `output: false` instead of `output: true` for `frames` collection — these files are data sources, not standalone pages
3. **Color accent**: Added `var(--perspektiv-accent)` support in `.perspektiv-element` border-left for per-frame theming