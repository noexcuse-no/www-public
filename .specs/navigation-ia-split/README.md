# navigation-ia-split — Feature Specification

Status: Ready
> **Strategy source:** `.design/inbound-strategy.md` §4, §8, §11
> **Backlog:** V3

## Purpose / Problem

The site mixes commercial and insight surfaces without a clear classification. This causes inconsistent CTA hierarchy and confuses the visitor's intent state. The site needs an explicit split between commercial surfaces (where the buying decision happens) and insight surfaces (where visitors learn and reflect), with the AI reflection feature classified as an insight surface.

## Scope

- `_data/navigation.yml` — nav targets
- `_includes/navbar.html` — nav markup
- CTA hierarchy rules across `_layouts/article.html`, `_layouts/home.html`, `_pages/*.md`
- `.design/information-architecture.md` — URL map (updated in todo 2)

## Acceptance Criteria

- [ ] Commercial vs insight surface classification documented
- [ ] AI reflection = insight surface (not a commercial CTA)
- [ ] LLM-element rules defined (when AI is primary vs secondary)
- [ ] Bookings demoted to background scheduler (never the closing page)
- [ ] Header nav targets: "Ledelse 60:2" → /ledelse-60-2/ · "Når passer det?" → /ledelse-60-2/#passer · "Innsikt" → /emne/ · "Om oss" → /om-oss/ + high-contrast "Book 20 min" → /samtale/
- [ ] Dark mode tested
- [ ] Mobile layout tested

## Surface Classification

| Surface | Type | Primary CTA | Secondary CTA |
|---------|------|-------------|---------------|
| Homepage | Commercial | Bestill Ledelse 60:2 | Book 20 min avklaring |
| /ledelse-60-2/ | Commercial | Bestill Ledelse 60:2 | Book 20 min avklaring |
| /bestill/ | Commercial | Bestill (Route A) | Book 20 min avklaring (Route B) |
| /samtale/ | Commercial | Book 20 min avklaring (Route B) | Bestill Ledelse 60:2 (Route A fallback) |
| Topical articles | Insight | Utforsk dette privat med din KI | Se hvordan 60:2 kan avdekke dette |
| Buying-situation pages | Insight→Commercial | Se om 60:2 passer | AI reflection |
| /foredrag-og-media/ | Commercial | Book 20 min avklaring | Kontakt |

## LLM-Element Rules

- AI reflection is an **insight surface** — it helps visitors explore a topic privately before engaging commercially.
- On insight surfaces, AI is the **primary** CTA; 60:2 is secondary.
- On commercial surfaces, 60:2 is **primary**; AI is secondary (or absent).
- The AI reflection tool never replaces the commercial CTA on commercial surfaces.

## Bookings Demotion

Microsoft Bookings is background infrastructure. The site owns the commercial context (price, fit, privacy, reassurance) on /bestill/ and /samtale/. Bookings only handles time selection. No visitor is ever sent straight to the scheduler from an insight surface.

## Design Constraints

- Touch targets: minimum 44×44px
- Use CSS variables from `colors.css`
- Both themes
- Norwegian Bokmål

## Dependencies

- `.design/inbound-strategy.md` (strategy)
- `.specs/homepage-repositioning/README.md` (nav targets)
