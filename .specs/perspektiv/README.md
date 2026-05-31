# Fire perspektiver — Article Specification

## Purpose and Scope

Create `_pages/ledelse_perspektiv.md` as the capstone article explaining multiframe thinking as the actual leadership skill. This article synthesizes all four Bolman & Deal frames and provides the "no scoring" philosophical backing.

## URL

`/perspektiv/`

## Source

- **Primary:** Bolman, L. G., & Deal, T. E. (2017). *Reframing Organizations: Artistry, Choice, and Leadership* (6th ed.). Jossey-Bass. Chapter 16 — "Integrating the Frames"
- **Supporting:** Hubbard, D. W. (2014). *How to Measure Anything: Finding the Value of Intangibles in Business* (3rd ed.). Wiley.
- **Supporting:** Logan, D., King, J., & Fischer-Wright, H. (2011). *Tribal Leadership*. Harper Business.

## Content Direction

### Theme

Most leaders see the world through one lens. The best leaders see through four — and know which lens to use when. This article explains why single-frame thinking fails, what multiframe thinking looks like in practice, and why "no scoring" is actually the most rigorous approach.

### Key Message

Leadership is not about being right. It's about being complete. Multiframe thinking — seeing situations through structural, human resource, political, and symbolic lenses simultaneously — is the skill that separates diagnostic leaders from ideological ones.

### NOT This Article

- Summary of the four frames (each frame has its own article)
- Academic discussion of frame theory
- Prescriptive "use frame X in situation Y" checklist

### Core Sections

#### 1. The Single-Frame Trap

Why most leaders fail: they have a favorite frame and apply it everywhere.

**Key points:**
- Engineers see structure; HR sees people; politicians see power; marketers see symbols
- Every profession trains a single-frame reflex
- The trap: when your only tool is a hammer, every problem looks like a nail
- Bolman & Deal: "Leaders who master only one frame are doomed to repeat its limitations"

#### 2. What Multiframe Thinking Is

Defining the skill, not the theory.

**Key points:**
- Not knowing four theories — it's seeing four aspects simultaneously
- The mental habit: "What would this look like through a different lens?"
- Diagnostic discipline: which frame explains the most variance?
- Practical: takes 2 minutes to reframe, saves months of misdirected effort

#### 3. The "No Scoring" Backing

Why Ledelse 60:2 doesn't score — and why that's more rigorous.

**Key points:**
- **Hubbard:** "The most important measurement is knowing what you don't know"
- **Logan:** Culture stages describe, they don't prescribe. Stage labels are diagnostic, not evaluative.
- **Pfeffer:** "Numbers are political" — scoring creates gaming, not improvement
- Scoring implies a single dimension. Organizations are multi-dimensional.
- Descriptive framing: "Your culture shows Stage 3 patterns" vs. evaluative: "You are Stage 3 (average)"
- The alternative: pattern recognition + conscious choice, not ranking

#### 4. Integrating the Frames in Practice

How multiframe thinking works in real situations.

**Key points:**
- **Case 1:** Restructuring — structure first, then culture, then power, then meaning
- **Case 2:** Merger — symbolic integration before structural; political before HR
- **Case 3:** Crisis — all four frames simultaneously; no time for sequential analysis
- The sequence matters: which frame leads depends on context

#### 5. How to Develop Multiframe Capability

Practices for leaders and teams.

**Key points:**
- Explicit reframing in meetings: "Let's look at this from a [different] perspective"
- Rotating perspectives: assign each frame to a different person in the room
- Reading across disciplines: leaders should read outside their function
- The 60:2 interview itself as multiframe practice: questions force perspective-switching

#### 6. Questions for Multiframe Diagnosis

**Key questions:**
- Which frame do you reach for first when something goes wrong?
- When did you last change your mind because of a different perspective?
- Does your team have a "designated skeptic" for each frame?
- What would your biggest problem look like through the lens you use least?

## Content Guidelines

### Tone

Synthesizing, authoritative but humble. This is the capstone — it should feel like the article that ties everything together.

### Length

~2000 words (capstone article, longer due to synthesis role), semi-formal, scannable.

### Structure

Follow the existing frame article pattern with expanded synthesis sections:
1. Hero with intro sentence
2. Problem framing (Single-Frame Trap)
3. Core concept (What Multiframe Thinking Is)
4. Philosophical backing (No Scoring)
5. Practical application (Integrating in Practice)
6. Development (How to Develop)
7. Questions section
8. CTA linking to Ledelse 60:2

### Citations

- Bolman & Deal (2017) Ch. 16 on frame integration
- Hubbard (2014) on measurement rigor and knowing uncertainty
- Logan et al. (2011) on descriptive vs. evaluative culture work
- Pfeffer (2010) on politics of measurement and scoring

## Design

- **Hero:** Style 2 (banner with text overlay)
- **Illustrations:** 1 hero banner, 1-2 section illustrations (Style 3)
- **Images needed:**
  - Hero: abstract representing multiplicity — four overlapping lenses, prism, or kaleidoscope
  - Section 3: abstract representing clarity without reduction (perhaps a network or constellation)

## Connections to Site Content

### Link to Ledelse 60:2

CTA section linking to Ledelse 60:2 as the diagnostic tool that operationalizes multiframe thinking — the interview forces perspective-switching through its 60 questions.

### Link to Existing Articles
- Cross-links from **all four perspektiv articles** in their "Referanser" sections:
  - "Les om hvordan perspektivene henger sammen i /perspektiv/ →"
- Link from `/makt/` (multiframe thinking as resolution of power-service tension)
- Link from `/triader/` (structural tool that serves multiple frames)

### "No Scoring" Integration

This article is the canonical reference for why No Excuse doesn't score. All four frame articles should reference it:
- In each frame's "Referanser" section: "No Excuse 60:2 er bevisst beskrivende, ikke evaluerende. [Les hvorfor →](/perspektiv/)"

## File

**New file:** `_pages/ledelse_perspektiv.md`

**Frontmatter:**
```yaml
---
layout: page
title: "Fire perspektiver — Multiframe thinking som lederferdighet"
description: "Hvorfor en-rame-tenkning feiler, og hvordan multiframe thinking gir bedre diagnostikk. Det egentlige argumentet for 'no scoring'."
permalink: /perspektiv/
json_ld:
  type: "Article"
  name: "Fire perspektiver"
  description: "Hvorfor en-rame-tenkning feiler, og hvordan multiframe thinking gir bedre diagnostikk."
  author:
    type: "Organization"
    name: "No Excuse AS"
  about:
    - type: "Thing"
      name: "Bolman og Deals fire rammeverk"
    - type: "Thing"
      name: "Multiframe thinking"
    - type: "Thing"
      name: "Ledelsesdiagnostikk"
---
```

## Implementation Order

**3rd** in the N1–N3 sequence (capstone — synthesized after makt and triader are written). Must be written last as it references both `/makt/` and `/triader/` as supporting articles.

## Dependencies

- 2-3 images (1 hero, 1-2 section illustrations)
- Cross-links from all four perspektiv articles
- Link from `/makt/` (multiframe thinking as resolution of power-service tension)
- Link from `/triader/` (structural tool that serves multiple frames)
- Both `/makt/` and `/triader/` must exist before cross-links are valid

## Acceptance Criteria

- [ ] Article positions multiframe thinking as a skill, not theory
- [ ] "No Scoring" section is philosophically rigorous (cites Hubbard, Logan, Pfeffer)
- [ ] Practical cases show integration in action
- [ ] All four existing perspektiv articles link back to this article
- [ ] CTA connects to Ledelse 60:2
- [ ] Brand voice consistent with rest of site
- [ ] Dark mode tested
- [ ] Mobile layout tested
