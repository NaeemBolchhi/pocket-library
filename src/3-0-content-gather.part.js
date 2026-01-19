// PDF Filename
function getFilename() {
    let pl_title = document.querySelector(pl_var.titleString).textContent,
        pl_author = document.querySelector(pl_var.authorString).textContent;

    return `${pl_var.hostString} - ${pl_title} (${pl_author})`;
}

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
    let pl = document.querySelector('pocketlibrary');

    if (!pl_var.loop) {
        pl_var.loop = 1;
        sessionStorage.pl_content = '';
    } else {
        pl_var.loop++;
    }

    if (pl_var.loop !== pl_var.linkArray.length) {
        createFrame(pl_var.linkArray[pl_var.loop - 1] + '?pl_looping');
    } else {
        pocketPDF();

        setTimeout(() => {
            updateProgress(0);
        }, 750);
    }

    updateProgress(pl_var.loop / pl_var.linkArray.length * 360);
}

// Put content together in a new tab
function pocketPDF() {
    const myHTML = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>${getFilename()}</title>

                <meta http-equiv="content-type" content="text/html; charset=utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                <meta name="HandheldFriendly" content="true">
                <meta name="description" content="A free and easy way to learn touch typing on Colemak and other keyboard layouts.">
                <meta name="author" content="Colemak Camp">

                <link rel="shortcut icon" href="data:image/svg+xml;base64,${btoa(getIcon.logo.replace('currentColor','#e64141'))}" type="image/x-icon">
                <link href="${normalcss}" id="modernNormalize" rel="stylesheet" type="text/css">
                <link href="${fontsans}" id="fontSans" rel="stylesheet" type="text/css">
                <link href="${fontserif}" id="fontSerif" rel="stylesheet" type="text/css">
                <script src="${libpaged}" type="text/javascript"></script>
                <style type="text/css">${bookStyles}</style>
            </head>
            <body>CONTENT_HERE</body>
        </html>
    `.replace(/\n/g,'').replace(/>\s+</g,'><').replace(/^\s+/g,'').replace(/\s+$/g,'').replace('CONTENT_HERE', sessionStorage.pl_content);

    const blob = new Blob([myHTML], { type: 'text/html' });

    const blobURL = URL.createObjectURL(blob);

    window.open(blobURL, '_blank');
}

window.addEventListener('message', (e) => {
    if (typeof e.data !== 'string') return;
    if (!e.data.match(/pl\-iframe\-done\-/)) {return;}

    deleteFrame(e.data.replace(/pl\-iframe\-done\-/,''));
    looper();
});

document.addEventListener("DOMContentLoaded", (e) => {
    if (!window.location.href.match(/\?pl_looping/)) {return;}

    let content = document.querySelector('article.copy');

    if (content) {
        sessionStorage.pl_content += content.innerHTML;
    }

    window.parent.postMessage('pl-iframe-done-' + window.location.href);
});
