// Funksjonen for å vise og lukke 'bakside' av profil
document.querySelectorAll('.profile').forEach(profile => {
    profile.addEventListener('click', function() {
        const fullscreen = document.createElement('div');
        fullscreen.classList.add('fullscreen');
        
        const profileName = this.querySelector('h3').textContent;
        const profileDescription = site.profiles.find(p => p.name === profileName).description;

        fullscreen.innerHTML = `
            <h1>${profileName}</h1>
            <p>${profileDescription}</p>
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
