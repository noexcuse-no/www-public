document.addEventListener("DOMContentLoaded", function() {
    const profiles = document.querySelectorAll('.profile-compact');
    const profileExpanded = document.querySelector('.profile-expanded');
    const closeButton = profileExpanded.querySelector('.close-button');
    
    profiles.forEach(profile => {
        profile.addEventListener('click', () => {
            profileExpanded.classList.add('active');
            profile.classList.add('inactive');
        });
    });

    closeButton.addEventListener('click', () => {
        profileExpanded.classList.remove('active');
        profileCompact.classList.remove('inactive');
    });
});
