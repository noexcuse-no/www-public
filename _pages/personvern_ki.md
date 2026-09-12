---
layout: page
title: "Personvern for AI-refleksjon"
description: "Hva skjer når du bruker AI-refleksjonsverktøyet på noexcuse.no? Hva forlater nettstedet, hva logger vi, og hva mottar KI-leverandøren?"
permalink: /personvern-ki/
---

# Personvern for AI-refleksjon

Denne siden forklarer i enkelt språk hva som skjer når du bruker «Utforsk dette privat med din egen KI»-funksjonen på noexcuse.no. Den juridiske personvernerklæringen finner du på [/personvern/](/personvern/).

---

## 1. Hva knappen gjør

Når du klikker på et emne under «Utforsk dette privat med din egen KI», skjer følgende:

1. Vi bygger en prompt (en oppgavebeskrivelse) som inneholder:
   - Emnet du valgte (f.eks. «Uklare beslutningsroller»)
   - Et åpne spørsmål knyttet til emnet
   - Lenke til siden du står på (kilde-URL)
   - Lenke til Ledelse 60:2-siden
   - En felles meta-prompt med 8 regler for kritisk refleksjon

2. Du velger hvilken KI-tjeneste du vil bruke (ChatGPT, Claude, Gemini, Copilot, Perplexity, DeepSeek, Grok).

3. Vi kopierer prompten til utklippstavlen din **og** åpner KI-tjenesten i en ny fane.

**Ingen samtaleinnhold sendes til noexcuse.no.** Samtalen foregår helt mellom deg og KI-tjenesten din.

---

## 2. Hva forlater noexcuse.no

| Data | Beskrivelse |
|------|-------------|
| Side-URL | Hvilken side du var på da du klikket |
| Tidspunkt | Når du klikket |
| Valgt emne | Hvilket av de 3 emnene du valgte |
| At prompten ble kopiert | Faktum at du kopierte prompten (ikke innholdet) |
| Retur til noexcuse.no | Om du senere kommer tilbake via `?ref=ai-retur` |

**Vi ser ALDRI:**
- Samtalen din med KI-en
- Svarene dine
- Personopplysninger du velger å dele med KI-en
- Forretningshemmeligheter du deler

---

## 3. Hva No Excuse logger

Vi logger kun **hendelsesmetadata** (ikke samtaleinnhold) via Simple Analytics:

| Hendelse | Hva registreres |
|----------|-----------------|
| `ai_topic_selected` | Hvilket emne ble valgt + side-URL |
| `ai_prompt_copied` | At prompten ble kopiert (ikke innholdet) |
| `ai_return` | At du kom tilbake via `?ref=ai-retur` (kun side-URL) |

**Ingen cookies brukes.** IP-adresser anonymiseres umiddelbart. Data lagres i EU.

---

## 4. Hva No Excuse ALDRI mottar

- Samtalen din med KI-en
- Svarene dine
- Personopplysninger du velger å dele med KI-en
- Forretningshemmeligheter du deler
- Rå transkript av samtalen

---

## 5. Hva KI-leverandøren din kan motta

Når du limer inn prompten i KI-tjenesten din, mottar leverandøren:

- Hele prompten (inkludert emne, spørsmål, kontekst-URLer, meta-prompt)
- Eventuelle oppfølgingsspørsmål og svar du skriver i samtalen
- Eventuelle personopplysninger **du selv velger å dele** i samtalen

Vi har **ingen kontroll** over hva KI-leverandøren lagrer eller bruker dataene til. Vi anbefaler at du bruker virksomhetens godkjente KI-tjeneste og **aldri deler personopplysninger, forretningshemmeligheter eller annen informasjon du ikke ville delt med den tjenesten ellers.**

---

## 6. Analyse (Simple Analytics)

Vi bruker Simple Analytics for anonymiserte besøksstatistikk. Se [Personvernerklæringen](/personvern/#analyse-og-statistikk-simple-analytics) for detaljer.

---

## 7. Forskning

Vi deltar **ikke** i forskning som involverer lagring eller analyse av AI-samtaler. Eventuell fremtidig forskning vil kreve separat, eksplisitt samtykke fra deg (default: ingen samtykke, ingen rå transkript).

---

## 8. Kontakt / Personvernrettigheter

Har du spørsmål til vår behandling av personopplysninger i forbindelse med AI-refleksjonen? Ta kontakt på [ledelse@noexcuse.no](mailto:ledelse@noexcuse.no).

Du har de samme rettighetene som beskrevet i [Personvernerklæringen](/personvern/#dine-rettigheter): innsyn, retting, sletting, begrensning, dataportabilitet, og rett til å trekke tilbake samtykke.

---

## Sammendrag: Tre-boks oversikt

| No Excuse ser | No Excuse ser **ikke** | KI-tjenesten din ser |
|---------------|------------------------|----------------------|
| Sidebruk (side, tidspunkt) | Samtalen med KI-en | Hele samtalen |
| Valgt tema | Svarene dine | Dine svar og resonnering |
| At promptet er kopiert | Personopplysninger du velger å dele | Eventuelle personopplysninger du deler |
| Retur til noexcuse.no | Forretningshemmeligheter | — |

**Husk:** «Samtalen deles ikke med No Excuse» — ikke «samtalen er privat.» Vi har ingen tilgang til samtalen din.