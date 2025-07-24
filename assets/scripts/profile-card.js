document.addEventListener("DOMContentLoaded", function() {
    const profiles = document.querySelectorAll('.profile');
    const profileFullscreen = document.querySelector('.profile-fullscreen');
    const closeButton = fullscreen.querySelector('.close-button');

    profiles.forEach(profile => {
        profile.addEventListener('click', () => {
            // Activerer fullscreen view med profilinnhold
            profileFullscreen.classList.add('active');
            
            // Henter profil detalj-innhold
            const detailText = profile.dataset.description;
            const detailImageSrc = profile.querySelector('img').src;
            
            // Setter inn innhold i fullscreen visningen
            profileFullscreen.querySelector('#profile-detail-text').textContent = detailText;
            profileFullscreen.querySelector('#profile-image').src = detailImageSrc;
            profileFullscreen.querySelector('#profile-name').textContent = profile.querySelector('h3').textContent;
        });
    });

    closeButton.addEventListener('click', () => {
        // Lukker fullscreen view
        profileFullscreen.classList.remove('active');
    });
});
