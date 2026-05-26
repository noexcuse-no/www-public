# Makt eller tjeneste — Article Specification

## Purpose and Scope

Create `_pages/ledelse_makt.md` exploring the central tension between power acquisition (Pfeffer) and servant leadership (Blanchard & Barrett). This article addresses the diagnostic question: does your leadership culture optimize for power or service?

## URL

`/makt/`

## Sources

- **Primary (Power):** Pfeffer, J. (2010). *Power: Why Some People Have It — and Others Don't*. Harper Business.
- **Primary (Service):** Blanchard, K., & Barrett, C. (2011). *Lead with LUV: A Different Way to Create Real Success*. FT Press.
- **Meta:** Bolman & Deal (2017) Ch. 16 — "Integrating the Frames"

## Content Direction

### Theme

Organizations need both power and service. The question isn't which to choose — it's whether you have a conscious culture that balances them. This article maps the spectrum from power-optimized to service-optimized leadership, and the costs of each extreme.

### Key Message

Power without service becomes extraction. Service without power becomes martyrdom. Effective leadership cultures know where they sit on this spectrum and why.

### NOT This Article

- Moralizing about "good" vs "bad" leadership
- Political maneuvering tactics
- Religious or spiritual servant leadership

### Core Sections

#### 1. The Diagnostic Tension

Introducing the two poles and why they matter.

**Key points:**
- Pfeffer: "Power is the ability to get things done"
- Blanchard: "Leadership is not about you; it's about the people you serve"
- The tension is structural, not personal
- Organizations drift toward one pole without conscious effort

#### 2. The Power Side (Pfeffer)

What power-oriented leadership looks like and when it works.

**Key points:**
- Power as capacity — the ability to mobilize resources
- Power protects against organizational chaos
- Career implications: power correlates with advancement
- Risk: power becomes self-justifying ("I'm powerful because I'm right")

#### 3. The Service Side (Blanchard & Barrett)

What service-oriented leadership looks like and when it works.

**Key points:**
- Servant leadership as organizational culture enabler
- Service creates trust, which reduces transaction costs
- Evidence: servant leadership correlates with commitment, satisfaction, performance
- Risk: service becomes submission ("I serve therefore I'm exploited")

#### 4. The Price of Power

The full treatment of power's costs.

**Key points:**
- **Trade-offs:** Time spent building power is time not spent on substance
- **Corrupting effect:** Power increases narcissism and overconfidence (research-backed)
- **Psychological toll:** Loneliness, distrust, constant vigilance
- **Relationship costs:** Power changes how others relate to you — even when you don't want it to

#### 5. The Spectrum

Mapping real leadership cultures.

**Key points:**
- Pure power: transactional, competitive, high turnover, short-term
- Pure service: collaborative, slow decisions, potential for exploitation
- Balanced: conscious use of power in service of mission
- Logan's Stage 4-5: "We" cultures that distribute power while maintaining service ethos

#### 6. Questions for Self-Diagnosis

**Key questions:**
- When you make decisions, do you think first about impact or about who supports you?
- How many people would help you if you lost your formal authority?
- Does your organization reward power acquisition or service delivery?
- What would change if your team knew your private motivations?

## Content Guidelines

### Tone

Balanced, direct, no moralizing. Scandinavian minimal. Acknowledge both sides as valid, then show the synthesis.

### Length

~1800 words (longer due to dual-argument structure), semi-formal, scannable.

### Structure

Follow the existing frame article pattern:
1. Hero with intro sentence
2. Problem framing (The Diagnostic Tension)
3. Dual-argument core (Power side, Service side)
4. Price of Power (full treatment)
5. Synthesis (The Spectrum)
6. Questions section
7. CTA linking to Ledelse 60:2

### Citations

- Pfeffer (2010) on power dynamics, costs, and career effects
- Blanchard & Barrett (2011) on servant leadership outcomes
- Logan et al. (2011) on Stage 4-5 cultures as synthesis
- Research on power's psychological effects (Dacher Keltner, "The Power Paradox")

## Design

- **Hero:** Style 2 (banner with text overlay)
- **Illustrations:** 1 hero banner, 2-3 section illustrations (Style 3)
- **Images needed:**
  - Hero: abstract representing tension/duality (balance, scales, or opposing forces)
  - Section 2: upward trajectory / staircase (power)
  - Section 3: hands supporting / circle of people (service)
  - Section 5: spectrum or bridge imagery (synthesis)

## Connections to Site Content

### Link to Ledelse 60:2

CTA section linking to Ledelse 60:2 as the diagnostic that reveals where the organization sits on the power-service spectrum.

### Link to Existing Articles
- Cross-link from `/påvirkning/` (brief mention: "Les om maktens kostnader i /makt/ →")
- Cross-link from `/mennesker/` (servant leadership context)
- Cross-link from `/perspektiv/` (multiframe thinking as the resolution)

## File

**New file:** `_pages/ledelse_makt.md`

**Frontmatter:**
```yaml
---
layout: page
title: "Makt eller tjeneste — Hvor sitter din ledergruppe på spekteret?"
description: "Organisasjoner trenger både makt og tjeneste. Lær hvorfor effektive ledelseskulturer bevisst balanserer begge."
permalink: /makt/
json_ld:
  type: "Article"
  name: "Makt eller tjeneste"
  description: "Hvor sitter din ledergruppe på spekteret mellom makt og tjeneste?"
  author:
    type: "Organization"
    name: "No Excuse AS"
  about:
    - type: "Thing"
      name: "Maktdynamikk"
    - type: "Thing"
      name: "Servant Leadership"
    - type: "Thing"
      name: "Organisasjonskultur"
---
```

## Dependencies

- 4 images (1 hero, 3 section illustrations)
- Cross-links from existing articles
- Reference to Pfeffer and Blanchard & Barrett briefs in `.specs/shared/`

## Acceptance Criteria

- [ ] Both power and service arguments presented fairly
- [ ] "Price of Power" section covers trade-offs, corruption, and psychological toll
- [ ] Spectrum section shows synthesis, not false dichotomy
- [ ] CTA connects to Ledelse 60:2
- [ ] Brand voice consistent with rest of site
- [ ] Dark mode tested
- [ ] Mobile layout tested
