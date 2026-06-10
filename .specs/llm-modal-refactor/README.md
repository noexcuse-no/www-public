# LLM Ask Modal — Refactor

> **Backlog References:** R32
> **Created:** 2026-06-09
> **Status:** Draft
> **Depends on:** Y1–Y8 (current questions implementation)

## Problem / Goal

The current "review questions" modal (Y1–Y8) has several UX issues identified in use:

1. **Icons are wrong** — The AI provider SVG icons are generic shapes that don't represent the actual services. They add visual noise without providing useful distinction.
2. **Grid layout wastes space** — Providers are displayed as a 2–4 column grid with icon + name, making each option small and hard to scan.
3. **Question styling is flat** — The question appears as plain text with no visual emphasis or quotation formatting.
4. **Collapse/expand missing** — When a preferred provider is saved, the full provider list still shows instead of collapsing to show only the selected choice.
5. **Copy prompt is too prominent** — "Copy prompt" is styled as the modal's primary action button, but the user's main intent is to **send the question to their AI chat service**, not copy it.
6. **Manual action required** — User must click a provider, then click "copy" or navigate separately. The expected flow is: select provider → auto-open that service's URL with the prompt as a query parameter.

Goal: Refactor the modal to prioritize the "ask your AI" action, simplify provider selection, improve question presentation, and auto-navigate to the selected AI service.

## Scope

### Files to modify

| File | Change |
|------|--------|
| `assets/scripts/review-questions.js` | Major refactor: remove icons, change grid to list, add collapse/expand, auto-open URL on selection, move copy to bottom |
| `assets/css/components/questions.css` | Update modal layout: list instead of grid, quotation block styling, collapsed state, repositioned copy button |
| `_includes/questions.html` | Minor: may need structural changes to support new modal layout |

### Detailed requirements

#### 1. Remove provider icons
- Delete all SVG icon definitions from JavaScript
- Remove icon rendering from provider buttons
- Provider buttons show only the provider name

#### 2. Display providers as list (not grid)
- Change `.provider-grid` from CSS grid to single-column vertical list
- Each provider is a full-width button row showing just the name
- Easier scanning for 7 options

#### 3. Better quotation styling for the question
- The question should be presented in a distinct quotation block
- Use blockquote styling with left border/accent, italic or distinct font treatment
- Make it visually clear that this is the prompt/quotation being sent

#### 4. Collapse/expand provider list based on saved preference
- If `#remember-provider` checkbox is checked AND a provider is saved in cookie:
  - Collapse the list so only the selected provider is visible
  - Show a small "Change provider" link/button
- If user clicks "Change provider" or unchecks the checkbox:
  - Expand the full list again
- When unchecking the checkbox: full list shows, no provider auto-selected

#### 5. Copy prompt as bottom-most option
- Move the copy button to below the provider list (last in visual order)
- It should not look like the primary action
- Style as a secondary/link-style button, not a prominent filled CTA

#### 6. Auto-open URL on provider selection
- When user selects an AI provider (clicks the provider button):
  - If a preferred provider is not already saved → auto-open the URL with the prompt in a new tab/window
  - If preferred provider IS saved → also auto-open on same click that opens the modal
- The URL should include the prompt as `?q=` or similar query parameter, URL-encoded
- Use `window.open(url, '_blank')` for opening
- After auto-opening: close the modal

#### 7. Modal flow
1. User clicks a question
2. Modal opens showing the question (with quotation styling) and the provider list
3. If a saved preference exists → show collapsed list with only the selected provider + "Change provider" link
4. User selects a provider → auto-opens the AI service with the prompt → modal closes
5. Copy prompt is available as a secondary action at the bottom

## Acceptance Criteria

- [ ] Icons removed from all provider buttons
- [ ] Providers displayed as a single-column list (not grid)
- [ ] Question displayed with distinct quotation block styling (left border/accent)
- [ ] Saved preference collapses list → shows only selected provider
- [ ] "Change provider" link expands the full list
- [ ] Unchecking "remember" expands full list
- [ ] Copy prompt is the bottom-most option, styled as secondary action
- [ ] Selecting a provider auto-opens the URL with prompt in a new tab
- [ ] Modal closes after auto-opening
- [ ] Dark mode verified
- [ ] `npm run lint:js` passes (0 errors)
- [ ] `npm test` passes
- [ ] Touch targets ≥44×44px
- [ ] Cookie preference system preserved (365-day expiry, same cookie key)
