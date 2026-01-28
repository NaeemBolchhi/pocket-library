// Prepare PDF
function preparePDF() {
    if (getPagelist() === true) {
        looper();
    }
}

// Progress Bar
function updateProgress(input) {
    let pl = document.querySelector('#pocketlibrary');

    pl.style.setProperty('--_progress-bar', parseFloat(input).toFixed(2) + 'deg');
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.pl-prepare')) {
        preparePDF();
    } else if (e.target.closest('.pl-refresh')) {
        window.location.reload(true);
    }
});

// When they zoom in, keep UI stable
function stabilizeUiScale() {
    const baseSize = 20;
    const zoomLevel = window.visualViewport ? window.visualViewport.scale : 1;

    // Divide the base size by the zoom level to get the inverse
    const adjustedSize = baseSize / zoomLevel;

    document.getElementById('pocketlibrary').style.setProperty('--_rem', adjustedSize + 'px');
}
window.addEventListener('resize', stabilizeUiScale);

// window.PagedPolyfill.preview();
// make another js for gui functions in book preview
// run this command every time any style is changed