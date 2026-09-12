# product-signature — Feature Specification

> Status: Ready
> Strategy source: `.design/inbound-strategy.md` §11, §6, §2
> Backlog: P0 (todo 7)

## Purpose / Problem

The strategy defines a distinctive visual signature for Ledelse 60:2 — the "60/2/4" mechanism (60 spørsmål · 2 timer · 4 perspektiver) — plus shared components (recognition cards, four-perspective interactive, reusable CTA panel, price card) that multiple commercial surfaces reuse. These shared components must be built once and consumed by the homepage, product page, and /bestill/ page so the commercial story is consistent.

## Scope

- 60/2/4 visual object (extends `_includes/stat-bridge.html`)
- Recognition cards (2×2)
- Four-perspective interactive component
- Reusable CTA panel (with Dagfinn thumbnail)
- Price card (shared, single price source)

## Acceptance Criteria

- [ ] 60/2/4 visual object implemented (extends stat-bridge)
- [ ] Recognition cards (2×2) implemented
- [ ] Four-perspective interactive component implemented
- [ ] Reusable CTA panel with Dagfinn thumbnail implemented
- [ ] Price card implemented, rendering from single source (`_data/commercial.yml`)
- [ ] Components consumed by homepage, product page, /bestill/ page
- [ ] Dark mode tested
- [ ] Mobile layout tested

## The 60/2/4 Visual Object

The branded signature: **60 spørsmål · 2 timer · 4 perspektiver**. Extends the existing `_includes/stat-bridge.html` component. Used beneath the hero on the homepage and on the product page.

## Recognition Cards (2×2)

"Kjenner dere igjen noe av dette?" — 4–6 sharp symptoms in a 2×2 grid. Reuse existing sharp copy (e.g. "Du har hatt den samme diskusjonen tre ganger denne måneden."). Used on the homepage (section 2) and buying-situation pages.

## Four-Perspective Interactive

An interactive component letting visitors explore the four perspectives (Struktur, Mennesker, Påvirkning, Identitet) — the diagnosis-before-intervention category differentiation.

## Reusable CTA Panel

"Usikker på om 60:2 passer?" + 2–3 reassurance points (independent diagnosis, no lock-in, customer owns findings) + "Book 20 min" CTA (Route B → /samtale/). Includes Dagfinn thumbnail. Used on /bestill/ and /foredrag-og-media/.

## Price Card

Shared price card rendering from `_data/commercial.yml` (single source). Shows kr 14 850,- eks. mva + inclusions + Bestill CTA + "Usikker? Book 20 min avklaring →". Used on product page, /bestill/, and homepage commercial-info section.

## Design Constraints

- Touch targets: minimum 44×44px
- Use CSS variables from `colors.css`
- Both themes
- Norwegian Bokmål
- No inline styles/handlers/scripts

## Dependencies

- `.specs/homepage-repositioning/README.md` (consumer)
- `.specs/product-page-offer/README.md` (consumer)
- `.specs/bestill-booking-page/README.md` (consumer)
- `.specs/founder-credibility/README.md` (CTA panel)
- `.design/inbound-strategy.md` (strategy)
