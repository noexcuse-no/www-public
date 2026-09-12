# product-page-offer — Feature Specification

Status: Ready
> **Strategy source:** `.design/inbound-strategy.md` §6, §7, §2
> **Backlog:** V2

## Purpose / Problem

The Ledelse 60:2 product page explains the methodology well but does not productize the purchase decision. A qualified visitor should be able to decide whether 60:2 is relevant without first booking a conversation merely to understand what is being sold. The page must answer: Is this for us? When should we use it? What exactly happens? What do we receive? How much effort? What happens afterwards? What does it not include?

## Scope

- `_pages/ledelse_60-2.md` — fit/not-fit, commercial card, FAQ, bounded before/during/after, inclusions, reassurance
- `_includes/json-ld.html` — JSON-LD Offer price injection (guarded branch)
- `_data/commercial.yml` — single source for the price figure
- Shared price-card include from `.specs/product-signature/README.md`

## Acceptance Criteria

- [ ] Fit/not-fit section present, heading carries `id="passer"` (nav target "Når passer det?" → /ledelse-60-2/#passer)
- [ ] Public fixed price (kr 14 850,- eks. mva) in commercial card + fit section + FAQ — the FOUR placements, all rendering from the single source
- [ ] FAQ includes "Hva koster Ledelse 60:2?"
- [ ] Bounded before/during/after framing
- [ ] Inclusions checklist
- [ ] Practitioner + reassurance
- [ ] JSON-LD Offer gains price via `_includes/json-ld.html` guarded branch (`price_source: commercial` frontmatter → inject from `site.data.commercial.price_nok`)
- [ ] `priceCurrency: "NOK"` present; "eks. mva" in description
- [ ] CTA: primary "Bestill Ledelse 60:2" → /bestill/ledelse-60-2/; secondary "Book 20 min avklaring"
- [ ] Personal bookwithme link removed
- [ ] Dark mode tested
- [ ] Mobile layout tested

## The FOUR Price Placements

1. **Product-page commercial card** — price + inclusions + Bestill CTA + "Usikker? Book 20 min avklaring →"
2. **JSON-LD Offer.price** — injected in `_includes/json-ld.html` via guarded branch from `site.data.commercial.price_nok` (frontmatter values are not Liquid-evaluated; GH Pages `--safe` blocks plugins — the reference lives in the include, never a hardcoded figure)
3. **/bestill/ Route A price card** — same figure via shared include
4. **Homepage commercial-info section** — brief price mention

All rendering from ONE data source: `_data/commercial.yml`. Never hardcoded in page content.

## Fit / Not-Fit

**For:** leadership teams ≤5, recurring discussions, new CEO/formation, strategy-execution doubt, regulated/operational orgs.

**Not for:** teams >5 (→ avklaring note), wanting a development program, wanting implementation consulting.

## Design Constraints

- Touch targets: minimum 44×44px
- Use CSS variables from `colors.css`
- Both themes
- Norwegian Bokmål
- No inline styles/handlers/scripts

## Dependencies

- `.specs/product-signature/README.md` (price card, shared components)
- `.specs/bestill-booking-page/README.md` (Route A/B targets)
- `.design/inbound-strategy.md` (strategy)
