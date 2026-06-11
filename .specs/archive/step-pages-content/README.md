# Step Pages — Boilerplate Content

> **Backlog References:** R25
> **Created:** 2026-06-09
> **Status:** Draft

## Problem / Goal

The three step pages (`/samtale/`, `/intervju/`, `/rapport/`) are extremely thin — 13 lines each, containing only frontmatter and a single T3 hero image. They lack any substantive body content, making them feel incomplete to visitors. A product page with three concrete steps should describe each step in enough detail that visitors understand what happens at each stage before committing to a conversation.

Goal: Add informative boilerplate text (Norwegian Bokmål) to each step page describing what the step involves, why it matters, and what the visitor can expect.

## Scope

### Files to modify

| File | Page | Current State |
|------|------|---------------|
| `_pages/step-talk.md` | `/samtale/` | 13 lines, one image |
| `_pages/step-interview.md` | `/intervju/` | 13 lines, one image |
| `_pages/step-report.md` | `/rapport/` | 13 lines, one image |

### Content requirements (per page)

Each page should contain (in Norwegian Bokmål):

1. **Expanded lead paragraph** — 2–3 sentences expanding on the frontmatter description, setting expectations
2. **What happens section** — Bullet list or short paragraphs describing the concrete activities in that step
3. **Why this matters section** — 1–2 paragraphs on the value of this step for the customer
4. **What you need section** — Practical prerequisites (time, participants, materials)
5. **CTA** — A link or button to the next step (e.g. `/samtale/` → `/intervju/`), or to the booking page
6. **Cross-link** — Mention relevant methodology page (`/om-metode/`) or product page (`/ledelse-60-2/`) where appropriate

### Tone

- Direct, competent, Scandinavian minimal (see `.design/brand-perception.md`)
- No consultant-speak ("bærekraftig", "verdiøking", "helhetlig")
- Conversational but precise — like a knowledgeable colleague explaining the process
- Describe the experience, not abstract benefits

### Existing content to preserve

- All frontmatter fields (class, layout, category, step_number, title, description, banner, micro_image, url)
- The existing T3 hero image

## Acceptance Criteria

- [ ] `/samtale/` has readable body content (minimum ~150 words)
- [ ] `/intervju/` has readable body content (minimum ~200 words)
- [ ] `/rapport/` has readable body content (minimum ~150 words)
- [ ] Each page has at least one cross-link to `/om-metode/` or `/ledelse-60-2/`
- [ ] Each page links to the next step in the sequence (where applicable)
- [ ] Norwegian Bokmål, brand-voice compliant
- [ ] `npm run lint` passes (HTML validation)
- [ ] `bundle exec jekyll build` exit 0
