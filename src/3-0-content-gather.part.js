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
    } else {
        pl_var.loop++;
    }

    if (pl_var.loop !== pl_var.linkArray.length) {
        createFrame(pl_var.linkArray[pl_var.loop] + '?pl_looping');
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
    const myHTML = "<html><body><h1>Virtual File</h1></body></html>";

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

    window.parent.postMessage('pl-iframe-done-' + window.location.href);
});
