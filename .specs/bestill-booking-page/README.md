# bestill-booking-page — Feature Specification

> Status: Ready
> Strategy source: `.design/inbound-strategy.md` §7, §6, §2
> Backlog: P0 (todo 9)

## Purpose / Problem

The site currently sends visitors straight to the external Microsoft Bookings scheduler, which owns none of the commercial context (price, fit, privacy, reassurance). The strategy requires the site to own the whole commercial story on a checkout-like decision page at `/bestill/ledelse-60-2/`, with MS Bookings demoted to background time-selection. A qualified visitor should be able to decide and book without leaving the site's commercial narrative.

## Scope

- `_pages/bestill_ledelse-60-2.md` — new page, permalink `/bestill/ledelse-60-2/`, class `product-booking`
- Route A block (price card + ✓-checklist + steps)
- Route B fallback block (gated by `route_b_live`)
- "Hva skjer etter bestilling?" + Dagfinn practitioner module + privacy link + extras note
- Shared price-card include from `.specs/product-signature/README.md`

## Acceptance Criteria

- [ ] Route A block: price card (kr 14 850,- eks. mva via shared source) + ✓-inclusions + "Ingen binding til videre rådgivning."
- [ ] ✓-inclusions: 60 diagnostiske spørsmål · inntil fem ledere · to timer · analyse · prioriterte funn og anbefalinger · rapport innen én uke
- [ ] Steps: 1. Velg tidspunkt (→ MS Bookings embed/link) · 2. Kontaktinformasjon · 3. Bekreft
- [ ] "Ikke sikker ennå? [Book en gratis 20-minutters avklaring]" (Route B)
- [ ] "Hva skjer etter bestilling? Dagfinn tar kontakt for å bekrefte deltakere og praktiske forhold."
- [ ] Practitioner module (Dagfinn) present
- [ ] Privacy link present
- [ ] Extras note: reise utenfor Oslo-omegn, spesiell tilpasning, >5 deltakere → avklaring
- [ ] Route A/B definitions documented
- [ ] Staging flag `route_b_live` (frontmatter, default false) — Route B blocks render only when true
- [ ] Other pages read the flag via `{% assign bestill = site.pages | where: "permalink", "/bestill/ledelse-60-2/" | first %}` → `bestill.route_b_live`
- [ ] Dark mode tested
- [ ] Mobile layout tested

## Route A / Route B

- **Route A (primary):** "Bestill Ledelse 60:2" → /bestill/ledelse-60-2/ → price + inclusions + steps → MS Bookings (time selection) → confirmation
- **Route B (secondary):** "Book 20 min avklaring" → /samtale/ → MS Bookings (avklaring service) → clarification conversation

## Staging Flag

`route_b_live: false` in frontmatter (default). Route B blocks render only when true. Todos 9 and 12 use this single mechanism. The flag flips in a follow-up commit once the user confirms the 20-min Bookings service exists.

## Prerequisite

20-min Bookings service exists in MS Bookings (user-owned). If not present, implement everything except Route B CTAs and record the blocker.

## Design Constraints

- Touch targets: minimum 44×44px
- Use CSS variables from `colors.css`
- Both themes
- Norwegian Bokmål
- No inline styles/handlers/scripts
- No iframes that break CSP/privacy rules
- No forms collecting personal data on-site (Bookings handles contact data)

## Dependencies

- `.specs/product-signature/README.md` (price card, shared components)
- `.specs/product-page-offer/README.md` (price source)
- `.design/inbound-strategy.md` (strategy)
