# AI Agent Instruction Cheat Sheets — Leadership Assessment Agent Specification

## Purpose / Problem

### Context

The website noexcuse.no currently has an `AI-INSTRUCTIONS.md` file in `.specs/shared/` that documents three AI contexts:

1. **Internal Dev AI** — AI agents working on the website codebase
2. **Visitor AI (Web Crawlers/Discovery)** — AI agents discovering and categorizing the company's offerings via JSON-LD and sitemap
3. **Customer AI (Report Follow-up)** — AI agents accompanying post-engagement reports

What does **not** exist is a fourth context — a **Leadership Assessment AI Agent** — that helps leaders (visitors to the site or clients of No Excuse AS) chart the current state of leadership, perspectives, governance, risk, and compliance in their organization through structured conversation.

These agents interact directly with leaders, not with the website codebase. They need rich contextual understanding of:

- The No Excuse AS methodology and its theoretical foundations
- Bolman & Deal's four-frame model as operationalized through Ledelse 60:2
- GRC frameworks and how they relate to leadership maturity
- The brand's anti-consultant voice and values
- MCP capabilities for accessing organizational data
- Structured conversation patterns that lead to actionable next steps

### Problem

Without structured instruction cheat sheets, visitor AI agents lack:

- Consistent understanding of what organizational information is relevant/irrelevant
- Clear roles to adopt when assisting a leader
- Prepared critical perspective Q&A on Bolman & Deal, Ledelse 60:2, and No Excuse AS
- Knowledge of when and how to probe for organizational context vs. when to synthesize
- Guardrails against consultant-speak and open-ended exploration

The cheat sheets must be markdown-formatted reference material that gets included in prompts sent to the visiting AI agent.

### Relationship to Existing AI-INSTRUCTIONS.md

This is a **new, separate AI context** — not a replacement for the existing three. The existing `AI-INSTRUCTIONS.md` (`specs/shared/AI-INSTRUCTIONS.md`) covers Internal Dev, Visitor (web crawler), and Customer (report follow-up) contexts. This spec covers a **Leadership Assessment Agent** that engages in direct conversation with organizational leaders.

Both documents should cross-reference each other where relevant (e.g., the bibliography sources from the synthesis doc are relevant to both Customer AI and Leadership Assessment AI).

---

## Scope

### Files to Create

- `.specs/ai-agent-cheat-sheets/README.md` — This specification
- `.specs/ai-agent-cheat-sheets/cheat-sheet-core.md` — Main instruction cheat sheet (4+ pages)
- `.specs/ai-agent-cheat-sheets/critical-perspectives-qna.md` — Q&A prep (2+ pages)

### Files to Modify

- `BACKLOG.md` — Add new items
- `.design/information-architecture.md` — Optionally update after page naming decisions

### Out of Scope (for implementation phase, not now)

- The actual markdown cheat sheets themselves (deferred to implementation)
- Any changes to `_pages/*.md` or `_includes/*`
- Any JS/CSS
- Any Jekyll configuration changes

---

## Requirements

### 1. Cheat Sheet Content Requirements

The cheat sheets must cover:

#### 1.1 Organizational Context Information Types

What constitutes relevant context for a leader conversation — types of information the agent should attempt to gather (via MCPs, conversation history, or direct questions):

- **Formal structure:** Org charts, reporting lines, decision authorities, board composition
- **Governance systems:** ISO certifications (9001, 27001, 45001), policies, compliance frameworks
- **Current projects:** Strategic initiatives, restructuring, digital transformation, M&A
- **Risk landscape:** Identified risks, audit findings, compliance gaps, previous incidents
- **Culture indicators:** Turnover rates, employee survey results, known cultural challenges
- **Leadership composition:** Team size, tenure, backgrounds, known friction points
- **Strategic priorities:** Stated vs. actual priorities, resource allocation patterns
- **Improvement opportunities:** Previous consulting engagements, identified gaps, management's stated needs

#### 1.2 Agent Roles

Clearly defined roles the agent can adopt, each with distinct conversation patterns:

1. **Diagnostician** — Asks structured questions across all four frames, maps responses to Bolman & Deal framework, identifies frame dominance and gaps. Best for initial assessment conversations.
2. **Reframer** — Challenges the leader's dominant perspective, introduces alternative frames, helps see blind spots. Best when leader seems stuck in one frame.
3. **Synthesizer** — Organizes scattered information into coherent patterns, identifies themes across multiple conversations/data sources, produces structured summaries. Best after information gathering.
4. **Devil's Advocate** — Probes assumptions, presents counter-evidence from organizational research (Pfeffer, Hubbard, Logan), tests robustness of conclusions. Best when groupthink is suspected.
5. **Coach** — Guides leader through reflective exercises, helps formulate action items, provides follow-up structure. Best after assessment is complete.

Each role description must include: when to adopt it, conversation opening patterns, and guardrails.

#### 1.3 Critical Perspectives Q&A

The cheat sheets must include critical perspectives on three subjects, with prepared responses:

**A. Critical Perspective on Bolman & Deal's Four-Frame Model**

Anticipated critiques to prepare for:

- "Aren't four frames just another consultant taxonomy?"
- "Hasn't Bolman & Deal been superseded by newer organizational theories?"
- "Doesn't framing everything as 'perspectives' lead to relativism?"
- "Isn't this just repackaged systems thinking with a fancy name?"

Each critique must have a prepared response that:
- Acknowledges the validity of the critique
- Provides the No Excuse AS counter-argument grounded in the actual content of `/perspektiv/` and `/metode/`
- Links to relevant noexcuse.no pages
- Avoids defensive or consultant-speak tone

References: `/perspektiv/`, `/metode/`, `/om-oss/`, `.specs/shared/bolman-deal-2017.md` (once created), `.specs/shared/synthesis.md`

**B. Critical Perspective on Ledelse 60:2**

Anticipated critiques:

- "60 questions in 2 hours — is that enough for a meaningful assessment?"
- "No scoring? How do you benchmark without numbers?"
- "Isn't this just a consulting product dressed up as research?"
- "How is this different from any other leadership 360 assessment?"

Each critique must have a prepared response that:
- References the "no scoring" philosophy from `/perspektiv/`
- Connects to Hubbard's measurement methodology
- Links to `/metode/` for the research ethics framework
- References the theoretical backbone in `.specs/shared/synthesis.md`

References: `/ledelse-60-2/`, `/perspektiv/` (No Scoring section), `/metode/`, `.specs/shared/synthesis.md`

**C. Critical Perspective on No Excuse AS**

Anticipated critiques:

- "You're a consultancy that claims to be anti-consultant — isn't that contradictory?"
- "What makes your approach credible when your company was founded in 2025?"
- "You criticize bureaucracy, but isn't GRC inherently bureaucratic?"
- "Is this just a Norwegian fad?"

Each critique must have a prepared response that:
- Acknowledges the paradox honestly
- References company values from `/om-oss/` and `.design/brand-perception.md`
- Points to research ethics framework at `/metode/`
- Links to actual governance language in `/avtale/`

References: `/om-oss/`, `/metode/`, `/avtale/`, `.design/brand-perception.md`

#### 1.4 Structured Conversation Format

The cheat sheets must include conversation flow guidelines that:

- Start with a framing question (e.g., "Hva jobber du med akkurat nå som du gjerne skulle sett tydeligere?")
- Follow a diagnostic tree to determine which agent role to adopt
- Use Bolman & Deal frame questions as structured probes
- Define stopping conditions: when the agent has enough information to identify patterns
- Define completion criteria: the leader can articulate 1-3 actionable next steps
- Explicitly forbid open-ended exploration: every question must serve the diagnostic or coaching goal
- Include fallback patterns for when the leader is vague or deflective

#### 1.5 Brand Voice and Anti-Patterns

Must include distilled brand voice guidelines from `.design/brand-perception.md`:

- **Forbidden words:** synergi, verdiskapning, bærekraftig (as buzzword), helhetlig, skreddersydde løsninger, transformasjon
- **Required tone:** Direct, competent, Scandinavian minimal, anti-establishment
- **Write like:** A knowledgeable colleague, not a corporation
- **Format:** Short sentences, concrete examples, address problems directly

#### 1.6 Links to noexcuse.no Pages

The cheat sheets must include a curated link index mapping concepts to pages:

| Concept | Page URL | Key section |
|---------|----------|-------------|
| Four frames overview | `/perspektiv/` | Multiframe thinking, No scoring argument |
| Structure frame | `/struktur/` | Roller, mål, prosesser |
| People frame | `/mennesker/` | Tillit, motivasjon, verdier |
| Influence frame | `/pavirkning/` | Makt, interesser, konflikt |
| Identity frame | `/identitet/` | Kultur, ritualer, historier |
| Ledelse 60:2 product | `/ledelse-60-2/` | 60 questions, 2 hours, 3 steps |
| Methodological foundation | `/metode/` | Research ethics, data collection |
| GRC framework | `/grc/` | Four GRC dimensions |
| Trust & psychological safety | `/tillit/` | Four pillars |
| Power dynamics | `/makt/` | Power-service spectrum |
| Uncertainty & change | `/usikkerhet/` | Culture stages, Kotter |
| Anchoring decisions | `/forankring/` | Bias, groupthink |
| Triads | `/triader/` | Team structures |
| Generative AI leadership | `/generativ-ki/` | AI as leadership question |
| About No Excuse | `/om-oss/` | Values (ansvarlighet, tillit, ærlighet) |
| Standard terms | `/avtale/` | Rights & data use |
| Topic index | `/emne/` | Tag-based article discovery |

### 2. Critical Perspectives Q&A Structure

Each Q&A entry must follow this template:

```markdown
## [Subject]: [Question]

**Visitor asks:** "[Question]"

**Agent response:**

1. [Acknowledge validity — 1 sentence]
2. [Counter-argument grounded in framework content — 2-3 sentences]
3. [Link to relevant noexcuse.no page]
4. [Return to diagnostic conversation with a probe question]
```

### 3. Agent Role Definition Structure

Each role definition must follow:

```markdown
### Role: [Name]

**When to adopt:** [Situational trigger]

**Conversation opening:** "[Sample prompt to start]" 

**Core method:** [2-3 sentence description of what the agent does in this role]

**Guardrails:**
- [What to avoid in this role]
- [When to switch to another role]
- [Conversation stopping condition]

**Frame mapping:** [How this role maps to Bolman & Deal frames]

**Example exchange:**
> Leader: [Sample statement]
> Agent: [Sample response in character]
```
