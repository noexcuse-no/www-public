---
description: Quick reference — see .specs/architecture/README.md for full Jekyll config spec
globs: ["_config.yml"]
---

# Jekyll Configuration

Full spec: `.specs/architecture/README.md`

Key: `_pages` loaded via `include:`; only `_tags` is a collection. Each collection needs a `defaults` entry setting `layout:` and `lang: no`. Run `docker run --rm -u "$(id -u):$(id -g)" -v "$(pwd):/srv/jekyll" -w /srv/jekyll -e JEKYLL_ENV=production jekyll/jekyll jekyll build` before pushing.
