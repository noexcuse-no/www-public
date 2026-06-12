# Product Cards — Frontmatter Data Source

> Created: 2026-06-12
> Status: Ready

## Problem / Goal

Hjemmesiden (`_includes/products.html`) renderer benefit-kort og prosess-steg-kort for hvert produkt med `class: product`. Dataene hentes fra produkt-sidens frontmatter-felter (`benefits` og `process_steps`). Samtidig har produkt-siden (`_pages/ledelse_60-2.md`) en revidert body med egne manuelle renderinger av tilsvarende innhold.

Målet er å sikre at:
- **Frontmatter er den autoritative kilden** for benefit- og prosessdata på tvers av hele nettstedet
- Homepage og produktsiden henter konseptuelt samme data, selv om layout og presentasjon kan variere
- Endringer i produktinnhold gjøres i frontmatter — ikke i isolert body-HTML
- Nye produkter (f.eks. Katalysator, Q7) følger samme frontmatter-skjema

## Scope

- `_pages/*.md` med `class: product` — frontmatter-feltene `benefits` og `process_steps`
- `_includes/products.html` — homepage-rendering av benefit- og prosesskort
- `_data/` — eventuell fremtidig produktoppsummering

Filer som IKKE er i scope:
- `_includes/benefit-cards.html` — rendrer benefit-artikler (class: benefit), ikke produkt-kort
- `assets/css/products.css` — styling, ikke datakilde

## Frontmatter-skjema

### `benefits` (array, valgfritt)

```yaml
benefits:
  - title: "Kort tittel"
    description: "Kort beskrivelse, 1-2 setninger."
    banner: "assets/images/banners/example.webp"
    article_url: "/topic/"
```

| Felt | Type | Påkrevd | Beskrivelse |
|------|------|---------|-------------|
| `title` | string | ja | Overskrift i benefit-kortet |
| `description` | string | ja | Kort beskrivelse |
| `banner` | string | ja | Relativ sti til T3/T4 bannerbilde |
| `article_url` | string | ja | Permalink til tilhørende artikkel |

### `process_steps` (array, valgfritt)

```yaml
process_steps:
  - title: "1. Stegnavn"
    description: "Beskrivelse av steget."
    banner: "assets/images/banners/step-example.webp"
```

| Felt | Type | Påkrevd | Beskrivelse |
|------|------|---------|-------------|
| `title` | string | ja | Stegnavn (inkluder gjerne nummerering) |
| `description` | string | ja | Kort beskrivelse |
| `banner` | string | ja | Relativ sti til steg-banner |

## Rendering

### Homepage (`_includes/products.html`)

- `benefits` → `.product-benefits.grid.grid--2` med `.benefit-card` for hvert element
- `process_steps` → `.landing-process-steps` med `.process-step` for hvert element
- Data leses via `product.benefits` og `product.process_steps` (Liquid-objekter fra frontmatter)

### Produktside-body

Produktsiden kan ha en egen visuell presentasjon av tilsvarende innhold i body (f.eks. signal-kort i "Kjenner du deg igjen?"-seksjonen), men dette er *supplementær* layout som ikke erstatter frontmatter som datakilde. Homepage skal alltid kunne stole på frontmatter.

## Regler

1. **Aldri fjern `benefits` eller `process_steps` fra frontmatter** på et produkt som vises på homepage — med mindre homepage-include oppdateres tilsvarende
2. **Nye produkt-sider** (class: product) SKAL inkludere begge feltene hvis de skal vises på homepage
3. **Endringer i produktinnhold** gjøres i frontmatter først — body-oppdateringer er sekundære og valgfrie
4. **Homepage skal ikke hardkode** produktspesifikke data — alltid via `site.pages | where: "class", "product"`-løkken

## Acceptance Criteria

- [ ] `_pages/ledelse_60-2.md` har `benefits` (4 items) og `process_steps` (3 items) i frontmatter — **verifisert, OK**
- [ ] Homepage (`/`) rendrer benefit-kort og prosess-steg-kort korrekt fra disse dataene — **verifisert via products.html include**
- [ ] Body-endringer på produktsiden påvirker ikke homepage-renderingen
- [ ] Nytt produkt (Q7, Katalysator) følger samme frontmatter-skjema
