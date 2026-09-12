# foredrag-media — Feature Specification

> Status: Ready
> Strategy source: `.design/inbound-strategy.md` §12, §11
> Backlog: P2 (todo 22)

## Purpose / Problem

The site has no organizer-facing surface for Dagfinn's talks and media appearances. The strategy's publicity→topic mapping means talks should drive visitors back to relevant topical content. An organizer page with bookable propositions gives the site a credible media/foredrag presence and a conversion path for organizers.

## Scope

- `_pages/foredrag_og_media.md` — new page, permalink `/foredrag-og-media/`
- 3–5 bookable propositions
- Booking CTA
- Media-contact
- Presenter module (Dagfinn) from `.specs/founder-credibility/README.md`

## Acceptance Criteria

- [ ] Organizer page created at /foredrag-og-media/
- [ ] 3–5 bookable propositions (list below)
- [ ] Booking CTA present (Route B → /samtale/ or contact)
- [ ] Media-contact present
- [ ] Presenter module (Dagfinn) present
- [ ] Each proposition links to its related topical page (publicity→topic mapping)
- [ ] Dark mode tested
- [ ] Mobile layout tested

## Bookable Propositions (3–5)

1. **Diagnose før lederutvikling** — why diagnosis precedes development
2. **Hvem bestemmer egentlig?** — power dynamics in leadership teams
3. **Når GRC blir papir** — governance that doesn't land
4. **KI-ledelse handler ikke om prompting** — AI as a leadership question
5. **Fire forklaringer på samme lederproblem** — the four perspectives

Each proposition links to its related topical page (publicity→topic mapping per `.design/inbound-strategy.md` §12).

## Design Constraints

- Touch targets: minimum 44×44px
- Use CSS variables from `colors.css`
- Both themes
- Norwegian Bokmål
- No inline styles/handlers/scripts
- No auto-embedding of third-party media (links only, privacy/CSP)

## Dependencies

- `.specs/founder-credibility/README.md` (presenter module)
- `.design/inbound-strategy.md` (strategy, publicity→topic mapping)
