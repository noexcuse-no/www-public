# Review-Core Rollout (RP1)

> Created: 2026-09-21
> Status: Done

## Problem / Goal

Prepare the site for a batch review process by reducing the published surface to a
critical commercial core. The full article/tag inventory was not ready for
editorial review in one pass, so the site was temporarily reduced to the pages a
customer/reviewer needs to evaluate the product and company proposition.

## Scope

- 31 of 43 `_pages/` files set to `published: false` (29 articles + 2 already-unpublished case pages).
- All 22 `_tags/*.md` set to `published: false`.
- Kept published: 12 `_pages/` files (404, avtale, bestill, dagfinn, ledelse-60-2,
  metode, om-oss, om-store-sprakmodeller, opphavsrett, personvern, personvern-ki, samtale)
  + root `index.md` (homepage) + 7 `/go/` redirects.
- View-surface updates: `Tema` removed from `_data/navigation.yml` and footer; home
  section-8 perspective "Les mer" links removed (copy kept); `/kultur/` dropped from
  carousel "Om" cycle; 6 `/go/` buying-situation redirects repointed to `/ledelse-60-2/#passer`.
- Latent pre-existing broken links on kept pages fixed: `/metode/` TOC anchor slugs,
  `_includes/profiles.html` tag-chip URL scheme (conditional on published tags),
  dead `/katalysator/` link on `/ledelse-60-2/`.

## Acceptance Criteria

- [x] `npm run prune:unpublished` passes — 16 blocks removed for 22 unpublished dependency links, zero `rollout-unsafe`.
- [x] `npm run validate-build` passes (production build clean).
- [x] `npm run check:links` passes — 1325 internal links all resolve (origin/main baseline: 83 broken).
- [x] `npm run ci:local` — 12/13 gates pass; sole failure is `lint` (6 vitest failures proven pre-existing on origin/main).
- [x] Evidence artifact: `.omo/evidence/local-ci-20260921-review-core-rollout.json`.

## Lessons Learned

- The `profiles.html` tag-chip URL (`'/emne/' | append: tag | slugify`) never produced a
  valid URL (slugify strips the path separator); the fix links to the tag page's
  canonical URL only when the tag is published, plain chip otherwise.
- `check:links` on `origin/main` already reported 83 broken links; the core reduction
  surfaced 10 on kept pages, all pre-existing (verified via git worktree build of origin/main).
- Backlog task removal per task-management rule: completed items belong in CHANGELOG only.