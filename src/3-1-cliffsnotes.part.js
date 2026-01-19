/* CliffsNotes */
if (window.location.hostname.includes('cliffsnotes.com')) {
    // Set filename variables
    pl_var.titleString = '.title-wrapper h1';
    pl_var.authorString = '.title-wrapper h2';
    pl_var.hostString = 'CliffsNotes';

    // Link list
    pl_var.linkString = '.secondary-navigation ul a';
    
    function getPagelist() {
        let links = document.querySelectorAll(pl_var.linkString);

        pl_var.linkArray = [];

        for (let x = 0; x < links.length; x++) {
            pl_var.linkArray.push(links[x].href);
        }

        return true;
    }
}
