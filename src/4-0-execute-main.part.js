// Add the event listener
window.addEventListener('pl_ready_pdfmake', (e) => {
    console.log('The pl_ready_pdfmake event was detected!');

    // Access the data sent in the dispatch
    const data = e.detail;
    runAll();
    console.log('Payload received:', data);
});

window.addEventListener('pl_ready_fonts', (e) => {
    console.log('The pl_ready_fonts event was detected!');

    // Access the data sent in the dispatch
    const data = e.detail;
    runAll();
    console.log('Payload received:', data);
});

// DOM is ready
if (document.readyState === "complete" || document.readyState === "interactive") {
    addlib();
    addstyles();
    runAll();
} else {
    document.addEventListener('DOMContentLoaded', () => {
        addlib();
        addstyles();
    });
}

// Main runner when DOM ready and lib loaded
function runAll() {
    // if (pl_running === true ||
        // !document.documentElement.classList.contains('pl-pdfmake') ||
        // !document.documentElement.classList.contains('pl-fonts')) {return;}

    sourceFonts();
    addpanel();

    pl_running = true;
}
