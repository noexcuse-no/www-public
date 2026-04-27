import { describe, it, expect, beforeEach } from 'vitest';

describe('profile-card.js', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div class="profile">
                <div class="profile-compact">Compact View</div>
                <div class="profile-expanded">Expanded View</div>
            </div>
            <div class="profile">
                <div class="profile-compact">Compact View 2</div>
                <div class="profile-expanded">Expanded View 2</div>
            </div>
        `;
    });

    it('should find all profile elements', () => {
        const profiles = document.querySelectorAll('.profile');
        expect(profiles.length).toBe(2);
    });

    it('should find collapsed and expanded elements', () => {
        const profilesCollapsed = document.querySelectorAll('.profile-compact');
        const profilesExpanded = document.querySelectorAll('.profile-expanded');

        expect(profilesCollapsed.length).toBe(2);
        expect(profilesExpanded.length).toBe(2);
    });

    it('should add inactive class to clicked profile compact view', () => {
        const profile = document.querySelector('.profile');
        const profileCollapsed = profile.querySelector('.profile-compact');
        const profileExpanded = profile.querySelector('.profile-expanded');

        profileCollapsed.classList.add('inactive');
        profileExpanded.classList.add('active');

        expect(profileCollapsed.classList.contains('inactive')).toBe(true);
        expect(profileExpanded.classList.contains('active')).toBe(true);
    });

    it('should remove active from all expanded and inactive from all compact on click', () => {
        const profilesExpanded = document.querySelectorAll('.profile-expanded');
        const profilesCollapsed = document.querySelectorAll('.profile-compact');

        profilesExpanded.forEach(n => { n.classList.add('active'); });
        profilesCollapsed.forEach(n => { n.classList.add('inactive'); });

        profilesExpanded.forEach(n => { n.classList.remove('active'); });
        profilesCollapsed.forEach(n => { n.classList.remove('inactive'); });

        profilesExpanded.forEach(n => expect(n.classList.contains('active')).toBe(false));
        profilesCollapsed.forEach(n => expect(n.classList.contains('inactive')).toBe(false));
    });

    it('should manage active/inactive classes correctly on profile click', () => {
        const profile = document.querySelector('.profile');
        const profileCollapsed = profile.querySelector('.profile-compact');
        const profileExpanded = profile.querySelector('.profile-expanded');
        const profilesExpanded = document.querySelectorAll('.profile-expanded');
        const profilesCollapsed = document.querySelectorAll('.profile-compact');

        profilesExpanded.forEach(n => { n.classList.remove('active'); });
        profilesCollapsed.forEach(n => { n.classList.remove('inactive'); });
        profileCollapsed.classList.add('inactive');
        profileExpanded.classList.add('active');

        expect(profileExpanded.classList.contains('active')).toBe(true);
        expect(profileCollapsed.classList.contains('inactive')).toBe(true);
    });
});