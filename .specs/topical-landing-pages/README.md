# Feature: Topical Landing Pages

> Status: Planned | BL: G3

## Problem

Flere forventede temasider mangler. Innhold finnes spredt på tvers av artikler, men det er ingen samleside for sentrale søkeord som «organisasjonskultur», «informasjonssikkerhet», «risikostyring» og «endringsledelse».

## Target Landing Pages

### P0 — Organisasjonskultur

**Målgruppe:** Ledere som søker etter «organisasjonskultur», «kulturanalyse», «kulturutvikling».

**Eksisterende innhold:** Spredt på tvers av `/usikkerhet/` (Scheins kulturnivåer, Kotters endringsmodell), `/identitet/` (Logans kulturstadier, verdier), `/tillit/` (psykologisk trygghet, Edmondson).

**Tilnærming:** Opprett `/kultur/` som landingsside som syntetiserer disse perspektivene. Bruk `layout: article` med hero, CTA, questions. Krysslenk til dybdeartiklene.

**Filer:** `_pages/kultur.md` (ny)

### P1 — Informasjonssikkerhet

**Målgruppe:** Ledere som søker «informasjonssikkerhet ledelse», «cybersikkerhet styring», «ISO 27001».

**Eksisterende innhold:** `/grc/` har en seksjon om informasjonssikkerhet og cyberresiliens (ISO 27001, DORA, NIS2, NORMEN, NSM Grunnprinsipper, GDPR) med fire perspektiver.

**Tilnærming:** Opprett `/informasjonssikkerhet/` som landingsside. Trekk ut og utvid innholdet fra `/grc/`. Krysslenk til GRC-siden.

**Filer:** `_pages/informasjonssikkerhet.md` (ny)

### P1 — Risikostyring

**Målgruppe:** Ledere som søker «risikostyring», «risikohåndtering», «usikkerhetsstyring».

**Eksisterende innhold:** `/grc/` dekker risikostyring konseptuelt. `/usikkerhet/` dekker usikkerhetshåndtering.

**Tilnærming:** Opprett `/risikostyring/` som landingsside med fokus på ledelsesperspektivet på risiko. Krysslenk til `/grc/` og `/usikkerhet/`.

**Filer:** `_pages/risikostyring.md` (ny)

### P1 — Endringsledelse

**Målgruppe:** Ledere som søker «endringsledelse», «change management», «organisasjonsendring».

**Eksisterende innhold:** `/usikkerhet/` har Kotters 8 steg, endringsfeil, og kulturanalyse. Men «endringsledelse» som søkeord har ingen dedikert side.

**Tilnærming:** Opprett `/endringsledelse/` som landingsside. Syntetiser Kotters modell, Logans kulturstadier, og praktisk endringsledelse. Krysslenk til `/usikkerhet/`.

**Filer:** `_pages/endringsledelse.md` (ny)

### P2 — Kvalitetsledelse, Bærekraft/ESG, Compliance

Lavere prioritet. Innhold finnes i `/grc/` men kan ekstraheres til egne landingssider når kapasitet tillater.

## Designprinsipp for alle landingssider

- Bruk eksisterende `layout: article` med `class: article`
- Hero med bilde, tittel, intro, CTA
- CTA-seksjon nederst som lenker til Ledelse 60:2
- `json_ld` med Article-schema
- Krysslenking til relevante dybdeartikler
- `tags` for emneoversikt-integrasjon

## Dependencies

- Alle sidene kan opprettes uavhengig av hverandre
- Avhenger av at `_layouts/article.html` fungerer for artikkel-type sider (bekreftet)
- Ingen CSS-endringer nødvendig med mindre en ny layout-komponent trengs

## Acceptance Criteria

- [ ] `/kultur/` eksisterer med syntese av Schein, Logan, Kotter
- [ ] `/informasjonssikkerhet/` eksisterer med fire perspektiver på sikkerhet
- [ ] `/risikostyring/` eksisterer som landingsside
- [ ] `/endringsledelse/` eksisterer som landingsside
- [ ] Hver side har hero, CTA, JSON-LD, krysslenker
- [ ] Jekyll build exit 0
- [ ] `lsp_diagnostics` pass på alle sider
