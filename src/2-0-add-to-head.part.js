// Add links to DOM head
function addlib() {
    let mainjs = document.createElement('script');

    mainjs.src = libpaged;
    mainjs.id = 'pagedjs';
    mainjs.setAttribute('type','text/javascript');

    document.head.appendChild(mainjs);
}

// Add styles to DOM head
function addstyles() {
    let maincss = document.createElement('style');

    maincss.textContent = mainStyles;
    maincss.id = 'mainStyles';
    maincss.setAttribute('type','text/css');

    document.head.appendChild(maincss);
}

// Add fonts to DOM head
function addfonts() {
    let sSans = document.createElement('link'),
        sSerif = document.createElement('link');

    sSans.href = fontsans;
    sSerif.href = fontserif;
    sSans.id = 'fontSourceSans';
    sSerif.id = 'fontSourceSerif';
    sSans.setAttribute('rel','stylesheet');
    sSerif.setAttribute('rel','stylesheet');
    sSans.setAttribute('type','text/css');
    sSerif.setAttribute('type','text/css');

    document.head.appendChild(sSans);
    document.head.appendChild(sSerif);
}
