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
        <div class="pl-book${getLocal('bookmenustate')}">
            <div class="pl-book__toggle">
                <div class="pl-left">
                    <cloak>
                        <a>${getIcon.arrow}</a>
                    </cloak>
                </div>
            </div>
            <div class="pl-book__pagesize" data-selected="${getLocal('pagesize')}">
                <div class="pl-left">
                    <cloak>
                        <a>${getIcon.pagesize}</a>
                    </cloak>
                </div>
                <div class="pl-right">
                    <cloak class="pl-legal">
                        <a><span>Legal</span></a>
                    </cloak>
                    <cloak class="pl-letter">
                        <a><span>Letter</span></a>
                    </cloak>
                    <cloak class="pl-a4">
                        <a><span>ISO A4</span></a>
                    </cloak>
                </div>
            </div>
            <div class="pl-book__margin" data-selected="${getLocal('margin')}">
                <div class="pl-left">
                    <cloak>
                        <a>${getIcon.margin}</a>
                    </cloak>
                </div>
                <div class="pl-right">
                    <cloak class="pl-normal">
                        <a><span>Normal</span></a>
                    </cloak>
                    <cloak class="pl-narrow">
                        <a><span>Narrow</span></a>
                    </cloak>
                    <cloak class="pl-moderate">
                        <a><span>Moderate</span></a>
                    </cloak>
                </div>
            </div>
            <div class="pl-book__fontface" data-selected="${getLocal('fontface')}">
                <div class="pl-left">
                    <cloak>
                        <a>${getIcon.fontface}</a>
                    </cloak>
                </div>
                <div class="pl-right">
                    <cloak class="pl-sans">
                        <a>${getIcon.fontsans}</a>
                    </cloak>
                    <cloak class="pl-serif">
                        <a>${getIcon.fontserif}</a>
                    </cloak>
                </div>
            </div>
            <div class="pl-book__fontsize">
                <div class="pl-left">
                    <cloak>
                        <a>${getIcon.fontsize}</a>
                    </cloak>
                </div>
                <div class="pl-right">
                    <cloak class="pl-minus">
                        <a>${getIcon.minus}</a>
                    </cloak>
                    <cloak class="pl-value">
                        <span>${getLocal('fontsize')}</span>
                    </cloak>
                    <cloak class="pl-plus">
                        <a>${getIcon.plus}</a>
                    </cloak>
                </div>
            </div>
            <div class="pl-book__linespacing">
                <div class="pl-left">
                    <cloak>
                        <a>${getIcon.linespacing}</a>
                    </cloak>
                </div>
                <div class="pl-right">
                    <cloak class="pl-minus">
                        <a>${getIcon.minus}</a>
                    </cloak>
                    <cloak class="pl-value">
                        <span>${getLocal('linespacing')}</span>
                    </cloak>
                    <cloak class="pl-plus">
                        <a>${getIcon.plus}</a>
                    </cloak>
                </div>
            </div>
        </div>
    `.replace(/\n/g,'').replace(/>\s+</g,'><').replace(/^\s+/g,'').replace(/\s+$/g,'');
}
