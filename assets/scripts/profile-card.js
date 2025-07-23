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
