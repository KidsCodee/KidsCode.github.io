// all pages
document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
});

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('other-theme');
    
    // Store the theme preference in local storage
    const isOtherTheme = body.classList.contains('other-theme');
    localStorage.setItem('theme', isOtherTheme ? 'other' : '');
}

//  to apply the theme
function applyTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    if (savedTheme === 'other') {
        body.classList.add('other-theme');
    } else {
        body.classList.remove('other-theme');
    }
}
