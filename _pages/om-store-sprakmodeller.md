---
provenance:
  creation: editorial
  editorial_review: human
  editorial_responsibility: No Excuse AS
layout: page
title: "Om KI"
permalink: /om-store-sprakmodeller/
description: "Hvordan noexcuse.no bruker store språkmodeller — begrenset, redaksjonelt ansvarlig, og aldri til analyse eller anbefalinger."
---

# Om KI på noexcuse.no

## Terminologisk forbehold

Vi bruker begrepet **kunstig intelligens (KI)** som et felles uttrykk for det publikum kjenner. Det teknisk korrekte begrepet er **store språkmodeller (LLM-er)**. "KI" antyder en form for intelligens eller bevissthet som disse modellene ikke har — de er statistiske system for tekstsyntese.

Vi bruker **aldri** formuleringen "i arbeidet vårt" om LLM-er. Det antyder at modellene er en integrert del av vår faglige praksis, noe de ikke er.

## Begrenset bruk

LLM-er brukes **kun** i støttende og pyntende roller:

- **Tekstgenerering:** Utkast til artikkelinnledninger, meta-beskrivelser, sosiale medier-tekster — alltid redigert og kvalitetssikret av mennesker.
- **Kodeassistanse:** Boilerplate, refaktorisering, testutkast — alltid revidert av utviklere.
- **Bildegenerering:** Illustrasjoner, banner, ikoner via EvoLink GPT Image 2 — alltid kuratert og godkjent av redaksjon.
- **Forskningssammendrag:** Oppsummering av lange dokumenter som utgangspunkt for egen analyse — aldri som erstatning for egen lesing.

**LLM-er brukes ALDRI til:**
- Å stille spørsmål til ledere eller medarbeidere
- Å gjøre analyser av organisasjonskultur, ledelse eller risiko
- Å formulere anbefalinger, strategier eller handlingsplaner
- Å vurdere evidens, trekke konklusjoner eller ta avgjørelser

Disse oppgavene er **eksklusivt menneskelige** — de krever dommekraft, kontekstuell forståelse og etisk ansvar som LLM-er ikke har.

## Hva vi bruker

| Oppgave | Verktøy | Rolle |
|---------|---------|-------|
| Tekstutkast, meta-beskrivelser | Claude, GPT-4 | Støttende |
| Kodeboilerplate, refaktorisering | Claude, GitHub Copilot | Støttende |
| Illustrasjoner, banner, ikoner | EvoLink GPT Image 2 | Pyntende |
| Forskningssammendrag | Claude | Støttende |

## Redaksjonell gjennomgang

**Allt** LLM-generert materiale går gjennom menneskelig redaksjonell gjennomgang før publisering. Ingen tekst, kode eller bilder publiseres uten at en ansvarlig redaktør har lest, vurdert og godkjent det.

**Redaksjonelt ansvarlig:** Dagfinn Bang-Johansen (CEO), dagfinn@noexcuse.no

Ansvar omfatter:
- Godkjenning av all publisert innhold
- Sikring av at LLM-bruk forblir i støttende/pyntende rolle
- At ingen anbefalinger, analyser eller spørsmål genereres av LLM-er

## Åpenhetspipeline

Vi dokumenterer vår LLM-bruk maskinlesbart på flere nivåer:

1. **Per-side JSON-LD** i `<head>`: `digitalSourceType` per side (`editorial`, `human-created`, `ai-generated`).
2. **Per-bilde JSON-LD + RDFa:** AI-genererte bilder mærkes med `digitalSourceType: TrainedAlgorithmicMediaDigitalSource` + `license: CC0-1.0`.
3. **Transparensmanifest:** `/.well-known/ai-transparency.json` med full oversikt over redaksjonell ansvar, AI-bruk per side, og bilder.
4. **EU AI Act-basisk ikon:** I header-banner, med lenke til denne siden.
5. **IPTC/XMP i bildefiler:** `DigitalSourceType`, `Rights`, `WebStatement` inni WebP-filer.

## EU AI Act — Artikkel 50(4) unntak

Vi påstår at innholdet på noexcuse.no faller under **redaksjonelt unntaket** i Artikkel 50(4) av EU AI Act:

- Allt innhold er **menneskelig redaksjonelt gjennomgått**.
- LLM-er brukes **kun i støttende/pyntende rolle**.
- Ingen innhold er "dypt forfalskning" (deepfake) — ingen bilder ligner på reale personer/steder.
- Vi påtar oss fullt redaksjonelt ansvar.

Dette unntaket gjelder for **både tekst og bilder** — vi skiller ikke mellom dem i vår offentliggjøringspraksis.

## Kontakt

Ved spørsmål om vår bruk av KI/LLM, kontakt:

**Dagfinn Bang-Johansen**  
CEO, No Excuse AS  
dagfinn@noexcuse.no

---

*Denne siden er en del av vår EU AI Act-forberedelse. Sist oppdatert: {{ site.time | date: "%Y-%m-%d" }}.*