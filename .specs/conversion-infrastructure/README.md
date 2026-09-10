# Feature: Conversion Infrastructure

> Status: Planned | BL: G4

## Problem

Nettstedet har innhold (artikler) og bestilling (Outlook-booking), men mangler
mellomsteg: ingen epostinnsamling, ingen kontaktformular, ingen ressursnedlasting,
ingen anbefalinger. Besøkende leser en artikkel og har ingen steg-2-handling.

## Sub-features

### F4a — Epostinnsamling (Newsletter)

**Hva:** Et enkelt epost-skjemafelt på bunnen av hver artikkel og på forsiden.

**Filer:**
- `_includes/newsletter-signup.html` (ny)
- `_layouts/article.html` (inkluder)
- `index.md` / forsiden (inkluder)
- `assets/scripts/newsletter.js` (validering og innsending)
- `assets/css/components/newsletter.css` (styling)

**Samtykke:** Ett avkrysningsfelt for «Jeg samtykker til at No Excuse lagrer min
epost for nyhetsbrev» (jf. GDPR art. 7). Samtykke er påkrevd før innsending.
Lenke til personvernside.

### F4b — Kontaktformular

**Hva:** En `/kontakt/`-side med et enkelt skjema (navn, epost, melding).
Krysslenkes fra Om Oss og artikkelfotnoter.

**Filer:**
- `_pages/kontakt.md` (ny)
- `_includes/contact-form.html` (skjemamarkering — `action="#"` skal peke til
  godkjent prosessor ved produksjon)
- `assets/scripts/contact.js` (validering og innsending)

**Samtykke:** Samme som F4a.

### F4c — Stegside-berikelse

**Hva:** Brødtekst og CTA på stegsidene (Samtale/Intervju/Rapport). Disse sidene
har i dag kun et bilde hver — ingen tekst, ingen neste-steg-lenker, ingen
call-to-action.

**Filer:** `_pages/samtale.md`, `_pages/intervju.md`, `_pages/rapport.md`

### F4d (fremtidig) — Artikkelanbefalinger

Når F4a er på plass: «neste artikkel»-anbefalinger på bunnen av hver side.
Enkel cross-link-funksjon (manuelt eller via frontmatter-vekter), ikke en
ML-algoritme.

## Databehandling

Innsendt data må gå til en godkjent ekstern/tjenerside-prosessor og må aldri
committes til eller serveres fra dette offentlige repoet.

**Krav:**
- Ingen innsendt data committes til repoet
- Samtykke lagres med hver innsending
- Data sendes til godkjent ekstern/tjenerside-prosessor

## Dependencies

- F4a og F4b deler innsendingsmekanisme — kan utvikles samtidig
- F4c er uavhengig
- F4d forutsetter F4a

## Acceptance Criteria

- [ ] Nyhetsbrev-skjema vises på bunnen av hver artikkel og på forsiden
- [ ] Samtykke-avkrysning er påkrevd før innsending
- [ ] `/kontakt/`-side eksisterer med fungerende skjema
- [ ] Stegsidene (Samtale/Intervju/Rapport) har brødtekst og CTA
- [ ] Innsendt data går til godkjent ekstern/tjenerside-prosessor og
      committes/serves aldri fra dette repoet
- [ ] Jekyll build exit 0
- [ ] `lsp_diagnostics` pass på alle endrede filer