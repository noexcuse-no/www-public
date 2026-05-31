# Triader — Article Specification

## Purpose and Scope

Create `_pages/ledelse_triader.md` as a standalone article exploring triads as a structural tool for building resilient teams and organizations, based on Logan, King & Fischer-Wright's *Tribal Leadership* (2011).

## URL

`/triader/`

## Source

- **Primary:** Logan, D., King, J., & Fischer-Wright, H. (2011). *Tribal Leadership: Leveraging Natural Groups to Build a Thriving Organization*. Harper Business.
- **Related:** Bolman & Deal (2017) Ch. 3 — Structural frame on coordination and role design

## Content Direction

### Theme

Dyads (two-person relationships) are fragile — when one person leaves, the connection breaks. Triads (three-person structures) are resilient. This article explains why triads are the fundamental building block of high-performing teams, how to form them, and what prevents them from working.

### Key Message

The strongest organizational relationships are triangular, not dyadic. Triads create stability, distribute information, and prevent single points of failure in collaboration networks.

### NOT This Article

- General networking advice
- Team-building exercises
- Org chart restructuring without cultural backing

### Core Sections

#### 1. The Dyad Problem

Why two-person relationships fail under stress.

**Key points:**
- Dyads are personal — conflict becomes existential
- Information is trapped in pairs; others are excluded
- When one person leaves, knowledge and relationships evaporate
- Common in Stage 2 ("my life sucks") and early Stage 3 ("I'm great") cultures

#### 2. What Triads Are

Defining the structural form and why it matters.

**Key points:**
- Three people with mutual, non-exclusive relationships
- No single person controls the connection
- Information flows through multiple paths
- Resilient to any one person leaving

#### 3. Formation: How Triads Emerge

The three conditions for triad formation.

**Key points:**
- Shared values or purpose (symbolic anchor)
- Complementary capabilities (structural fit)
- Willingness to connect others (political generosity)
- Logan: "Triads only form when people are willing to share their network"

#### 4. Triads in Practice

Examples and applications.

**Key points:**
- Project triads: sponsor, lead, expert
- Mentorship triads: mentor, mentee, peer
- Leadership triads: operational, strategic, people leader
- Cross-functional triads: bridge-building across silos

#### 5. Warning Signs

When triads don't work or revert to dyads.

**Key points:**
- Triangulation (talking *about* instead of *with*)
- Two people colluding against the third
- Power hoarding — one person refuses to share connections
- Lack of mutual value — the relationship becomes extractive

#### 6. Questions for Mapping Triads

Diagnostic questions for leaders.

**Key questions:**
- Who in your team would keep working together even if you left?
- Are your key relationships dyads or triads?
- Who benefits when two people in your organization don't talk?
- What information is trapped in pairwise relationships?

## Content Guidelines

### Tone

Direct, structural, Scandinavian minimal. Focus on practical application, not theory.

### Length

~1500 words, semi-formal, scannable with H2/H3 headers.

### Structure

Follow the existing frame article pattern:
1. Hero with intro sentence
2. Problem framing (The Dyad Problem)
3. Core content (4-5 sections)
4. Key questions section
5. CTA linking to Ledelse 60:2

### Citations

- Logan et al. (2011) on triad formation and cultural stages
- Bolman & Deal (2017) on structural coordination

## Design

- **Hero:** Style 2 (banner with text overlay)
- **Illustrations:** 1 hero banner, 2 section illustrations (Style 3)
- **Images needed:** 
  - Hero: abstract geometric representing three connected nodes
  - Section 1: dyad vs triad diagram (simple, two vs three circles)
  - Section 4: network/connection illustration

## Connections to Site Content

### Link to Ledelse 60:2

CTA section linking to Ledelse 60:2 as the diagnostic tool for understanding team structures.

### Link to Existing Articles
- Cross-link from `/identitet/` (symbolic frame — shared values enable triads)
- Cross-link from `/usikkerhet/` or `/organisasjonskultur/` (cultural maturity enables triad formation)

## File

**New file:** `_pages/ledelse_triader.md`

**Frontmatter:**
```yaml
---
layout: page
title: "Triader — Bygg robuste team med trekantede relasjoner"
description: "Lær hvorfor trekantede relasjoner er sterkere enn to-og-to. Fra dyader til triader — strukturelle verktøy for resilient organisasjon."
permalink: /triader/
json_ld:
  type: "Article"
  name: "Triader"
  description: "Hvorfor trekantede relasjoner er sterkere enn to-og-to. Fra dyader til triader."
  author:
    type: "Organization"
    name: "No Excuse AS"
  about:
    - type: "Thing"
      name: "Tribal Leadership"
    - type: "Thing"
      name: "Organisasjonsstruktur"
    - type: "Thing"
      name: "Teamdynamikk"
---
```

## Implementation Order

**2nd** in the N1–N3 sequence (after makt, before perspektiv). Should be written after `/makt/` is complete so cross-links to power-service tension are accurate.

## Dependencies

- 3 images (1 hero, 2 section illustrations)
- Cross-links from existing articles
- Cross-link from `/makt/` (power-service tension as context for triad formation)

## Acceptance Criteria

- [ ] Article covers dyad vs triad distinction clearly
- [ ] Practical examples (project triad, mentorship triad, etc.)
- [ ] Warning signs section addresses common failure modes
- [ ] CTA connects to Ledelse 60:2
- [ ] Brand voice consistent with rest of site
- [ ] Dark mode tested
- [ ] Mobile layout tested
