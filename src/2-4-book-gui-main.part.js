// When they click print
document.addEventListener('click', (e) => {
    if (e.target.closest('.pl-print')) {
        setTimeout(() => {
            window.print();
        }, 100);
    }
});