# Testing Architecture

## Purpose

Automated testing ensures that JavaScript behaviour — DOM manipulation, class toggling, style changes — works correctly in both light and dark themes. Given the static nature of the Jekyll site, testing focuses on the vanilla JS that adds interactivity.

## Stack

### Vitest + happy-dom

Chosen over alternatives:

| Criterion | Vitest + happy-dom | jsdom | Playwright |
|-----------|-------------------|-------|------------|
| Speed | Fast (no browser) | Slower | Slowest |
| Setup complexity | Low | Medium | High |
| DOM compliance | Sufficient for unit tests | Good | Full browser |
| Headless browser | No | No | Yes |
| File size / install | Lightweight | Heavier | Heaviest |

happy-dom provides just enough DOM — `window`, `document`, `navigator`, `HTMLElement` — for unit-level JS tests without spinning up a browser.

### Configuration

- `globals: true` — Vitest injects `describe`, `it`, `expect`, `beforeEach`, `vi`
- `setupFiles: ['./tests/setup.js']` — happy-dom Window instantiated once
- `include: ['tests/**/*.test.js']` — all test files
- Coverage via v8, scoped to `assets/scripts/**/*.js`

## Architecture

The site uses vanilla JavaScript (no framework). All interactivity is DOM-centric:

1. Scripts query the DOM for elements (`querySelector`, `getElementById`)
2. They toggle CSS classes (`classList.add/remove/toggle`)
3. They manipulate inline styles (dark mode button icon colour)
4. They attach event listeners (click, change, etc.)

Tests mirror this: unit-level only, no integration, no E2E.

## Patterns from Existing Tests

### CSS Variable Iteration (`css-variables.test.js`)

Declare an array of CSS custom property names, iterate with `forEach`, assert each is defined via `getComputedStyle(document.documentElement).getPropertyValue(name)`. Organised by group: light mode, dark mode, theme-agnostic.

### DOM via `innerHTML` (`dark-mode.test.js`, `profile-card.test.js`)

Each test file sets up `document.body.innerHTML` in `beforeEach` with the minimal HTML scaffold needed. This ensures clean state between tests and avoids cross-test pollution.

### Class/State Testing (`profile-card.test.js`)

Test `classList.contains`, `classList.add`, `classList.remove` for `active`/`inactive` class toggling on profile compact/expanded elements.

### Style Mutation Testing (`dark-mode.test.js`)

Assert inline style properties (`element.style.color`) and attribute state (`disabled` on `<style>` elements) after toggle operations.

## Anti-Patterns

- **No Liquid template testing**: Jekyll renders at build time — templates are static output. Testing Liquid logic belongs in Jekyll's own test suite or a build verification step, not here.
- **No snapshot testing**: The DOM scaffolds are minimal and intentional. Serialised snapshots add maintenance overhead with little benefit for unit-level DOM tests.
- **No E2E testing**: The site has no API, no database, no user authentication. E2E would test GitHub Pages serving static files, which is outside the project's concern.
- **No mocking of happy-dom**: The provided DOM globals (`window`, `document`, etc.) are sufficient. Mocking them indicates the test is testing the wrong abstraction.

## Future Considerations

If the site grows dynamic features (client-side routing, form submissions, API calls), **Playwright** should be introduced for E2E tests. At that point:

- Add Playwright as a dev dependency
- Create a `tests/e2e/` directory
- Write smoke tests for critical user journeys (navigation, dark mode toggle, profile card expand)
- Keep existing Vitest tests as a fast unit-level feedback loop
