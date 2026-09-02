# Feature: Conversion Infrastructure

> Status: Planned | BL: G4

## Problem

Nettstedet mangler mellomrommet i konverteringstrakten. Toppen (artikler) og bunnen (Outlook booking) er på plass, men det finnes ingen ledelsmekanismer: ingen epostinnsamling, ingen kontaktformular, ingen lead capture, ingen ressursnedlastinger, ingen anbefalinger. Besøkende leser en artikkel og har ingen steg-2-handling.

## Sub-features

### F4a — Epostinnsamling (Newsletter)

**Hva:** Legg til et enkelt epost-skjemafelt på bunnen av hver artikkel og på forsiden. Epost lagres via en godkjent ekstern tjeneste — aldri i repo.

**Hvorfor:** Uten epostinnsamling har vi ingen mulighet til å følge opp besøkende. Eneste kontaktkanal er passiv (bok et møte).

**Filer:** `_includes/newsletter-signup.html` (ny), `_layouts/article.html` (inkluder), `index.md` (inkluder ved stat-bridge).

**Samtykke:** Ett avkrysningsfelt for «Jeg samtykker til at No Excuse lagrer min epost for nyhetsbrev» (jf. GDPR art. 7). Lenke til personvernside.

### F4b — Kontaktformular

**Hva:** Opprett en `/kontakt/`-side med et enkelt skjema (navn, epost, melding). Krysslenkes fra Om Oss og artikkelfotnoter.

**Hvorfor:** Booking er høy barriere. Et kontaktformular gir oss en lettere inngang for spørsmål, tilbudsforespørsler og generelle henvendelser.

**Filer:** `_pages/kontakt.md` (ny), `_includes/contact-form.html` (ny).

**Samtykke:** Samme som F4a.

### F4c — Stegside-berikelse

**Hva:** Legg til brødtekst og CTA på stegsidene (Samtale/Intervju/Rapport). Disse sidene har i dag kun et bilde hver — ingen tekst, ingen neste-steg-lenker, ingen call-to-action.

**Hvorfor:** Stegsidene er en naturlig del av trakten (besøkende som er nysgjerrige nok til å klikke seg inn på prosessen). Uten innhold går de i en blindvei.

**Filer:** `_pages/samtale.md`, `_pages/intervju.md`, `_pages/rapport.md`

### F4d (fremtidig) — Artikkelanbefalinger

Når F4a er på plass og vi har grunnleggende innsamling, implementer «neste artikkel»-anbefalinger på bunnen av hver side. Dette er en enkel cross-link-funksjon (manuelt eller via frontmatter-vekter), ikke en ML-algoritme.

## Datalagring (alle sub-features)

Innsamlet data (epostadresser, kontakthenvendelser) må sendes til en godkjent ekstern eller server-side tjeneste og må aldri committes til eller serveres fra dette repo. Bruk en egnet leverandør (f.eks. Mailchimp, HubSpot, eller egen API-løsning) med VPN/SSL og samtykkehåndtering.

**Sikkerhetshensyn:**
- Ingen epostadresser committes til repo ved en feil (`.gitignore` for sensitive datafiler)
- Samtykke lagres med hver post
- Datalagring skjer kun i ekstern tjeneste

## Dependencies

- F4a og F4b deler datalagringsmekanisme — kan utvikles samtidig
- F4c er uavhengig
- F4d forutsetter F4a

## Acceptance Criteria

- [ ] Nyhetsbrev-skjema vises på bunnen av hver artikkel og på forsiden
- [ ] Samtykke-avkrysning er påkrevd før innsending
- [ ] `/kontakt/`-side eksisterer med fungerende skjema
- [ ] Stegsidene (Samtale/Intervju/Rapport) har brødtekst og CTA
- [ ] Innsamlet data sendes til ekstern tjeneste — ingen lagring i repo
- [ ] Jekyll build exit 0
