
const fs = require('fs')
const Markdown2Pdf = require('./src/Markdown2Pdf')
const opts = require('minimist')(process.argv.slice(2))
const getConfig = require('./src/getConfig')
//const usage = "Usage: node index.js <chapters dir> <book name>"
const config = getConfig(opts)
const converter = new Markdown2Pdf()

console.log('Conversion configuration:\n', config, '\n')

const tmpList = fs.readdirSync(config.inputDir)

const fileList = tmpList.sort().map( fileName => {
    if (fileName && fileName.indexOf('.md') > -1) {
        return `${config.inputDir}/${fileName}`
    }
})

converter.generate(
    fileList.filter(val => typeof val !== 'undefined'),
    `${config.outputDir}/${config.bookName}.pdf`,
    config
)
