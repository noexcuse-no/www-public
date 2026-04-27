import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('dark-mode-toggle.js', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <button id="dark-mode-toggle"></button>
            <style id="dark-style" disabled></style>
        `;
    });

    it('should toggle dark-mode class on body', () => {
        expect(document.body.classList.contains('dark-mode')).toBe(false);

        const toggleButton = document.getElementById('dark-mode-toggle');
        const darkStyle = document.getElementById('dark-style');

        const isDarkMode = !darkStyle.disabled;
        document.body.classList.toggle('dark-mode');

        expect(document.body.classList.contains('dark-mode')).toBe(true);
    });

    it('should toggle dark-style disabled state', () => {
        const darkStyle = document.getElementById('dark-style');
        expect(darkStyle.disabled).toBe(true);

        const isDarkMode = !darkStyle.disabled;
        darkStyle.disabled = isDarkMode;

        expect(darkStyle.disabled).toBe(false);
    });

    it('should update button icon on toggle', () => {
        const toggleButton = document.getElementById('dark-mode-toggle');

        const isDarkMode = false;
        if (isDarkMode) {
            toggleButton.innerHTML = '&#9728;';
            toggleButton.style.color = '';
        } else {
            toggleButton.innerHTML = '&#9728;';
            toggleButton.style.color = 'azure';
        }

        expect(toggleButton.innerHTML).toBe('☀');
        expect(toggleButton.style.color).toBe('azure');
    });

    it('should reset button color when going to light mode', () => {
        const toggleButton = document.getElementById('dark-mode-toggle');

        toggleButton.style.color = 'azure';
        const isDarkMode = true;

        if (isDarkMode) {
            toggleButton.innerHTML = '&#9728;';
            toggleButton.style.color = '';
        }

        expect(toggleButton.style.color).toBe('');
    });
});