
const fs = require('fs')
const converter = new (require('./src/Markdown2Pdf'))()
const usage = "Usage: node index.js <chapters dir> <book name>"

/*
"bookName":"MyBook",
"inputDir": ".",
"outputDir": "default",
"cssFile": "default"
*/

const chapters = process.argv[2]
let bookName = process.argv[3]
const config = require('./config.json')

if(!chapters) {
    console.log(`\nERROR: Chapter directory argument was missing.\n${usage}\n`)
    process.exit(1)
}

if(!bookName) {
    console.log(`\nERROR: Output book name argument was missing.\n${usage}\n`)
    process.exit(1)
}

if (bookName.substr(-4) !== '.pdf') {
    bookName += '.pdf'
}

console.log(`Using Markdown files from '${chapters}/*md'`)
const tmpList = fs.readdirSync(chapters)

const fileList = tmpList.sort().map( fileName => {
    if (fileName && fileName.indexOf('.md') > -1) {
        return `${chapters}/${fileName}`
    }
})

converter.generate(
    fileList.filter(val => typeof val !== 'undefined'),
    `${__dirname}/output/${bookName}`,
    config
)
