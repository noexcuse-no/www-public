# Feature: Om Oss Improvements

> Status: Planned | BL: G2

## Problem

Om Oss-siden er tynn for et konsulentselskap. Den mangler lenke til metodikksiden, og JSON-LD mangler `PostalAddress`.

## Feature Components

### F2a — Metode-lenke på Om Oss

**Hva:** Legg til en seksjon «Slik jobber vi» på `_pages/om_oss.md` som oppsummerer metodikken og lenker til `/metode/`.

**Hvorfor:** `/metode/` er nettstedets faglige tyngdepunkt med teori, referanser og forskningsetikk, men er ikke referert fra Om Oss. For en besøkende som vurderer troverdighet, er lenken mellom «Hvem er vi» og «Hvordan jobber vi» kritisk.

**Filer:** `_pages/om_oss.md`

### F2b — PostalAddress i JSON-LD

**Hva:** Legg til `PostalAddress` i Organization-schemaet i `_pages/om_oss.md` sitt `json_ld`-frontmatter.

**Hvorfor:** Crawlere får i dag ingen strukturert adresse. «Oslo, Norge» står kun i footer-tekst. Strukturert adresse påvirker lokal søkesynlighet.

**Filer:** `_pages/om_oss.md`

### F2c (strøket fra tidligere analyse)
- ~~Flere teammedlemmer~~ — utsatt
- ~~Casestudier~~ — dekkes av C1-C4
- ~~Attester/testimonials~~ — utsatt
- ~~Partnerlogoer~~ — utsatt
- ~~FAQ~~ — utsatt

## Dependencies

- Ingen — begge komponenter er isolerte endringer i `_pages/om_oss.md`

## Acceptance Criteria

- [ ] Om Oss har en «Slik jobber vi»-seksjon med oppsummering av metodikken og lenke til `/metode/`
- [ ] Organization JSON-LD på Om Oss inneholder `address` med `PostalAddress`-type, `addressLocality`, `addressCountry`
- [ ] Jekyll build exit 0
