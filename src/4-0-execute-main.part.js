// Listen for loading of libraries
window.addEventListener('pl_ready_pdfmake', (e) => {
    runAll();
    console.log('PDFMake loaded at ', e.detail);
});
window.addEventListener('pl_ready_fonts', (e) => {
    runAll();
    console.log('VFS Fonts loaded at', e.detail);
});

// Run when DOM is ready
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

// Main runner
function runAll() {
    if (pl_var.pl_running === true ||
        !document.documentElement.classList.contains('pl-pdfmake') ||
        !document.documentElement.classList.contains('pl-fonts')) {return;}

    sourceFonts();
    addpanel();

    pl_var.pl_running = true;
}
