---
class: page
layout: article
title: "Rettigheter og lisensiering"
permalink: /rettigheter/
provenance:
  creation: human-created
  editorial_review: human
  editorial_responsibility: No Excuse AS
---

# Rettigheter og lisensiering

Denne siden gir oversikt over lisensiering og rettigheter for innhold og ressurser på noexcuse.no.

## Lisensmodell

Vi bruker et blandet lisensmodell (REUSE/SPDX) hvor hver fil og ressurs har en eksplisitt lisens:

| Kategori | Lisens | Beskrivelse |
|----------|--------|-------------|
| **Kildekode** | 0BSD | Kode vi har skrevet selv (scripts, layouts, includes, CSS) |
| **AI-generert innhold** | CC0-1.0 | Rent AI-generert materiale (bilder, tekst, kode) som vi har rettigheter til |
| **Menneskeskapt innhold** | LicenseRef-NoExcuse-All-Rights-Reserved | Artikler, artikler, foto, illustrasjoner, PDFer skapt av mennesker |
| **Tredjeparts materiale** | Opprinnelig lisens | Beholder opprinnelige rettigheter, ingen om-lisensiering |
| **Usikkert** | Uavklart | Materiale hvor opprinnelse eller rettigheter er usikre — vises åpent |

## Lisensdetaljer

### 0BSD (Kildekode)
Permissiv lisens som tillater fri bruk, modifikasjon og distribusjon uten krav om opphavsmannsoppgivelse.

### CC0 1.0 Universal (AI-generert innhold)
Offentlig eigendomsfrigivelse. Verket er gitt til offentligheten så langt det er mulig ved lov.

### LicenseRef-NoExcuse-All-Rights-Reserved (Menneskeskapt)
Alle rettigheter forbeholdes. Ingen bruk uten skriftlig tillatelse unntatt som lov tillater (sitatregel, privatkopiering, osv.).

## Opphavsrett og metadata

Alle filer på dette nettstedet er mærket med SPDX/REUSE-metadata:

- **JSON-LD** i sidens `<head>` (schema.org `@graph` med `WebPage` + `ImageObject`)
- **RDFa** på bilder (`property="schema:digitalSourceType"` + `schema:license`)
- **IPTC/XMP** inni bildefiler (DigitalSourceType, Rights, WebStatement)
- `.well-known/ai-transparency.json` — maskinlesbar manifest over AI-bruk og proveniens

## Bilder og multimedie

| Type | Lisens | Merking |
|------|--------|---------|
| AI-genererte bannere/ikoner | CC0-1.0 | `digitalSourceType: TrainedAlgorithmicMedia` + `license: CC0-1.0` |
| Menneskeskapt bilder (foto, illustrasjon) | LicenseRef-NoExcuse-All-Rights-Reserved | `digitalSourceType: digitalCapture/digitalCreation` + `license: LicenseRef-NoExcuse-All-Rights-Reserved` |
| Tredjeparts bilder | Opprinnelig lisens | Beholder opprinnelige metadata |
| Usikre bilder | Uavklart | Ikke klassifisert før avklaring |

## PDF-dokumenter

| Fil | Lisens | Beskrivelse |
|-----|--------|-------------|
| `assets/avtale.pdf` | LicenseRef-NoExcuse-All-Rights-Reserved | Standardavtale, menneskeskrevet |
| `assets/samtykke.pdf` | LicenseRef-NoExcuse-All-Rights-Reserved | Samtykke-skjema, menneskeskrevet |

## Redaksjonelt ansvar

**Redaksjonelt ansvarlig:** Dagfinn Bang-Johansen (CEO), dagfinn@noexcuse.no

Ansvar omfatter alle beslutninger om hva som publiseres, og at det publiserte er gjennomgått som beskrevet ovenfor.

## AI-transparens

Maskinlesbar transparensmanifest: `/.well-known/ai-transparency.json`

Inkluderer:
- Per-side proveniens (`creation`: human|editorial|ai|third-party|unresolved)
- AI-bruk per side (editorial|ai-assisted|ai-generated)
- Redaksjonell gjennomgang (human-reviewed: true)
- Redaksjonelt ansvarlig (Dagfinn Bang-Johansen, CEO)
- Bildeproveniens (AI-generert vs menneskeskapt)
- Lisens per ressurs

## Kontakt

Ved spørsmål om lisensiering, rettigheter eller personvern, kontakt:

**No Excuse AS**  
firmapost@noexcuse.no  
Oslo, Norge

---

*Denne siden genereres automatisk fra REUSE.toml, _data/assets.yml og side-frontmatter. Sist oppdatert: {{ site.time | date: "%Y-%m-%d" }}.*
