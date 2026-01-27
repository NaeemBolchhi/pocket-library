// Run when DOM is ready
if (document.readyState === "complete" || document.readyState === "interactive") {
    addfont();
    addstyles();
    runAll();
} else {
    document.addEventListener('DOMContentLoaded', () => {
        addfont();
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
