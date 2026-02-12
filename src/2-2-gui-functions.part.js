// Prepare PDF
function preparePDF() {
    if (getPagelist() === true) {
        looper();
    }
}

// Progress Bar
function updateProgress(input) {
    let pl = $('#pocketlibrary');

    pl.style.setProperty('--_progress-bar', parseFloat(input).toFixed(2) + 'deg');
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.pl-prepare')) {
        preparePDF();
    } else if (e.target.closest('.pl-refresh')) {
        window.location.reload(true);
    }
});
