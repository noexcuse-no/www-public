# analytics-events — Feature Specification

> Status: Ready
> Strategy source: `.design/inbound-strategy.md` §10, §11
> Backlog: P1 (todo 20)

## Purpose / Problem

The site needs a single, authoritative event vocabulary so inbound marketing can be attributed to real outcomes. The strategy defines 15 events: 12 site-side fired via the Simple Analytics Events API, plus 3 off-site documented conventions. The North Star metric is "60:2 sales per 1,000 relevant entry sessions", with highest-intent session classification. No AI answers or conversation content are ever sent.

## Scope

- `assets/scripts/auto-events.js` — new script (registered in `_includes/scripts.html`)
- Page-class → event mapping
- Acquisition category capture from utm_source
- Session highest-intent classification (documented, no lead scoring)
- Vitest tests for the dispatcher + mappings

## Acceptance Criteria

- [ ] 12 site-side events fired via Simple Analytics Events API (`sa_event`)
- [ ] 3 off-site conventions documented (not implemented)
- [ ] Page-class → event mapping implemented (product page → product_view + fit_view/price_view on section visibility via IntersectionObserver; booking_click on /bestill/ step link; ai_return on ?ref=ai-retur)
- [ ] Acquisition category capture from utm_source into event metadata
- [ ] Session highest-intent classification documented (no lead scoring)
- [ ] Vitest tests for the dispatcher + mappings
- [ ] No AI answers/topics content sent (metadata = event name + source only)
- [ ] No cookies added (privacy spec: cookie-free)

## The 15 Events

### 12 Site-Side (Simple Analytics Events API)

| Event | Trigger |
|-------|---------|
| `topic_landing_view` | Topical page view |
| `problem_page_view` | Buying-situation page view |
| `ai_topic_selected` | AI reflection topic selected |
| `ai_prompt_copied` | Prompt copied to clipboard |
| `ai_return` | Return via ?ref=ai-retur |
| `related_topic_opened` | Related-perspectives link opened |
| `product_view` | Product page view |
| `fit_view` | Fit section visible (IntersectionObserver) |
| `price_view` | Price section visible (IntersectionObserver) |
| `method_view` | Method section visible |
| `booking_click` | /bestill/ step link clicked |
| `referral_source` | Referral source captured |

### 3 Off-Site Conventions (documented, not implemented)

| Event | Note |
|-------|------|
| `booking_complete` | The booking completes on the external MS Bookings page with no redirect back — cannot fire site-side |
| `sale_qualified` | Off-site convention |
| `sale_won` | Off-site convention |

## North Star

**60:2 sales per 1,000 relevant entry sessions.** Highest-intent session classification is documented (no lead scoring) — a session is classified by its highest-intent event (e.g. booking_click > product_view > topic_landing_view).

## Design Constraints

- Cookie-free (privacy spec)
- No AI answers/topics content — metadata = event name + source only
- Norwegian Bokmål (event names are English identifiers, per convention)

## Dependencies

- `.specs/privacy/README.md` (cookie-free, metadata-only)
- `.specs/privacy-communication/README.md` (L2 "ser"-box must match these events)
- `.specs/inbound-sales/README.md` (superseded event model)
- `.design/inbound-strategy.md` (strategy)
