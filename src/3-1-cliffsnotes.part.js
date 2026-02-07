/* CliffsNotes */
if (window.location.hostname.includes('cliffsnotes.com')) {
    // Set filename variables
    pl_var.titleString = '.title-wrapper h1';
    pl_var.title = document.querySelector(pl_var.titleString).textContent;
    pl_var.authorString = '.title-wrapper h2';
    pl_var.author = document.querySelector(pl_var.authorString).textContent;
    pl_var.hostString = 'CliffsNotes';

    // Set content container
    pl_var.contentContainer = 'article.copy';

    // Link list
    pl_var.linkString = '.secondary-navigation ul a';

    function getPagelist() {
        let links = document.querySelectorAll(pl_var.linkString),
            linkArr = [];

        for (let x = 0; x < links.length; x++) {
            linkArr.push(links[x].href);
        }

        pl_var.linkArray = [...new Set(linkArr)];

        return true;
    }

    pl_var.specialStyles = `
        .back-to-literature-note, #abstractAd, .continuedOnNextPage {
            display: none !important;
        }
        .litNoteTextHeading {
            font-weight: 700;
        }
        h2 {
            break-before: page;
            margin-top: 0;
        }
        heading + h2 {
            break-before: unset;
        }
    `;
}
