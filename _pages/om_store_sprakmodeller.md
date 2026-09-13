---
title: "Om store språkmodeller og KI på noexcuse.no"
description: "No Excuse AS sin prinsippbaserte tilnærming til bruk av store språkmodeller og generativ KI i produksjon, utvikling og forskning. Redaksjonelt ansvar, opphavsrett, proveniens og rettigheter."
permalink: /om-store-sprakmodeller/
layout: page
lang: no
published: true
---

# Om store språkmodeller og KI på noexcuse.no

No Excuse AS bruker store språkmodeller (LLM) og generativ KI som **produksjons-, utviklings- og forskningsverktøy**. Denne siden beskriver våre prinsipper for KI-bruk — ikke interne operasjonelle detaljer.

## Prinsipper

1. **KI som verktøy, ikke avgjørende instans**  
   Store språkmodeller brukes som assisterende verktøy i produksjon, utvikling og forskning. Alle avgjørelser som påvirker kunder, leveranser eller publisert innhold tas av mennesker med redaksjonelt ansvar.

2. **Blandet opphav — tydelig skillelinje**  
   Innhold på noexcuse.no fallder i tre kategorier:
   - **Rent KI-generert**: Visse tekster, bilder eller kode er opprettet uten menneskelig redigering (merkvedlegg).
   - **KI-assistert, vesentlig menneskeskapt**: KI bidrar med utkast, forslag, refaktorisering — mennesker godkjenner, redigerer og tar ansvar.
   - **Fullt menneskeskapt**: Innhold opprettet uten KI-assistans.

   Kategori tilhørighet er dokumentert per ressurs (se under), ikke via blanket-påstander.

3. **Redaksjonelt ansvar forblir hos No Excuse AS**  
   Uavhengig av KI-bruk, hviler redaksjonelt ansvar for publisert innhold hos No Excuse AS. KI-bruk reduserer ikke eller flytter dette ansvaret.

4. **KI-bruk bestemmer ikke opphavsrett eller lisensiering**  
   Bruk av KI i opphavsprosessen endrer ikke opphavsrettsforholdene. Lisensiering og rettigheter styrer av separate avtaler og per-ressurs metadata — ikke av om KI ble brukt i prosessen.

5. **Proveniens og rettigheter registreres per ressurs**  
   Vi foretrekker per-ressurs metadata (se `/.well-known/ai-transparency.json` og bilde-/kode-metadata) fremfor blanket-antagelser om hele nettstedet. Hver ressurs bærer sin egen proveniensdeklarasjon.

6. **Ingen internt operasjonelt detaljnivå offentliggjort**  
   Følgende publiseres **ikke**: interne promt-detaljer, agente-instruksjoner, modellvalgsforhandlinger, estimert % KI-bidrag per ressurs, internt gjennomgangsfeil, uutgitte utkast, kommersiell resonnement, konfidensielle arbeidsflyter, eller uttømmende verktøylogger.

## Hvor finner du per-ressurs informasjon?

- **AI-transparensmanifest**: [`/.well-known/ai-transparency.json`](/well-known/ai-transparency.json) — maskinlesbar oversikt over KI-bruk per rute, verktøy, digitalSourceType, redaksjonell gjennomgang.
- **Bildemetadata**: Alle 186 WebP-bilder bærer IPTC/XMP `DigitalSourceType` (TrainedAlgorithmicMediaDigitalSource), lisens (CC0), og opphavsrett i EXIF/XMP.
- **Kodemetadata**: CSS, JavaScript og HTML-templates som er KI-generert har `digitalSourceType` og redaksjonell gjennomgangsstatus i ai-transparency.json.
- **Tekst**: Per-rute deklarasjoner i ai-transparency.json med `editorialReview`-status.

## Relaterte sider

- **Personvern**: [/personvern/](/personvern/) — databehandling, kunders rettigheter, samtykke.
- **Avtalevilkår**: [/avtale/](/avtale/) — kommersielle vilkår, leveranseansvar.
- **Generativ KI-ledelse**: [/generativ-ki/](/generativ-ki/) — hvordan ledere bruker KI som verktøy.

## Oppdateringslogg

| Dato | Endring |
|------|---------|
| 2026-09-11 | Første publiserte versjon (placeholder for ai-act sibling side) |

---

*Denne siden er en prinsippbasert seed-side som vil bli videreutviklet av ai-act sibling-planen til den endelige `/om-store-sprakmodeller/`-siden. Prinsippene over er bindende for No Excuse AS.*