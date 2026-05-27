import { Window } from 'happy-dom';

global.window = new Window().window;
global.document = window.document;
global.navigator = window.navigator;
global.HTMLElement = window.HTMLElement;
global.Element = window.Element;
global.Node = window.Node;
global.Event = window.Event;

// happy-dom doesn't load external CSS files.
// Inject CSS custom properties so variable tests pass.
const cssVars = {
    // Twin primaries
    '--primary-navy': '#003060',
    '--primary-azure': '#F0FFFF',

    // Legacy aliases
    '--primary-accent': '#F0FFFF',
    '--primary-accent-contrast': '#003060',

    // Logo fill
    '--logo-fill': '#F0FFFF',

    // CTA system
    '--cta-primary-bg': '#F0FFFF',
    '--cta-primary-text': '#003060',
    '--cta-primary-border': '#003060',
    '--cta-secondary-bg': '#003060',
    '--cta-secondary-text': '#F0FFFF',
    '--cta-secondary-border': '#F0FFFF',

    // Nav links
    '--nav-link-color-light': '#F0FFFF',
    '--nav-link-color-dark': '#003060',

    // Light mode
    '--background-color-light': '#c0d4e8',
    '--bg-neutral-light': '#e2e8f0',
    '--text-color-light': '#37474f',
    '--banner-background-light': '#003060',
    '--banner-text-light': '#F0FFFF',
    '--box-background-light': '#ffffff',
    '--link-color-light': '#000a14',
    '--link-hover-light': '#000a1f',
    '--footer-background-light': '#ffffff',
    '--footer-text-light': '#000a14',
    '--shadow-sm': '0 2px 8px rgba(0, 0, 0, 0.08)',
    '--shadow-md': '0 8px 20px rgba(0, 0, 0, 0.12)',
    '--shadow-lg': '0 12px 24px rgba(0, 0, 0, 0.12)',
    '--shadow-xl': '0 20px 60px rgba(0, 0, 0, 0.15)',
    '--shadow-xs': '0 2px 4px rgba(0, 0, 0, 0.08)',

    // Dark mode
    '--background-color-dark': '#121212',
    '--text-color-dark': '#ffffff',
    '--banner-background-dark': '#F0FFFF',
    '--banner-text-dark': '#003060',
    '--box-background-dark': '#333333',
    '--link-color-dark': '#F0FFFF',
    '--link-hover-dark': '#8ab4f8',
    '--footer-background-dark': '#222222',
    '--footer-text-dark': '#F0FFFF',
    '--shadow-sm-dark': '0 2px 8px rgba(0, 0, 0, 0.3)',
    '--shadow-md-dark': '0 8px 20px rgba(0, 0, 0, 0.35)',
    '--shadow-lg-dark': '0 12px 24px rgba(0, 0, 0, 0.35)',
    '--shadow-xl-dark': '0 20px 60px rgba(0, 0, 0, 0.4)',
    '--shadow-xs-dark': '0 2px 4px rgba(0, 0, 0, 0.25)',

    // Spacing
    '--space-xs': '4px',
    '--space-sm': '8px',
    '--space-md': '16px',
    '--space-lg': '24px',
    '--space-xl': '32px',
    '--space-2xl': '40px',
    '--space-3xl': '48px',
    '--space-4xl': '64px',
    '--space-5xl': '80px',
    '--radius-sm': '4px',
    '--radius-md': '8px',
    '--radius-lg': '12px',
    '--radius-xl': '16px',

    // Borders
    '--border-light': '1px solid rgba(0, 0, 0, 0.08)',
    '--border-medium': '1px solid rgba(0, 0, 0, 0.1)',
    '--border-dark': '1px solid rgba(255, 255, 255, 0.1)',

    // Content widths
    '--content-max': '1100px',
    '--content-narrow': '65ch',
    '--content-wide': '800px',

    // Legacy aliases
    '--box-shadow-light': 'var(--shadow-sm)',
    '--box-shadow-hover-light': 'var(--shadow-md)',
    '--box-shadow-dark': 'var(--shadow-sm-dark)',
    '--box-shadow-hover-dark': 'var(--shadow-md-dark)',
    '--navbar-background-light': 'var(--box-background-light)',
    '--navbar-background-dark': 'var(--box-background-dark)',
    '--button-background-light': '#F0FFFF',
    '--button-background-dark': '#333333',
    '--button-text-color-light': '#003060',
    '--button-text-color-dark': '#37474f',
};

Object.keys(cssVars).forEach(function(name) {
    document.documentElement.style.setProperty(name, cssVars[name]);
});
