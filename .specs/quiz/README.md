# Quiz — "Hvilket perspektiv leder du fra?"

> **Status:** Planning
> **Created:** 2026-06-13
> **Design doc:** `.design/quiz.md`
> **Backlog items:** Q1–Q5

## Problem / Goal

Visitors to noexcuse.no encounter Bolman & Deal's four frames through articles and descriptions, but have no interactive way to engage with the material. A quiz bridges this gap — it's entertaining, shareable, and funnels visitors into the relevant content based on their result.

The quiz is NOT a scientific diagnostic. It's a light-hearted self-reflection tool that gives a rough indication and encourages deeper reading.

## Scope

### In scope

- A 10-question quiz delivered as a modal overlay
- Question pool of 15+ questions, each with 6+ answer options
- Questions are relatable situational scenarios, each mapping to one of the four frames
- Each question has an entertaining spot illustration (to be generated)
- Visual progress bar during the quiz
- Results screen with:
  - Dominant perspective assignment (always a single winner — scoring forces a result)
  - Score breakdown across all four frames (horizontal bar chart)
  - Perspective description with link to relevant article
  - Social sharing (LinkedIn, Teams, copy-link) via result-specific URL
  - OG-friendly result illustration
- Quiz entrance: deferred (no CTA button in v1 until placement is decided)
- `sessionStorage` persistence so result survives accidental refresh
- Full keyboard accessibility and screen reader support
- Mobile-first responsive design

### Out of scope (v1)

- User accounts / saving results across sessions
- Email capture as part of quiz flow (CTA is optional after result)
- Comparison with peers / team quiz
- Adaptive questioning (all questions are randomly selected from pool)
- Multi-language support (Norwegian Bokmål only)
- Quiz entrance CTA button placement — deferred until Q5 is activated

### Future considerations

- Track quiz completions (anonymized analytics)
- Dynamic OG image generation per result (vs pre-generated)
- Result download as image (social-friendly PNG)

## Data Model

### Question

```json
{
  "id": "q01",
  "question": "Du skal presentere et forslag for ledergruppa. Hva gjør du?",
  "illustration": "quiz-q-01.webp",
  "answers": [
    { "text": "Lager en tydelig agenda og tidsplan",             "frames": ["struktur"],    "weight": 2 },
    { "text": "Sjekker hvem som må være med for å få gjennomslag", "frames": ["pavirkning"], "weight": 2 },
    { "text": "Starter med en historie som gir mening til forslaget", "frames": ["identitet"], "weight": 2 },
    { "text": "Ringer noen kolleger og hører hva de tenker",       "frames": ["mennesker"],  "weight": 2 },
    { "text": "Sender en kalenderinvitasjon og håper på det beste", "frames": ["struktur"],  "weight": 1 },
    { "text": "Går en tur for å lande tankene først",              "frames": ["mennesker"],  "weight": 1 },
    { "text": "Sjekker hvem som er uenige — og hvorfor",           "frames": ["pavirkning"], "weight": 1 }
  ]
}
```

#### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique question ID (q01–q20) |
| `question` | string | Question text in Norwegian Bokmål |
| `illustration` | string (optional) | Filename in `assets/images/quiz/`. First 10 questions get illustrations |
| `answers` | array | 6–8 answer options |
| `answers[].text` | string | Answer text |
| `answers[].frames` | string[] | Which frame(s) this answer maps to. Usually `["frame_id"]` (singleton), can be multi-frame with reduced weight |
| `answers[].weight` | number | How strongly this answer maps to the frame(s). 1 = subtle, 2 = strong |

### Frame Scores

```json
{
  "struktur": 0,
  "mennesker": 0,
  "identitet": 0,
  "pavirkning": 0
}
```

Weights accumulate per frame across all 10 selected questions.

### Result

```json
{
  "winner": "struktur",
  "scores": { "struktur": 12, "mennesker": 8, "identitet": 6, "pavirkning": 4 },
  "max_possible": 20,
  "total_questions": 10
}
```

## Scoring Algorithm

Scoring MUST always produce a single winner — no ties, no "balanced" results.

1. Start with all four frame scores at 0
2. For each of the 10 answered questions, add the selected answer's `weight` to each frame in `answer.frames`
3. If `answer.frames` contains multiple frames (e.g., `["struktur", "mennesker"]`), split the weight evenly between them
4. After all 10 questions, the frame with the highest total score is the winner
5. Tie-breaking (iterative, applied until a single winner emerges):
   - First: compare count of highest-weighted individual answers per tied frame
   - Second: compare sum of all weights across all 10 answers per tied frame
   - Third: pick the frame whose single answer had the highest `weight` value across all 10 questions
   - Fourth: random selection (deterministic per session by seeding from `sessionStorage` quiz ID)
6. The JSON result payload always includes exactly one `winner` — never `null` or `"balanced"`

### Score visualization

Result screen shows horizontal bars for all 4 frames:

```
Struktur    ████████████████░░░░░░░░  14/20
Mennesker   ██████████░░░░░░░░░░░░░░  10/20
Identitet   ██████░░░░░░░░░░░░░░░░░░   6/20
Pavirkning  ████░░░░░░░░░░░░░░░░░░░░   4/20
```

Bar width = `score / max_possible * 100%`. Bars are colored by frame accent color.

## Question Pool Requirements

| Property | Requirement |
|----------|-------------|
| Total questions | ≥15 (20 recommended for v1) |
| Questions used per session | 10, randomly selected from pool |
| Answers per question | 6–8 (minimum 6) each |
| Frame coverage | Every question MUST have answers mapping to ≥3 of the 4 frames |
| Illustration | First 10 questions in the pool get illustrations (rest can be text-only) |

### Question content generation

First version of the question pool is **LLM-generated** (by AI during implementation). Questions are written directly as a JS array in `quiz.js` — no separate JSON file needed for v1. The LLM is prompted with:
- Brand voice (direct, uncomplicated, not corporate — see `.design/brand-perception.md`)
- The four frames and their Norwegian descriptions
- "Relatable scenarios" — everyday leadership situations
- Each question must have ≥6 answer options, each mapping to 1–2 frames

### Question themes

Questions should be relatable, everyday leadership scenarios:

- Meetings and presentations
- Decision-making under uncertainty
- Team conflict / disagreement
- Organizational change
- Delegation and follow-up
- Culture and values
- Communication breakdowns
- Resource allocation
- Stakeholder management
- Performance feedback

## Scoring Distribution Design

The quiz should NOT have an obvious "correct" answer. Good questions have answers that all sound reasonable — just with different frame alignments.

| Frame distribution per question | Count (of 10) |
|----|----|
| 3 frames represented | ~3 questions |
| All 4 frames represented | ~7 questions |

This ensures no single frame can dominate purely by being overrepresented.

## Files to Create

### New files

| File | Purpose |
|------|---------|
| `assets/scripts/quiz.js` | Quiz JS: modal, question flow, scoring, results |
| `assets/css/components/quiz.css` | Quiz CSS: modal, progress bar, answer cards, result |
| `_includes/quiz-modal.html` | Modal HTML structure (empty shell, populated by JS) |
| `_data/quiz/questions.json` | Question pool data (loaded by JS) |
| `assets/images/quiz/quiz-q-{01-10}.webp` | Question illustrations (to be generated) |
| `assets/images/quiz/quiz-resultat-{frame}.webp` | Result illustrations (4 total) |
| `assets/images/quiz/quiz-resultat-og-{frame}.webp` | OG share images (4 total) |

### Modified files

| File | Change |
|------|--------|
| `.design/information-architecture.md` | Add quiz entry (done) |

### Files deferred (Q5 — no CTA placement yet)

The following files exist in the repo but are NOT wired into any page until Q5 is activated:

| File | Purpose | Status |
|------|---------|--------|
| `_includes/scripts.html` | Add `quiz.js` script include | Deferred |
| `_includes/styles.html` | Add `quiz.css` stylesheet include | Deferred |
| Homepage / frame pages | Add quiz CTA button | Deferred |

## Technical Architecture

### JS Architecture (quiz.js)

```
QuizApp (singleton)
├── init(triggerSelector, modalSelector)
├── loadQuestions()          → fetch JSON or inline data
├── selectQuestions(10)      → random selection from pool
├── start()                  → open modal, render question 1
├── renderQuestion(index)    → build DOM for current question
├── selectAnswer(index)      → record answer, advance
├── nextQuestion() / showResult()
├── renderResult()           → infographic with bars + description
└── close()
```

### State

```js
const state = {
  questions: [],       // 10 selected questions
  currentIndex: 0,     // 0-based
  answers: [],         // answer objects selected
  scores: { struktur: 0, mennesker: 0, identitet: 0, pavirkning: 0 },
  isOpen: false
};
```

### Data Loading Strategy (v1)

Questions stored as a global JS variable (inlined from a `_data/` JSON via Liquid, or directly in the script). This avoids a fetch request. For v1, inline the question data as a JS constant in `quiz.js`. Future versions can fetch from an API or JSON file.

Implementation options:
1. **Inline in JS** (recommended for v1): `const QUIZ_QUESTIONS = [...]` in `quiz.js`
2. **Liquid include**: `_data/quiz/questions.json` fetched via JS `fetch()`
3. **Hybrid**: Liquid renders JSON into a `<script type="application/json">` tag in `_includes/quiz-modal.html`

### CSS Architecture

New file: `assets/css/components/quiz.css` following existing component patterns:
- Use CSS variables from `colors.css`
- `.quiz-overlay` — full-screen backdrop
- `.quiz-modal` — the modal card
- `.quiz-progress` — progress bar track + fill
- `.quiz-question` — question text + illustration container
- `.quiz-answers` — answer option list
- `.quiz-answer` — individual answer card
- `.quiz-result` — result screen
- `.quiz-score-bar` — horizontal score bar

### Quiz CTA Placement

The quiz entrance button uses the existing `.cta` button class:

```html
<button class="cta cta--quiz" data-quiz-trigger>
  Hvilket perspektiv leder du fra? → Ta testen
</button>
```

## Mobile Behavior

| Scenario | Behavior |
|----------|----------|
| Modal opens | Body scroll locked, overlay visible |
| Answer tap | Immediate selection + next question animates in |
| Close button | Returns to page, no result saved |
| Orientation change | Modal stays centered, content reflows |
| Touch targets | All interactive ≥44×44px |

## Accessibility

| Requirement | Implementation |
|-------------|---------------|
| Focus trap | Tab cycles within modal, Escape closes |
| Focus management | Auto-focus first answer, return focus on close |
| Screen reader | `aria-live="polite"` on question, `role="progressbar"` on bar |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` — no transitions |
| Color contrast | All text meets WCAG AA against modal background |
| Keyboard | Full navigation with Tab, Enter/Space, Arrow keys |

## Social Sharing

Sharing includes the user's result via a URL parameter so recipients see the same perspective on open.

### Share targets

| Platform | Method | Data |
|----------|--------|------|
| LinkedIn | URL share | `https://noexcuse.no/?quiz=struktur` + pre-filled text |
| Teams | URL share | Same as LinkedIn pattern |
| Copy link | Clipboard | `https://noexcuse.no/?quiz=struktur` |

### URL parameter

```
https://noexcuse.no/?quiz={frame_id}
```

When the shared URL is opened, the page detects `?quiz=struktur` and renders the result infographic for that perspective inline on the homepage (not in a modal) — making it a shareable, embeddable result card. If no `?quiz=` param, show nothing extra.

### Share text template (pre-filled)

```
Jeg tok "Hvilket perspektiv leder du fra?"-testen hos No Excuse.
Mitt dominerende perspektiv: {perspektiv_navn}
Ta testen du også: https://noexcuse.no
```

### OG image for share

Result OG images show: perspective name, short tagline, No Excuse logo, 4-frame micro icons.
Pre-generated as 4 separate files (one per perspective), 1200×630px WebP.

## Acceptance Criteria

- [ ] 15+ questions in pool, each with 6+ answers
- [ ] 10 questions randomly selected per session
- [ ] All 4 frames are fairly represented in the selection
- [ ] Modal opens within 300ms of clicking CTA
- [ ] Answer selection immediately advances to next question
- [ ] Progress bar updates correctly after each answer
- [ ] Result screen shows dominant perspective with description
- [ ] Score breakdown shows all 4 frames as horizontal bars
- [ ] Share buttons work (LinkedIn, Teams, copy-link)
- [ ] SessionStorage persists answer across accidental page refresh during quiz
- [ ] Escape key closes quiz at any point
- [ ] Focus trap works within modal
- [ ] Works on mobile (320px width) and desktop (1920px)
- [ ] All interaction targets ≥44×44px
- [ ] No inline styles, no inline event handlers, no embedded `<script>` tags
- [ ] Passes CSS linting and JS linting
- [ ] Dark mode: all quiz elements use CSS variables, no hardcoded colors

## Risk Areas

| Risk | Mitigation |
|------|-----------|
| 15+ questions with 6+ answers each = 90+ answer texts to write | LLM generates first version; iterate from there |
| Illustrations: 10 question + 4 result + 4 OG = 18 images needed | Prioritize first 10 question + 4 result; OG can use result art scaled |
| Quiz feels too serious or corporate | Write questions in brand voice (direct, relatable scenarios), use entertaining illustrations |
| Scoring feels random or unsatisfying | Scoring always forces a winner — never "balanced" — gives clear, satisfying result |
