// Add panel to DOM
function addpanel() {
    let maindiv = document.createElement('div');
    
    maindiv.id = 'pocketlibrary';
    maindiv.innerHTML = `
        <div class="pl-settings">
            <cloak>
                <a title="Pocket Library" href="https://naeembolchhi.github.io/pocket-library/" target="_blank">
                    ${getIcon.logo}
                </a>
            </cloak>
        </div>
        <div class="pl-prepare">
            <cloak>
                <a>
                    ${getIcon.cache}
                    <span>Prepare</span>
                </a>
            </cloak>
        </div>
        <div class="pl-preview">
            <cloak>
                <a target="_blank">
                    ${getIcon.preview}
                    <span>Preview</span>
                </a>
            </cloak>
        </div>
        <div class="pl-refresh">
            <cloak>
                <a>
                    ${getIcon.refresh}
                </a>
            </cloak>
        </div>
    `.replace(/\n/g,'').replace(/>\s+</g,'><').replace(/^\s+/g,'').replace(/\s+$/g,'');

    document.body.appendChild(maindiv);
}

// Define panel for preview page
function getbookpanel() {
    return `
        <div class="pl-settings">
            <cloak>
                <a title="Pocket Library" href="https://naeembolchhi.github.io/pocket-library/" target="_blank">
                    ${getIcon.logo}
                </a>
            </cloak>
        </div>
        <div class="pl-print">
            <cloak>
                <a>
                    ${getIcon.print}
                    <span>Print to PDF</span>
                </a>
            </cloak>
        </div>
    `.replace(/\n/g,'').replace(/>\s+</g,'><').replace(/^\s+/g,'').replace(/\s+$/g,'');
}
