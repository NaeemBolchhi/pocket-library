// Dynamic CSS
function addStyle() {
    const pl_var = {};
    // page: height width;
    pl_var.pagesize_legal = '8.5in 14in';
    pl_var.pagesize_letter = '8.5in 11in';
    pl_var.pagesize_a4 = '210mm 297mm';
    // margin: top right bottom left;
    pl_var.margin_normal = '1in';
    pl_var.margin_narrow = '0.5in';
    pl_var.margin_moderate = '1in 0.75in';

    const pagedstyles = '@page {' +
                        'size: ' + pl_var['pagesize_' + getLocal('pagesize')] + ';' +
                        'margin: ' + pl_var['margin_' + getLocal('margin')] + ';' +
                        '}';

    let ns = document.createElement('style');
    ns.setAttribute('type','text/css');
    ns.textContent = pagedstyles;
    document.head.appendChild(ns);
}

// Elemake
function elemake(tag, innr, attr) {
    let element = document.createElement(tag);
    if (innr) {element.innerHTML = innr;}
    if (!attr) {return element;}

    for (let x = 0; x < attr.key.length; x++) {
        element.setAttribute(attr.key[x], attr.val[x]);
    }
    return element;
}

// Refresh Paged
function refreshPaged() {
    let plContainer = document.getElementById('pl-container');
    plContainer.style.display = 'none';
    plContainer.textContent = '';

    let oldstuff = document.head.querySelectorAll('style:not([data-pagedjs-ignore])');

    for (let x = 0; x < oldstuff.length; x++) {
        oldstuff[x].remove();
    }

    const normalizeX = elemake('link', '', {'key':['href','rel','type'],'val':[normalize,'stylesheet','text/css']}),
          fontsansX = elemake('link', '', {'key':['href','rel','type'],'val':[fontsans,'stylesheet','text/css']}),
          fontserifX = elemake('link', '', {'key':['href','rel','type'],'val':[fontserif,'stylesheet','text/css']}),
          bookstylesX = elemake('style', bookstyles, {'key':['type'],'val':['text/css']});

    document.head.appendChild(normalizeX);
    document.head.appendChild(fontsansX);
    document.head.appendChild(fontserifX);
    document.head.appendChild(bookstylesX);
    addStyle();
    previewPaged();

    plContainer.removeAttribute('style');
}

// Page preview
function previewPaged() {
    const contentSource = document.getElementById("pl-content");
    const contentPreview = document.getElementById("pl-container");
    const paged = new Paged.Previewer();

    paged.preview(contentSource.innerHTML, null, contentPreview).then((flow) => {
        // document.body.removeAttribute('style');
        console.log('Paged.js preview is ready.');
    });
}

// Change page size
function updatePageSize(key) {
    let container = document.querySelector('.pl-book__pagesize');
    //getLocal('pagesize');

    container.setAttribute('data-selected', key);
    setLocal('pagesize', key);
}

// Change margin
function updateMargin(key) {
    let container = document.querySelector('.pl-book__margin');
    //getLocal('margin');

    container.setAttribute('data-selected', key);
    setLocal('margin', key);
}

// Change fontface
function updateFontface(key) {
    let container = document.querySelector('.pl-book__fontface');
    //getLocal('fontface');

    container.setAttribute('data-selected', key);
    setLocal('fontface', key);
    document.documentElement.setAttribute('data-font', key);
}

// Change fontsize
function updateFontsize(key) {
    let container = document.querySelector('.pl-book__fontsize .pl-right .pl-value'),
        newVal = parseFloat(getLocal('fontsize'));
    //getLocal('fontsize');

    if (!Number.isNaN(Number(key))) {
        newVal = parseFloat(key);
    } else {
        if (key.match(/minus/i)) {
            newVal = newVal - 0.5;
        } else if (key.match(/plus/i)) {
            newVal = newVal + 0.5;
        }
    }

    newVal = parseFloat(parseFloat(newVal).toFixed(2));
    container.textContent = newVal.toString();
    setLocal('fontsize', newVal);
    document.documentElement.style.setProperty('--font-size', newVal.toString() + 'px');
}

// Change linespacing
function updateLinespacing(key) {
    let container = document.querySelector('.pl-book__linespacing .pl-right .pl-value'),
        newVal = parseFloat(getLocal('linespacing'));
    //getLocal('linespacing');

    if (!Number.isNaN(Number(key))) {
        newVal = parseFloat(key);
    } else {
        if (key.match(/minus/i)) {
            newVal = newVal - 0.05;
        } else if (key.match(/plus/i)) {
            newVal = newVal + 0.05;
        }
    }

    newVal = parseFloat(parseFloat(newVal).toFixed(2));
    container.textContent = newVal.toString();
    setLocal('linespacing', newVal);
    document.documentElement.style.setProperty('--line-spacing', newVal.toString());
}

// Open-close menu
function toggleMenu() {
    let bookmenu = document.querySelector('.pl-book');
    //getLocal('bookmenustate');

    bookmenu.classList.add('mask');
    bookmenu.classList.toggle('closed');

    if (bookmenu.classList.contains('closed')) {
        setLocal('bookmenustate', ' closed'); // Space is intentional
    } else {
        setLocal('bookmenustate', '');
    }

    setTimeout(() => {
        bookmenu.classList.remove('mask');
    }, 300);
}

// Set menu state as saved
function updateMenu(key) {
    let bookmenu = document.querySelector('.pl-book');

    // Check if dom and localstorage val mismatch
    if (!((key.match(/closed/) && bookmenu.classList.contains('closed')) || (!key.match(/closed/) && !bookmenu.classList.contains('closed')))) {
        bookmenu.classList.add('plain');
        bookmenu.classList.toggle('closed');
        setTimeout(() => {
            bookmenu.classList.remove('plain');
        }, 50);
    }
}

// Book view functions
document.addEventListener('click', (e) => {
    // When they click print
    if (e.target.closest('.pl-print')) {
        setTimeout(() => {
            window.print();
        }, 100);
    }

    // Change page size
    if (e.target.closest('.pl-book__pagesize .pl-right cloak')) {
        updatePageSize(e.target.closest('cloak').className.replace(/pl\-/,''));
        refreshPaged();
    }
    if (e.target.closest('.pl-book__pagesize .pl-left cloak')) {
        updatePageSize('a4');
        refreshPaged();
    }

    // Change margin
    if (e.target.closest('.pl-book__margin .pl-right cloak')) {
        updateMargin(e.target.closest('cloak').className.replace(/pl\-/,''));
        refreshPaged();
    }
    if (e.target.closest('.pl-book__margin .pl-left cloak')) {
        updateMargin('normal');
        refreshPaged();
    }

    // Change fontface
    if (e.target.closest('.pl-book__fontface .pl-right cloak')) {
        updateFontface(e.target.closest('cloak').className.replace(/pl\-/,''));
        refreshPaged();
    }
    if (e.target.closest('.pl-book__fontface .pl-left cloak')) {
        updateFontface('sans');
        refreshPaged();
    }

    // Change fontsize
    if (e.target.closest('.pl-book__fontsize .pl-right cloak:has(a)')) {
        updateFontsize(e.target.closest('cloak').className.replace(/pl\-/,''));
        refreshPaged();
    }
    if (e.target.closest('.pl-book__fontsize .pl-left cloak')) {
        updateFontsize(12);
        refreshPaged();
    }

    // Change linespacing
    if (e.target.closest('.pl-book__linespacing .pl-right cloak:has(a)')) {
        updateLinespacing(e.target.closest('cloak').className.replace(/pl\-/,''));
        refreshPaged();
    }
    if (e.target.closest('.pl-book__linespacing .pl-left cloak')) {
        updateLinespacing(1.5);
        refreshPaged();
    }

    // Open-close menu
    if (e.target.closest('.pl-book__toggle .pl-left cloak')) {
        toggleMenu();
    }
});

// Autoset on load
function setSelections() {
    try {
        updatePageSize(getLocal('pagesize'));
        updateMargin(getLocal('margin'));
        updateFontface(getLocal('fontface'));
        updateFontsize(getLocal('fontsize'));
        updateLinespacing(getLocal('linespacing'));
        updateMenu(getLocal('bookmenustate'));
    } catch {}
}

addStyle();
setSelections();
previewPaged();