# Inbound Sales / Visitor Flow — Functional Specification

## Purpose and Scope

Map the visitor journey from first page view to booked conversation and ultimately to paid invoice. Define analytics instrumentation, UTM conventions, funnel definitions, and event tracking so that No Excuse AS can attribute inbound marketing efforts to real outcomes.

This spec covers **C4 — Visitor Flow / Inbound Sales Journey** in the backlog.

## Three-Layer Funnel Architecture

| Layer | Tool | Signal | Status |
|-------|------|--------|--------|
| 🟢 Top (awareness) | Simple Analytics | Sidevisninger, UTM-kampanjer, henvisningskilder, scroll-dybde | ✅ Allerede deployet (basisscript) |
| 🟡 Middle (consideration) | Simple Analytics + Microsoft Bookings | CTA-klikk → bookingside → booket samtale | 🟡 Delvis — auto-events mangler |
| 🔴 Bottom (conversion) | Fiken (fremtidig) | Booket samtale → betalende kunde (faktura) | 🔴 Fremtidig — krever ekstern tjeneste |

## Requirements

### 1. UTM-sporing

- Alle eksterne kampanjelinker må inneholde `utm_source`, `utm_medium`, `utm_campaign`
- Simple Analytics fanger disse automatisk via URL-parameterne

**Konvensjon:**

| Parameter | Tillatte verdier | Eksempel |
|-----------|-----------------|----------|
| `utm_source` | `linkedin`, `newsletter`, `google`, `referral`, `direct` | `utm_source=linkedin` |
| `utm_medium` | `social`, `email`, `cpc`, `organic`, `referral` | `utm_medium=social` |
| `utm_campaign` | kebab-case: `<produkt>-<år>-<mnd>` | `utm_campaign=ledelse-60-2-2026-05` |
| `utm_content` | `hero`, `cta-primary`, `cta-secondary`, `banner`, `footer` | `utm_content=cta-primary` |

### 2. Simple Analytics Goals (Funnels)

Opprett følgende flertrinns-funnels i Simple Analytics-dashbordet:

| Funnel | Steps | Mål |
|--------|-------|-----|
| **Produkt → Booking** | Forsiden → Ledelse 60:2 → Book samtale | Hvor mange når bookingsida? |
| **Artikkel → Booking** | `/struktur/` eller `/mennesker/` → Ledelse 60:2 → Book samtale | Hvilke artikler driver flest bookinger? |
| **Kampanje → Booking** | UTM-kampanje → Book samtale | Hvilke kanaler konverterer best? |
| **Full trakt (fremtidig)** | Book samtale → Betaling | Hvor mange bookinger blir kunder? |

### 3. Automatiske events (auto-events.js)

Legg til `auto-events.js`-scriptet for å fange:
- **Outbound linker:** Klikk til LinkedIn, andre eksterne sider
- **E-postklikk:** `mailto:firmapost@noexcuse.no`
- **Nedlastinger:** PDF-filer (avtale, rapporter)

### 4. Egendefinerte events

Spor følgende interaksjoner som egne events via Simple Analytics Events API:

| Event | Trigger | Metadata |
|-------|---------|----------|
| `cta_book_samtale` | Klikk på "Bestill uforpliktende prat" | `page: current path` |
| `cta_book_60-2` | Klikk på "Bestill Ledelse 60:2" | `page: current path` |
| `cta_les_mer` | Klikk på "Les mer →" på benefit-kort | `page: current path, card: benefit name` |
| `profile_expand` | Utvidelse av profil-kort | `profile: name` |

### 5. Microsoft Bookings som konverteringsmål

- Bookings-sidens URL defineres som et funnel-trinn i Simple Analytics Goals
- Når en besøkende når Bookings-siden telles det som en konvertering (midt i trakten)
- Bookings-lenker på tvers av nettstedet må ha konsistent `target="_blank"` og kunne spores

### 6. Fiken-integrasjon (fremtidig)

- Når Fiken API v2 er tilgjengelig: opprett en webhook eller periodisk jobb (Zapier / Make / Cloud Function) som:
  - Fanger nye fakturaer opprettet i Fiken
  - Matcher fakturaens kundenavn mot bookinger i Bookings
  - Rapporterer full trakt: besøk → booket samtale → betalende kunde
- **Designbeslutning:** Jekyll er statisk — Fiken-integrasjonen krever en ekstern tjeneste. Dette er en fremtidig forbedring, ikke en blocker for C4.

## Data Structures

### UTM-konvensjon (kampanje-URL-mal)

```text
https://noexcuse.no/landing?utm_source={source}&utm_medium={medium}&utm_campaign={campaign}&utm_content={content}
```

### Simple Analytics Goal-definisjon (JSON)

```json
{
  "goal": "Produkt til Booking",
  "steps": [
    { "path": "/", "label": "Home" },
    { "path": "/ledelse-60-2/", "label": "Product page" },
    { "path": "/booking/", "label": "Booking page" }
  ],
  "funnel": true
}
```

## Dependencies

- **C1 (Case Planning):** Case-innhold brukes som bakgrunn for traktanalyse — hvilke sider/caser som driver mest trafikk
- **Simple Analytics:** Allerede installert (`latest.js`). `auto-events.js` må legges til
- **Microsoft Bookings:** Allerede i bruk — ingen endringer nødvendig på Bookings-siden
- **Ingen designendringer:** C4 er ren analytics-konfigurasjon, ingen visuelle endringer på nettstedet

## Implementation Order

1. Legg til `auto-events.js` i `_includes/scripts.html`
2. Opprett UTM-konvensjon-dokument for internt bruk
3. Definer Simple Analytics Goals i dashbordet (funnels)
4. Implementer egendefinerte events på CTA-knapper
5. Dokumentér alle events og målinger i denne spec-fila
6. (Fremtidig) Koble Fiken API for full trakt-rapportering
