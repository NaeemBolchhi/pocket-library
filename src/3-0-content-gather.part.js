// Start 
function getFilename() {
    const SITE_CONFIGS = {
        "www.cliffsnotes.com": {
            title: '.title-wrapper h1',
            author: '.title-wrapper h2'
        }
    };

    let pl_title = document.querySelector('.title-wrapper h1').textContent,
        pl_author = document.querySelector('.title-wrapper h2').textContent;

    console.log(`PL - ${pl_title} (${pl_author})`);
    return `PL - ${pl_title} (${pl_author})`;
}
