(function() {
    const darkStyle = document.getElementById('dark-style');
    const lightStyle = document.getElementById('light-style');

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDark) {
        darkStyle.disabled = false;
        lightStyle.disabled = true;
        document.body.classList.add('dark-mode');
    } else {
        darkStyle.disabled = true;
        lightStyle.disabled = false;
        document.body.classList.remove('dark-mode');
    }
})();
