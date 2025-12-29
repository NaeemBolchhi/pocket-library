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
