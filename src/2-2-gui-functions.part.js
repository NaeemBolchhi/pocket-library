// Prepare PDF
function preparePDF() {
    if (getPagelist() === true) {
        pl_var.loop = 0;
        document.querySelector('#pocketlibrary').style.setProperty('--_progress-bar', '0deg');
        looper();
    }
}

// Progress Bar
function updateProgress(input) {
    let pl = document.querySelector('#pocketlibrary');

    pl.style.setProperty('--_progress-bar', parseFloat(input).toFixed(2) + 'deg');
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.pl-prepare:not(.active)')) {
        preparePDF();
        e.target.closest('.pl-prepare:not(.active)').classList.add('active');
    }
    if (e.target.closest('.pl-refresh')) {
        e.preventDefault();
        window.location.reload(true);
    }
});

// window.PagedPolyfill.preview();
// make another js for gui functions in book preview
// run this command every time any style is changed