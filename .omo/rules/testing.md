---
description: Test patterns and conventions — full env spec in .design/testing-architecture.md
globs: ["tests/*", "vitest.config.*"]
---

# Testing

## Environment

Full spec: `.design/testing-architecture.md`

Runner: Vitest + happy-dom. Setup: `tests/setup.js`. Coverage: v8 provider.

## Patterns

- Name test files `*.test.js` in `tests/`
- Set up `document.body.innerHTML` in `beforeEach`
- Test class toggling, style changes, event handling directly
- No snapshot tests, no E2E, no Liquid template testing

## Required

Run `npm test` before marking any JavaScript task complete.
