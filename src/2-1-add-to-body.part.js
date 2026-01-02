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
    `.replace(/\n/g,'').replace(/>\s+</g,'><').replace(/^\s+/g,'').replace(/\s+$/g,'');

    document.body.appendChild(maindiv);
}
