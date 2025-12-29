/* CliffsNotes */
if (window.location.hostname.includes('cliffsnotes.com')) {
    // Set filename variables
    pl_var.titleString = '.title-wrapper h1';
    pl_var.authorString = '.title-wrapper h2';
    pl_var.hostString = 'CliffsNotes';

    // Link list
    pl_var.linkString = '.secondary-navigation ul a';

    function prepareDownload() {
        // Get content from current page
        let content = document.querySelectorAll('.copy > *');
        for (let x = 0; x < content.length; x++) {
            docContent.push(multiBlock(content[x]));
        }

        pdfMake.createPdf(docDefinition()).download(getFilename());
    }
}
