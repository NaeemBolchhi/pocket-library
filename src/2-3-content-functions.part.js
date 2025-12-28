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

// Parse HTML and make JSON that pdfmake understands (to pass as texts in addContent() function)
// Each newline block needs to be parsed separately
function spitTexts(htmlblock) {

}
