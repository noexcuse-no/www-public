# Privacy Specification — No Excuse AS

> Status: Active
> Applies to: All public repository files
>
> **Updated 2026-08-30 (strategy alignment):** Adds AI-conversation privacy specifics for the private-reflection feature. Full communication spec: `.specs/privacy-communication/README.md` (3 layers: L1 signature lines, L2 three-box panel, L3 /personvern-ki/ page).

## Personal Data

- No personal data in public files
- Contact information only in `_data/metadata.yml`
- Team member photos must not contain embedded personal metadata

## AI-Conversation Privacy (private reflection)

- **No AI answers ever** — the site never receives or stores the visitor's AI conversation or its answers.
- **Events are metadata-only** — analytics record event name + source (e.g. `ai_topic_selected`, `ai_prompt_copied`, `ai_return`), never conversation content, topics beyond the label, or answers.
- **Wording rule:** never claim "samtalen er privat". The exact wording is **"Samtalen deles ikke med No Excuse"** — the conversation happens in the visitor's own AI (their supplier's terms apply), and No Excuse does not see it.
- **Research:** separate explicit opt-in, default none, no raw transcripts, not marketed until a real partner exists.

## Tracking

- No tracking scripts without consent placeholders
- Analytics (if added) must use cookie-free anonymised collection
- Simple Analytics (cookie-free) is the analytics provider; the Events API fires the 12 site-side events per `.specs/analytics-events/README.md`

## Public Repository

- No secrets, API keys, or proprietary content
- No embarrassing or confidential information
- This repository is public on GitHub — treat everything as visible

## Enforcement

- Before every commit: scan `git diff --cached` for patterns matching `(API|SECRET|KEY|TOKEN|PASSWORD|PASSWD|CREDENTIALS|sk-[a-zA-Z0-9])`
- If found: do not commit. Replace with placeholder or remove the file.

## Reference

- GDPR: https://gdpr.eu/
- Norwegian Privacy Authority (Datatilsynet): https://www.datatilsynet.no/
