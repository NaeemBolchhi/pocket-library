// PDF Filename
function getFilename() {
    let pl_title = document.querySelector(pl_var.titleString).textContent,
        pl_author = document.querySelector(pl_var.authorString).textContent;

    return `${pl_var.hostString} - ${pl_title} (${pl_author})`;
}

// Page list
function getPagelist() {

}