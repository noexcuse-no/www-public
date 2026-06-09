# Feature: Homepage Overhaul

> Status: Planned | BL: G1

## Problem

Hjemmesiden er dårligst på SEO og konvertering av alle sider på nettstedet. Den mangler grunnleggende crawlbarhet (`<h1>`, `description`, JSON-LD), mangler CTA over brettet, og viser ingen av nettstedets 14+ artikler.

## Feature Components

### F1a — SEO Foundation

**Hva:** Legg til `description`-frontmatter, bytt `<h2>` til `<h1>`, legg til `json_ld` med Organization-schema i `index.md`.

**Hvorfor:** Uten `<h1>` forstår ikke søkemotorer og skjermlesere sidens tema. Uten `description` blir søkesnippet den generiske «Forbedrer internkultur og kommunikasjon i bedrifter.» Uten JSON-LD har forsiden null strukturert data — alle andre sidetyper har det.

**Filer:** `index.md`, `_layouts/home.html` (hvis `<h1>` må styres fra layout), `_includes/metadata.html` (verifiser at description fallback fungerer).

### F1b — Hero CTA

**Hva:** Legg til `hero.cta_text` og `hero.cta_url` i `index.md` slik at `hero.html` rendrer en CTA-knapp over brettet.

**Hvorfor:** `hero.html` støtter allerede CTA via frontmatter — produkt-siden bruker det. Hjemmesiden har det ikke, så besøkende må scrolle forbi alt innhold før de finner en booking-lenke.

### F1c — Stat Bridge på forsiden

**Hva:** Vis «4 perspektiver · 60 spørsmål · 2 timer» (stat_bridge) på forsiden som en trust-signal over brettet.

**Hvorfor:** `stat_bridge` finnes i `_includes/stat-bridge.html` og vises kun på produkt-siden. Samme trust-signal trengs på forsiden for å gi besøkende et konkret tall-inntrykk av produktet i første blikk.

**Filer:** `_layouts/home.html` (legg til `{% include stat-bridge.html %}`)

### F1d — Artikkelfeed på forsiden

**Hva:** Legg til en seksjon på forsiden som viser 3–6 fremhevede artikler med tittel, ingress og lenke.

**Hvorfor:** 14+ rike artikler er usynlige fra forsiden. Både crawlere og besøkende ser ikke innholdsdybden. Dette er den raskeste måten å signalisere faglig tyngde og gi besøkende en neste-steg-handling.

**Filer:** `_includes/article-feed.html` (ny), `_layouts/home.html` (inkluder), CSS etter behov.

**Designprinsipp:** Grid med kort à la benefit-cards. Hvert kort viser hero-bilde (hvis tilgjengelig), tittel, ingress (truncated), og «Les mer →». Sortering via frontmatter-vekt eller manuelt utvalg.

## Dependencies

- F1a kan gjøres uavhengig
- F1b forutsetter at `hero.html` CTA-støtte fungerer (allerede bekreftet)
- F1c forutsetter at `stat-bridge.html` er portable (allerede en include)
- F1d krever ny include og CSS

## Acceptance Criteria

- [ ] `index.md` har `<h1>` (ikke `<h2>`)
- [ ] `index.md` har `description`-frontmatter (max 160 tegn, norsk)
- [ ] `index.md` har `json_ld` med Organization-schema
- [ ] Hero på forsiden viser CTA-knapp
- [ ] Stat bridge vises over brettet på forsiden
- [ ] Forsiden viser minimum 3 artikler i en grid
- [ ] Lighthouse SEO-score for forsiden ≥ 90
- [ ] `lsp_diagnostics` pass på alle endrede filer
- [ ] Jekyll build exit 0
