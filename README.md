# No Excuse AS — Public Website

Helping leadership teams get a better understanding of people, identity, structure and influence — based on Bolman & Deal's four frames.

Primary product: **Ledelse 60:2** — a knowledge-based orientation for leadership teams: 60 structured questions in 2 hours.

- Site: https://noexcuse.no
- Host: GitHub Pages
- Stack: Jekyll (static site generator)
- Language: Norwegian Bokmål

## Licensing

Source code defaults to 0BSD; the repository overall uses mixed rights (REUSE/SPDX). See `LICENSE.md` and https://noexcuse.no/opphavsrett/.

## Why this repository is public

The public repository documents the current website, its implementation, and maintained current specifications. Temporary planning material, internal commercial reasoning, and obsolete working context are not part of the maintained public record.

Public source and provenance support inspectability and accountability.

## Controlled rollout

Pages can be prepared ahead of publication by setting `published: false` in the
page's front matter (in `_pages/`). Jekyll excludes them from `_site/`, and a
post-build step removes any rendered block that still links to an unpublished
page, so the production site never references non-existent pages.

**Authoring rule:** a link to an unpublished internal page means the block
containing that link is not ready for publication either. The pruner
(`npm run prune:unpublished`) removes the nearest safe block — an element
marked `data-rollout-block`, a `<li>`, or a `<p>` (in that order) — and fails
the build instead of guessing when the link sits in any other element.

Do not add `data-rollout-block` to layout containers (article body, main
wrapper, navigation, page root); use it only on self-contained blocks such as
cards.

Pruning is a dependency-safety mechanism, never access control: unpublished
pages are excluded from the Jekyll build and are not served.

Pipeline: `jekyll build` → `prune:unpublished` → `validate:build` →
`check:links` — enforced locally before every PR via `npm run ci:local`
(`scripts/local-ci.mjs`). No GitHub Actions are used; GitHub Pages builds
the production site natively.

To preview unpublished material locally, build with `jekyll build --unpublished`.
The pruner decides from `_pages/` source state regardless of build mode, so
either run the preview without the pruning step, or accept that blocks linking
to unpublished pages are removed exactly as they would be in production.
