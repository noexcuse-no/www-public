# founder-credibility — Feature Specification

> Status: Done (implemented)
> Backlog: V6

## Purpose / Problem

The site's commercial surfaces need a credible practitioner presence. Dagfinn is the founder and sole practitioner — his expertise, independence, and diagnostic approach are a trust asset that should be surfaced consistently across commercial pages, especially the /bestill/ decision page and the Foredrag og media page.

## Scope

- Practitioner module (Dagfinn) on /bestill/ledelse-60-2/ and /foredrag-og-media/
- Reusable CTA panel with Dagfinn thumbnail ("Usikker på om 60:2 passer?" + 2 reassurance points + "Bestill 20 min avklaring")
- `_pages/dagfinn.md` — presenter basis (existing)
- `.specs/foredrag-media/README.md` — presenter module integration

## Acceptance Criteria

- [ ] Practitioner module present on /bestill/ and /foredrag-og-media/
- [ ] Reusable CTA panel with Dagfinn thumbnail implemented (shared component)
- [x] CTA panel: "Usikker på om 60:2 passer?" + 2 reassurance points + "Bestill 20 min avklaring"
- [ ] Reassurance points: independent diagnosis, no lock-in, customer owns findings
- [ ] Dark mode tested
- [ ] Mobile layout tested

## Practitioner Module

A reusable component showing Dagfinn (name, role, brief bio) with a reassurance message. Used on:
- /bestill/ledelse-60-2/ — "Hva skjer etter bestilling? Dagfinn tar kontakt for å bekrefte deltakere og praktiske forhold."
- /foredrag-og-media/ — presenter module for organizers

## Reusable CTA Panel

"Usikker på om 60:2 passer?" + 2 reassurance points (independent analysis with no requirement for further consulting; no lock-in, customer owns the report and findings) + "Bestill 20 min avklaring" CTA (→ /samtale/).

## Design Constraints

- Touch targets: minimum 44×44px
- Use CSS variables from `colors.css`
- Both themes
- Norwegian Bokmål
- No inline styles/handlers/scripts

## Dependencies

- `.specs/bestill-booking-page/README.md` (practitioner on /bestill/)
- `.specs/foredrag-media/README.md` (presenter on media page)
- `.specs/product-signature/README.md` (shared CTA panel component)
