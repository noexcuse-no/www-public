import { describe, it, expect } from 'vitest';

describe('CSS Variables', () => {
    describe('Constants', () => {
        const constants = [
            '--primary-navy',
            '--primary-azure',
            '--header-bg',
            '--header-text',
            '--nav-hover-bg',
            '--frame-struct',
            '--frame-human',
            '--frame-political',
            '--frame-symbol',
            '--brand-linkedin',
            '--brand-teams',
            '--error-color',
            '--success-color'
        ];

        constants.forEach(variable => {
            it(`should have ${variable} defined`, () => {
                const value = getComputedStyle(document.documentElement).getPropertyValue(variable);
                expect(value).toBeTruthy();
                expect(value.length).toBeGreaterThan(0);
            });
        });
    });

    describe('Raw Pairs', () => {
        const rawPairs = [
            '--background-color-light',
            '--background-color-dark',
            '--box-background-light',
            '--box-background-dark',
            '--text-color-light',
            '--text-color-dark',
            '--link-color-light',
            '--link-color-dark',
            '--link-hover-light',
            '--link-hover-dark',
            '--footer-bg-light',
            '--footer-bg-dark',
            '--footer-text-light',
            '--footer-text-dark',
            '--disclaimer-bg-light',
            '--disclaimer-bg-dark',
            '--disclaimer-text-light',
            '--disclaimer-text-dark',
            '--focus-color-light',
            '--focus-color-dark',
            '--accent-color-light',
            '--accent-color-dark',
            '--surface-subtle-light',
            '--surface-subtle-dark',
            '--surface-hover-light',
            '--surface-hover-dark',
            '--border-color-light',
            '--border-color-dark',
            '--border-color-subtle-light',
            '--border-color-subtle-dark',
            '--overlay-modal-light',
            '--overlay-modal-dark',
            '--carousel-btn-bg-light',
            '--carousel-btn-bg-dark',
            '--carousel-btn-bg-hover-light',
            '--carousel-btn-bg-hover-dark',
            '--hero-text-light',
            '--hero-text-dark',
            '--hero-overlay-light',
            '--hero-overlay-dark',
            '--hero-overlay-opacity-light',
            '--hero-overlay-opacity-dark'
        ];

        rawPairs.forEach(variable => {
            it(`should have ${variable} defined`, () => {
                const value = getComputedStyle(document.documentElement).getPropertyValue(variable);
                expect(value).toBeTruthy();
                expect(value.length).toBeGreaterThan(0);
            });
        });
    });

    describe('Active Variables', () => {
        const activeVars = [
            '--text-color',
            '--background-color',
            '--box-background',
            '--link-color',
            '--link-hover',
            '--footer-bg',
            '--footer-text',
            '--disclaimer-bg',
            '--disclaimer-text',
            '--focus-color',
            '--accent-color',
            '--surface-subtle',
            '--surface-hover',
            '--border-color',
            '--border-color-subtle',
            '--overlay-modal',
            '--carousel-btn-bg',
            '--carousel-btn-bg-hover',
            '--hero-text',
            '--hero-overlay',
            '--hero-overlay-opacity'
        ];

        activeVars.forEach(variable => {
            it(`should have ${variable} defined`, () => {
                const value = getComputedStyle(document.documentElement).getPropertyValue(variable);
                expect(value).toBeTruthy();
                expect(value.length).toBeGreaterThan(0);
            });
        });
    });
});