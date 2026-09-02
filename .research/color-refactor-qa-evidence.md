# Color System Refactor — QA Evidence

## Date: 2026-09-02

## Verification Summary

| Check | Result |
|-------|--------|
| CSS lint (`npm run lint:css`) | ✅ 0 errors |
| Tests (`npm test`) | ✅ 91/91 pass |
| `.dark-mode` selectors in `assets/css/` | ✅ 0 remaining |
| Suffixed variable refs in component files | ✅ 0 remaining |
| `styles-light.css` element selectors | ✅ 0 (pure `:root` block) |
| `styles-dark.css` element selectors | ✅ 0 (pure `:root` block) |
| `dark-mode-toggle.js` lint | ✅ clean (exit 0) |
| Playwright light mode | ✅ renders correctly |
| Playwright dark mode | ✅ renders correctly |

## Playwright Visual QA

### Light Mode (computed styles)
- body background: `rgb(192, 212, 232)` = `#c0d4e8` ✅
- body color: `rgb(55, 71, 79)` = `#37474f` ✅
- card background: `rgb(255, 255, 255)` = `#ffffff` ✅
- link color: `rgb(0, 48, 96)` = `#003060` (primary-navy) ✅
- surface-subtle: `rgba(0, 0, 0, 0.04)` ✅
- primary button bg: `rgb(240, 255, 255)` = `#f0ffff` (primary-azure) ✅
- primary button text: `rgb(0, 48, 96)` = `#003060` (primary-navy) ✅

### Dark Mode (computed styles)
- body background: `rgb(18, 18, 18)` = `#121212` ✅
- body color: `rgb(255, 255, 255)` = `#ffffff` ✅
- card background: `rgb(30, 42, 58)` = `#1e2a3a` ✅ (new dark card bg)
- link color: `rgb(240, 255, 255)` = `#f0ffff` (primary-azure in dark) ✅
- surface-subtle: `rgba(255, 255, 255, 0.06)` ✅
- primary button bg: `rgb(240, 255, 255)` = `#f0ffff` ✅
- primary button text: `rgb(0, 48, 96)` = `#003060` ✅

## Mode Switching Mechanism
- `dark-mode-toggle.js` toggles `#dark-style`/`#light-style` stylesheet `disabled` attribute
- `.dark-mode` class on body is kept for JS feature detection (no CSS dependency)
- Variable switching is purely stylesheet-driven via `:root` overrides in mode stylesheets

## Commits (Branch 3 specific)
1. `93d5024` — restructure colors.css
2. `10f5ef1` — update test files
3. `ec1bd57` — move element selectors to component files
4. `38849b2` — rewrite mode stylesheets as pure variable blocks
5. `b852918` — navbar refactor
6. `bb73103` — profiles refactor
7. `e04471f` — article refactor
8. `e84503e` — sidebar refactor
9. `f85328b` — 9 component files batch
10. `edd8da5` — 6 files batch
11. `287be70` — card + hero refactor
12. `0054327` — docs update
