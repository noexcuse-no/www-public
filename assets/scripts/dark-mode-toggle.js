// Script for å toggle dark mode CSS-stilark
const toggleButton = document.getElementById('dark-mode-toggle');
toggleButton.addEventListener('click', function() {
    const darkStyle = document.getElementById('dark-style');
    document.body.classList.toggle('dark-mode');
    const isDarkMode = !darkStyle.disabled;
    if (isDarkMode) {
        toggleButton.innerHTML = '&#9788;'; // Ikon for day mode
        toggleButton.style.color = ''; // Default farge
    } else {
        toggleButton.innerHTML = '&#9790;'; // Ikon for night mode
        toggleButton.style.color = '#f4f4f9'; // Lys farge for nattmodus
    }
    darkStyle.disabled = isDarkMode;
});
