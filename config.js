
module.exports = {
<<<<<<< HEAD
    "name": "README",
    "output": ".",
    "wkhtmltopdf": {
        "zoom": "1.5",
        "pageWidth": "5.5in",
        "pageHeight": "8.5in",
        "footerCenter": "[page]",
        "footerFontSize": "8",
        "footerSpacing": "10",
        "marginBottom": "24"
=======
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
>>>>>>> 4344c4c5d4b3334a8b435e3b974c6adebdd4a26d
    }
}