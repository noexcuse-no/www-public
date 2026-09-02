# ai-private-reflection — Feature Specification

> Status: Ready
> Strategy source: `.design/inbound-strategy.md` §8, §9, §11
> Backlog: P1 (todos 14–16)

## Purpose / Problem

The AI feature currently presents as a "Leadership Assessment Agent" that engages leaders in structured conversation. The strategy repositions it as a **private reflection tool** ("din egen KI") where the visitor's own AI does the reflecting. The site provides conversation topics + a shared critical-reflection meta-prompt; the visitor pastes them into their own AI (7 providers), and the conversation never reaches No Excuse. The feature must be mobile-visible (currently invisible ≤1199px) and support a return loop with attribution-only URLs.

## Scope

- Conversation-topic frontmatter model (FULL MIGRATION: replaces `questions:` on all 21 topical pages — no transition fork)
- Shared critical-reflection meta-prompt requirements
- "din egen KI" wording
- 7 providers
- Remember-cookie
- Layout/include/noscript updated in the same commit
- Return loop with attribution-only URLs

## Acceptance Criteria

- [ ] `conversation_topics: [{conversation_label, opening_question, source_url, sixty_two_url}]` frontmatter model, 3 per page
- [ ] FULL MIGRATION: `questions:` replaced on all 21 topical pages (no transition fork)
- [ ] Layout/include/noscript updated in the same commit
- [ ] Shared critical-reflection meta-prompt meets all 8 rules (below)
- [ ] "din egen KI" wording used
- [ ] 7 providers supported
- [ ] Remember-cookie implemented
- [ ] Mobile-visible (no longer hidden ≤1199px)
- [ ] Return loop with attribution-only URLs (`?ref=ai-retur`)
- [ ] Dark mode tested
- [ ] Mobile layout tested

## Conversation-Topic Frontmatter Model

```yaml
conversation_topics:
  - conversation_label: "Gjentatte diskusjoner"
    opening_question: "Hvilke temaer dukker opp igjen og igjen i ledermøtene deres?"
    source_url: "/gjentatte-diskusjoner/"
    sixty_two_url: "/ledelse-60-2/"
```

3 topics per page. Replaces `questions:` on all 21 topical pages (FULL MIGRATION — no transition fork).

## Shared Critical-Reflection Meta-Prompt (8 rules)

1. One question at a time
2. Ask for concrete recent examples
3. Distinguish evidence / observation / interpretation / assumption
4. Challenge premature conclusions
5. Consider the four perspectives (Struktur, Mennesker, Påvirkning, Identitet)
6. Generate alternative hypotheses
7. NO scoring, NO diagnosing, NO names, NO sensitive data, NO vendor recommendation
8. End by explaining the origin of the questions + optional return path

## "din egen KI" Wording

The feature is framed as the visitor's own AI doing the reflecting — "din egen KI". The site provides the questions; the visitor's AI does the work. Wording rule: "Samtalen deles ikke med No Excuse" (never "samtalen er privat").

## 7 Providers

The current provider list in `assets/scripts/review-questions.js:8-16` is extended to 7 providers (ChatGPT, Claude, Gemini, Copilot, Perplexity, DeepSeek, Mistral — exact list per implementation).

## Remember-Cookie

A cookie remembers the visitor's chosen provider for convenience. Cookie-free analytics still applies (privacy spec); this is a functional preference cookie, not tracking.

## Return Loop

After reflection, the visitor can return to the site via attribution-only URLs (`?ref=ai-retur`). No conversation content is transmitted — only the return signal (fires `ai_return` analytics event).

## Design Constraints

- Touch targets: minimum 44×44px
- Use CSS variables from `colors.css`
- Both themes
- Norwegian Bokmål
- No inline styles/handlers/scripts
- No AI answers ever reach the site (privacy spec)

## Dependencies

- `.specs/privacy-communication/README.md` (privacy layers)
- `.specs/analytics-events/README.md` (ai_topic_selected, ai_prompt_copied, ai_return)
- `.specs/navigation-ia-split/README.md` (AI = insight surface)
- `.design/inbound-strategy.md` (strategy)
