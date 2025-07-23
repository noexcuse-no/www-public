document.addEventListener('DOMContentLoaded', function() {
    const profiles = document.querySelectorAll('.profile');
    const profileDetail = document.getElementById('profile-detail');
    const profileImage = document.getElementById('profile-image');
    const profileName = document.getElementById('profile-name');
    const profileDetailText = document.getElementById('profile-detail-text');
    const closeButton = document.querySelector('.close-button');

    profiles.forEach(profile => {
        profile.addEventListener('click', function() {
            const imageSrc = profile.querySelector('img').src;
            const name = profile.querySelector('h3').textContent;
            const description = profile.getAttribute('data-description');

            profileImage.src = imageSrc;
            profileName.textContent = name;
            profileDetailText.textContent = description;

            profileDetail.classList.add('active');
        });
    });

    closeButton.addEventListener('click', function() {
        profileDetail.classList.remove('active');
    });
});
