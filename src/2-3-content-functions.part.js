// Add fonts to pdfmake
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

// PDFMake content variable
let docContent = [];

// Main document definition
function docDefinition() {
    let fs = localStorage.pl_fontsize,
        fn = `source${localStorage.pl_fontvariant.replace(/^s/,'S')}`;

    return {
        pageSize: {
            width: 210/25.4*72,
            height: 297/25.4*72
        },
        pageOrientation: 'portrait',
        defaultStyle: {
              font: fn,
              fontSize: fs,
              alignment: 'justify'
        },
        content: docContent,
        styles: {}
    };
}

// Push text and styles
const addContent = {
    basic: function (text, styles) {

    }
};