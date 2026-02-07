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
