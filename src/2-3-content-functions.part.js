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
            title: '',
            author: '',
            subject: '',
            keywords: '',
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
              alignment: 'justify'
        },
        content: docContent,
        styles: {
            h1: {
                fontSize: fs*(16/12),
                bold: true,
                alignment: 'left'
            }
        }
    };
}

// Push text and styles
const addContent = {
    basic: function (texts, styles) {
        docContent.push(
            {text: texts, style: styles}
        );
    }
};
