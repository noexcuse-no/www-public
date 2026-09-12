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
    // Constants
    '--primary-navy': '#003060',
    '--primary-azure': '#F0FFFF',
    '--logo-fill': '#F0FFFF',
    '--cta-primary-bg': '#F0FFFF',
    '--cta-primary-text': '#003060',
    '--cta-primary-border': '#003060',
    '--cta-secondary-bg': '#003060',
    '--cta-secondary-text': '#F0FFFF',
    '--cta-secondary-border': '#F0FFFF',
    '--header-bg': '#003060',
    '--header-text': '#F0FFFF',
    '--nav-hover-bg': 'rgba(255, 255, 255, 0.15)',
    '--frame-struct': '#2A4D6E',
    '--frame-human': '#B8901E',
    '--frame-political': '#355E3B',
    '--frame-symbol': '#8E0D3C',
    '--brand-linkedin': '#0a66c2',
    '--brand-linkedin-hover': '#084d91',
    '--brand-teams': '#6264A7',
    '--brand-teams-hover': '#5050A0',
    '--error-color': '#c62828',
    '--success-color': '#2e7d32',
    '--success-ring': 'rgba(46, 125, 50, 0.15)',
    '--success-ring-dark': 'rgba(102, 187, 106, 0.2)',

    // Raw pairs — light
    '--background-color-light': '#c0d4e8',
    '--box-background-light': '#ffffff',
    '--text-color-light': '#37474f',
    '--link-color-light': '#003060',
    '--link-hover-light': '#000a1f',
    '--footer-bg-light': '#F0FFFF',
    '--footer-text-light': '#003060',
    '--disclaimer-bg-light': '#003060',
    '--disclaimer-text-light': '#F0FFFF',
    '--focus-color-light': '#003060',
    '--accent-color-light': '#003060',
    '--surface-subtle-light': 'rgba(0, 0, 0, 0.04)',
    '--surface-hover-light': 'rgba(0, 0, 0, 0.08)',
    '--border-color-light': 'rgba(0, 0, 0, 0.1)',
    '--border-color-subtle-light': 'rgba(0, 0, 0, 0.08)',
    '--overlay-modal-light': 'rgba(0, 0, 0, 0.6)',
    '--carousel-btn-bg-light': 'rgba(255, 255, 255, 0.9)',
    '--carousel-btn-bg-hover-light': '#ffffff',
    '--hero-text-light': '#003060',
    '--hero-overlay-light': 'linear-gradient(to top, #003060 0%, transparent 40%)',
    '--hero-overlay-opacity-light': '0.5',

    // Raw pairs — dark
    '--background-color-dark': '#121212',
    '--box-background-dark': '#1e2a3a',
    '--text-color-dark': '#ffffff',
    '--link-color-dark': '#F0FFFF',
    '--link-hover-dark': '#8ab4f8',
    '--footer-bg-dark': '#003060',
    '--footer-text-dark': '#F0FFFF',
    '--disclaimer-bg-dark': '#F0FFFF',
    '--disclaimer-text-dark': '#003060',
    '--focus-color-dark': '#F0FFFF',
    '--accent-color-dark': '#F0FFFF',
    '--surface-subtle-dark': 'rgba(255, 255, 255, 0.06)',
    '--surface-hover-dark': 'rgba(255, 255, 255, 0.12)',
    '--border-color-dark': 'rgba(255, 255, 255, 0.1)',
    '--border-color-subtle-dark': 'rgba(255, 255, 255, 0.08)',
    '--overlay-modal-dark': 'rgba(0, 0, 0, 0.8)',
    '--carousel-btn-bg-dark': 'rgba(30, 30, 40, 0.85)',
    '--carousel-btn-bg-hover-dark': 'rgba(50, 50, 65, 0.95)',
    '--hero-text-dark': '#ffffff',
    '--hero-overlay-dark': 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.3) 40%)',
    '--hero-overlay-opacity-dark': '0.8',

    // Shadows
    '--shadow-xs': '0 2px 4px rgba(0, 0, 0, 0.08)',
    '--shadow-xs-dark': '0 2px 4px rgba(0, 0, 0, 0.25)',
    '--shadow-sm': '0 2px 8px rgba(0, 0, 0, 0.08)',
    '--shadow-sm-dark': '0 2px 8px rgba(0, 0, 0, 0.3)',
    '--shadow-md': '0 8px 20px rgba(0, 0, 0, 0.12)',
    '--shadow-md-dark': '0 8px 20px rgba(0, 0, 0, 0.35)',
    '--shadow-lg': '0 12px 24px rgba(0, 0, 0, 0.12)',
    '--shadow-lg-dark': '0 12px 24px rgba(0, 0, 0, 0.35)',
    '--shadow-xl': '0 20px 60px rgba(0, 0, 0, 0.15)',
    '--shadow-xl-dark': '0 20px 60px rgba(0, 0, 0, 0.4)',

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

    // Content widths
    '--content-max': '1100px',
    '--content-narrow': '65ch',
    '--content-wide': '800px',

    // Active defaults (light mode)
    '--text-color': '#37474f',
    '--background-color': '#c0d4e8',
    '--box-background': '#ffffff',
    '--link-color': '#003060',
    '--link-hover': '#000a1f',
    '--footer-bg': '#F0FFFF',
    '--footer-text': '#003060',
    '--disclaimer-bg': '#003060',
    '--disclaimer-text': '#F0FFFF',
    '--focus-color': '#003060',
    '--accent-color': '#003060',
    '--surface-subtle': 'rgba(0, 0, 0, 0.04)',
    '--surface-hover': 'rgba(0, 0, 0, 0.08)',
    '--border-color': 'rgba(0, 0, 0, 0.1)',
    '--border-color-subtle': 'rgba(0, 0, 0, 0.08)',
    '--overlay-modal': 'rgba(0, 0, 0, 0.6)',
    '--carousel-btn-bg': 'rgba(255, 255, 255, 0.9)',
    '--carousel-btn-bg-hover': '#ffffff',
    '--hero-text': '#003060',
    '--hero-overlay': 'linear-gradient(to top, #003060 0%, transparent 40%)',
    '--hero-overlay-opacity': '0.5',
};

Object.keys(cssVars).forEach(function(name) {
    document.documentElement.style.setProperty(name, cssVars[name]);
});