# Organisasjonskultur & Endringsledelse — Specification Update

## Purpose and Scope

Update `ledelse_usikkerhet.md` to include actionable change management methodology. The existing article diagnoses why organizational culture is hard to change, but doesn't provide a practical framework for doing so. Add Kotter's 8-step model as a core section.

## Current Situation

- **File:** `_pages/ledelse_usikkerhet.md`
- **Current content:** Describes Schein's culture levels, Logan's five tribal stages, Kotter's statistic (70% fail) — but no actionable methodology
- **Gap:** The article tells readers *why* change is hard, not *how* to actually do it

## Required Addition: Kotter's 8-Step Model

Add a detailed section explaining John Kotter's 8-step model for successful organizational change (from "Leading Change", 2012).

### The Eight Steps

**Step 1: Create urgency**
- Help people see why change is needed now — not eventually
- Reality check: what's the cost of not changing?
- Norwegian context example: competitive pressure, regulatory changes, labor market shifts

**Step 2: Form a powerful coalition**
- Assemble a group with enough power to lead the change
- Include formal leaders + informal opinion leaders
- Not everyone needs to be convinced — but key stakeholders must be

**Step 3: Create a vision for change**
- Articulate what the future looks like after the change
- Simple, clear, inspiring — not a project plan
- The vision guides decisions, not just communications

**Step 4: Communicate the vision**
- Make the vision ongoing presence, not one-time announcement
- Lead by example — actions speak louder than presentations
- Address anxiety and resistance directly, don't ignore it

**Step 5: Remove obstacles**
- Identify barriers: structures, systems, skills, habits
- Empower people to remove obstacles or work around them
- Celebrate early wins that remove a barrier

**Step 6: Create short-term wins**
- Plan for visible improvements within 3-6 months
- Don't wait for the big transformation — early wins build momentum
- Analyze results honestly — adjust if the win wasn't as big as expected

**Step 7: Build on the change**
- Use credibility from early wins to tackle bigger changes
- Promote people who implemented early changes
- Don't declare victory too early — consolidation takes time

**Step 8: Anchor the changes in culture**
- Connect new behaviors to organizational success
- Ensure leadership development includes change leadership
- Document what changed — don't let old culture reassert itself

### Why 70% Fail

Kotter identifies eight specific errors that cause failure:

1. Allowing too much complacency
2. Failing to create a sufficiently powerful coalition
3. Visioning poorly
4. Under-communicating the vision by a factor of 10
5. Permitting obstacles to block the vision
6. Failing to create short-term wins
7. Declaring victory too soon
8. Not anchoring changes in the corporate culture

## Integration with Existing Content

### Connection to Schein

Kotter's model addresses the three culture levels:
- Artifacts → Communicate vision (Step 4), remove obstacles (Step 5)
- Espoused values → Create urgency (Step 1), anchor in culture (Step 8)
- Basic assumptions → Build on change (Step 7), anchor in culture (Step 8)

### Connection to Logan

Logan's tribal stages explain *where* the organization is. Kotter explains *how* to move forward:
- Stage 1-2: Focus on urgency (Step 1) and coalition (Step 2) — can't move without these
- Stage 3: Vision creation (Step 3) is critical — individualists need a compelling future
- Stage 4-5: Anchoring (Step 8) is the differentiator — how to maintain peak performance

## Content Structure

Add new section **after** "Hvorfor endring er så vanskelig" — before "Vanlige kulturutfordringer":

```
<section class="frame-section">
    <h2>Kotters 8-stegs modell for endring</h2>
    <p>John Kotter har kartlagt hvorfor endringsinitiativer feiler — og hvordan de faktisk kan lykkes. Hans forskning viser at de fleste endringsforsøk mislykkes fordi de gjør én eller flere av åtte kritisk feil. Her er hans åtte steg...</p>

    <div class="frame-element">
        <h3>1. Skap紧急het</h3>
        <p>Hjelp folk å se hvorfor endring er nødvendig nå — ikke til slutt. Hva koster det å la være?</p>
    </div>
    <!-- ... all 8 steps ... -->

    <h3>Hvorfor de fleste feiler</h3>
    <p>Kotter identifiserer åtte spesifikke feil som fører til at endringsinitiativer feiler...</p>
</section>
```

## Language Guidelines

- Start detailed — can shorten later per user instruction
- Use Norwegian terminology for Kotter's concepts (not direct translation, natural Norwegian)
- Include practical examples relevant to Norwegian SMB context
- Maintain brand voice: direct, no consultant-speak

## Acceptance Criteria

- [ ] Kotter's 8 steps are clearly explained in Norwegian
- [ ] Content is actionable, not just theoretical
- [ ] Connection to existing article content (Schein, Logan) is explicit
- [ ] Brand voice consistent
- [ ] No removal of existing content — only additions
- [ ] Article remains scannable with clear section hierarchy