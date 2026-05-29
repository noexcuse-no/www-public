---
description: Quick reference — see .specs/architecture/README.md for full Jekyll config spec
globs: ["_config.yml"]
---

# Jekyll Configuration

Full spec: `.specs/architecture/README.md`

Key: all content dirs registered in `collections:` with `output: true`. Each collection needs a `defaults` entry setting `layout:` and `lang: no`. Run `bundle exec jekyll build` before pushing.
