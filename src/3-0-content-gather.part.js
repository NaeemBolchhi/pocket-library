// Create an iframe for any url
function createFrame(link) {
    let iframe = document.createElement('iframe');
    iframe.src = link;
    iframe.classList = 'pl-iframe';
    iframe.setAttribute('style','height:100svh;width:100svw;position:fixed;left:-300svw;bottom:-300svh');

    document.body.appendChild(iframe);
}

// Delete an iframe
function deleteFrame(src) {
    document.querySelector(`iframe.pl-iframe[src="${src}"]`).remove();
}

// Loop through link list
function looper() {
    if (!pl_var.loop) {
        pl_var.loop = 1;
        sessionStorage.pl_content = '';
    } else {
        pl_var.loop++;
    }

    if (pl_var.loop - 1 !== pl_var.linkArray.length) {
        createFrame(pl_var.linkArray[pl_var.loop - 1] + '?pl_looping');
    } else {
        pocketPDF();

        setTimeout(() => {
            updateProgress(0);
        }, 750);
    }

    updateProgress(pl_var.loop / pl_var.linkArray.length * 360);
}

// Arrange heading of the document
function setHeading() {
    return `
        <heading>
            <htitle>${pl_var.title}</htitle>
            <hauthor>${pl_var.author}</hauthor>
            <p>${getIcon.logo.replace(' fill="currentColor">','>')} From ${pl_var.hostString} via <a href="https://naeembolchhi.github.io/pocket-library/" target="_blank">Pocket Library</a></p>
        </heading>
    `;
}

// Put content together in a new tab
function pocketPDF() {
    const bookHTML = `
        <!DOCTYPE html>
        <html id="pagedPreview" style="--font-size: ${getLocal('fontsize')}px;--line-spacing: ${getLocal('linespacing')}" data-font="${getLocal('fontface')}">
            <head>
                <title>${pl_var.hostString} - ${pl_var.title} (${pl_var.author})</title>

                <meta http-equiv="content-type" content="text/html; charset=utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                <meta name="HandheldFriendly" content="true">
                <meta name="description" content="${pl_var.title} by ${pl_var.author}.">
                <meta name="author" content="${pl_var.author}">

                <link rel="shortcut icon" href="data:image/svg+xml;base64,${btoa(getIcon.logo.replace('currentColor','#e43434'))}" type="image/x-icon">
                <link href="${normalcss}" rel="stylesheet" type="text/css">
                <link href="${fontsans}" rel="stylesheet" type="text/css">
                <link href="${fontserif}" rel="stylesheet" type="text/css">
                <link href="${fontlato}" rel="stylesheet" type="text/css" data-pagedjs-ignore>
                <style type="text/css" data-pagedjs-ignore>${mainStyles}</style>
                <style type="text/css">${bookStyles + pl_var.specialStyles}</style>
                <script src="${libpaged}" type="text/javascript"></script>
            </head>
            <body>
                <div id="pl-content" style="display:none">${setHeading() + sessionStorage.pl_content}</div>
                <div id="pl-container"></div>
                <div id="pocketlibrary">${getbookpanel()}</div>

                <script type="text/javascript">
                    const normalize = '${normalcss}',
                          fontsans = '${fontsans}',
                          fontserif = '${fontserif}',
                          bookstyles = '${bookStyles.replace(/\n/g,'').replace(/[\t\s]+/g,' ') + pl_var.specialStyles.replace(/\n/g,'').replace(/[\t\s]+/g,' ')}';

                    ${bookGUI}
                </script>
            </body>
        </html>
    `;

    const blob = new Blob([bookHTML], {type: 'text/html'});

    const blobURL = URL.createObjectURL(blob);

    document.querySelector('#pocketlibrary .pl-preview a').href = blobURL;

    document.querySelector('#pocketlibrary .pl-preview a').click();
    // window.open(blobURL, '_blank');
}

window.addEventListener('message', (e) => {
    if (typeof e.data !== 'string') return;
    if (!e.data.match(/pl\-iframe\-done\-/)) {return;}

    deleteFrame(e.data.replace(/pl\-iframe\-done\-/,''));
    looper();
});

document.addEventListener("DOMContentLoaded", (e) => {
    if (!window.location.href.match(/\?pl_looping/)) {return;}

    let content = document.querySelector(pl_var.contentContainer);

    if (content) {
        sessionStorage.pl_content += content.innerHTML;
    }

    window.parent.postMessage('pl-iframe-done-' + window.location.href);
});
