// ==UserScript==
// @name         Pocket Library
// @namespace    https://naeembolchhi.github.io/
// @version      0.1
// @description  Download articles, summaries, analyses, and notes from various English Literature websites as PDF.
// @author       NaeemBolchhi
// @license      GPL-3.0-or-later
// @icon         https://naeembolchhi.github.io/pocket-library/icon.svg
// @match        http*://www.cliffsnotes.com/*
// @run-at       document-start
// @grant        none
// @downloadURL  https://naeembolchhi.github.io/pocket-library/dist/pl.user.js
// @updateURL    https://naeembolchhi.github.io/pocket-library/dist/pl.meta.js
// ==/UserScript==

// Globally available constants
const libfonts = 'https://naeembolchhi.github.io/pocket-library/lib/vfs_fonts.min.js',
      libmain = 'https://naeembolchhi.github.io/pocket-library/lib/pdfmake.min.js',

      getIcon = {
            "logo": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 300 300" fill="currentColor"><path d="m284.11 232.24.02-.01-.1-.05.08.06zm-143.84 43.47-84.84-63.48-39.57 20L149.99 300l133.96-67.68-143.68 43.39z"/><path d="m284.14 232.29-.07-.08.05.09.02-.01zm-150.05-8.33-58.01-88.67-44.03 5.25L134.92 250.1l149.02-17.78-149.85-8.36z"/><path d="M146.01 173.14 121.83 70.01 78.64 59.89l59.19 138.14 146.31 34.3-138.13-59.19z"/><path d="m275.77 82.28 8.37 150.05-125.76-82.28L150.01 0l125.76 82.28z"/></svg>`,
            "download": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M8.47 96h79.06V84.71H8.47V96Zm79.06-62.12H64.94V0H31.06v33.88H8.47L48 73.41l39.53-39.53Z"/></svg>`,
            "textplus": `<svg class="pl-plus" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M82.63 43.54H96v8.92H82.63v13.37h-8.92V52.46H60.34v-8.92h13.37V30.17h8.92v13.37ZM15.69 62.5H39.7l5.29 15.22h10.28L32.92 18.28H22.34L0 77.72h10.28l5.41-15.22Zm9.39-26.27 2.32-6.9h.48l2.32 6.9 6.3 17.71H18.79l6.3-17.71Z"/></svg>`,
            "textminus": `<svg class="pl-minus" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M96 43.54v8.92H60.33v-8.92H96ZM15.69 62.5H39.7l5.29 15.22h10.28L32.92 18.28H22.34L0 77.72h10.28l5.41-15.22Zm9.39-26.27 2.32-6.9h.48l2.32 6.9 6.3 17.71H18.79l6.3-17.71Z"/></svg>`,
            "textsize": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M0 10.11v15.16h25.26v60.62h15.16V25.26h25.26V10.1H0Zm95.99 25.26H50.52v15.16h15.16V85.9h15.16V50.53H96V35.37h-.01Z"/></svg>`,
            "fontswap": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M3.2 83.2V96h89.6V83.2H3.2ZM32 56.32h32l5.76 14.08H83.2L52.8 0h-9.6L12.8 70.4h13.44L32 56.32Zm16-43.65L59.97 44.8H36.03L48 12.67Z"/></svg>`,
            "fontsans": `<svg class="pl-sans" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0V0Z" fill="none"/><path d="M39.1 95.26c-4.94 0-9.42-1.02-13.44-3.06s-7.2-4.94-9.54-8.71c-2.35-3.77-3.52-8.37-3.52-13.81 0-10.13 4.45-17.79 13.34-22.98 8.9-5.19 22.98-8.83 42.26-10.93-.12-3.71-.71-7.29-1.76-10.75s-2.94-6.24-5.65-8.34c-2.72-2.1-6.49-3.15-11.3-3.15-5.19 0-10.07.96-14.64 2.87-4.57 1.92-8.65 4.05-12.23 6.39l-5.93-10.38c2.72-1.85 5.93-3.67 9.64-5.47 3.71-1.79 7.72-3.27 12.05-4.45C42.7 1.32 47.28.73 52.09.73c7.29 0 13.25 1.51 17.88 4.54C74.6 8.3 78 12.59 80.16 18.15c2.16 5.56 3.24 12.11 3.24 19.64v55.23H70.8l-1.3-10.75h-.56a76.468 76.468 0 0 1-13.9 9.17c-4.94 2.53-10.26 3.8-15.94 3.8Zm4.27-12.6c4.45 0 8.62-.99 12.51-2.97 3.89-1.97 8-4.88 12.32-8.71V46.7c-10.13 1.24-18.13 2.81-24 4.73-5.87 1.92-10.1 4.29-12.7 7.13-2.59 2.84-3.89 6.24-3.89 10.19 0 4.94 1.54 8.5 4.63 10.66s6.79 3.24 11.12 3.24Z"/></svg>`,
            "fontserif": `<svg class="pl-serif" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0V0Z" fill="none"/><path d="M28.63 96c-7.04 0-13.07-2.04-18.07-6.12S3.05 79.81 3.05 71.9c0-4.57.96-8.59 2.87-12.05 1.91-3.46 5.06-6.55 9.45-9.27 4.38-2.72 10.35-5.12 17.88-7.23 3.58-1.11 7.13-2.13 10.66-3.06 3.52-.93 7.04-1.88 10.56-2.87 3.52-.99 7.01-1.98 10.47-2.97v7.6c-4.45 1.36-8.9 2.75-13.34 4.17-4.45 1.42-8.9 2.87-13.34 4.35-5.07 1.48-8.9 3.18-11.49 5.1-2.59 1.92-4.35 3.95-5.28 6.12-.93 2.16-1.39 4.48-1.39 6.95 0 4.57 1.42 8.13 4.26 10.66 2.84 2.53 6.61 3.8 11.3 3.8 3.09 0 5.87-.56 8.34-1.67 2.47-1.11 5.13-2.81 7.97-5.1 2.84-2.29 6.18-5.1 10.01-8.43l1.3 10.56h-6.49c-2.47 3.21-4.98 6.15-7.51 8.8a28.97 28.97 0 0 1-8.71 6.3c-3.28 1.54-7.26 2.32-11.95 2.32Zm48-.56c-5.31 0-9.61-1.73-12.88-5.19-3.28-3.46-5.04-8.59-5.28-15.38l-.37-.37V32.06c0-5.68-.68-10.19-2.04-13.53-1.36-3.34-3.49-5.68-6.39-7.04-2.9-1.36-6.58-2.04-11.03-2.04-3.09 0-6.06.25-8.9.74-2.84.5-5.81 1.42-8.9 2.78l7.41-7.41-2.96 16.68c-.62 3.71-1.79 6.43-3.52 8.15-1.73 1.73-4.02 2.59-6.86 2.59s-5.22-.77-6.77-2.32c-1.55-1.54-2.5-3.36-2.87-5.47 1.6-7.66 5.81-13.77 12.6-18.35C24.68 2.29 33.2 0 43.46 0c6.42 0 11.98 1.05 16.68 3.15 4.69 2.1 8.31 5.47 10.84 10.1 2.53 4.63 3.8 10.91 3.8 18.81V73.2c0 3.83.68 6.58 2.04 8.25 1.36 1.67 3.27 2.5 5.75 2.5 1.6 0 2.99-.28 4.17-.83 1.17-.56 2.25-1.2 3.24-1.95l2.97 6.49a21.251 21.251 0 0 1-6.77 5.65c-2.66 1.42-5.84 2.13-9.54 2.13Z"/></svg>`,
            "margin": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M0 0v96h96V0H0Zm42.67 85.33h-32v-32h32v32Zm0-42.66h-32v-32h32v32Zm42.66 42.66h-32v-32h32v32Zm0-42.66h-32v-32h32v32Z"/></svg>`
            // "preview": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M48 15.27C26.18 15.27 7.55 28.84 0 48c7.55 19.16 26.18 32.73 48 32.73S88.45 67.16 96 48c-7.55-19.16-26.18-32.73-48-32.73Zm0 54.55c-12.04 0-21.82-9.77-21.82-21.82S35.95 26.18 48 26.18 69.82 35.95 69.82 48 60.05 69.82 48 69.82Zm0-34.91c-7.24 0-13.09 5.85-13.09 13.09S40.76 61.09 48 61.09 61.09 55.24 61.09 48 55.24 34.91 48 34.91Z"/></svg>`,
            // "add": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M96 54.86H54.86V96H41.15V54.86H0V41.15h41.14V0h13.71v41.14h41.14v13.71Z"/></svg>`,
            // "finalize": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="m72.63 26.14-5.82-5.82L40.63 46.5l5.82 5.82 26.18-26.18Zm17.51-5.83L46.45 64 29.19 46.78l-5.82 5.82 23.08 23.08L96 26.13l-5.86-5.82ZM0 52.6l23.08 23.08 5.82-5.82L5.86 46.78 0 52.6Z"/></svg>`,
            // "clear": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M96 9.67 86.33 0 48 38.33 9.67 0 0 9.67 38.33 48 0 86.33 9.67 96 48 57.67 86.33 96 96 86.33 57.67 48 96 9.67Z"/></svg>`,
            // "cache": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="m47.95 83.26-37.1-28.84-8.16 6.34L48 96l45.31-35.24-8.21-6.39-37.15 28.9ZM48 70.48l37.05-28.85 8.26-6.39L48 0 2.69 35.24l8.21 6.39L48 70.48Z"/></svg>`
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

// Define styles
const mainStyles = `
html:not(.pl-pdfmake) #pocketlibrary, html:not(.pl-fonts) #pocketlibrary {
  display: none;
}

#pocketlibrary {
  --_rem: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: calc(1 * var(--_rem));
  bottom: calc(1 * var(--_rem));
  z-index: 9999;
  font-size: calc(0.7 * var(--_rem));
  line-height: 0;
  gap: calc(0.5 * var(--_rem));
  color: #ededed;
}
#pocketlibrary, #pocketlibrary * {
  box-sizing: border-box;
}
#pocketlibrary svg {
  overflow: visible;
}
#pocketlibrary > div:not(.pl-subsettings), #pocketlibrary div.pl-subsettings > div {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  line-height: 0;
  height: calc(2.2 * var(--_rem));
  width: calc(2.2 * var(--_rem));
  border-radius: calc(1.1 * var(--_rem));
  background: #161616;
  padding: calc(0.2 * var(--_rem));
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  cursor: pointer;
}
#pocketlibrary > div:not(.pl-subsettings) a, #pocketlibrary div.pl-subsettings > div a {
  height: 100%;
  width: 100%;
  color: inherit;
}
#pocketlibrary > div:not(.pl-subsettings) svg, #pocketlibrary div.pl-subsettings > div svg {
  height: 100%;
  aspect-ratio: 1/1;
  line-height: 0;
  padding: calc(0.4 * var(--_rem));
  border-radius: calc(1.1 * var(--_rem));
}
#pocketlibrary > div:not(.pl-subsettings) {
  border: calc(0.1 * var(--_rem)) solid rgba(255, 255, 255, 0.1333333333);
}
#pocketlibrary > div:not(.pl-subsettings) svg:hover, #pocketlibrary > div:not(.pl-subsettings) svg:focus {
  background: #3c3c3c;
}
#pocketlibrary > div:not(.pl-subsettings).pl-download {
  display: flex;
  align-items: center;
  justify-content: center;
  width: -moz-fit-content;
  width: fit-content;
  padding: calc(0.2 * var(--_rem));
}
#pocketlibrary > div:not(.pl-subsettings).pl-download > div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  gap: calc(0.5 * var(--_rem));
  padding: calc(0.4 * var(--_rem));
}
#pocketlibrary > div:not(.pl-subsettings).pl-download > div svg {
  height: 100%;
  aspect-ratio: 1/1;
  padding: 0;
}
#pocketlibrary > div:not(.pl-subsettings).pl-download > div svg:hover, #pocketlibrary > div:not(.pl-subsettings).pl-download > div svg:focus {
  background: unset;
}
#pocketlibrary > div:not(.pl-subsettings).pl-download > div:hover, #pocketlibrary > div:not(.pl-subsettings).pl-download > div:focus {
  background: #3c3c3c;
  border-radius: calc(1.1 * var(--_rem));
}
#pocketlibrary > div.pl-subsettings {
  position: absolute;
  left: 0;
  bottom: calc(2.7 * var(--_rem));
  z-index: 9999;
  display: flex;
  flex-direction: column-reverse;
  gap: calc(0.5 * var(--_rem));
}
#pocketlibrary > div.pl-subsettings > div {
  cursor: default;
  position: relative;
  gap: calc(0.5 * var(--_rem));
  border: calc(0.1 * var(--_rem)) solid rgba(255, 255, 255, 0.1333333333);
}
#pocketlibrary > div.pl-subsettings > div > div {
  border: calc(0.1 * var(--_rem)) solid rgba(255, 255, 255, 0.1333333333);
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  height: calc(2.2 * var(--_rem));
  width: -moz-fit-content;
  width: fit-content;
  border-radius: calc(1.1 * var(--_rem));
  background: #161616;
  color: #ededed;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  padding: calc(0.2 * var(--_rem));
}
#pocketlibrary > div.pl-subsettings > div > div:first-of-type {
  margin-left: calc(0.3 * var(--_rem));
}
#pocketlibrary > div.pl-subsettings > div > div > svg {
  padding: calc(0.4 * var(--_rem));
  cursor: pointer;
  border-radius: calc(1.1 * var(--_rem));
}
#pocketlibrary > div.pl-subsettings > div > div > svg:hover, #pocketlibrary > div.pl-subsettings > div > div > svg:focus {
  background: #3c3c3c;
}
#pocketlibrary > div.pl-subsettings > div.pl-textsize > div > span {
  width: 4ch;
  text-align: center;
  padding: 0 calc(0.2 * var(--_rem));
}
#pocketlibrary > div.pl-subsettings > div.pl-margin > div {
  padding: calc(0.2 * var(--_rem));
}
#pocketlibrary > div.pl-subsettings > div.pl-margin > div > span {
  width: -moz-fit-content;
  width: fit-content;
  padding: calc(0.4 * var(--_rem));
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: calc(1.1 * var(--_rem));
  cursor: pointer;
}
#pocketlibrary > div.pl-subsettings > div.pl-margin > div > span:hover, #pocketlibrary > div.pl-subsettings > div.pl-margin > div > span:focus {
  background: #3c3c3c;
}
#pocketlibrary > div.pl-subsettings > div.pl-textsize > div > span, #pocketlibrary > div.pl-subsettings > div.pl-margin > div > span {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
#pocketlibrary div.pl-fontswap.pl-serif .pl-sans, #pocketlibrary div.pl-fontswap.pl-sans .pl-serif {
  color: rgba(237, 237, 237, 0.4);
}
#pocketlibrary div.pl-margin.pl-normal .pl-narrow, #pocketlibrary div.pl-margin.pl-normal .pl-moderate, #pocketlibrary div.pl-margin.pl-narrow .pl-normal, #pocketlibrary div.pl-margin.pl-narrow .pl-moderate, #pocketlibrary div.pl-margin.pl-moderate .pl-normal, #pocketlibrary div.pl-margin.pl-moderate .pl-narrow {
  color: rgba(237, 237, 237, 0.4);
}/*# sourceMappingURL=1-1-styles-main.part.css.map */
`;

// Add links to DOM head
function addlib() {
    let mainjs = document.createElement('script'),
        fontsjs = document.createElement('script');
    
    mainjs.src = libmain;
    mainjs.id = 'pdfmake';
    mainjs.setAttribute('type','text/javascript');

    fontsjs.src = libfonts;
    fontsjs.id = 'vfs_fonts';
    mainjs.setAttribute('type','text/javascript');

    document.head.appendChild(mainjs);
    document.head.appendChild(fontsjs);
}

// Add styles to DOM head
function addstyles() {
    let maincss = document.createElement('style');

    maincss.textContent = mainStyles;
    maincss.id = 'mainStyles';
    maincss.setAttribute('type','text/css');

    document.head.appendChild(maincss);
}

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

// Switch between Serif and Sans-serif
function fontswap() {
    let fontswap = document.querySelector('#pocketlibrary .pl-fontswap');

    if (fontswap.classList.contains('pl-serif')) {
        fontswap.classList.remove('pl-serif');
        fontswap.classList.add('pl-sans');
        localStorage.pl_fontvariant = 'sans';
    } else {
        fontswap.classList.remove('pl-sans');
        fontswap.classList.add('pl-serif');
        localStorage.pl_fontvariant = 'serif';
    }
}

// Change font size
function fontsize(dir) {
    let textsize = document.querySelector('#pocketlibrary .pl-textsize > div > span'),
        newSize = '';

    if (dir === '+') {
        newSize = parseFloat(localStorage.pl_fontsize) + .5;
        if (newSize > 30) {
            newSize = 30;
        }
    } else if (dir === '-') {
        newSize = parseFloat(localStorage.pl_fontsize) - .5;
        if (newSize < 1) {
            newSize = 1;
        }
    }

    textsize.textContent = newSize;
    localStorage.pl_fontsize = newSize.toString();
}

// Change margin
function marginswap(which) {
    let margin = document.querySelector('#pocketlibrary .pl-margin');

    if (which.classList.contains('pl-normal')) {
        margin.classList.remove('pl-narrow','pl-moderate');
        margin.classList.add('pl-normal');
        localStorage.pl_margin = 'normal';
    } else if (which.classList.contains('pl-narrow')) {
        margin.classList.remove('pl-normal','pl-moderate');
        margin.classList.add('pl-narrow');
        localStorage.pl_margin = 'narrow';
    } else if (which.classList.contains('pl-moderate')) {
        margin.classList.remove('pl-normal','pl-narrow');
        margin.classList.add('pl-moderate');
        localStorage.pl_margin = 'moderate';
    }
}

// Event listener
document.addEventListener('click', (e) => {
    if (e.target.closest('.pl-fontswap.pl-serif > div > svg.pl-sans')) {
        fontswap();
    } else if (e.target.closest('.pl-fontswap.pl-sans > div > svg.pl-serif')) {
        fontswap();
    }

    if (e.target.closest('.pl-textsize .pl-minus')) {
        fontsize('-');
    } else if (e.target.closest('.pl-textsize .pl-plus')) {
        fontsize('+');
    }

    if (e.target.closest('.pl-margin > div > span')) {
        marginswap(e.target);
    }

    if (e.target.closest('.pl-download')) {
        prepareDownload();
    }
});

// Add fonts to pdfmake
function sourceFonts() {
    pdfMake.addFonts({
        sourceSans: {
            normal: 'sans400',
            bold: 'sans700',
            italics: 'sans400i',
            bolditalics: 'sans700i'
        },
        sourceSerif: {
            normal: 'serif400',
            bold: 'serif700',
            italics: 'serif400i',
            bolditalics: 'serif700i'
        }
    });
}

// PDFMake content variable
let docContent = [];

// Set margin
function getMargin() {
    if (localStorage.pl_margin.match(/normal/i)) {
        return 1*72;
    } else if (localStorage.pl_margin.match(/narrow/i)) {
        return .5*72;
    } else if (localStorage.pl_margin.match(/moderate/i)) {
        return [.75*72, 1*72];
    }
}

// Main document definition
function docDefinition() {
    let fs = parseFloat(localStorage.pl_fontsize),
        fn = `source${localStorage.pl_fontvariant.replace(/^s/,'S')}`;

    return {
        language: 'en-US',
        info: {
            title: pl_var.titleString,
            author: pl_var.authorString,
            subject: pl_var.hostString,
            creator: 'Pocket Library',
            producer: 'pdfmake'
        },
        pageSize: {
            width: 210/25.4*72,
            height: 297/25.4*72
        },
        pageMargins: getMargin(),
        pageOrientation: 'portrait',
        defaultStyle: {
              font: fn,
              fontSize: fs,
              alignment: 'justify',
              lineHeight: 1.25
        },
        content: docContent,
        styles: {
            h1: {
                fontSize: fs*(16/12),
                bold: true,
                alignment: 'left',
                margin: [0, fs*(12/12), 0, fs*(6/12)]
            },
            h2: {
                fontSize: fs*(14/12),
                bold: true,
                alignment: 'left',
                margin: [0, fs*(10/12), 0, fs*(5/12)]
            },
            h3: {
                bold: true,
                alignment: 'left',
                margin: [0, fs*(8/12), 0, fs*(4/12)]
            },
            list: {
                margin: [0, fs*(5/12), 0, fs*(5/12)]
            },
            italic: {
                italics: true
            },
            bold: {
                bold: true
            },
            underline: {
                decoration: 'underline'
            },
            left: {
                alignment: 'left'
            },
            center: {
                alignment: 'center'
            },
            right: {
                alignment: 'right'
            },
            newPage: {
                pageBreak: 'before'
            }
        }
    };
}

// Push text and styles
const addContent = {
    _getArray: function (texts) {
        return (Array.isArray(texts)) ? [...texts] : [texts];
    },
    basicReturn: function (textBlock, styles = '') {
        return {text: textBlock, style: styles};
    },
    basic: function (texts, styles = '', indent = false) {
        let textStack = this._getArray(texts);
        if (indent === true) {
            textStack.unshift('      ');
        }

        docContent.push({
            style: styles,
            preserveLeadingSpaces: indent,
            text: textStack
        });
    },
    bulletlistReturn: function (texts, styles = '', bullet = 'disc') {
        return {
            style: styles,
            type: bullet, /* 'disc', 'square', 'circle', 'none' */
            ol: this._getArray(texts)
        };
    },
    bulletlist: function (texts, styles = '', bullet = 'disc') {
        docContent.push(this.bulletlistReturn(texts, styles, bullet));
    },
    orderedlistReturn: function (texts, styles = '', order = 'decimal') {
        return {
            style: styles,
            type: order, /* 'decimal', 'lower-alpha', 'upper-alpha', 'lower-roman', 'upper-roman', 'none' */
            ol: this._getArray(texts)
        };
    },
    orderedlist: function (texts, styles = '', order = 'decimal') {
        docContent.push(this.orderedlistReturn(texts, styles, order));
    }
};

// Wrap naked text in span blocks
function wrapNakedTextInSpans(container) {
    const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode(node) {
                // Skip if already wrapped
                if (node.parentNode.tagName === 'SPAN') {
                    return NodeFilter.FILTER_REJECT;
                }

                // Skip pure line breaks like "\n" or "\r\n"
                if (/^[\r\n]+$/.test(node.nodeValue)) {
                    return NodeFilter.FILTER_REJECT;
                }

                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );

    const textNodes = [];
    let current;

    while (current = walker.nextNode()) {
        textNodes.push(current);
    }

    textNodes.forEach(textNode => {
        const span = document.createElement('span');
        span.textContent = textNode.nodeValue; // preserves spaces
        textNode.parentNode.replaceChild(span, textNode);
    });
}

// Parse HTML and make JSON that pdfmake understands (to pass as texts in addContent() function)
// Each newline block needs to be parsed separately
function spitTexts(htmlblock) {
    let texts = '',
        styles = [];

    // Spit h2
    if (htmlblock.tagName.includes('H2')) {
        texts += htmlblock.textContent;
        styles.push('h2');
    }

    // Spit span, a
    if (htmlblock.tagName.includes('SPAN') || htmlblock.tagName.includes('A') || htmlblock.tagName.includes('P')) {
        texts += htmlblock.textContent;
    }

    // Spit i, em
    if (htmlblock.tagName.includes('I') || htmlblock.tagName.includes('EM')) {
        texts += htmlblock.textContent;
        styles.push('italic');
    }

    // Spit b, strong
    if (htmlblock.tagName.includes('B') || htmlblock.tagName.includes('STRONG')) {
        texts += htmlblock.textContent;
        styles.push('bold');
    }

    // Spit u
    if (htmlblock.tagName.includes('U')) {
        texts += htmlblock.textContent;
        styles.push('underlined');
    }

    return {text: texts, style: styles};
    // console.log(JSON.stringify({text: texts}));
}

// Split up htmlblocks and send one at a time
function multiBlock(htmlblock) {
    let returnText = [];

    // Fix naked texts after flattening html
    if (!htmlblock.tagName.includes('SPAN') && !htmlblock.tagName.includes('A') && !htmlblock.tagName.includes('I') && !htmlblock.tagName.includes('EM') && !htmlblock.tagName.includes('B') && !htmlblock.tagName.includes('STRONG') && !htmlblock.tagName.includes('U')) {
        wrapNakedTextInSpans(htmlblock);
    }

    // If multi child
    if (htmlblock.children.length > 1) {
        for (let x = 0; x < htmlblock.children.length; x++) {
            returnText.push(spitTexts(htmlblock.children[x]));
        }
    } else {
        returnText.push(spitTexts(htmlblock));
    }

    return {text: returnText};
}

// PDF Filename
function getFilename() {
    let pl_title = document.querySelector(pl_var.titleString).textContent,
        pl_author = document.querySelector(pl_var.authorString).textContent;

    return `${pl_var.hostString} - ${pl_title} (${pl_author})`;
}

// Page list
function getPagelist() {

}
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

// Listen for loading of libraries
window.addEventListener('pl_ready_pdfmake', (e) => {
    runAll();
    console.log('PDFMake loaded at ', e.detail);
});
window.addEventListener('pl_ready_fonts', (e) => {
    runAll();
    console.log('VFS Fonts loaded at', e.detail);
});

// Run when DOM is ready
if (document.readyState === "complete" || document.readyState === "interactive") {
    addlib();
    addstyles();
    runAll();
} else {
    document.addEventListener('DOMContentLoaded', () => {
        addlib();
        addstyles();
    });
}

// Main runner
function runAll() {
    if (pl_var.pl_running === true ||
        !document.documentElement.classList.contains('pl-pdfmake') ||
        !document.documentElement.classList.contains('pl-fonts')) {return;}

    sourceFonts();
    addpanel();

    pl_var.pl_running = true;
}

