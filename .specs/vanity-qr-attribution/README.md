# vanity-qr-attribution — Feature Specification

> Status: Ready
> Strategy source: `.design/inbound-strategy.md` §10, §11
> Backlog: P2 (todo 21)

## Purpose / Problem

Offline materials (business cards, print, talks) need short, memorable URLs that attribute traffic to a source. The strategy defines vanity URLs at `/go/<slug>/` that redirect to canonical topics while appending attribution parameters (`utm_source=<slug>&utm_medium=qr`). QR targets are documented so offline campaigns are measurable.

## Scope

- `/go/<slug>/` redirect pages (noindex, meta-refresh + param append utm_source)
- QR targets documented
- `referral_source` analytics event integration

## Acceptance Criteria

- [ ] `/go/<slug>/` redirect pages created (noindex)
- [ ] Redirect uses meta-refresh + param append `utm_source=<slug>&utm_medium=qr`
- [ ] Redirects point to canonical topics
- [ ] QR targets documented (which slug → which URL)
- [ ] `referral_source` event fires on vanity-URL entry
- [ ] Dark mode tested (if any visible surface)
- [ ] Mobile layout tested (if any visible surface)

## Vanity URL Pattern

```
/go/<slug>/  →  <canonical-topic-url>?utm_source=<slug>&utm_medium=qr
```

- Pages are `noindex` (they exist only for attribution, not SEO)
- Redirect via meta-refresh (static-site compatible, no server redirects on GH Pages)
- Param append preserves the canonical page's own URL parameters

## QR Targets

Documented mapping of slug → canonical URL. Examples (per strategy):
- `/go/ledelse-60-2/` → `/ledelse-60-2/`
- `/go/gjentatte-diskusjoner/` → `/gjentatte-diskusjoner/`
- (full list per implementation)

## Design Constraints

- Touch targets: minimum 44×44px (if any visible surface)
- Use CSS variables from `colors.css` (if any visible surface)
- Both themes (if any visible surface)
- Norwegian Bokmål
- No inline styles/handlers/scripts

## Dependencies

- `.specs/analytics-events/README.md` (referral_source event)
- `.design/inbound-strategy.md` (strategy)
