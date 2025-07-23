// Funksjonen for å toggle dark mode
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

// Funksjonen for å vise og lukke 'bakside' av profil
document.querySelectorAll('.profile').forEach(profile => {
    profile.addEventListener('click', function() {
        const fullscreen = document.createElement('div');
        fullscreen.classList.add('fullscreen');
        fullscreen.innerHTML = `
            <h1>${this.querySelector('h3').textContent}</h1>
            <p>Beskrivelse av personens bakside kommer her...</p>
            <button class="close-button">&#10006;</button>
        `;

        document.body.appendChild(fullscreen);

        fullscreen.querySelector('.close-button').addEventListener('click', function() {
            fullscreen.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(fullscreen);
            }, 300); // Vent til animasjonen er fullført før fjerning
        });

        fullscreen.classList.add('active');
    });
});
