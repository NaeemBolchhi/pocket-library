// Listen for loading of libraries
window.addEventListener('pl_ready_paged', (e) => {
    runAll();
    console.log('PDFMake loaded at ', e.detail);
});

// Run when DOM is ready
if (document.readyState === "complete" || document.readyState === "interactive") {
    addlib();
    addfonts();
    addstyles();
} else {
    document.addEventListener('DOMContentLoaded', () => {
        addlib();
        addfonts();
        addstyles();
    });
}

// Main runner
function runAll() {
    if (pl_var.pl_running === true) {return;}

    addpanel();

    pl_var.pl_running = true;
}
