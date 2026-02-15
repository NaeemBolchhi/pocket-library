// ==UserScript==
// @name         Pocket Library
// @namespace    https://naeembolchhi.github.io/
// @version      0.20260115231906
// @description  Download articles, summaries, analyses, and notes from various English Literature websites as PDF.
// @author       NaeemBolchhi
// @license      GPL-3.0-or-later
// @icon         https://naeembolchhi.github.io/pocket-library/icon.svg
// @match        https://www.cliffsnotes.com/*
// @match        https://www.litcharts.com/lit/*
// @run-at       document-body
// @grant        none
// @homepageURL  https://naeembolchhi.github.io/pocket-library/
// @supportURL   https://github.com/NaeemBolchhi/pocket-library/issues
// @downloadURL  https://naeembolchhi.github.io/pocket-library/dist/pl.user.js
// @updateURL    https://naeembolchhi.github.io/pocket-library/dist/pl.meta.js
// ==/UserScript==

// Globally available constants
const libpaged = 'https://naeembolchhi.github.io/pocket-library/lib/paged.js',
      normalcss = 'https://naeembolchhi.github.io/pocket-library/lib/modern-normalize.min.css',
      fontsans = 'https://naeembolchhi.github.io/pocket-library/fonts/sourcesans.min.css',
      fontserif = 'https://naeembolchhi.github.io/pocket-library/fonts/sourceserif.min.css',
      fontlato = 'https://naeembolchhi.github.io/pocket-library/fonts/lato.min.css',

      getIcon = {
          "logo": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 300 300" fill="currentColor"><path d="m284.11 232.24.02-.01-.1-.05.08.06zm-143.84 43.47-84.84-63.48-39.57 20L149.99 300l133.96-67.68-143.68 43.39z"/><path d="m284.14 232.29-.07-.08.05.09.02-.01zm-150.05-8.33-58.01-88.67-44.03 5.25L134.92 250.1l149.02-17.78-149.85-8.36z"/><path d="M146.01 173.14 121.83 70.01 78.64 59.89l59.19 138.14 146.31 34.3-138.13-59.19z"/><path d="m275.77 82.28 8.37 150.05-125.76-82.28L150.01 0l125.76 82.28z"/></svg>`,
          "plus": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M78 52.29H52.29V78h-8.57V52.29H18v-8.57h25.71V18h8.57v25.71h25.71v8.57Z"/></svg>`,
          "minus": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M78 52.29H18v-8.57h60v8.57Z"/></svg>`,
          "fontsize": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M0 10.11v15.16h25.26v60.62h15.16V25.26h25.26V10.1H0Zm95.99 25.26H50.52v15.16h15.16V85.9h15.16V50.53H96V35.37h-.01Z"/></svg>`,
          "fontface": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M96 26.18V0H69.82v8.73H26.18V0H0v26.18h8.73v43.64H0V96h26.18v-8.73h43.64V96H96V69.82h-8.73V26.18H96ZM8.73 8.73h8.73v8.73H8.73V8.73Zm8.72 78.54H8.72v-8.73h8.73v8.73Zm52.37-8.72H26.18v-8.73h-8.73V26.18h8.73v-8.73h43.64v8.73h8.73v43.64h-8.73v8.73Zm17.45 8.72h-8.73v-8.73h8.73v8.73Zm-8.72-69.82V8.72h8.73v8.73h-8.73Zm-23 39.28H40.32l-3.19 8.73h-7.07L44.9 26.19h6.11l14.88 39.27h-7.11l-3.23-8.73Zm-13.27-5.5h11.39L48 34.52l-5.72 16.71Z"/></svg>`,
          "fontsans": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M39.1 95.26c-4.94 0-9.42-1.02-13.44-3.06s-7.2-4.94-9.54-8.71c-2.35-3.77-3.52-8.37-3.52-13.81 0-10.13 4.45-17.79 13.34-22.98 8.9-5.19 22.98-8.83 42.26-10.93-.12-3.71-.71-7.29-1.76-10.75s-2.94-6.24-5.65-8.34c-2.72-2.1-6.49-3.15-11.3-3.15-5.19 0-10.07.96-14.64 2.87-4.57 1.92-8.65 4.05-12.23 6.39l-5.93-10.38c2.72-1.85 5.93-3.67 9.64-5.47 3.71-1.79 7.72-3.27 12.05-4.45C42.7 1.32 47.28.73 52.09.73c7.29 0 13.25 1.51 17.88 4.54C74.6 8.3 78 12.59 80.16 18.15c2.16 5.56 3.24 12.11 3.24 19.64v55.23H70.8l-1.3-10.75h-.56a76.468 76.468 0 0 1-13.9 9.17c-4.94 2.53-10.26 3.8-15.94 3.8Zm4.27-12.6c4.45 0 8.62-.99 12.51-2.97 3.89-1.97 8-4.88 12.32-8.71V46.7c-10.13 1.24-18.13 2.81-24 4.73-5.87 1.92-10.1 4.29-12.7 7.13-2.59 2.84-3.89 6.24-3.89 10.19 0 4.94 1.54 8.5 4.63 10.66s6.79 3.24 11.12 3.24Z"/></svg>`,
          "fontserif": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M89.98 81.17c-.99.75-2.07 1.39-3.24 1.95-1.18.55-2.57.83-4.17.83-2.48 0-4.39-.83-5.75-2.5s-2.04-4.42-2.04-8.25V32.06c0-7.9-1.27-14.18-3.8-18.81-2.53-4.63-6.15-8-10.84-10.1C55.44 1.05 49.88 0 43.46 0 33.2 0 24.68 2.29 17.87 6.84c-6.79 4.58-11 10.69-12.6 18.35.37 2.11 1.32 3.93 2.87 5.47 1.55 1.55 3.93 2.32 6.77 2.32s5.13-.86 6.86-2.59c1.73-1.72 2.9-4.44 3.52-8.15l2.05-11.53c.81-.21 1.61-.38 2.4-.52 2.84-.49 5.81-.74 8.9-.74 4.45 0 8.13.68 11.03 2.04 2.9 1.36 5.03 3.7 6.39 7.04 1.36 3.34 2.04 7.85 2.04 13.53v4.33c-1.2.35-2.42.69-3.63 1.03-3.52.99-7.04 1.94-10.56 2.87-3.53.93-7.08 1.95-10.66 3.06-7.53 2.11-13.5 4.51-17.88 7.23-4.39 2.72-7.54 5.81-9.45 9.27-1.91 3.46-2.87 7.48-2.87 12.05 0 7.91 2.51 13.9 7.51 17.98S21.59 96 28.63 96v-.02c4.68 0 8.66-.78 11.94-2.32 3.27-1.54 6.23-3.67 8.71-6.3 2.53-2.65 5.04-5.59 7.51-8.8h1.99c.65 4.99 2.31 8.89 4.97 11.69 3.27 3.46 7.57 5.19 12.88 5.19h.01c3.7 0 6.88-.71 9.54-2.13 2.63-1.39 4.93-3.31 6.77-5.65l-2.97-6.49Zm-38.01-4.74c-2.84 2.29-5.5 3.99-7.97 5.1s-5.25 1.67-8.34 1.67c-4.69 0-8.46-1.27-11.3-3.8s-4.26-6.09-4.26-10.66c0-2.47.46-4.79 1.39-6.95.93-2.17 2.69-4.2 5.28-6.12 2.59-1.92 6.42-3.62 11.49-5.1 4.44-1.48 8.89-2.93 13.34-4.35 2.16-.69 4.33-1.38 6.5-2.06v27.18c-2.25 1.92-4.3 3.61-6.13 5.09Z"/></svg>`,
          "margin": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M0 0v96h96V0H0Zm85.33 85.33H10.67V10.67h74.67v74.67Zm-42.66-64h10.67V32H42.67V21.33Zm-21.34 0H32V32H21.33V21.33Zm42.67 0h10.67V32H64V21.33ZM21.33 42.67H32v10.67H21.33V42.67Zm21.34 0h10.67v10.67H42.67V42.67Zm21.33 0h10.67v10.67H64V42.67Z"/></svg>`,
          "preview": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M48 15.27C26.18 15.27 7.55 28.84 0 48c7.55 19.16 26.18 32.73 48 32.73S88.45 67.16 96 48c-7.55-19.16-26.18-32.73-48-32.73Zm0 54.55c-12.04 0-21.82-9.77-21.82-21.82S35.95 26.18 48 26.18 69.82 35.95 69.82 48 60.05 69.82 48 69.82Zm0-34.91c-7.24 0-13.09 5.85-13.09 13.09S40.76 61.09 48 61.09 61.09 55.24 61.09 48 55.24 34.91 48 34.91Z"/></svg>`,
          "cache": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="m47.95 83.26-37.1-28.84-8.16 6.34L48 96l45.31-35.24-8.21-6.39-37.15 28.9ZM48 70.48l37.05-28.85 8.26-6.39L48 0 2.69 35.24l8.21 6.39L48 70.48Z"/></svg>`,
          "print": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M81.6 28.8H14.4C6.43 28.8 0 35.23 0 43.2V72h19.2v19.2h57.6V72H96V43.2c0-7.97-6.43-14.4-14.4-14.4ZM67.2 81.6H28.8v-24h38.4v24ZM81.6 48c-2.64 0-4.8-2.16-4.8-4.8s2.16-4.8 4.8-4.8 4.8 2.16 4.8 4.8-2.16 4.8-4.8 4.8ZM76.8 4.8H19.2V24h57.6V4.8Z"/></svg>`,
          "refresh": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M81.89 14.1C73.19 5.4 61.24 0 47.97 0 21.43 0 0 21.48 0 48s21.43 48 47.97 48c22.39 0 41.07-15.3 46.41-36H81.89c-4.92 13.98-18.25 24-33.92 24-19.87 0-36.02-16.14-36.02-36S28.1 12 47.97 12c9.97 0 18.85 4.14 25.34 10.68L53.98 42h42.03V0L81.9 14.1Z"/></svg>`,
          "linespacing": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M21.07 24.47h11.71L16.39 8 0 24.47h11.71v47.06H0L16.39 88l16.39-16.47H21.07V24.47Zm18.73-9.41v9.41H96v-9.41H39.8Zm0 65.88H96v-9.41H39.8v9.41Zm0-28.23H96V43.3H39.8v9.41Z"/></svg>`,
          "pagesize": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M78.55 48h-8.73v13.09H56.73v8.73h21.82V48ZM26.18 34.91h13.09v-8.73H17.45V48h8.73V34.91ZM87.27 8.73H8.73C3.93 8.73 0 12.65 0 17.45v61.09c0 4.8 3.93 8.73 8.73 8.73h78.55c4.8 0 8.73-3.93 8.73-8.73V17.45c0-4.8-3.93-8.73-8.73-8.73Zm0 69.86H8.73V17.41h78.55v61.18Z"/></svg>`,
          "arrow": `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 96 96" fill="currentColor"><path d="M0 0h96v96H0z" fill="none"/><path d="M66.36 34.36 48 52.68 29.64 34.36 24 40l24 24 24-24-5.64-5.64Z"/></svg>`
      };

// Set defaults
function setLocal(key, val) {
    let pl_lvar;

    try {
        pl_lvar = JSON.parse(localStorage.pl_lvar);
    } catch {
        pl_lvar = JSON.parse('{}');
    }

    pl_lvar[key] = val;
    localStorage.pl_lvar = JSON.stringify(pl_lvar);
}

function getLocal(key) {
    let pl_lvar;

    try {
        pl_lvar = JSON.parse(localStorage.pl_lvar);
    } catch {
        pl_lvar = JSON.parse('{}');
    }

    return pl_lvar[key];
}

if (getLocal('pagesize') === undefined) {
    setLocal('pagesize', 'a4');
}
if (getLocal('margin') === undefined) {
    setLocal('margin', 'normal');
}
if (getLocal('fontface') === undefined) {
    setLocal('fontface', 'sans');
}
if (getLocal('fontsize') === undefined) {
    setLocal('fontsize', 12);
}
if (getLocal('linespacing') === undefined) {
    setLocal('linespacing', 1.5);
}
if (getLocal('bookmenustate') === undefined) {
    setLocal('bookmenustate', '');
}

// Changing variable in one place
const pl_var = {};
pl_var.pl_running = false;
pl_var.specialStyles = '';

// Query Selector Shortcut
const $ = (s, o = document) => o.querySelector(s);
const $$ = (s, o = document) => o.querySelectorAll(s);

// Define styles
const mainStyles = `
#onetrust-consent-sdk, .hide-for-small-only,
.stretch-left-promo, .download-links-banner {
  display: none !important;
}

#pocketlibrary {
  --_rem: 20px;
  --_bg-main: #000000;
  --_bg-hover: #232323;
  --_accent-main: #e43434;
  --_text-color: #ffffff;
  --_text-color-inactive: #ffffff66;
  --_progress-bar: 0deg;
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 0 calc(1 * var(--_rem)) calc(1 * var(--_rem)) calc(1 * var(--_rem));
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
  font-family: "Lato", sans-serif;
  -webkit-tap-highlight-color: transparent;
  transition-duration: 0.05s;
}
#pocketlibrary a {
  all: unset;
}
#pocketlibrary span {
  padding: 0 calc(0.4 * var(--_rem));
  position: relative;
  top: -1px;
}
#pocketlibrary span:has(+ svg) {
  padding-right: 0;
}
#pocketlibrary svg {
  overflow: visible;
  margin: calc(0.4 * var(--_rem));
}
#pocketlibrary svg + span {
  padding-left: 0;
}
#pocketlibrary svg path {
  opacity: 1 !important;
}
#pocketlibrary .pl-settings a, #pocketlibrary .pl-refresh a {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(1.8 * var(--_rem));
  width: calc(1.8 * var(--_rem));
  line-height: 1;
}
#pocketlibrary .pl-prepare {
  background-image: conic-gradient(var(--_accent-main) var(--_progress-bar), var(--_bg-main) var(--_progress-bar)) !important;
}
#pocketlibrary .pl-prepare a {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(1.8 * var(--_rem));
  min-width: calc(1.8 * var(--_rem));
  width: -moz-fit-content;
  width: fit-content;
  line-height: 1;
}
#pocketlibrary .pl-preview a, #pocketlibrary .pl-print a {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(1.8 * var(--_rem));
  min-width: calc(1.8 * var(--_rem));
  width: -moz-fit-content;
  width: fit-content;
  line-height: 1;
}
#pocketlibrary .pl-settings, #pocketlibrary .pl-prepare, #pocketlibrary .pl-preview, #pocketlibrary .pl-refresh, #pocketlibrary .pl-print, #pocketlibrary .pl-left, #pocketlibrary .pl-right {
  padding: calc(0.2 * var(--_rem));
  background: var(--_bg-main);
  border-radius: calc(2.2 * var(--_rem));
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}
#pocketlibrary .pl-settings, #pocketlibrary .pl-settings a, #pocketlibrary .pl-prepare, #pocketlibrary .pl-prepare a, #pocketlibrary .pl-preview, #pocketlibrary .pl-preview a, #pocketlibrary .pl-refresh, #pocketlibrary .pl-refresh a, #pocketlibrary .pl-print, #pocketlibrary .pl-print a, #pocketlibrary .pl-left, #pocketlibrary .pl-left a, #pocketlibrary .pl-right, #pocketlibrary .pl-right a {
  cursor: pointer;
  color: inherit;
}
#pocketlibrary .pl-settings svg, #pocketlibrary .pl-prepare svg, #pocketlibrary .pl-preview svg, #pocketlibrary .pl-refresh svg, #pocketlibrary .pl-print svg, #pocketlibrary .pl-left svg, #pocketlibrary .pl-right svg {
  height: calc(1 * var(--_rem));
  width: calc(1 * var(--_rem));
}
#pocketlibrary .pl-settings cloak, #pocketlibrary .pl-prepare cloak, #pocketlibrary .pl-preview cloak, #pocketlibrary .pl-refresh cloak, #pocketlibrary .pl-print cloak, #pocketlibrary .pl-left cloak, #pocketlibrary .pl-right cloak {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--_text-color);
  background: var(--_bg-main);
  border-radius: calc(1.8 * var(--_rem));
}
#pocketlibrary .pl-settings:hover cloak, #pocketlibrary .pl-settings:focus cloak, #pocketlibrary .pl-prepare:hover cloak, #pocketlibrary .pl-prepare:focus cloak, #pocketlibrary .pl-preview:hover cloak, #pocketlibrary .pl-preview:focus cloak, #pocketlibrary .pl-refresh:hover cloak, #pocketlibrary .pl-refresh:focus cloak, #pocketlibrary .pl-print:hover cloak, #pocketlibrary .pl-print:focus cloak, #pocketlibrary .pl-left:hover cloak, #pocketlibrary .pl-left:focus cloak {
  color: var(--_accent-main);
  background: var(--_bg-hover);
}
#pocketlibrary .pl-settings:active a, #pocketlibrary .pl-prepare:active a, #pocketlibrary .pl-preview:active a, #pocketlibrary .pl-refresh:active a, #pocketlibrary .pl-print:active a, #pocketlibrary .pl-left:active a {
  transform: translateY(2px);
}
#pocketlibrary .pl-right cloak:has(a):hover, #pocketlibrary .pl-right cloak:has(a):focus {
  color: var(--_accent-main);
  background: var(--_bg-hover);
}
#pocketlibrary .pl-right cloak:has(a):active a {
  transform: translateY(2px);
}
#pocketlibrary:has(.pl-preview a[href]) .pl-prepare {
  display: none;
}
#pocketlibrary:has(.pl-preview a:not([href])) .pl-preview, #pocketlibrary:has(.pl-preview a:not([href])) .pl-refresh {
  display: none;
}
#pocketlibrary .pl-book {
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 0;
  bottom: 0;
  padding: 0 calc(1 * var(--_rem)) calc(0.5 * var(--_rem)) calc(1 * var(--_rem));
  margin-bottom: calc(3.2 * var(--_rem));
  gap: calc(0.5 * var(--_rem));
  overflow: hidden;
  /* Mark selected */
  /* Hide and Reveal Toggles */
  --_one-row: calc((2.7) * var(--_rem));
  --_full-row: calc(var(--_one-row) * 6);
}
#pocketlibrary .pl-book .pl-left a, #pocketlibrary .pl-book .pl-right a {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(1.8 * var(--_rem));
  line-height: 1;
}
#pocketlibrary .pl-book .pl-left a {
  width: calc(1.8 * var(--_rem));
}
#pocketlibrary .pl-book .pl-right a {
  min-width: calc(1.8 * var(--_rem));
  width: -moz-fit-content;
  width: fit-content;
}
#pocketlibrary .pl-book .pl-right a:has(svg):has(:not(span)) {
  width: calc(1.8 * var(--_rem));
}
#pocketlibrary .pl-book > div {
  display: flex;
  gap: calc(0.5 * var(--_rem));
}
#pocketlibrary .pl-book .pl-right {
  display: flex;
}
#pocketlibrary .pl-book .pl-right cloak {
  gap: 0;
}
#pocketlibrary .pl-book__fontface .pl-right svg {
  padding: calc(0.1 * var(--_rem));
}
#pocketlibrary .pl-book__fontface .pl-right .pl-serif svg {
  position: relative;
  right: -1px;
}
#pocketlibrary .pl-book__linespacing .pl-right cloak:not(:has(a)), #pocketlibrary .pl-book__fontsize .pl-right cloak:not(:has(a)) {
  cursor: default;
  width: -moz-fit-content;
  width: fit-content;
  min-width: 5ch;
}
#pocketlibrary .pl-book__pagesize .pl-right cloak, #pocketlibrary .pl-book__margin .pl-right cloak, #pocketlibrary .pl-book__fontface .pl-right cloak {
  color: var(--_text-color-inactive);
}
#pocketlibrary .pl-book__pagesize[data-selected=legal] .pl-legal {
  color: var(--_text-color);
  background: var(--_accent-main);
}
#pocketlibrary .pl-book__pagesize[data-selected=legal] .pl-legal a:active {
  transform: none;
}
#pocketlibrary .pl-book__pagesize[data-selected=letter] .pl-letter {
  color: var(--_text-color);
  background: var(--_accent-main);
}
#pocketlibrary .pl-book__pagesize[data-selected=letter] .pl-letter a:active {
  transform: none;
}
#pocketlibrary .pl-book__pagesize[data-selected=a4] .pl-a4 {
  color: var(--_text-color);
  background: var(--_accent-main);
}
#pocketlibrary .pl-book__pagesize[data-selected=a4] .pl-a4 a:active {
  transform: none;
}
#pocketlibrary .pl-book__margin[data-selected=normal] .pl-normal {
  color: var(--_text-color);
  background: var(--_accent-main);
}
#pocketlibrary .pl-book__margin[data-selected=normal] .pl-normal a:active {
  transform: none;
}
#pocketlibrary .pl-book__margin[data-selected=narrow] .pl-narrow {
  color: var(--_text-color);
  background: var(--_accent-main);
}
#pocketlibrary .pl-book__margin[data-selected=narrow] .pl-narrow a:active {
  transform: none;
}
#pocketlibrary .pl-book__margin[data-selected=moderate] .pl-moderate {
  color: var(--_text-color);
  background: var(--_accent-main);
}
#pocketlibrary .pl-book__margin[data-selected=moderate] .pl-moderate a:active {
  transform: none;
}
#pocketlibrary .pl-book__fontface[data-selected=sans] .pl-sans {
  color: var(--_text-color);
  background: var(--_accent-main);
}
#pocketlibrary .pl-book__fontface[data-selected=sans] .pl-sans a:active {
  transform: none;
}
#pocketlibrary .pl-book__fontface[data-selected=serif] .pl-serif {
  color: var(--_text-color);
  background: var(--_accent-main);
}
#pocketlibrary .pl-book__fontface[data-selected=serif] .pl-serif a:active {
  transform: none;
}
#pocketlibrary .pl-book {
  transition: height 0.3s ease;
  height: var(--_full-row);
}
#pocketlibrary .pl-book .pl-book__toggle svg {
  transition: transform 0.2s linear;
  transform: rotateX(0deg);
}
#pocketlibrary .pl-book.closed {
  height: var(--_one-row);
}
#pocketlibrary .pl-book.closed .pl-book__toggle svg {
  transform: rotateX(180deg);
}
#pocketlibrary .pl-book.mask {
  -webkit-mask-image: linear-gradient(to bottom, black 92%, rgba(0, 0, 0, 0) 98%);
          mask-image: linear-gradient(to bottom, black 92%, rgba(0, 0, 0, 0) 98%);
}
#pocketlibrary .pl-book.plain {
  transition: none;
}
#pocketlibrary .pl-book.plain .pl-book__toggle svg {
  transition: none;
}

@media print {
  #pocketlibrary {
    display: none !important;
  }
}
html#pagedPreview {
  --_bg-preview: #1c1c1c;
  --_bg-page: #ffffff;
}
html#pagedPreview body {
  background: var(--_bg-preview);
}
html#pagedPreview #pl-container {
  margin: 0 auto;
}
html#pagedPreview #pl-container, html#pagedPreview #pl-container > .pagedjs_pages {
  width: -moz-fit-content;
  width: fit-content;
}
html#pagedPreview #pl-container > .pagedjs_pages {
  display: flex;
  flex-direction: column;
  gap: 11px;
}
html#pagedPreview #pl-container > .pagedjs_pages > div {
  background: var(--_bg-page);
}/*# sourceMappingURL=1-1-styles-main.part.css.map */
`;

// Define styles
const bookStyles = `
html {
  --font-size: 12px;
  --line-spacing: 1.5;
  font-size: var(--font-size);
}
html[data-font=sans] {
  font-family: "Source Sans", sans-serif;
}
html[data-font=serif] {
  font-family: "Source Serif", serif;
}

p {
  text-align: justify;
  line-height: var(--line-spacing);
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
/*function addlib() {
    if (window.location.search !== '?pl-book') {
        return;
    }

    let mainjs = document.createElement('script');

    mainjs.src = libpaged;
    mainjs.id = 'pagedjs';
    mainjs.setAttribute('type','text/javascript');

    document.head.appendChild(mainjs);
}*/

// Add styles to DOM head
function addstyles() {
    let maincss = document.createElement('style');

    maincss.textContent = mainStyles;
    maincss.id = 'plStyles';
    maincss.setAttribute('type','text/css');

    document.head.appendChild(maincss);
}

// Add fonts to DOM head
function addfont() {
    let lato = document.createElement('link');

    lato.href = fontlato;
    lato.id = 'fontLato';
    lato.setAttribute('rel','stylesheet');
    lato.setAttribute('type','text/css');
    
    document.head.appendChild(lato);
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

// Prepare PDF
function preparePDF() {
    if (getPagelist() === true) {
        looper();
    }
}

// Progress Bar
function updateProgress(input) {
    let pl = $('#pocketlibrary');

    pl.style.setProperty('--_progress-bar', parseFloat(input).toFixed(2) + 'deg');
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.pl-prepare')) {
        preparePDF();
    } else if (e.target.closest('.pl-refresh')) {
        window.location.reload(true);
    }
});

// Book GUI js
const bookGUI = `
// Set local data
${setLocal.toString()}

// Get local data
${getLocal.toString()}
// Dynamic CSS
function addStyle() {
    const pl_var = {};
    // page: height width;
    pl_var.pagesize_legal = '8.5in 14in';
    pl_var.pagesize_letter = '8.5in 11in';
    pl_var.pagesize_a4 = '210mm 297mm';
    // margin: top right bottom left;
    pl_var.margin_normal = '1in';
    pl_var.margin_narrow = '0.5in';
    pl_var.margin_moderate = '1in 0.75in';

    const pagedstyles = '@page {' +
                        'size: ' + pl_var['pagesize_' + getLocal('pagesize')] + ';' +
                        'margin: ' + pl_var['margin_' + getLocal('margin')] + ';' +
                        '}';

    let ns = document.createElement('style');
    ns.setAttribute('type','text/css');
    ns.textContent = pagedstyles;
    document.head.appendChild(ns);
}

// Elemake
function elemake(tag, innr, attr) {
    let element = document.createElement(tag);
    if (innr) {element.innerHTML = innr;}
    if (!attr) {return element;}

    for (let x = 0; x < attr.key.length; x++) {
        element.setAttribute(attr.key[x], attr.val[x]);
    }
    return element;
}

// Refresh Paged
function refreshPaged() {
    let plContainer = document.getElementById('pl-container');
    plContainer.style.display = 'none';
    plContainer.textContent = '';

    let oldstuff = document.head.querySelectorAll('style:not([data-pagedjs-ignore])');

    for (let x = 0; x < oldstuff.length; x++) {
        oldstuff[x].remove();
    }

    const normalizeX = elemake('link', '', {'key':['href','rel','type'],'val':[normalize,'stylesheet','text/css']}),
          fontsansX = elemake('link', '', {'key':['href','rel','type'],'val':[fontsans,'stylesheet','text/css']}),
          fontserifX = elemake('link', '', {'key':['href','rel','type'],'val':[fontserif,'stylesheet','text/css']}),
          bookstylesX = elemake('style', bookstyles, {'key':['type'],'val':['text/css']});

    document.head.appendChild(normalizeX);
    document.head.appendChild(fontsansX);
    document.head.appendChild(fontserifX);
    document.head.appendChild(bookstylesX);
    addStyle();
    previewPaged();

    plContainer.removeAttribute('style');
}

// Page preview
function previewPaged() {
    const contentSource = document.getElementById("pl-content");
    const contentPreview = document.getElementById("pl-container");
    const paged = new Paged.Previewer();

    paged.preview(contentSource.innerHTML, null, contentPreview).then((flow) => {
        // document.body.removeAttribute('style');
        console.log('Paged.js preview is ready.');
    });
}

// Change page size
function updatePageSize(key) {
    let container = document.querySelector('.pl-book__pagesize');
    //getLocal('pagesize');

    container.setAttribute('data-selected', key);
    setLocal('pagesize', key);
}

// Change margin
function updateMargin(key) {
    let container = document.querySelector('.pl-book__margin');
    //getLocal('margin');

    container.setAttribute('data-selected', key);
    setLocal('margin', key);
}

// Change fontface
function updateFontface(key) {
    let container = document.querySelector('.pl-book__fontface');
    //getLocal('fontface');

    container.setAttribute('data-selected', key);
    setLocal('fontface', key);
    document.documentElement.setAttribute('data-font', key);
}

// Change fontsize
function updateFontsize(key) {
    let container = document.querySelector('.pl-book__fontsize .pl-right .pl-value'),
        newVal = parseFloat(getLocal('fontsize'));
    //getLocal('fontsize');

    if (!Number.isNaN(Number(key))) {
        newVal = parseFloat(key);
    } else {
        if (key.match(/minus/i)) {
            newVal = newVal - 0.5;
        } else if (key.match(/plus/i)) {
            newVal = newVal + 0.5;
        }
    }

    newVal = parseFloat(parseFloat(newVal).toFixed(2));
    container.textContent = newVal.toString();
    setLocal('fontsize', newVal);
    document.documentElement.style.setProperty('--font-size', newVal.toString() + 'px');
}

// Change linespacing
function updateLinespacing(key) {
    let container = document.querySelector('.pl-book__linespacing .pl-right .pl-value'),
        newVal = parseFloat(getLocal('linespacing'));
    //getLocal('linespacing');

    if (!Number.isNaN(Number(key))) {
        newVal = parseFloat(key);
    } else {
        if (key.match(/minus/i)) {
            newVal = newVal - 0.05;
        } else if (key.match(/plus/i)) {
            newVal = newVal + 0.05;
        }
    }

    newVal = parseFloat(parseFloat(newVal).toFixed(2));
    container.textContent = newVal.toString();
    setLocal('linespacing', newVal);
    document.documentElement.style.setProperty('--line-spacing', newVal.toString());
}

// Open-close menu
function toggleMenu() {
    let bookmenu = document.querySelector('.pl-book');
    //getLocal('bookmenustate');

    bookmenu.classList.add('mask');
    bookmenu.classList.toggle('closed');

    if (bookmenu.classList.contains('closed')) {
        setLocal('bookmenustate', ' closed'); // Space is intentional
    } else {
        setLocal('bookmenustate', '');
    }

    setTimeout(() => {
        bookmenu.classList.remove('mask');
    }, 300);
}

// Set menu state as saved
function updateMenu(key) {
    let bookmenu = document.querySelector('.pl-book');

    // Check if dom and localstorage val mismatch
    if (!((key.match(/closed/) && bookmenu.classList.contains('closed')) || (!key.match(/closed/) && !bookmenu.classList.contains('closed')))) {
        bookmenu.classList.add('plain');
        bookmenu.classList.toggle('closed');
        setTimeout(() => {
            bookmenu.classList.remove('plain');
        }, 50);
    }
}

// Book view functions
document.addEventListener('click', (e) => {
    // When they click print
    if (e.target.closest('.pl-print')) {
        setTimeout(() => {
            window.print();
        }, 100);
    }

    // Change page size
    if (e.target.closest('.pl-book__pagesize .pl-right cloak')) {
        updatePageSize(e.target.closest('cloak').className.replace(/pl\-/,''));
        refreshPaged();
    }
    if (e.target.closest('.pl-book__pagesize .pl-left cloak')) {
        updatePageSize('a4');
        refreshPaged();
    }

    // Change margin
    if (e.target.closest('.pl-book__margin .pl-right cloak')) {
        updateMargin(e.target.closest('cloak').className.replace(/pl\-/,''));
        refreshPaged();
    }
    if (e.target.closest('.pl-book__margin .pl-left cloak')) {
        updateMargin('normal');
        refreshPaged();
    }

    // Change fontface
    if (e.target.closest('.pl-book__fontface .pl-right cloak')) {
        updateFontface(e.target.closest('cloak').className.replace(/pl\-/,''));
        refreshPaged();
    }
    if (e.target.closest('.pl-book__fontface .pl-left cloak')) {
        updateFontface('sans');
        refreshPaged();
    }

    // Change fontsize
    if (e.target.closest('.pl-book__fontsize .pl-right cloak:has(a)')) {
        updateFontsize(e.target.closest('cloak').className.replace(/pl\-/,''));
        refreshPaged();
    }
    if (e.target.closest('.pl-book__fontsize .pl-left cloak')) {
        updateFontsize(12);
        refreshPaged();
    }

    // Change linespacing
    if (e.target.closest('.pl-book__linespacing .pl-right cloak:has(a)')) {
        updateLinespacing(e.target.closest('cloak').className.replace(/pl\-/,''));
        refreshPaged();
    }
    if (e.target.closest('.pl-book__linespacing .pl-left cloak')) {
        updateLinespacing(1.5);
        refreshPaged();
    }

    // Open-close menu
    if (e.target.closest('.pl-book__toggle .pl-left cloak')) {
        toggleMenu();
    }
});

// Autoset on load
function setSelections() {
    try {
        updatePageSize(getLocal('pagesize'));
        updateMargin(getLocal('margin'));
        updateFontface(getLocal('fontface'));
        updateFontsize(getLocal('fontsize'));
        updateLinespacing(getLocal('linespacing'));
        updateMenu(getLocal('bookmenustate'));
    } catch {}
}

addStyle();
setSelections();
previewPaged();
`;

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
    $(`iframe.pl-iframe[src="${src}"]`).remove();
}

// Loop through link list
function looper() {
    if (!pl_var.loop) {
        pl_var.loop = 1;
        sessionStorage.pl_content = '';
    } else {
        pl_var.loop++;
    }

    if (pl_var.loop - 1 !== pl_var.linkArray.length) {
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
            <p class="about">${getIcon.logo.replace(' fill="currentColor">','>')} From ${pl_var.hostString} via <a href="https://naeembolchhi.github.io/pocket-library/" target="_blank">Pocket Library</a></p>
        </heading>
    `;
}

// Put content together in a new tab
function pocketPDF() {
    const bookHTML = `
        <!DOCTYPE html>
        <html id="pagedPreview" style="--font-size: ${getLocal('fontsize')}px;--line-spacing: ${getLocal('linespacing')}" data-font="${getLocal('fontface')}">
            <head>
                <title>${pl_var.hostString} - ${pl_var.title} (${pl_var.author})</title>

                <meta http-equiv="content-type" content="text/html; charset=utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                <meta name="HandheldFriendly" content="true">
                <meta name="description" content="${pl_var.title} by ${pl_var.author}.">
                <meta name="author" content="${pl_var.author}">

                <link rel="shortcut icon" href="data:image/svg+xml;base64,${btoa(getIcon.logo.replace('currentColor','#e43434'))}" type="image/x-icon">
                <link href="${normalcss}" rel="stylesheet" type="text/css">
                <link href="${fontsans}" rel="stylesheet" type="text/css">
                <link href="${fontserif}" rel="stylesheet" type="text/css">
                <link href="${fontlato}" rel="stylesheet" type="text/css" data-pagedjs-ignore>
                <style type="text/css" data-pagedjs-ignore>${mainStyles}</style>
                <style type="text/css">${bookStyles + pl_var.specialStyles}</style>
                <script src="${libpaged}" type="text/javascript"></script>
            </head>
            <body>
                <div id="pl-content" style="display:none">${setHeading() + sessionStorage.pl_content}</div>
                <div id="pl-container"></div>
                <div id="pocketlibrary">${getbookpanel()}</div>

                <script type="text/javascript">
                    const normalize = '${normalcss}',
                          fontsans = '${fontsans}',
                          fontserif = '${fontserif}',
                          bookstyles = '${bookStyles.replace(/\n/g,'').replace(/[\t\s]+/g,' ') + pl_var.specialStyles.replace(/\n/g,'').replace(/[\t\s]+/g,' ')}';

                    ${bookGUI}
                </script>
            </body>
        </html>
    `;

    const blob = new Blob([bookHTML], {type: 'text/html'});

    const blobURL = URL.createObjectURL(blob);

    document.querySelector('#pocketlibrary .pl-preview a').href = blobURL;

    document.querySelector('#pocketlibrary .pl-preview a').click();
    // window.open(blobURL, '_blank');
}

window.addEventListener('message', (e) => {
    if (typeof e.data !== 'string') return;
    if (!e.data.match(/pl\-iframe\-done\-/)) {return;}

    deleteFrame(e.data.replace(/pl\-iframe\-done\-/,''));
    looper();
});

document.addEventListener("DOMContentLoaded", (e) => {
    if (!window.location.href.match(/\?pl_looping/)) {return;}

    sessionStorage.pl_content += getContent();

    window.parent.postMessage('pl-iframe-done-' + window.location.href);
});

/* CliffsNotes */
if (window.location.hostname.includes('cliffsnotes.com')) {
    // Set filename variables
    pl_var.titleString = '.title-wrapper h1';
    pl_var.title = $(pl_var.titleString).textContent;
    pl_var.authorString = '.title-wrapper h2';
    pl_var.author = $(pl_var.authorString).textContent;
    pl_var.hostString = 'CliffsNotes';

    // Link list
    pl_var.linkString = '.secondary-navigation ul a:not([href$="quiz"])';

    function getPagelist() {
        let links = $$(pl_var.linkString),
            linkArr = [];

        for (let x = 0; x < links.length; x++) {
            linkArr.push(links[x].href);
        }

        pl_var.linkArray = [...new Set(linkArr)];

        return true;
    }

    function getContent() {
        let content = $('article.copy');

        if (content) {
            return content.innerHTML;
        }

        return '';
    }

    pl_var.specialStyles = `
        .back-to-literature-note, #abstractAd, .continuedOnNextPage,
        p:not([class]) {
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

    function getContent() {
        let content = '',
            path = window.location.pathname;

        if ($('#context') && $('.table-of-contents')) {
            content = '<h2>Introduction</h2>' + $('#context').innerHTML;
        }
        else if (path.match(/\/summary$/)) {
            content = '<h2>Plot</h2>' + $('.content .readable').innerHTML;
        }
        else if (path.match(/\/summary\-and\-analysis$/)) {
            content = '<h2>Summary</h2>';

            for (let x = 0; x < $$('.content .summary .summary-text').length; x++) {
                content += `<p>${$$('.content .summary .summary-text')[x].innerHTML}</p>`;
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
            content += `<h3>${$('.component-title').textContent}</h3>`;

            content += $('.content .readable .highlightable-content').innerHTML;
        }
        else if (path.match(/\/characters\//)) {
            content += `<h3>${$('.component-title').textContent}</h3>`;

            content += `<p>${$('.content .readable .highlightable-content').innerHTML}</p>`;
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

// Run when DOM is ready
if (document.readyState === "complete" || document.readyState === "interactive") {
    addfont();
    addstyles();
    runAll();
} else {
    document.addEventListener('DOMContentLoaded', () => {
        addfont();
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

