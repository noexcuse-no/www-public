import { describe, it, expect } from 'vitest';

describe('CSS Variables', () => {
    describe('Light Mode Variables', () => {
        const lightVars = [
            '--background-color-light',
            '--text-color-light',
            '--banner-background-light',
            '--banner-text-light',
            '--box-background-light',
            '--link-color-light',
            '--link-hover-light',
            '--footer-background-light',
            '--footer-text-light',
            '--box-shadow-light'
        ];

        lightVars.forEach(variable => {
            it(`should have ${variable} defined`, () => {
                const value = getComputedStyle(document.documentElement).getPropertyValue(variable);
                expect(value).toBeTruthy();
                expect(value.length).toBeGreaterThan(0);
            });
        });
    });

    describe('Dark Mode Variables', () => {
        const darkVars = [
            '--background-color-dark',
            '--text-color-dark',
            '--banner-background-dark',
            '--banner-text-dark',
            '--box-background-dark',
            '--link-color-dark',
            '--link-hover-dark',
            '--footer-background-dark',
            '--footer-text-dark',
            '--box-shadow-dark'
        ];

        darkVars.forEach(variable => {
            it(`should have ${variable} defined`, () => {
                const value = getComputedStyle(document.documentElement).getPropertyValue(variable);
                expect(value).toBeTruthy();
                expect(value.length).toBeGreaterThan(0);
            });
        });
    });

    describe('Theme-Agnostic Variables', () => {
        const themeVars = [
            '--primary-accent',
            '--primary-accent-contrast'
        ];

        themeVars.forEach(variable => {
            it(`should have ${variable} defined`, () => {
                const value = getComputedStyle(document.documentElement).getPropertyValue(variable);
                expect(value).toBeTruthy();
                expect(value.length).toBeGreaterThan(0);
            });
        });
    });
});
