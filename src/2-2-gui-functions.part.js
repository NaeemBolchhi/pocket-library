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

// Change margin
function marginswap(which) {
    let margin = document.querySelector('#pocketlibrary .pl-margin');

    if (which.classList.contains('pl-normal')) {
        margin.classList.remove('pl-narrow','pl-moderate');
        margin.classList.add('pl-normal');
        localStorage.pl_margin = 'normal';
    } else if (which.classList.contains('pl-narrow')) {
        margin.classList.remove('pl-normal','pl-moderate');
        margin.classList.add('pl-narrow');
        localStorage.pl_margin = 'narrow';
    } else if (which.classList.contains('pl-moderate')) {
        margin.classList.remove('pl-normal','pl-narrow');
        margin.classList.add('pl-moderate');
        localStorage.pl_margin = 'moderate';
    }
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

    if (e.target.closest('.pl-margin > div > span')) {
        marginswap(e.target);
    }

    if (e.target.closest('.pl-download')) {
        pdfMake.createPdf(docDefinition()).download(getFilename());
    }
});
