# Uniform Illustration System — Master Specification

> Created: 2026-06-01
> Status: Ready

## Purpose

Establish a **consistent 4-tier illustration taxonomy** applied uniformly across all page types. Every page — articles, frames, benefits, products, steps — uses the same tier system, naming convention, and CSS treatment. This eliminates ad-hoc decisions per page and ensures visual coherence as the site grows.

## The 4 Tiers

| Tier | Size | Purpose | Style Complexity | Target File Size |
|------|------|---------|------------------|-----------------|
| **T1 (Hero)** | 3840×2160 (4K) | Page entry, emotional anchor | Atmospheric, photographic, rich | ≤500KB |
| **T2 (Framework)** | ~800px wide | Multi-element models, visual indexes | Infographic, relational, shows connections | ≤150KB |
| **T3 (Section)** | ~400px wide | Individual info-boxes, elements, steps | Single concept, simple composition | ≤80KB |
| **T4 (Micro)** | ~80px square | Challenge cards, list items, small concepts | Iconic, minimal, almost pictogram | ≤30KB |

## Naming Convention

```
{page-id}-{tier}-{concept}.webp
```

- `page-id`: kebab-case page identifier (`tillit`, `usikkerhet`, `makt`, `struktur`, etc.)
- `tier`: `t1`, `t2`, `t3`, or `t4`
- `concept`: kebab-case description of subject

Examples:
- `tillit-t2-four-pillars.webp`
- `usikkerhet-t3-stage-1.webp`
- `struktur-t4-role-confusion.webp`

## File Placement

All generated images go in `assets/images/banners/` (existing convention for site images).

## CSS Treatment

Each tier has a dedicated CSS class:

| Tier | CSS Class | Key Properties |
|------|-----------|---------------|
| T1 | `.hero-image img` | Full-width, object-fit: cover, min-height: 60vh |
| T2 | `.framework-illustration` | max-width: 800px, centered, margin-block: 2rem |
| T3 | `.section-illustration` | max-width: 400px, float or centered per layout |
| T4 | `.micro-illustration` | width: 80px, height: 80px, inline or flex item |

## Per-Page Image Inventory

### Benefit Articles (4 pages) — R4

| Page | T2 | T3 | T4 | Total |
|------|----|----|----|-------|
| Tillit | 1 (4 pillars unified) | 4 (pillars) | 4 (challenges) | 9 |
| GenKI | 1 (4 competencies) | 8 (4 competencies + 4 thinking skills) | 4 (red flags) | 13 |
| Usikkerhet | 2 (Logan 5 stages + Kotter 8 steps) | 13 (5 stages + 8 steps) | 5 (culture challenges) | 20 |
| Forankring | 1 (5 dimensions) | 5 (dimensions) | 4 (fallacies) | 10 |
| **Subtotal** | **5** | **30** | **17** | **52** |

### Articles (3 pages) — R16

| Page | T2 | T3 | T4 | Total |
|------|----|----|----|-------|
| Makt | 1 (power-service spectrum) | 2 (power side, service side) | 4 (prices paid) | 7 |
| Perspektiv | 1 (four frames as lenses) | 4 (one per frame trap) | 0 | 5 |
| Triader | 1 (dyad vs triad) | 8 (4 conditions + 4 archetypes) | 4 (failure modes) | 13 |
| **Subtotal** | **3** | **14** | **8** | **25** |

### Frame Pages (4 pages) — R17

Frames already have T3 spots (added in N4-N7). This adds T4 challenge card micro illustrations.

| Page | T4 | Total |
|------|----|-------|
| Struktur | 4 (challenges) | 4 |
| Mennesker | 4 (challenges) | 4 |
| Identitet | 4 (challenges) | 4 |
| Påvirkning | 4 (challenges) | 4 |
| **Subtotal** | **16** | **16** |

### Product & Process Pages — R18

| Page | T2 | T3 | T4 | Total |
|------|----|----|----|-------|
| Ledelse 60:2 | 1 (process flow) | 0 | 3 (step cards) | 4 |
| Metode | 0 | 3 (theory, research, why) | 4 (ethics columns) | 7 |
| Avtale | 0 | 0 | 6 (§ icons) | 6 |
| Step-talk | 0 | 1 (conversation) | 0 | 1 |
| Step-interview | 0 | 1 (interview) | 0 | 1 |
| Step-report | 0 | 1 (report) | 0 | 1 |
| **Subtotal** | **1** | **6** | **13** | **20** |

### Values (Om Oss) — R15

| Page | T3 | Total |
|------|----|-------|
| Om Oss | 3 (Ansvarlighet, Tillit, Ærlighet) | 3 |

## Grand Total: ~116 Images

| Tier | Count | Notes |
|------|-------|-------|
| T1 (Hero) | 0 | All exist already |
| T2 (Framework) | 10 | Complex, highest value |
| T3 (Section) | 53 | Medium effort, high pedagogical value |
| T4 (Micro) | 53 | Small, fast to generate, batchable |

## Future Page Template

Every new page spec MUST include an **Illustration Map** section:

```markdown
## Illustration Map

| Tier | Count | Subjects |
|------|-------|----------|
| T1 | 1 | Hero banner: [description] |
| T2 | N | [list framework diagrams] |
| T3 | N | [list section spots] |
| T4 | N | [list micro icons] |
```

## Backlog References

| ID | Title | Status |
|----|-------|--------|
| R4 | Benefit article illustrations — 52 images | Planned |
| R15 | Values illustrations — 3 T3 spots | Planned |
| R16 | Article illustrations — 25 images | Planned |
| R17 | Frame micro illustrations — 16 T4 spots | Planned |
| R18 | Product & process illustrations — 20 images | Planned |
| F7 | Uniform illustration system (this spec) | Planned |

## Dependencies

- None for the system itself — it is a convention and taxonomy
- R4, R15, R16, R17, R18 all depend on this spec for tier definitions
- Image generation depends on EvoLink API availability

## Style Reference

All generated images follow `.design/graphics.md`:
- Style 3 (section illustrations) for T2 and T3
- Style 1 (hero) for T1 (already exists)
- T4 follows a minimal iconic variant of Style 3
- No text in any image
- Scandinavian minimal palette with azure accent
