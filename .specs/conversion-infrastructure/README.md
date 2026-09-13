# Feature: Conversion Infrastructure

> Status: Planned | BL: G4

## Problem

Nettstedet har innhold (artikler) og bestilling (Outlook-booking), men mangler
mellomsteg: ingen epostinnsamling, ingen kontaktformular, ingen ressursnedlasting,
ingen anbefalinger. Besøkende leser en artikkel og har ingen steg-2-handling.

## Sub-features

### F4a — Epostinnsamling (Newsletter)

**Hva:** Legg til et enkelt epost-skjemafelt på bunnen av hver artikkel og på forsiden. Epost lagres via en godkjent ekstern tjeneste — aldri i repo.

**Filer:** `_includes/newsletter-signup.html` (ny), `_layouts/article.html` (inkluder), `index.md` (inkluder ved stat-bridge).

**Samtykke:** Ett avkrysningsfelt for «Jeg samtykker til at No Excuse lagrer min epost for nyhetsbrev» (jf. GDPR art. 7). Lenke til personvernside.

### F4b — Kontaktformular

**Status:** Superseded 2026-08-30 (strategy alignment). The contact form was removed in favor of direct booking via `/bestill/` (the site owns the commercial context; booking acts as the background scheduler). No contact form is planned; the feature is closed.

**Filer:** None (former `_pages/kontakt.md` and `_includes/contact-form.html` removed).

### F4c — Stegside-berikelse

**Hva:** Brødtekst og CTA på stegsidene (Samtale/Intervju/Rapport). Disse sidene
har i dag kun et bilde hver — ingen tekst, ingen neste-steg-lenker, ingen
call-to-action.

**Filer:** `_pages/samtale.md`, `_pages/intervju.md`, `_pages/rapport.md`

### F4d (fremtidig) — Artikkelanbefalinger

Når F4a er på plass: «neste artikkel»-anbefalinger på bunnen av hver side.
Enkel cross-link-funksjon (manuelt eller via frontmatter-vekter), ikke en
ML-algoritme.

## Datalagring (alle sub-features)

Innsamlet data (epostadresser, kontakthenvendelser) må sendes til en godkjent ekstern eller server-side tjeneste og må aldri committes til eller serveres fra dette repo. Bruk en egnet leverandør (f.eks. Mailchimp, HubSpot, eller egen API-løsning) med VPN/SSL og samtykkehåndtering.

**Sikkerhetshensyn:**
- Ingen epostadresser committes til repo ved en feil (`.gitignore` for sensitive datafiler)
- Samtykke lagres med hver post
- Datalagring skjer kun i ekstern tjeneste

## Dependencies

- F4a og F4b deler datalagringsmekanisme — kan utvikles samtidig (F4b er imidlertid superseded, se over)
- F4c er uavhengig
- F4d forutsetter F4a

## Acceptance Criteria

- [ ] Nyhetsbrev-skjema (F4a) vises på bunnen av hver artikkel og på forsiden, hvis/viss F4a bygges
- [ ] Samtykke-avkrysning er påkrevd før innsending (F4a)
- [ ] Stegsidene (Samtale/Intervju/Rapport) har brødtekst og CTA (F4c)
- [ ] Innsamlet data sendes til ekstern tjeneste — ingen lagring i repo
- [ ] Jekyll build exit 0
