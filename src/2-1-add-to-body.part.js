// Add panel to DOM
function addpanel() {
    let maindiv = document.createElement('div');
    
    maindiv.id = 'pocketlibrary';
    maindiv.innerHTML = `
        <div class="pl-settings">
            <a title="Pocket Library" href="https://naeembolchhi.github.io/pocket-library/" target="_blank">
                ${getIcon.logo}
            </a>
        </div>
        <div class="pl-download">
            <div>
                ${getIcon.download}
                <span>Download as PDF</span>
            </div>
        </div>
        <div class="pl-subsettings">
            <div class="pl-textsize">
                ${getIcon.textsize}
                <div>
                    ${getIcon.textminus}
                    <span>${localStorage.pl_fontsize}</span>
                    ${getIcon.textplus}
                </div>
            </div>
            <div class="pl-margin pl-${localStorage.pl_margin}">
                ${getIcon.margin}
                <div>
                    <span class="pl-normal">Normal</span>
                    <span class="pl-narrow">Narrow</span>
                    <span class="pl-moderate">Moderate</span>
                </div>
            </div>
            <div class="pl-fontswap pl-${localStorage.pl_fontvariant}">
                ${getIcon.fontswap}
                <div>
                    ${getIcon.fontsans}
                    ${getIcon.fontserif}
                </div>
            </div>
        </div>
    `.replace(/\n/g,'').replace(/>\s+</g,'><').replace(/^\s+/g,'').replace(/\s+$/g,'');

    document.body.appendChild(maindiv);
}
addpanel();
