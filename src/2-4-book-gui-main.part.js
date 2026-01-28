// When they click print
document.addEventListener('click', (e) => {
    if (e.target.closest('.pl-print')) {
        setTimeout(() => {
            window.print();
        }, 100);
    }
});

// When they zoom in, keep UI stable
function stabilizeUiScale() {
    const baseSize = 20;
    const zoomLevel = window.devicePixelRatio;

    // Divide the base size by the zoom level to get the inverse
    const adjustedSize = baseSize / zoomLevel;

    document.getElementById('pocketlibrary').style.setProperty('--_rem', adjustedSize + 'px');
}
window.addEventListener('resize', stabilizeUiScale);