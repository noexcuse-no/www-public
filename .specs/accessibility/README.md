# Accessibility Specification — No Excuse AS

> Status: Active
> Applies to: All HTML pages and content

## Language

- All user-facing content must be in Norwegian Bokmål
- Code identifiers and comments may be in English
- All HTML pages must have `lang="no"`

## Alt Text

- All `<img>` elements require a descriptive `alt` attribute
- Alt text must be in Norwegian Bokmål
- Images must not contain embedded text (multilingual site)

## Semantic HTML

- Use proper `<header>`, `<main>`, `<footer>`, `<nav>` elements
- Maintain a logical heading hierarchy (h1 → h6)

## Color Contrast

- Must pass WCAG AA in both light and dark themes
- Use CSS variables from `colors.css` for all colors
- Test both themes for contrast compliance

## Touch Targets

- Minimum 44×44px for all interactive elements (buttons, links, toggles)

## Dark Mode

- All visual changes must be tested in both light and dark themes
- Test contrast, readability, and interactive elements in both modes

## Testing

- Run `npm run lint:html` for HTML validation
- Manually test both themes for contrast issues

## Reference

- WCAG 2.1 AA: https://www.w3.org/TR/WCAG21/
- Norwegian Digitaliseringsdirektoratet: https://uustatus.no/
