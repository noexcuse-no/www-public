# Architecture — No Excuse AS Website

## Site Structure

```
www-public/
├── _pages/              # Standalone content pages
├── _layouts/           # Page templates
├── _includes/           # Reusable HTML partials
├── _products/           # Product data
├── _profiles/          # Team member profiles
├── _cases/             # Case studies
├── _partners/          # Partner organizations
├── _data/              # Site-wide data
├── assets/
│   ├── css/            # Modular stylesheets
│   ├── images/         # Graphics (icons, banners, heroes)
│   └── scripts/        # JavaScript
├── .specs/             # Functional specifications
├── .design/            # Design documentation
└── tests/              # Test files
```

## Pages/Collections

| Directory | Purpose | Output |
|-----------|---------|--------|
| `_pages/` | Content pages (ledelse-60-2, om-oss, vitenskapelig-grunnlag) | Static HTML |
| `_products/` | Product frontmatter data | Used by includes |
| `_profiles/` | Team member profiles | Static HTML |
| `_cases/` | Case study content | Static HTML |
| `_partners/` | Partner organizations | Static HTML |

## URL Conventions

| Pattern | Example |
|---------|---------|
| Pages: `/:filename/` | `/ledelse-60-2/` |
| Products: `/products/:name/` | `/products/ledelse-60-2/` |
| Profiles: `/profiles/:name/` | `/profiles/dagfinn/` |

## Layouts

| Layout | Use For |
|--------|---------|
| `default` | Standard pages with products, profiles, cases sections |
| `landing` | Product/company landing pages (hero + content) |

## Modules

### CSS

13 modular stylesheets organized by category:
- **Base:** colors, typography, layout
- **Components:** profiles, products, cases, podcast
- **Layout:** header, footer, navbar
- **Themes:** styles-light, styles-dark
- **Utilities:** utilities

Always use CSS custom properties (variables) for colors.

### JavaScript

Vanilla JS only, no frameworks:
- `dark-mode-toggle.js` — Theme switching
- `profile-card.js` — Profile expansion

## Navigation

- Header banner with logo and navbar
- Links to main pages (Ledelse 60:2, Om oss)
- Dark mode toggle

## Response Flow

```
User → Landing Page → Booking URL (Microsoft Bookings)
```

## Build & Deploy

- **Build:** GitHub Pages (automatic)
- **Host:** noexcuse.no
- **CMS:** Jekyll (static)
