// Listen for loading of libraries
window.addEventListener('pl_ready_paged', (e) => {
    document.documentElement.classList.add('pl-book');
    console.log('PDFMake loaded at ', e.detail);
});

// Run when DOM is ready
if (document.readyState === "complete" || document.readyState === "interactive") {
    addlib();
    addfonts();
    addstyles();
    runAll();
} else {
    document.addEventListener('DOMContentLoaded', () => {
        addlib();
        addfonts();
        addstyles();
        runAll();
    });
}

// Main runner
function runAll() {
    if (pl_var.pl_running === true) {return;}

    addpanel();

    pl_var.pl_running = true;
}
