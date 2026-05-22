# Om oss — Functional Specification

## Purpose and Scope

Create a separate "Om oss" (About us) page that introduces the company, its people, and its mission. The page is linked from the navbar.

## Requirements

- Separate page at `/om-oss/`
- Includes company story/mission
- Renders team profiles (from `_profiles` collection) in a dedicated profile section
- Minimal, clean layout consistent with brand

## Data Structures

### Frontmatter (`om-oss.md`)

```yaml
---
layout: default
title: "Om No Excuse"
permalink: /om-oss/
---
```

### Content

- **Company story**: Short paragraph about founding (Rasmus S. Olsen and Dagfinn Bang-Johansen, June 2025), mission, and values
- **Profiles section**: Renders `{% include profiles.html %}` to display team members
- **CTA**: "Book et møte" link or Microsoft Bookings embed

## Dependencies

- **Profiles**: Already implemented — `_profiles/dagfinn.md`, `_includes/profiles.html`, `assets/css/profiles.css`
- **Navbar**: Navigation link — see `.specs/navigation/README.md`
