# GRC — Feature Specification

## Purpose

Create a dedicated GRC landing page at `/grc/` that positions Ledelse 60:2 as the key enabler for meaningful governance, risk, and compliance work. The page bridges the gap between the regulatory frameworks Norwegian decision-makers recognise and the practical leadership perspective No Excuse delivers.

This spec supersedes the previous light-touch approach (GRC sentence inserts into existing articles) by adding a dedicated page as the primary entry point. The article inserts remain as supplementary reinforcement.

## Scope

### Files to Create
- `_pages/grc.md` — New GRC landing page

### Files to Modify
- `_data/navigation.yml` — Remove "Forside", add "GRC" between "Perspektiv" and "Om oss"
- `.design/information-architecture.md` — Add `/grc/` entry
- `.design/grc.md` — Design document (already created)
- `.specs/grc/README.md` — This spec file

### Image Assets Required

| Image | Tier | Style | Description | File Name |
|-------|------|-------|-------------|-----------|
| Hero banner | T1 | Style 2 | Abstract — four overlapping frames/lenses converging on a target | `grc-t1-hero.webp` |
| Four perspectives → GRC | T2 | Style 3 | 4-panel grid mapping perspectives to GRC domains | `grc-t2-four-perspectives-grc.webp` |
| Information security section | T3 | Style 3 | Single concept — shield/lock abstract | `grc-t3-informasjonssikkerhet.webp` |
| Environment section | T3 | Style 3 | Single concept — leaf/globe abstract | `grc-t3-miljo.webp` |
| Quality section | T3 | Style 3 | Single concept — gear/compass abstract | `grc-t3-kvalitet.webp` |
| Ledelse 60:2 → GRC enabler | T2 | Style 3 | Process flow — how L60:2 feeds into GRC maturity | `grc-t2-ledelse60-2-grc-enabler.webp` |

All images: generate via EvoLink GPT Image 2 at 1024×1024, convert to WebP at tier-specific sizes (T2: 800px, T3: 400px), place in `assets/images/banners/`.

### CSS Changes
- **None expected** — all patterns exist in the codebase (`.section`, `.info-box`, `.product-cta`, existing spacing classes)

## Page Content Structure

### 1. Frontmatter
```yaml
---
class: article
layout: page
title: "GRC — Governance, Risk and Compliance"
description: "Hvordan fire perspektiver på ledelse hjelper deg å implementere styring, risiko- og samsvarshåndtering som faktisk fungerer — ikke bare sertifisering på papiret."
permalink: /grc/
hero:
  image: /assets/images/banners/grc-t1-hero.webp
  alt: "Illustrasjon av fire perspektiver som samles i GRC"
  breadcrumb: "← No Excuse AS"
  title: "Virksomhets- og risikostyring og samsvarshåndtering"
  intro: "Governance, Risk and Compliance (GRC) handler om å styre virksomheten med integritet, oversikt og kontroll. Men bare hvis ledelsen forstår at GRC ikke er et skjema — det er en kulturell egenskap."
tags: ["grc", "styring", "risikostyring", "samsvar", "ledelse"]
json_ld:
  type: "Article"
  name: "GRC — Governance, Risk and Compliance"
  description: "Hvordan fire perspektiver på ledelse hjelper deg å implementere styring, risiko- og samsvarshåndtering som faktisk fungerer."
---
```

### 2. Content Sections (in order)

#### Hero section
`{% include hero.html %}` — renders from frontmatter `hero:` block

#### Section: Hva er GRC — og hvorfor det ikke fungerer uten ledelse
- Direct definition of GRC from No Excuse perspective
- The core tension: checkbox compliance vs. embedded principles
- Why Norwegian organisations often fail at GRC despite having certifications
- Bridge: you need a language for leadership that connects to GRC — enter the four perspectives

#### Section: Fire perspektiver, fire GRC-dimensjoner
- Framework T2 image
- Table/matrix showing:

| Perspektiv | GRC-dimensjon | Hva det handler om |
|------------|---------------|-------------------|
| Struktur | Samsvar og kontroll | Roller, prosesser, dokumentert ansvar, revisjonsspor |
| Mennesker | Kultur og etikk | Psykologisk trygghet, varsling, verdier i praksis |
| Påvirkning | Styring og makt | Beslutningsmyndighet, eierstyring, interessenter |
| Identitet | Formål og integritet | Organisasjonens identitet, verdibasert etterlevelse, langsiktighet |

- Key point: single-framework approaches (only ISO, only policies) miss that GRC lives across all four dimensions

#### Section: Informasjonssikkerhet og cyberresiliens
- T3 spot image
- Frameworks: ISO 27001, DORA, NIS2, NORMEN, NSM Grunnprinsipper, GDPR
- Angle: Security is a leadership culture problem, not an IT problem
- The four perspectives reveal where security culture breaks down:
  - Struktur: uklare roller for informasjonseierskap
  - Mennesker: frykt for å melde fra om avvik
  - Påvirkning: ledelse som overstyrer sikkerhetsråd
  - Identitet: «vi har aldri blitt hacket»-tenkning
- CTA: → Link to `/usikkerhet/` — "Les om hvordan usikkerhetshåndtering henger sammen med informasjonssikkerhet"

#### Section: Miljø, helse og samfunnsansvar
- T3 spot image
- Frameworks: Miljøfyrtårn, ISO 45001 (HMS), relevant lovverk, UN Global Compact
- Angle: Bærekraftsrapportering uten kulturell forankring er greenwashing. Miljøarbeid som ikke er forankret i ledelsens identitet blir et rapporteringsprosjekt, ikke en endring.
- Key insight from identitetsperspektivet: organisasjoner som ikke har "miljø" i sin identitet, vil alltid prioritere det ned
- CTA: → Link to `/identitet/` — "Les om identitetsperspektivet og verdibasert styring"

#### Section: Kvalitetsledelse
- T3 spot image
- Frameworks: ISO 9001, relevante lovkrav, kontraktsforpliktelser
- Angle: Kvalitetsledelse og lønnsomhet er samme samtale. En ledergruppe som ikke forstår kvalitet som et system, vil behandle det som et kontrollbyråkrati.
- Connection: kvalitetsavvik er sjelden tekniske feil — de er ledelsessvikt i struktur (uklare prosesser), mennesker (opplæring), påvirkning (feil insentiver) eller identitet ("vi har alltid gjort det sånn")
- CTA: → Link to `/struktur/` — "Les om strukturperspektivet og prosessdisiplin"

#### Section: Slik styrker Ledelse 60:2 GRC-arbeidet ditt
- T2 process flow image
- Structured overview (table or stepped diagram):

| GRC-utfordring | Hva Ledelse 60:2 måler |
|----------------|------------------------|
| Er styringsstrukturen reell? | Gap mellom formell og reell beslutningsmyndighet (Påvirkning) |
| Har ansatte psykologisk trygghet til å varsle? | Trygghetskultur og åpenhet (Mennesker) |
| Er roller og ansvar for compliance tydelige? | Rolledefinisjon og prosessdisiplin (Struktur) |
| Er kvalitetsforbedring forankret i kulturen? | Organisasjonens identitet vs. uttalte verdier (Identitet) |
| Tar ledelsen risiko på alvor — eller bare på papiret? | Endringsvilje og usikkerhetshåndtering (Alle fire) |

- Conclusion: GRC without leadership maturity is paperwork. Ledelse 60:2 gives you the baseline measurement.

#### CTA Section(s)
- After the Ledelse 60:2 overview → Primary booking CTA
- Before footer → Secondary CTA with cross-links

### 3. Cross-References to Existing Articles

| GRC Section | Linked Article | Link Text |
|-------------|---------------|-----------|
| Info security | `/usikkerhet/` | "Les om usikkerhetshåndtering →" |
| Environment | `/identitet/` | "Les om identitetsperspektivet →" |
| Quality | `/struktur/` | "Les om strukturperspektivet →" |
| Governance | `/forankring/` | "Les om beslutningsforankring →" |
| Ledelse 60:2 overview | `/ledelse-60-2/` | "Les mer om Ledelse 60:2 →" |
| Four perspectives | `/perspektiv/` | "Forstå de fire perspektivene →" |

## Acceptance Criteria

- [ ] `/grc/` page renders at `noexcuse.no/grc/`
- [ ] Navigation: "GRC" appears between "Perspektiv" and "Om oss", "Forside" removed
- [ ] Hero section renders with banner image, title, breadcrumb, intro
- [ ] All four-perspective→GRC mappings present and accurate
- [ ] Cybersecurity section covers ISO 27001, DORA, NIS2, NORMEN, NSM Grunnprinsipper, GDPR
- [ ] Environmental section covers Miljøfyrtårn, ISO 45001, relevant legislation, UN Global Compact
- [ ] Quality section covers ISO 9001, relevant legislation, contractual obligations, profitability connection
- [ ] Ledelse 60:2 overview shows explicit GRC challenge→measurement mapping
- [ ] At least 3 T3 spot images present (one per domain)
- [ ] At least 1 T2 framework image present (four perspectives or Ledelse 60:2 enabler)
- [ ] Primary CTA (booking link) present after Ledelse 60:2 section
- [ ] Cross-links to at least 4 existing articles present and correct
- [ ] Dark mode renders correctly (text, images, gradients)
- [ ] Mobile layout tested at ≤599px
- [ ] `.design/information-architecture.md` updated with `/grc/` entry
- [ ] `.design/grc.md` design document created (or updated)
- [ ] Brand voice compliant — no consultant-speak, direct language, specific frameworks named
- [ ] No new CSS files created (all styles from existing patterns)
- [ ] All images generated per 4-tier system, named per convention, placed in `assets/images/banners/`

## Design Constraints

- Brand voice: direct, no consultant-speak (avoid "bærekraftig", "verdiøking", "helhetlig")
- Norwegian Bokmål throughout
- Use existing CSS variables from `colors.css` — no hardcoded colors
- Touch targets: minimum 44×44px
- Images: no embedded text (multilingual site)
- `aria-hidden="true"` and empty `alt` on decorative images; descriptive `alt` on meaningful images

## Dependencies

- Image generation via EvoLink GPT Image 2 (6 images needed)
- Existing article content for cross-links — verify all target URLs exist before linking
- The existing `.specs/grc/README.md` article-integration approach remains valid and complementary

## Prior Work

The previous GRC spec defined adding GRC sentence inserts into 7 existing articles (påvirkning, usikkerhet, struktur, tillit, forankring, identitet, mennesker). That work is complementary — the `/grc/` page is the entry point, the article inserts provide depth reinforcement. Both share the same GRC→four-perspectives mapping.
