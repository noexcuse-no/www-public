# Frame Page Specification — Bolman & Deal Perspectives

> Status: Active
> Applies to: `_frames/*.md`

## Purpose

Each frame page represents one of Bolman & Deal's four leadership perspectives:
- `struktur` — Structural
- `mennesker` — Human Resource
- `påvirkning` — Political
- `identitet` — Symbolic

## Required Frontmatter

```yaml
---
id: "frame-id"              # lowercase, no spaces, matches filename
title: "Perspektivtittel"
description: "SEO description of the perspective"
---
```

## JSON-LD

All frame pages must use `Article` structured data:

```yaml
json_ld:
  type: "Article"
  name: "Full perspective title"
  description: "SEO description matching page description"
  author:
    name: "No Excuse AS"
```

## Layout

- Frames use `layout: perspektiv` (set via defaults in `_config.yml`)
- Do not override layout in frontmatter

## Content Structure

- The `id` field must match the filename (minus extension)
- Each page covers one Bolman & Deal frame
- Content follows the standard frame page structure defined in the layout
