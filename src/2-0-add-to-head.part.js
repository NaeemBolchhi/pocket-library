// Add links to DOM head
function addlib() {
    let mainjs = document.createElement('script'),
        fontsjs = document.createElement('script');
    
    mainjs.src = libmain;
    mainjs.id = 'pdfmake';
    mainjs.setAttribute('type','text/javascript');

    fontsjs.src = libfonts;
    fontsjs.id = 'vfs_fonts';
    mainjs.setAttribute('type','text/javascript');

    document.head.appendChild(mainjs);
    document.head.appendChild(fontsjs);
}
addlib();

// Add styles to DOM head
function addstyles() {
    let maincss = document.createElement('style');

    maincss.textContent = mainStyles;
    maincss.id = 'mainStyles';
    maincss.setAttribute('type','text/css');

    document.head.appendChild(maincss);
}
addstyles();
