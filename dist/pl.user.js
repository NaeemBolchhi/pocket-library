// ==UserScript==
// @name         Pocket Library
// @namespace    https://naeembolchhi.github.io/
// @version      0.20260027180212
// @description  Download articles, summaries, analyses, and notes from various English Literature websites as PDF.
// @author       NaeemBolchhi
// @license      GPL-3.0-or-later
// @icon         https://naeembolchhi.github.io/pocket-library/icon.svg
// @match        https://www.cliffsnotes.com/*
// @match        http://www.cliffsnotes.com/*
// @run-at       document-body
// @grant        none
// @downloadURL  https://naeembolchhi.github.io/pocket-library/dist/pl.user.js
// @updateURL    https://naeembolchhi.github.io/pocket-library/dist/pl.meta.js
// ==/UserScript==

// Globally available constants
const libpaged = 'https://naeembolchhi.github.io/pocket-library/lib/paged.polyfill.min.js',
      normalcss = 'https://naeembolchhi.github.io/pocket-library/lib/modern-normalize.min.css',
      fontsans = 'https://naeembolchhi.github.io/pocket-library/fonts/sourcesans.min.css',
      fontserif = 'https://naeembolchhi.github.io/pocket-library/fonts/sourceserif.min.css';

      getIcon = {
            "logo": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 300 300" fill="currentColor"><path d="m284.11 232.24.02-.01-.1-.05.08.06zm-143.84 43.47-84.84-63.48-39.57 20L149.99 300l133.96-67.68-143.68 43.39z"/><path d="m284.14 232.29-.07-.08.05.09.02-.01zm-150.05-8.33-58.01-88.67-44.03 5.25L134.92 250.1l149.02-17.78-149.85-8.36z"/><path d="M146.01 173.14 121.83 70.01 78.64 59.89l59.19 138.14 146.31 34.3-138.13-59.19z"/><path d="m275.77 82.28 8.37 150.05-125.76-82.28L150.01 0l125.76 82.28z"/></svg>`,
            // "download": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M8.47 96h79.06V84.71H8.47V96Zm79.06-62.12H64.94V0H31.06v33.88H8.47L48 73.41l39.53-39.53Z"/></svg>`,
            // "textplus": `<svg class="pl-plus" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M82.63 43.54H96v8.92H82.63v13.37h-8.92V52.46H60.34v-8.92h13.37V30.17h8.92v13.37ZM15.69 62.5H39.7l5.29 15.22h10.28L32.92 18.28H22.34L0 77.72h10.28l5.41-15.22Zm9.39-26.27 2.32-6.9h.48l2.32 6.9 6.3 17.71H18.79l6.3-17.71Z"/></svg>`,
            // "textminus": `<svg class="pl-minus" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M96 43.54v8.92H60.33v-8.92H96ZM15.69 62.5H39.7l5.29 15.22h10.28L32.92 18.28H22.34L0 77.72h10.28l5.41-15.22Zm9.39-26.27 2.32-6.9h.48l2.32 6.9 6.3 17.71H18.79l6.3-17.71Z"/></svg>`,
            // "textsize": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M0 10.11v15.16h25.26v60.62h15.16V25.26h25.26V10.1H0Zm95.99 25.26H50.52v15.16h15.16V85.9h15.16V50.53H96V35.37h-.01Z"/></svg>`,
            // "fontswap": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M3.2 83.2V96h89.6V83.2H3.2ZM32 56.32h32l5.76 14.08H83.2L52.8 0h-9.6L12.8 70.4h13.44L32 56.32Zm16-43.65L59.97 44.8H36.03L48 12.67Z"/></svg>`,
            // "fontsans": `<svg class="pl-sans" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0V0Z" fill="none"/><path d="M39.1 95.26c-4.94 0-9.42-1.02-13.44-3.06s-7.2-4.94-9.54-8.71c-2.35-3.77-3.52-8.37-3.52-13.81 0-10.13 4.45-17.79 13.34-22.98 8.9-5.19 22.98-8.83 42.26-10.93-.12-3.71-.71-7.29-1.76-10.75s-2.94-6.24-5.65-8.34c-2.72-2.1-6.49-3.15-11.3-3.15-5.19 0-10.07.96-14.64 2.87-4.57 1.92-8.65 4.05-12.23 6.39l-5.93-10.38c2.72-1.85 5.93-3.67 9.64-5.47 3.71-1.79 7.72-3.27 12.05-4.45C42.7 1.32 47.28.73 52.09.73c7.29 0 13.25 1.51 17.88 4.54C74.6 8.3 78 12.59 80.16 18.15c2.16 5.56 3.24 12.11 3.24 19.64v55.23H70.8l-1.3-10.75h-.56a76.468 76.468 0 0 1-13.9 9.17c-4.94 2.53-10.26 3.8-15.94 3.8Zm4.27-12.6c4.45 0 8.62-.99 12.51-2.97 3.89-1.97 8-4.88 12.32-8.71V46.7c-10.13 1.24-18.13 2.81-24 4.73-5.87 1.92-10.1 4.29-12.7 7.13-2.59 2.84-3.89 6.24-3.89 10.19 0 4.94 1.54 8.5 4.63 10.66s6.79 3.24 11.12 3.24Z"/></svg>`,
            // "fontserif": `<svg class="pl-serif" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0V0Z" fill="none"/><path d="M28.63 96c-7.04 0-13.07-2.04-18.07-6.12S3.05 79.81 3.05 71.9c0-4.57.96-8.59 2.87-12.05 1.91-3.46 5.06-6.55 9.45-9.27 4.38-2.72 10.35-5.12 17.88-7.23 3.58-1.11 7.13-2.13 10.66-3.06 3.52-.93 7.04-1.88 10.56-2.87 3.52-.99 7.01-1.98 10.47-2.97v7.6c-4.45 1.36-8.9 2.75-13.34 4.17-4.45 1.42-8.9 2.87-13.34 4.35-5.07 1.48-8.9 3.18-11.49 5.1-2.59 1.92-4.35 3.95-5.28 6.12-.93 2.16-1.39 4.48-1.39 6.95 0 4.57 1.42 8.13 4.26 10.66 2.84 2.53 6.61 3.8 11.3 3.8 3.09 0 5.87-.56 8.34-1.67 2.47-1.11 5.13-2.81 7.97-5.1 2.84-2.29 6.18-5.1 10.01-8.43l1.3 10.56h-6.49c-2.47 3.21-4.98 6.15-7.51 8.8a28.97 28.97 0 0 1-8.71 6.3c-3.28 1.54-7.26 2.32-11.95 2.32Zm48-.56c-5.31 0-9.61-1.73-12.88-5.19-3.28-3.46-5.04-8.59-5.28-15.38l-.37-.37V32.06c0-5.68-.68-10.19-2.04-13.53-1.36-3.34-3.49-5.68-6.39-7.04-2.9-1.36-6.58-2.04-11.03-2.04-3.09 0-6.06.25-8.9.74-2.84.5-5.81 1.42-8.9 2.78l7.41-7.41-2.96 16.68c-.62 3.71-1.79 6.43-3.52 8.15-1.73 1.73-4.02 2.59-6.86 2.59s-5.22-.77-6.77-2.32c-1.55-1.54-2.5-3.36-2.87-5.47 1.6-7.66 5.81-13.77 12.6-18.35C24.68 2.29 33.2 0 43.46 0c6.42 0 11.98 1.05 16.68 3.15 4.69 2.1 8.31 5.47 10.84 10.1 2.53 4.63 3.8 10.91 3.8 18.81V73.2c0 3.83.68 6.58 2.04 8.25 1.36 1.67 3.27 2.5 5.75 2.5 1.6 0 2.99-.28 4.17-.83 1.17-.56 2.25-1.2 3.24-1.95l2.97 6.49a21.251 21.251 0 0 1-6.77 5.65c-2.66 1.42-5.84 2.13-9.54 2.13Z"/></svg>`,
            // "margin": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M0 0v96h96V0H0Zm42.67 85.33h-32v-32h32v32Zm0-42.66h-32v-32h32v32Zm42.66 42.66h-32v-32h32v32Zm0-42.66h-32v-32h32v32Z"/></svg>`,
            "preview": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M48 15.27C26.18 15.27 7.55 28.84 0 48c7.55 19.16 26.18 32.73 48 32.73S88.45 67.16 96 48c-7.55-19.16-26.18-32.73-48-32.73Zm0 54.55c-12.04 0-21.82-9.77-21.82-21.82S35.95 26.18 48 26.18 69.82 35.95 69.82 48 60.05 69.82 48 69.82Zm0-34.91c-7.24 0-13.09 5.85-13.09 13.09S40.76 61.09 48 61.09 61.09 55.24 61.09 48 55.24 34.91 48 34.91Z"/></svg>`,
            // "add": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M96 54.86H54.86V96H41.15V54.86H0V41.15h41.14V0h13.71v41.14h41.14v13.71Z"/></svg>`,
            // "finalize": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="m72.63 26.14-5.82-5.82L40.63 46.5l5.82 5.82 26.18-26.18Zm17.51-5.83L46.45 64 29.19 46.78l-5.82 5.82 23.08 23.08L96 26.13l-5.86-5.82ZM0 52.6l23.08 23.08 5.82-5.82L5.86 46.78 0 52.6Z"/></svg>`,
            // "clear": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M96 9.67 86.33 0 48 38.33 9.67 0 0 9.67 38.33 48 0 86.33 9.67 96 48 57.67 86.33 96 96 86.33 57.67 48 96 9.67Z"/></svg>`,
            "cache": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="m47.95 83.26-37.1-28.84-8.16 6.34L48 96l45.31-35.24-8.21-6.39-37.15 28.9ZM48 70.48l37.05-28.85 8.26-6.39L48 0 2.69 35.24l8.21 6.39L48 70.48Z"/></svg>`,
            "refresh": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M81.89 14.1C73.19 5.4 61.24 0 47.97 0 21.43 0 0 21.48 0 48s21.43 48 47.97 48c22.39 0 41.07-15.3 46.41-36H81.89c-4.92 13.98-18.25 24-33.92 24-19.87 0-36.02-16.14-36.02-36S28.1 12 47.97 12c9.97 0 18.85 4.14 25.34 10.68L53.98 42h42.03V0L81.9 14.1Z"/></svg>`
      };

// Set defaults
if (!localStorage.pl_fontvariant) {
      localStorage.pl_fontvariant = 'serif';
}
if (!localStorage.pl_fontsize) {
      localStorage.pl_fontsize = '12';
}
if (!localStorage.pl_margin) {
      localStorage.pl_margin = 'normal';
}

// Changing variable in one place
const pl_var = {};
pl_var.pl_running = false;
pl_var.specialStyles = '';
// Define styles
const mainStyles = `
#onetrust-consent-sdk, .hide-for-small-only {
  display: none !important;
}

#pocketlibrary {
  --_rem: 20px;
  --_bg-main: #232323;
  --_bg-hover: #333333;
  --_accent-main: #e64141;
  --_progress-bar: 0deg;
  display: flex;
  position: fixed;
  left: 1rem;
  bottom: 1rem;
  z-index: 2147483648;
  gap: calc(0.5 * var(--_rem));
  font-size: calc(0.8 * var(--_rem));
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
#pocketlibrary, #pocketlibrary * {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
#pocketlibrary svg {
  overflow: visible;
}
#pocketlibrary .pl-settings button, #pocketlibrary .pl-refresh button {
  all: unset;
  cursor: pointer;
}
#pocketlibrary .pl-settings a, #pocketlibrary .pl-settings button, #pocketlibrary .pl-refresh a, #pocketlibrary .pl-refresh button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(2 * var(--_rem));
  width: calc(2 * var(--_rem));
  line-height: 1;
  color: inherit;
}
#pocketlibrary .pl-prepare {
  background-image: conic-gradient(var(--_accent-main) var(--_progress-bar), var(--_bg-main) var(--_progress-bar)) !important;
}
#pocketlibrary .pl-prepare button {
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(2 * var(--_rem));
  min-width: calc(2 * var(--_rem));
  width: -moz-fit-content;
  width: fit-content;
  gap: calc(0.5 * var(--_rem));
  line-height: 1;
  padding: 0 calc(0.6 * var(--_rem));
  cursor: pointer;
  color: inherit;
}
#pocketlibrary .pl-preview a {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(2 * var(--_rem));
  min-width: calc(2 * var(--_rem));
  width: -moz-fit-content;
  width: fit-content;
  gap: calc(0.5 * var(--_rem));
  line-height: 1;
  padding: 0 calc(0.6 * var(--_rem));
  color: inherit;
}
#pocketlibrary .pl-settings, #pocketlibrary .pl-prepare, #pocketlibrary .pl-preview, #pocketlibrary .pl-refresh {
  padding: calc(0.15 * var(--_rem));
  background: var(--_bg-main);
  border-radius: calc(2.3 * var(--_rem));
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}
#pocketlibrary .pl-settings svg, #pocketlibrary .pl-prepare svg, #pocketlibrary .pl-preview svg, #pocketlibrary .pl-refresh svg {
  height: calc(1 * var(--_rem));
  width: calc(1 * var(--_rem));
}
#pocketlibrary .pl-settings cloak, #pocketlibrary .pl-prepare cloak, #pocketlibrary .pl-preview cloak, #pocketlibrary .pl-refresh cloak {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: calc(0.5 * var(--_rem));
  color: #ffffff;
  background: var(--_bg-main);
  border-radius: calc(2 * var(--_rem));
}
#pocketlibrary .pl-settings:hover cloak, #pocketlibrary .pl-settings:focus cloak, #pocketlibrary .pl-prepare:hover cloak, #pocketlibrary .pl-prepare:focus cloak, #pocketlibrary .pl-preview:hover cloak, #pocketlibrary .pl-preview:focus cloak, #pocketlibrary .pl-refresh:hover cloak, #pocketlibrary .pl-refresh:focus cloak {
  color: var(--_accent-main);
  background: var(--_bg-hover);
}
#pocketlibrary .pl-settings:active a, #pocketlibrary .pl-settings:active button, #pocketlibrary .pl-prepare:active a, #pocketlibrary .pl-prepare:active button, #pocketlibrary .pl-preview:active a, #pocketlibrary .pl-preview:active button, #pocketlibrary .pl-refresh:active a, #pocketlibrary .pl-refresh:active button {
  transform: translateY(3px);
}
#pocketlibrary:has(.pl-preview a[href]) .pl-prepare {
  display: none;
}
#pocketlibrary:has(.pl-preview a:not([href])) .pl-preview, #pocketlibrary:has(.pl-preview a:not([href])) .pl-refresh {
  display: none;
}/*# sourceMappingURL=1-1-styles-main.part.css.map */
`;

// Define styles
const bookStyles = `
html {
  --source-sans: "Source Sans", sans-serif;
  --source-serif: "Source Serif", serif;
  --font-size: 12px;
  --line-height: 1.5;
  font-size: var(--font-size);
}
html.font-sans {
  font-family: var(--source-sans);
}
html.font-serif {
  font-family: var(--source-serif);
}

p {
  text-align: justify;
  line-height: var(--line-height);
}

a {
  color: inherit;
  text-decoration: none;
}

heading {
  display: flex;
  flex-direction: column;
  gap: calc(0.5 * var(--font-size));
  margin-bottom: calc(3 * var(--font-size));
}
heading htitle {
  font-size: calc(3 * var(--font-size));
  string-set: htitle content();
}
heading hauthor {
  font-size: calc(2 * var(--font-size));
}
heading htitle, heading hauthor {
  display: block;
  font-weight: 700;
}
heading p {
  display: block;
  margin-top: calc(0.5 * var(--font-size));
  font-size: calc(1 * var(--font-size));
}
heading svg {
  height: calc(1 * var(--font-size));
  margin-bottom: calc(-0.0833333333 * var(--font-size));
}

@page {
  size: A4;
  margin: 25.4mm;
  @top-center {
    content: string(htitle);
  }
  @bottom-center {
    content: "Page " counter(page) " of " counter(pages);
  }
}
@page :first {
  @top-center {
    content: none;
  }
}/*# sourceMappingURL=1-4-styles-book.part.css.map */
`;

// Add links to DOM head
function addlib() {
    if (window.location.search !== '?pl-book') {
        return;
    }

    let mainjs = document.createElement('script');

    mainjs.src = libpaged;
    mainjs.id = 'pagedjs';
    mainjs.setAttribute('type','text/javascript');

    document.head.appendChild(mainjs);
}

// Add styles to DOM head
function addstyles() {
    let maincss = document.createElement('style');

    maincss.textContent = mainStyles;
    maincss.id = 'plStyles';
    maincss.setAttribute('type','text/css');

    document.head.appendChild(maincss);
}

// Add fonts to DOM head
function addfonts() {
    let sSans = document.createElement('link'),
        sSerif = document.createElement('link');

    sSans.href = fontsans;
    sSerif.href = fontserif;
    sSans.id = 'fontSourceSans';
    sSerif.id = 'fontSourceSerif';
    sSans.setAttribute('rel','stylesheet');
    sSerif.setAttribute('rel','stylesheet');
    sSans.setAttribute('type','text/css');
    sSerif.setAttribute('type','text/css');

    document.head.appendChild(sSans);
    document.head.appendChild(sSerif);
}

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
                <button>
                    ${getIcon.cache}
                    <span>Prepare</span>
                </button>
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
                <button>
                    ${getIcon.refresh}
                </button>
            </cloak>
        </div>
    `.replace(/\n/g,'').replace(/>\s+</g,'><').replace(/^\s+/g,'').replace(/\s+$/g,'');

    document.body.appendChild(maindiv);
}

// Prepare PDF
function preparePDF() {
    if (getPagelist() === true) {
        pl_var.loop = 0;
        document.querySelector('#pocketlibrary').style.setProperty('--_progress-bar', '0deg');
        looper();
    }
}

// Progress Bar
function updateProgress(input) {
    let pl = document.querySelector('#pocketlibrary');

    pl.style.setProperty('--_progress-bar', parseFloat(input).toFixed(2) + 'deg');
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.pl-prepare:not(.active)')) {
        preparePDF();
        e.target.closest('.pl-prepare:not(.active)').classList.add('active');
    }
    if (e.target.closest('.pl-refresh')) {
        e.preventDefault();
        window.location.reload(true);
    }
});

// window.PagedPolyfill.preview();
// make another js for gui functions in book preview
// run this command every time any style is changed
// PDF Filename
function getFilename() {
    return `${pl_var.hostString} - ${pl_var.title} (${pl_var.author})`;
}

// Create an iframe for any url
function createFrame(link) {
    let iframe = document.createElement('iframe');
    iframe.src = link;
    iframe.classList = 'pl-iframe';
    iframe.setAttribute('style','height:100svh;width:100svw;position:fixed;left:-300svw;bottom:-300svh');

    document.body.appendChild(iframe);
}

// Delete an iframe
function deleteFrame(src) {
    try {
        document.querySelector(`iframe.pl-iframe[src="${src}"]`).remove();
    } catch {}
}

// Loop through link list
function looper() {
    if (!pl_var.loop) {
        pl_var.loop = 1;
        sessionStorage.pl_content = '';
    } else {
        pl_var.loop++;
    }

    if (pl_var.loop !== pl_var.linkArray.length) {
        createFrame(pl_var.linkArray[pl_var.loop - 1] + '?pl_looping');
    } else {
        pocketPDF();

        setTimeout(() => {
            updateProgress(0);
        }, 750);
    }

    updateProgress(pl_var.loop / pl_var.linkArray.length * 360);
}

// Arrange heading of the document
function setHeading() {
    return `
        <heading>
            <htitle>${pl_var.title}</htitle>
            <hauthor>${pl_var.author}</hauthor>
            <p>${getIcon.logo.replace(' fill="currentColor">','>')} From ${pl_var.hostString} via <a href="https://naeembolchhi.github.io/pocket-library/" target="_blank">Pocket Library</a></p>
        </heading>
    `;
}

// Put content together in a new tab
function pocketPDF() {
    const myHTML = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>${getFilename()}</title>

                <meta http-equiv="content-type" content="text/html; charset=utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                <meta name="HandheldFriendly" content="true">
                <meta name="description" content="A free and easy way to learn touch typing on Colemak and other keyboard layouts.">
                <meta name="author" content="Colemak Camp">

                <link rel="shortcut icon" href="data:image/svg+xml;base64,${btoa(getIcon.logo.replace('currentColor','#e64141'))}" type="image/x-icon">
                <link href="${normalcss}" id="modernNormalize" rel="stylesheet" type="text/css">
                <link href="${fontsans}" id="fontSans" rel="stylesheet" type="text/css">
                <link href="${fontserif}" id="fontSerif" rel="stylesheet" type="text/css">
                <script src="${libpaged}" type="text/javascript"></script>
                <style type="text/css">${bookStyles + pl_var.specialStyles}</style>
            </head>
            <body>${setHeading()}CONTENT_HERE</body>
        </html>
    `.replace(/\n/g,'').replace(/>\s+</g,'><').replace(/^\s+/g,'').replace(/\s+$/g,'').replace('CONTENT_HERE', sessionStorage.pl_content);

    const blob = new Blob([myHTML], { type: 'text/html' });

    const blobURL = URL.createObjectURL(blob);

    document.querySelector('#pocketlibrary .pl-preview a').href = blobURL;

    document.querySelector('.pl-prepare').classList.remove('active');

    window.open(blobURL, '_blank');
}

window.addEventListener('message', (e) => {
    if (typeof e.data !== 'string') return;
    if (!e.data.match(/pl\-iframe\-done\-/)) {return;}

    deleteFrame(e.data.replace(/pl\-iframe\-done\-/,''));
    looper();
});

document.addEventListener("DOMContentLoaded", (e) => {
    if (!window.location.href.match(/\?pl_looping/)) {return;}

    let content = document.querySelector('article.copy');

    if (content) {
        sessionStorage.pl_content += content.innerHTML;
    }

    window.parent.postMessage('pl-iframe-done-' + window.location.href);
});

/* CliffsNotes */
if (window.location.hostname.includes('cliffsnotes.com')) {
    // Set filename variables
    pl_var.titleString = '.title-wrapper h1';
    pl_var.title = document.querySelector(pl_var.titleString).textContent;
    pl_var.authorString = '.title-wrapper h2';
    pl_var.author = document.querySelector(pl_var.authorString).textContent;
    pl_var.hostString = 'CliffsNotes';

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

// Listen for loading of libraries
window.addEventListener('pl_ready_paged', (e) => {
    document.documentElement.classList.add('pl-book');
    console.log('PDFMake loaded at ', e.detail);
});

// Run when DOM is ready
if (document.readyState === "complete" || document.readyState === "interactive") {
    addlib();
    addfonts();
    addstyles();
    runAll();
} else {
    document.addEventListener('DOMContentLoaded', () => {
        addlib();
        addfonts();
        addstyles();
        runAll();
    });
}

// Main runner
function runAll() {
    if (pl_var.pl_running === true) {return;}

    addpanel();

    pl_var.pl_running = true;
}

