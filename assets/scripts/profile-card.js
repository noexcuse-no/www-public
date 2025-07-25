document.addEventListener("DOMContentLoaded", function() {
    const profiles = document.querySelectorAll('.profile-compact');
    const profileExpanded = document.querySelector('.profile-expanded');
    const closeButton = profileExpanded.querySelector('.close-button');

    profiles.forEach(profile => {
        profile.addEventListener('click', () => {
            // Activerer fullscreen view med profilinnhold
            profileExpanded.classList.add('active');
            profile.classList.add('inactive');
        });
    });

    closeButton.addEventListener('click', () => {
        // Lukker fullscreen view
        profileExpanded.classList.remove('active');
        profile.classList.remove('inactive');
    });
});
