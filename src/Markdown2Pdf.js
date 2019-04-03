
const fs = require('fs')
const wkhtmltopdf = require('wkhtmltopdf')
const unified = require('unified');
const markdown = require('remark-parse');
const remark2rehype = require('remark-rehype')
const toc = require('remark-toc')
const slug = require('rehype-slug')
const link = require('rehype-autolink-headings')
const raw = require('rehype-raw')
const format = require('rehype-format')
const html = require('rehype-stringify')

class Markdown2Pdf {

    constructor(cssPath, pdfFilePath) {

    }

    generate(fileList, pdfFilePath, config) {
        console.log("Creating intermediate HTML file as '/tmp/md2pdf.html'")

        // Get HTML body + CSS
        const htmlBody = this._toHtml(fileList)
        const css = fs.readFileSync(`${__dirname}/../style.css`, 'utf8')

        const htmlFull = `
            <html>
              <head>
                <style>
                  ${css}
                </style>
              </head
              <body>
                ${htmlBody}
              </body>
            </html>`

        // Create temporary HTML file
        const htmlFile = '/tmp/md2pdf.html'
        fs.writeFileSync(htmlFile, htmlFull)

        // Convert HTML file to PDF
        wkhtmltopdf( fs.createReadStream(htmlFile), config.wkhtmltopdf )
            .pipe(fs.createWriteStream(pdfFilePath));

        console.log(`PDF file was created as '${pdfFilePath}'`);
    }

    _toHtml(fileList) {
        const buffer = []

        fileList.forEach( filePath => {
            const mdTxt = fs.readFileSync(filePath, 'utf8')
            buffer.push(mdTxt)
        })

        const result = unified()
            .use(markdown)
            .use(toc, {heading:'Contents'})
            .use(remark2rehype, {allowDangerousHTML: true})
            .use(raw)
            .use(slug)
            .use(link)
            .use(format)
            .use(html)
            .processSync(buffer.join('\n'))

        return result.contents
    }
}

module.exports = Markdown2Pdf