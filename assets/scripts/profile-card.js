document.querySelectorAll('.profile').forEach(profileElement => {
    profileElement.addEventListener('click', function() {
        // Hent beskrivelse fra data-attributt
        const profileDescription = this.getAttribute('data-description');
        const profileName = this.querySelector('h3').textContent;

        // Sørg for at fullscreen visning opprettes
        const fullscreen = document.createElement('div');
        fullscreen.classList.add('fullscreen');
        fullscreen.innerHTML = `
            <h1>${profileName}</h1>
            <p>${profileDescription}</p>
            <button class="close-button">&#10006;</button>
        `;

        document.body.appendChild(fullscreen);

        // Legg til event listener for lukking av fullscreen visningen
        fullscreen.querySelector('.close-button').addEventListener('click', function() {
            fullscreen.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(fullscreen);
            }, 300);
        });

        if(fullscreen) {
            fullscreen.classList.add('active');
        }
    });
});
