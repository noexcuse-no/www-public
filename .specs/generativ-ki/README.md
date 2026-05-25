# Generativ KI — Article Rewrite Specification

## Purpose and Scope

Rewrite `_pages/ledelse_generativ-ki.md` to match its URL (`/generativ-ki/`) — content must cover generative AI leadership, not goal management/OKR. The URL is correct; the content was mislabeled.

## Current Situation

- **URL:** `/generativ-ki/` (correct — implies generative AI content)
- **Current content:** Full article about OKR, KPI, Balanced Scorecard — goal management
- **Target:** Generative AI leadership content

## Content Direction

### Theme

AI is transforming how work gets done. But the technology itself doesn't lead — people do. This article is about the leadership skills and thinking habits employees need to direct AI models effectively, and how organizations can measure what AI-assisted work actually produces.

### Key Message

Generative AI won't replace employees, but employees who direct AI will replace those who don't. The skill isn't prompting — it's knowing what to ask, how to evaluate outputs, and how to integrate AI-assisted work into measurable processes.

### NOT This Article

- Using AI to manage goals or people
- OKR as a system for managing AI
- AI-generated content strategies
- Prompt engineering tutorials

### Core Sections to Write

#### 1. The Leadership Gap

Opening that establishes the problem: everyone talks about AI tools, few talk about AI leadership. The technology is available; the thinking habits aren't.

**Key points:**
- AI adoption outpaces AI leadership capability
- "Everyone talks about AI" but few address how to develop AI-leader employees
- The question isn't "should we use AI?" — it's "how do we lead people who direct AI?"

#### 2. What AI Leadership Actually Means

Break down what it means to direct an AI model — practical, not theoretical.

**Key points:**
- Formulating good questions (not just prompts)
- Evaluating outputs critically — AI hallucination, bias, context limits
- Integrating AI results into human workflows
- Maintaining accountability when AI is involved in decisions

#### 3. Thinking Habits for AI Direction

The cognitive skills that separate effective AI users from passive ones.

**Key points:**
- Epistemic humility — knowing what you don't know
- Precision of intent — vague questions get vague answers
- Iterative refinement — AI interaction as dialogue not one-shot
- Calibration — constantly testing whether AI confidence matches reality

#### 4. OKR/KPI Integration for AI-Assisted Work

How measurement discipline helps humans stay in control of AI outputs.

**Key points:**
- AI produces content; humans produce value — the gap between them needs measurement
- KPIs for AI-assisted processes (quality, consistency, accuracy, efficiency gains)
- Goal management keeps humans accountable for AI outputs, not just AI inputs
- Caution: measurement is for human accountability, not AI evaluation

#### 5. The Organization's Role

What organizations must do to develop AI leadership capability.

**Key points:**
- Training isn't prompting — it's developing judgment
- Role of leadership: create conditions for effective AI use, not mandate specific tools
- Risk: AI as excuse for removing human judgment from decisions

#### 6. Red Flags

Warning signs that AI is being used without proper leadership thinking.

**Key points:**
- AI outputs implemented without human review
- "The AI said it" as justification
- No measurement of AI quality — only measurement of AI quantity
- Teams that are faster but less accurate

## Content Guidelines

### Tone

Direct, practical, Scandinavian minimal. No consultant-speak. Written for leaders who need to think about AI deployment, not technologists.

### Length

~1500 words, semi-formal, scannable with H2/H3 headers.

### Structure

Follow the existing frame article pattern:
1. Hero with intro sentence
2. Problem framing
3. Core content (5-6 sections)
4. Key questions section
5. CTA linking to Ledelse 60:2

### Citations

Reference relevant research where appropriate:
- AI governance and risk (NIST AI Risk Management Framework)
- Measurement theory (Hubbard — already in site's bibliography)
- Organizational learning

## Connections to Site Content

### Link to Ledelse 60:2

The article should naturally connect to Ledelse 60:2 as the diagnostic tool for understanding how well the organization leads AI adoption. Use CTA section.

### Link to Existing Articles

- References to `/struktur/` for process/governance aspects
- References to `/forankring/` for decision-making
- References to `/mennesker/` for organizational culture around AI

## File Updates

**File:** `_pages/ledelse_generativ-ki.md`

**Frontmatter update needed:**
```yaml
title: "Generativ KI-ledelse — Hvordan lede ansatte som styrer AI-modeller"
description: "Lær hvordan å utvikle ledelseskompetanse for AI-æraen. KI endrer arbeidsmarkedet — de som lærer å lede ansatte som styrer KI-modeller, vinner."
permalink: /generativ-ki/
json_ld:
  type: "Article"
  name: "Generativ KI-ledelse"
  description: "Hvordan utvikle ledelseskompetanse og tenkeevne for ansatte som arbeider med generative KI-modeller"
  about:
    - type: "Thing"
      name: "Generativ KI"
    - type: "Thing"
      name: "AI-ledelse"
    - type: "Thing"
      name: "Målstyring"
```

## Dependencies

- No new images required for initial version
- May need CTA illustration update (existing: `benefit-ai.png`)

## Acceptance Criteria

- [ ] Article title and frontmatter match AI leadership content
- [ ] Content is actually about AI leadership, not OKR/målstyring
- [ ] URL `/generativ-ki/` matches content
- [ ] CTA connects to Ledelse 60:2
- [ ] No content removed — OKR material stays accessible elsewhere or is integrated
- [ ] Brand voice consistent with rest of site