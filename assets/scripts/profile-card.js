document.addEventListener("DOMContentLoaded", function() {

    const profiles = document.querySelectorAll('.profile');
    const profilesCollapsed = document.querySelectorAll('.profile-compact');
    const profilesExpanded = document.querySelectorAll('.profile-expanded');
    
    profiles.forEach(profile => {
        profile.addEventListener('click', () => {
            const profileCollapsed = profile.querySelector('.profile-compact');
            const profileExpanded = profile.querySelector('.profile-expanded');
            profilesExpanded.forEach.ClassList.remove('active');
            profileCollapsed.classList.add('inactive');
            profileExpanded.classList.add('active');
        });
    });
});
