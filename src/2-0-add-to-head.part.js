// Add links to DOM head
/*function addlib() {
    if (window.location.search !== '?pl-book') {
        return;
    }

    let mainjs = document.createElement('script');

    mainjs.src = libpaged;
    mainjs.id = 'pagedjs';
    mainjs.setAttribute('type','text/javascript');

    document.head.appendChild(mainjs);
}*/

// Add styles to DOM head
function addstyles() {
    let maincss = document.createElement('style');

    maincss.textContent = mainStyles;
    maincss.id = 'plStyles';
    maincss.setAttribute('type','text/css');

    document.head.appendChild(maincss);
}

// Add fonts to DOM head
function addfont() {
    let lato = document.createElement('link');

    lato.href = fontlato;
    lato.id = 'fontLato';
    lato.setAttribute('rel','stylesheet');
    lato.setAttribute('type','text/css');
    
    document.head.appendChild(lato);
}
