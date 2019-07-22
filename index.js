
const fs = require('fs')
const path = require('path')
const Markdown2Pdf = require('./src/Markdown2Pdf')
const opts = require('minimist')(process.argv.slice(2))
const config = require('./src/getConfig')(opts)

const usage = 
    "\nUsage: node index.js --config <file> | <options>\n\n" +
    "Options:\n" +
    "--name             The name of the generated PDF file (default: MyBook)\n" + 
    "--input            Path of input directory (default: current path)\n" +
    "--output           Path of output directory (default: current path)\n" + 
    "--css              Path to CSS file (default: will use build-in CSS)\n" +
    "--zoom             Zoom level (default: 1.5)\n" +
    "--pageWidth        Width of the page (default: 5.5in)\n" +
    "--pageHeight       Height of the page (default: 8.5in)\n" +
    "--footerCenter     Contents of the center part of the footer. Wkhtml variables can be used (default: [page])\n" +
    "--footerFontSize   Font size as number (default: 8)\n" +
    "--footerSpacing    Space between the page content and the footer (default: 10)\n" +
    "--marginBottom     Space between the footer and the bottom of then page (default: 24)\n" +
    "\nOther options (No documents will be processed):\n" +
    "--help             Prints the help\n" +
    "--cssToPath        Exports the default CSS to <provided path>/pdfMd.css\n" + 
    "--cfgToPath        Exports the default configuration to <provided path>/pdfMd.json\n" +
    "\nNote: All Markdown files from input directory will be read and added to the output file" +
    "\n      To control the order in which they are added use the alphabetic file name order"

if (opts.help) {
    console.log(usage + '\n')
    process.exit(0)
}

if (opts.cssToPath) {
    const dir = (opts.cssToPath === '.' || opts.cssToPath === '..') ? path.resolve(process.cwd(), opts.cssToPath) : opts.cssToPath

    if (!fs.existsSync(dir)) {
        console.error(`\nError: Unable to create pdfMd.css'. Target directory '${dir}' is not accessible.`)
        process.exit(1)
    }

    const buffer = fs.readFileSync(`${__dirname}/style.css`)
    fs.writeFileSync(`${dir}/pdfMd.css`, buffer);
    process.exit(0)
}

if (opts.cfgToPath) {
    const dir = (opts.cfgToPath === '.' || opts.cfgToPath === '..') ? path.resolve(process.cwd(), opts.cfgToPath) : opts.cfgToPath

    if (!fs.existsSync(dir)) {
        console.error(`\nError: Unable to create pdfMd.json. Target directory '${dir}' is not accessible.`)
        process.exit(1)
    } 

    const jsonBeautify = require('json-beautify')
    const output = JSON.stringify(config, null, 2)
    fs.writeFileSync(`${dir}/pdfMd.json`, output)
    process.exit(0)
}

console.log('\nConversion configuration:\n\n', config, '\n')
const tmpList = fs.readdirSync(config.inputDir)

const fileList = tmpList
    .sort()
    .map( fileName => {
        if (fileName && fileName.indexOf('.md') > -1) {
            return `${config.inputDir}/${fileName}`
        }
    })
    .filter(val => typeof val !== 'undefined')

const converter = new Markdown2Pdf()
console.log('File list: \n', fileList.join('\n'), '\n') 

converter.generate(
    fileList,
    `${config.outputDir}/${config.bookName}.pdf`,
    config
)
