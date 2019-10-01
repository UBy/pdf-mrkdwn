
const fs = require('fs')
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
})

converter.generate(
    fileList.filter(val => typeof val !== 'undefined'),
    `${config.output}/${config.name}.pdf`,
    config
)
