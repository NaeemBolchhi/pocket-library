/* LitCharts Literature */
if (window.location.hostname.includes('litcharts.com') && window.location.pathname.includes('/lit/')) {
    // Set filename variables
    pl_var.titleString = '.book-header .book-title';
    pl_var.title = $(pl_var.titleString).textContent;
    pl_var.authorString = '.book-header .book-author span';
    pl_var.author = $(pl_var.authorString).textContent;
    pl_var.hostString = 'LitCharts';

    // Link list
    pl_var.linkString = '.book-nav:first-of-type .components a:not([data-toggle="dropdown"]):not([href$="quotes"]):not([href$="chart-board-visualization"])';

    function getPagelist() {
        let links = $$(pl_var.linkString),
            linkArr = [];

        for (let x = 0; x < links.length; x++) {
            linkArr.push(links[x].href);
        }

        pl_var.linkArray = [...new Set(linkArr)];

        return true;
    }

    function getContent(doc = document, url = window.location.href) {
        let content = '',
            path = new URL(url).pathname;

        if ($('#context', doc) && $('.table-of-contents', doc)) {
            content = '<h2>Introduction</h2>' + $('#context', doc).innerHTML;
        }
        else if (path.match(/\/summary$/)) {
            content = '<h2>Plot</h2>' + $('.content .readable', doc).innerHTML;
        }
        else if (path.match(/\/summary\-and\-analysis$/)) {
            content = '<h2>Summary</h2>';

            for (let x = 0; x < $$('.content .summary .summary-text', doc).length; x++) {
                content += `<p>${$$('.content .summary .summary-text', doc)[x].innerHTML}</p>`;
            }
        }
        else if (path.match(/\/themes$/)) {
            content = '<h2>Theme Analysis</h2>';
        }
        else if (path.match(/\/characters$/)) {
            content = '<h2>Character Analysis</h2>';
        }
        else if (path.match(/\/symbols$/)) {
            content = '<h2>Symbol Analysis</h2>';
        }
        else if (path.match(/\/themes\//) || path.match(/\/symbols\//)) {
            content += `<h3>${$('.component-title', doc).textContent}</h3>`;

            content += $('.content .readable .highlightable-content', doc).innerHTML;
        }
        else if (path.match(/\/characters\//)) {
            content += `<h3>${$('.component-title', doc).textContent}</h3>`;

            content += `<p>${$('.content .readable .highlightable-content', doc).innerHTML}</p>`;
        }

        return content;
    }

    pl_var.specialStyles = `
        .stretch-left-promo, .download-links-banner, .table-of-contents {
            display: none !important;
        }
        h2 {
            break-before: page;
            margin-top: 0;
        }
        heading + h2 {
            break-before: unset;
        }
        .readable {
            text-align: justify;
            line-height: var(--line-spacing);
        }
    `;
}
