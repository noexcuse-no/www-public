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
// We use a pre-defined object with all variables from colors.css
const cssVars = {
    '--primary-accent': 'azure',
    '--primary-accent-contrast': '#000a14',
    '--background-color-light': '#e2e8f0',
    '--text-color-light': '#37474f',
    '--banner-background-light': '#3a4e58',
    '--banner-text-light': 'azure',
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
    '--background-color-dark': '#121212',
    '--text-color-dark': '#ffffff',
    '--banner-background-dark': '#222222',
    '--banner-text-dark': 'azure',
    '--box-background-dark': '#333333',
    '--link-color-dark': 'azure',
    '--link-hover-dark': '#8ab4f8',
    '--footer-background-dark': '#222222',
    '--footer-text-dark': 'azure',
    '--shadow-sm-dark': '0 2px 8px rgba(0, 0, 0, 0.3)',
    '--shadow-md-dark': '0 8px 20px rgba(0, 0, 0, 0.35)',
    '--shadow-lg-dark': '0 12px 24px rgba(0, 0, 0, 0.35)',
    '--shadow-xl-dark': '0 20px 60px rgba(0, 0, 0, 0.4)',
    '--shadow-xs-dark': '0 2px 4px rgba(0, 0, 0, 0.25)',
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
    '--border-light': '1px solid rgba(0, 0, 0, 0.08)',
    '--border-medium': '1px solid rgba(0, 0, 0, 0.1)',
    '--border-dark': '1px solid rgba(255, 255, 255, 0.1)',
    '--content-max': '1100px',
    '--content-narrow': '65ch',
    '--content-wide': '800px',
    '--box-shadow-light': 'var(--shadow-sm)',
    '--box-shadow-hover-light': 'var(--shadow-md)',
    '--box-shadow-dark': 'var(--shadow-sm-dark)',
    '--box-shadow-hover-dark': 'var(--shadow-md-dark)',
    '--navbar-background-light': 'var(--box-background-light)',
    '--navbar-background-dark': 'var(--box-background-dark)',
    '--button-background-light': 'azure',
    '--button-background-dark': '#333333',
    '--button-text-color-light': '#000a14',
    '--button-text-color-dark': '#37474f',
};

Object.keys(cssVars).forEach(function(name) {
    document.documentElement.style.setProperty(name, cssVars[name]);
});
