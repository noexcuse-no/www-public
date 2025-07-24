document.addEventListener("DOMContentLoaded", function() {
    const profiles = document.querySelectorAll('.profile');
    const fullscreen = document.querySelector('.fullscreen');
    const closeButton = fullscreen.querySelector('.close-button');

    profiles.forEach(profile => {
        profile.addEventListener('click', () => {
            // Activerer fullscreen view med profilinnhold
            fullscreen.classList.add('active');
            
            // Henter profil detalj-innhold
            const detailText = profile.dataset.description;
            const detailImageSrc = profile.querySelector('img').src;
            
            // Setter inn innhold i fullscreen visningen
            fullscreen.querySelector('#profile-detail-text').textContent = detailText;
            fullscreen.querySelector('#profile-image').src = detailImageSrc;
            fullscreen.querySelector('#profile-name').textContent = profile.querySelector('h3').textContent;
        });
    });

    closeButton.addEventListener('click', () => {
        // Lukker fullscreen view
        fullscreen.classList.remove('active');
    });
});
