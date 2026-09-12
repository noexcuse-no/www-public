# Inbound Sales / Visitor Flow — Functional Specification

> **Superseded by `.specs/analytics-events/README.md` for event vocabulary and funnel architecture.** This spec retains UTM conventions, auto-events, and Simple Analytics goals as the implemented technical contract.

## Purpose and Scope

Define analytics instrumentation, UTM conventions, and event tracking so that No Excuse AS can attribute inbound marketing efforts to visitor outcomes.

This spec covers **C4 — Visitor Flow / Inbound Sales Journey** in the backlog.

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

### 3. Automatiske events (auto-events.js)

Legg til `auto-events.js`-scriptet for å fange:
- **Outbound linker:** Klikk til LinkedIn, andre eksterne sider
- **E-postklikk:** `mailto:firmapost@noexcuse.no`
- **Nedlastinger:** PDF-filer (avtale, rapporter)

### 4. Egendefinerte events

> **Superseded by `.specs/analytics-events/README.md` (2026-08-30).** The 15-event vocabulary replaces ad-hoc events. See `.specs/analytics-events/README.md` for the authoritative event model.

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

- **Simple Analytics:** Allerede installert (`latest.js`). `auto-events.js` må legges til
- **Ingen designendringer:** C4 er ren analytics-konfigurasjon, ingen visuelle endringer på nettstedet

## Implementation Order

1. Legg til `auto-events.js` i `_includes/scripts.html`
2. Opprett UTM-konvensjon-dokument
3. Definer Simple Analytics Goals i dashbordet (funnels)
4. Implementer egendefinerte events på CTA-knapper
5. Dokumentér alle events og målinger i denne spec-fila
