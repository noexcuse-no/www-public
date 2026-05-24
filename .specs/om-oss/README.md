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

## Hero Image

**File**: `assets/images/banners/banner-om-oss.png`
**Style**: Minimalist Nordic — three abstract human silhouettes seen from behind in a forest, looking toward horizon. Bright white/light gray background, azure accent in light.

**Prompt used**:
```
Three abstract human silhouettes seen from behind standing in a forest,
looking toward a distant horizon, bright white/light gray background,
cool Nordic color palette with azure (#F0FFFF) accent in the light,
minimalist Nordic style, 16:9 aspect ratio, no text, no faces visible
```

**Reference**: `https://noexcuse.no/assets/images/hero-illustration.png` (same style family)

---

## Dependencies

- **Profiles**: Already implemented — `_profiles/dagfinn.md`, `_includes/profiles.html`, `assets/css/profiles.css`
- **Navbar**: Navigation link — see `.specs/navigation/README.md`
