
module.exports = {
    'name':   'MyBook',
    'input':  '.',
    'output': '.',
    'css':    `${__dirname}/style.css`,
    'wkhtmltopdf': {

        'zoom': '1.5',
        'pageWidth': '5.5in',
        'pageHeight': '8.5in',
        'footerCenter': '[page]',
        'footerFontSize': '8',
        'footerSpacing': '10',
        'marginBottom': '24'
    }
}