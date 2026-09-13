# Inbound Sales / Visitor Flow — Functional Specification

> **Superseded by `.specs/analytics-events/README.md` for event vocabulary and funnel architecture.** This spec retains UTM conventions, auto-events, and Simple Analytics goals as the implemented technical contract.

## Purpose and Scope

Define the technical telemetry contract for visitor behavior on noexcuse.no:
analytics instrumentation, UTM-sporing, egendefinerte events,
lenke-instrumentering og personvernkrav. Formålet er at besøksatferd kan
tilskrives faktiske utfall.

This spec covers **C4 — Visitor Flow / Inbound Sales Journey** in the backlog.

## Analytics-hook

- Simple Analytics-basisscriptet er inkludert i `_includes/scripts.html`
  (linje 1): `<script async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>`
- Sidevisninger fanges automatisk

## UTM-sporing

- Alle eksterne kampanjelinker må inneholde `utm_source`, `utm_medium`, `utm_campaign`
- Simple Analytics fanger disse automatisk via URL-parameterne

**Konvensjon:**

| Parameter | Tillatte verdier | Eksempel |
|-----------|-----------------|----------|
| `utm_source` | `linkedin`, `newsletter`, `google`, `direct` | `utm_source=linkedin` |
| `utm_medium` | `social`, `email`, `cpc`, `organic` | `utm_medium=social` |
| `utm_campaign` | kebab-case: `<produkt>-<år>-<mnd>` | `utm_campaign=ledelse-60-2-2026-05` |
| `utm_content` | `hero`, `cta-primary`, `cta-secondary`, `banner`, `footer` | `utm_content=cta-primary` |

## Egendefinerte events

Spor følgende interaksjoner som egne events via Simple Analytics Events API:

| Event | Trigger | Metadata |
|-------|---------|----------|
| `cta_book_samtale` | Klikk på "Bestill uforpliktende prat" | `page: current path` |
| `cta_book_60-2` | Klikk på "Bestill Ledelse 60:2" | `page: current path` |
| `cta_les_mer` | Klikk på "Les mer →" på benefit-kort | `page: current path, card: benefit name` |
| `profile_expand` | Utvidelse av profil-kort | `profile: name` |

> **Superseded by `.specs/analytics-events/README.md` (2026-08-30).** The 15-event vocabulary replaces ad-hoc events. See `.specs/analytics-events/README.md` for the authoritative event model.

## Lenke-instrumentering

- **E-postklikk:** `mailto:firmapost@noexcuse.no` (i `_includes/share-section.html`,
  `_includes/profiles.html`)
- **Eksterne lenker:** konsistent `target="_blank"` med `rel="noopener"` på tvers
  av nettstedet (partnere, profiler, deling)
- **Nedlastinger (fremtidig):** PDF-filer (avtale, rapporter) via egendefinerte events

## Personvern

- Telemetri følger `.specs/privacy/README.md`
- Ingen personopplysninger committes til eller serveres fra dette offentlige repoet
- Innsendt data går til godkjent ekstern/tjenerside-prosessor
  (se `.specs/conversion-infrastructure/README.md`)

## Simple Analytics Goals (Funnels)

Opprett følgende flertrinns-funnels i Simple Analytics-dashbordet:

| Funnel | Steps | Mål |
|--------|-------|-----|
| **Produkt → Booking** | Forsiden → Ledelse 60:2 → Book samtale | Hvor mange når bookingsida? |
| **Artikkel → Booking** | `/struktur/` eller `/mennesker/` → Ledelse 60:2 → Book samtale | Hvilke artikler driver flest bookinger? |
| **Kampanje → Booking** | UTM-kampanje → Book samtale | Hvilke kanaler konverterer best? |

## Automatiske events (auto-events.js)

Legg til `auto-events.js`-scriptet for å fange:
- **Outbound linker:** Klikk til LinkedIn, andre eksterne sider
- **E-postklikk:** `mailto:firmapost@noexcuse.no`
- **Nedlastinger:** PDF-filer (avtale, rapporter)

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

- **Simple Analytics:** Allerede installert (`latest.js` i `_includes/scripts.html`)
- **Microsoft Bookings:** Allerede i bruk
- **Ingen designendringer:** C4 er ren telemetri-/konfigurasjonsarbeid, ingen
  visuelle endringer på nettstedet

## Implementation Order

1. Legg til `auto-events.js` i `_includes/scripts.html`
2. Opprett UTM-konvensjon-dokument
3. Definer Simple Analytics Goals i dashbordet (funnels)
4. Implementer egendefinerte events på CTA-knapper
5. Dokumentér alle events og målinger i denne spec-fila