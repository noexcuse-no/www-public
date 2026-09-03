# homepage-repositioning — Feature Specification

Status: Ready
> **Strategy source:** `.design/inbound-strategy.md` §1, §2, §11, §5
> **Backlog:** V1

## Purpose / Problem

The homepage currently leads with methodology ("Enkel, kunnskapsbasert orientering for ledergruppen") instead of the buyer's problem and business outcome. A first-time visitor should understand within ~5 seconds: who this is for, what costly situation it solves, what they get, and why to believe us. The homepage must become the commercial front for Ledelse 60:2 while preserving topical breadth as acquisition infrastructure.

## Scope

- `index.md` — frontmatter + content
- `_layouts/home.html` — 10-section sequence
- `_includes/navbar.html` + `_data/navigation.yml` — header nav targets
- Shared components from `.specs/product-signature/README.md` (60/2/4 signature, recognition cards, CTA panel)

## Acceptance Criteria

- [ ] Homepage implements the exact 10-section sequence (below)
- [ ] Hero is outcome-led with 55/45 desktop split
- [ ] One dominant + one secondary CTA style
- [ ] Header nav targets: "Ledelse 60:2" → /ledelse-60-2/ · "Når passer det?" → /ledelse-60-2/#passer · "Innsikt" → /emne/ · "Om oss" → /om-oss/ + high-contrast "Book 20 min" → /samtale/
- [ ] Three above-fold paths only
- [ ] "Les mer" demoted on commercial surfaces
- [ ] Dark mode tested
- [ ] Mobile layout tested (390px)

## The 10-Section Sequence

1. **Outcome-led hero** (55/45 desktop split) — headline ~"Finn blindsonene i ledergruppen på to timer." + supporting sentence + primary CTA "Bestill Ledelse 60:2" + secondary "Book 20 min avklaring"
2. **Recognition (2×2 cards)** — "Kjenner dere igjen noe av dette?" with 4–6 sharp symptoms (e.g. "Du har hatt den samme diskusjonen tre ganger denne måneden.")
3. **What changes after 60:2** — concrete outcome language, not universal transformation
4. **60/2/4 mechanism** — the branded visual signature (60 spørsmål · 2 timer · 4 perspektiver)
5. **Diagnosis-before-intervention** — "Diagnose før lederutvikling" category differentiation
6. **How it works** — 3 steps (Samtale → Intervju → Rapport)
7. **Proof** — placeholder (cases are C1–C4, keep minimal)
8. **Fit** — who it's for / not for
9. **Commercial info** — price (kr 14 850,- eks. mva via shared source), inclusions
10. **CTA panel** — reusable CTA panel with Dagfinn thumbnail

## Design Constraints

- Touch targets: minimum 44×44px
- Use CSS variables from `colors.css` for all colors
- Both themes (light + dark)
- Norwegian Bokmål
- No inline styles/handlers/scripts

## Dependencies

- `.specs/product-signature/README.md` (shared components)
- `.specs/navigation-ia-split/README.md` (nav targets)
- `.design/inbound-strategy.md` (strategy)
