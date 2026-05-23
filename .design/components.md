# Reusable Components - No Excuse AS

## Buttons

### Primary CTA Button
- **Height:** 44px minimum
- **Background:** Azure (`--primary-accent`)
- **Text:** Dark (`--primary-accent-contrast`)
- **Border-radius:** 4px
- **States:** Default, Hover, Active, Disabled

### Secondary Button
- **Style:** Outlined or text-only
- **Purpose:** Secondary actions

## Cards

### Service Card
- Icon (service representation)
- Title (service name)
- Description (brief)
- CTA button
- Background: `--box-background-light/dark`

### Profile Card
- Photo (rounded or square)
- Name
- Title/role
- Tags (expertise)
- Contact links

## Navigation

### Header
- Logo
- Navigation links (if needed)
- Dark mode toggle

### Footer
- Contact information
- Social links
- Copyright

## Form Elements
- Input fields (44px height minimum)
- Date picker (Microsoft Bookings)
- Submit buttons

## Theme Support
- Light mode stylesheet
- Dark mode stylesheet
- Toggle mechanism

## Accessibility Requirements

- WCAG AA compliant colors
- Keyboard navigable
- Screen reader friendly
- Focus indicators

## Dark Mode Support

All components **must** have both light and dark mode variants.

### Requirement

When adding new components or modifying existing ones:
1. Define CSS variables for colors (do not hardcode colors)
2. Provide light mode styles in base CSS
3. Provide dark mode styles in `styles-dark.css` or via `.dark-mode` class override
4. Test all sections with dark mode toggled on before submitting PR

### Required Dark Mode Elements

Each section type must handle:

| Element | Light Variable | Dark Variable |
|---------|---------------|---------------|
| Background | `--background-color-light` | `--background-color-dark` |
| Text | `--text-color-light` | `--text-color-dark` |
| Box background | `--box-background-light` | `--box-background-dark` |
| Box shadow | `--box-shadow-light` | `--box-shadow-dark` |
| Link | `--link-color-light` | `--link-color-dark` |
| Link hover | `--link-hover-light` | `--link-hover-dark` |

### New Components Checklist

Before merging any PR, verify:
- [ ] All colors use CSS variables, not hardcoded values
- [ ] `.dark-mode` variant exists for the component
- [ ] Dark mode tested on all page sections (landing, products, benefits, etc.)
- [ ] No color contrast violations (WCAG AA minimum 4.5:1 for text)
