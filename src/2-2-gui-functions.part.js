// Switch between Serif and Sans-serif
function fontswap() {
    let fontswap = document.querySelector('#pocketlibrary .pl-fontswap');

    if (fontswap.classList.contains('pl-serif')) {
        fontswap.classList.remove('pl-serif');
        fontswap.classList.add('pl-sans');
        localStorage.pl_fontvariant = 'sans';
    } else {
        fontswap.classList.remove('pl-sans');
        fontswap.classList.add('pl-serif');
        localStorage.pl_fontvariant = 'serif';
    }
}

// Change font size
function fontsize(dir) {
    let textsize = document.querySelector('#pocketlibrary .pl-textsize > div > span'),
        newSize = '';

    if (dir === '+') {
        newSize = parseFloat(localStorage.pl_fontsize) + .5;
        if (newSize > 30) {
            newSize = 30;
        }
    } else if (dir === '-') {
        newSize = parseFloat(localStorage.pl_fontsize) - .5;
        if (newSize < 1) {
            newSize = 1;
        }
    }

    textsize.textContent = newSize;
    localStorage.pl_fontsize = newSize.toString();
}

// Event listener
document.addEventListener('click', (e) => {
    if (e.target.closest('.pl-fontswap.pl-serif > div > svg.pl-sans')) {
        fontswap();
    } else if (e.target.closest('.pl-fontswap.pl-sans > div > svg.pl-serif')) {
        fontswap();
    }

    if (e.target.closest('.pl-textsize .pl-minus')) {
        fontsize('-');
    } else if (e.target.closest('.pl-textsize .pl-plus')) {
        fontsize('+');
    }
});