# Article Layout System — Content Rewriting Spec

> Created: 2026-09-03
> Status: In Progress
> Source: `.omo/plans/article-layout-system.md` Branch 2

## Purpose

Shared reference for rewriting all 15 article `.md` files to fit the heading-level-driven layout system. The layout is determined by the heading level inside a list — content is rewritten to fit.

## Layout System

### Listed headings (in `ol` or `ul`)

| Level | Layout | Image format | Display | ol marker | ul marker |
|-------|--------|-------------|---------|-----------|-----------|
| `li h2` | 1-per-row | square | ~100px floated left | Number | Bullet |
| `li h3` | 2-per-row grid | landscape | Full cell width on top | Number | Bullet |
| `li h4` | 1-per-row | square | ~80px floated left | Number | Bullet |
| `li h5` | 2-per-row grid | landscape | Full cell width on top | Number | Bullet |

### Normal headings (body flow, not in lists)

Typography scale only. No card, no grid. An image after a heading is a content image.

### Tier → heading level mapping

| Tier | Format | Maps to | Resolution OK? |
|------|--------|---------|----------------|
| T3 | landscape | `li h3` / `li h5` | ✅ (380px grid cell) |
| T4 | square | `li h2` / `li h4` | ✅ (80-100px display) |

**Rule: assign heading levels to match existing image formats.** If semantic hierarchy demands a level that conflicts with the image format, flag the section for regeneration.

## Content Rewriting Rules

1. **Wrap card-like sections in lists** — sequential `img + heading + text` blocks become `<ul>` or `<ol>` with `<li>` items. This activates `:has()` selectors.
2. **Choose heading level by semantic hierarchy** — the heading level follows the document outline position, not the desired layout. The layout follows the heading level.
3. **Adjust item counts for grid fit** — `li h3`/`li h5` (2-per-row) work with even counts (2, 4, 6, 8). Odd counts: add/remove an item, or use `li h2`/`li h4` (1-per-row).
4. **Adjust word counts for card density** — grid cards: 15-60 words. 1-per-row cards: 5-200 words. Too long for grid → shorten or move to 1-per-row.
5. **Check image format matches heading level** — square → `li h2`/`li h4`, landscape → `li h3`/`li h5`. Flag mismatches for regeneration.
6. **Use `ol` for sequential/ordered content** — steps, stages, phases. Use `ul` for unordered collections.
7. **Enrich thin content where needed** — if a section has too few words for its layout, add substance. Don't shrink the layout to mask thin content.

## Article Inventory

| Group | Files | Key sections |
|-------|-------|-------------|
| Frame (4) | `struktur.md`, `mennesker.md`, `pavirkning.md`, `identitet.md` | Hovedelementer (non-list h3, 150-200 words, T3 landscape) + Utfordringer (li h4, 15-20 words, T4 square) |
| Ledelse (8) | `usikkerhet.md`, `generativ-ki.md`, `triader.md`, `forankring.md`, `tillit.md`, `makt.md`, `perspektiv.md`, `ledelse-60-2.md` | Various list sections (h3, 40-100 words, T3 landscape) + challenge sections (h4, 15-20 words, T4 square) + non-list sections |
| Meta (3) | `metode.md`, `avtale.md`, `om-oss.md` | Forskningsetiske prinsipper (non-list h4, 5-8 words, T4 square) + Kjerneverdier (non-list h3, 5-8 words, verdi square) + Avtale paragraphs (h2, T4 square as section openers) |

## Image Format Constraint

- Square images (T4) → `li h2`/`li h4`
- Landscape images (T3) → `li h3`/`li h5`
- Current resolutions acceptable (T3 ~400px, T4 ~80px). No regeneration unless aspect ratio conflicts with heading level.

## Flagged Decisions

- **Frame Hovedelementer**: 150-200 words with T3 landscape. If `li h3` (grid), shorten to 40-60 words. If kept long, use `li h2` (1-per-row) but images need square regeneration.
- **Triader advarselstegn**: 4 items, no images — assess whether images should be generated or section uses text-only cards.
- **Perspektiv caser**: 3 items (odd count) — resolve for grid fit.
- **60-2 signals**: 5 items, currently non-list — wrap in list, assign level by image format.
- **Avtale paragraphs**: 6 sections, T4 square as h2 section openers — 80px too small for section opener, assess display size.