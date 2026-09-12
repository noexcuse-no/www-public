# buying-situation-pages — Feature Specification

Status: Ready
> **Strategy source:** `.design/inbound-strategy.md` §4, §11, §5
> **Backlog:** V4

## Purpose / Problem

The site has broad topical content but no pages built around the specific buying situations that make a leadership team hire No Excuse. Buying-situation pages capture high-intent search demand and give visitors a recognition → fit → CTA path that converts. They are the "I2-entry" surfaces in the intent model.

## Scope

- 6 new pages in `_pages/` (class: buying-situation, kebab-case permalinks + trailing slash)
- Each fires `problem_page_view` (analytics event, todo 20)
- JSON-LD Article per pages rules

## Acceptance Criteria

- [ ] 6 Tier-1 pages created (list below)
- [ ] Each page structure: situation recognition → why it persists → what 60:2 examines → fit → CTA
- [ ] Primary CTA "Se om 60:2 passer" → /ledelse-60-2/
- [ ] Secondary CTA = private reflection (topic relevant to the situation)
- [ ] Related topical pages linked
- [ ] No on-page diagnosis/scoring (recognition only)
- [ ] Norwegian Bokmål per brand-voice
- [ ] Dark mode tested
- [ ] Mobile layout tested

## Tier 1 Situations (6)

1. **Gjentatte diskusjoner** — `/gjentatte-diskusjoner/` — the same topics keep returning to leadership meetings
2. **Svak gjennomføring** — `/svak-gjennomforing/` — decisions are made but not executed
3. **Uklare roller** — `/uklare-roller/` — responsibility looks clear on paper but is unclear in practice
4. **Ny ledergruppe** — `/ny-ledergruppe/` — a newly formed leadership team needs to understand how it actually works
5. **Ny leder (ny CEO)** — `/ny-leder/` — a new CEO/leader needs a fast read on the team
6. **Strategi ikke gjennomført** — `/strategi-ikke-gjennomfort/` — strategy is decided but not landing

## Page Structure

1. **Situation recognition** — concrete observations, "Kjenner du deg igjen?" tone
2. **Why it persists** — four-perspective framing (Struktur, Mennesker, Påvirkning, Identitet)
3. **What 60:2 examines here** — sample question themes
4. **Fit** — who this situation applies to
5. **CTA** — primary "Se om 60:2 passer" (→ /ledelse-60-2/), secondary private reflection
6. **Related topical pages**

## Design Constraints

- Touch targets: minimum 44×44px
- Use CSS variables from `colors.css`
- Both themes
- Norwegian Bokmål
- No inline styles/handlers/scripts

## Dependencies

- `.design/inbound-strategy.md` (strategy)
- `.specs/ai-private-reflection/README.md` (reflection links)
- `.specs/analytics-events/README.md` (problem_page_view)
- `.specs/architecture/README.md` (pages frontmatter schemas)
