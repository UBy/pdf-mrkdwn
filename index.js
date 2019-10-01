
const fs = require('fs')
const path = require('path')
const Markdown2Pdf = require('./src/Markdown2Pdf')
const opts = require('minimist')(process.argv.slice(2))
const getConfig = require('./src/getConfig')
const getHelp = require('./src/getHelp')
//const usage = "Usage: node index.js <chapters dir> <book name>"
const converter = new Markdown2Pdf()

if(opts.hasOwnProperty('help')) {
    console.log(getHelp())
    process.exit(0)
}

const config = getConfig(opts)

if (opts.hasOwnProperty('verbose')) {
    console.log('Conversion configuration:\n', config, '\n')
}

const tmpList = fs.readdirSync(config.input)

const fileList = tmpList.sort().map( fileName => {
    if (fileName && fileName.indexOf('.md') > -1) {
        return `${config.input}/${fileName}`
    }

    const buffer = fs.readFileSync(`${__dirname}/style.css`)
    fs.writeFileSync(`${dir}/pdfMd.css`, buffer);
    process.exit(0)
})

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
    fileList.filter(val => typeof val !== 'undefined'),
    `${config.output}/${config.name}.pdf`,
    config
)
