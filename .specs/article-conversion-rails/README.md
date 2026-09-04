# article-conversion-rails — Feature Specification

Status: Ready
> **Strategy source:** `.design/inbound-strategy.md` §8, §11, §4
> **Backlog:** V5

## Purpose / Problem

Topical articles are the site's acquisition infrastructure, but they currently end without a clear conversion path. Each article should act as a landing surface that moves a visitor from insight (I1) toward the commercial decision (I2/I3) — without restructuring the article body or adding intrusive popups.

## Scope

- `_layouts/article.html` — end-of-content CTA pattern, related-perspectives block, recognition hook
- 20 topical pages (product page handled in `.specs/product-page-offer/README.md`)
- `#etter-refleksjon` return sections (from AI return loop, todo 16)
- Related-perspectives block (fires `related_topic_opened` event)

## Acceptance Criteria

- [ ] Two-CTA pattern at content end: primary "Utforsk dette privat med din KI" → topics; secondary "Se hvordan 60:2 kan avdekke dette" → /ledelse-60-2/
- [ ] Related-perspectives block (existing related links formalized, fires `related_topic_opened`)
- [ ] Recognition hook section (1–2 sharp observations per page, reuse best existing copy)
- [ ] `#etter-refleksjon` return sections present
- [ ] Consistent hero/meta (OG per social-previews fallback)
- [ ] Applied across the 20 topical pages
- [ ] No article body restructure (breadth preserved)
- [ ] No popups/modals on scroll
- [ ] Dark mode tested
- [ ] Mobile layout tested

## Two-CTA Pattern

At the end of each topical article:

- **Primary:** "Utforsk dette privat med din KI" → opens the AI reflection topic panel (3 topics per page)
- **Secondary:** "Se hvordan 60:2 kan avdekke dette" → /ledelse-60-2/

This is the insight-surface hierarchy (AI primary, 60:2 secondary) per `.specs/navigation-ia-split/README.md`.

## Related-Perspectives Block

Formalize the existing related-links pattern into a consistent block at content end. Each link fires `related_topic_opened` (analytics event). Links point to the four perspectives and related topical pages.

## Recognition Hook

1–2 sharp observations per page that make the visitor think "det der kjenner vi oss igjen i" — reuse the best existing copy from each article. This is the I1→I2 bridge.

## Design Constraints

- Touch targets: minimum 44×44px
- Use CSS variables from `colors.css`
- Both themes
- Norwegian Bokmål
- No inline styles/handlers/scripts

## Dependencies

- `.design/inbound-strategy.md` (strategy)
- `.specs/ai-private-reflection/README.md` (reflection links, return loop)
- `.specs/analytics-events/README.md` (related_topic_opened)
- `.specs/navigation-ia-split/README.md` (surface classification)
