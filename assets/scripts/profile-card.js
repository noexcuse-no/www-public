document.addEventListener("DOMContentLoaded", function() {

    const profiles = document.querySelectorAll('.profile');
    const profilesCollapsed = document.querySelectorAll('.profile-compact');
    const profilesExpanded = document.querySelectorAll('.profile-expanded');
    
    profilesCollapsed.forEach(profile => {
        profile.addEventListener('click', () => {
            profile.classList.add('active');
            profile.classList.add('inactive');
        });
    });
});
