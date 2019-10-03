
const fs = require('fs')
const path = require('path')
const Markdown2Pdf = require('./src/Markdown2Pdf')
const getConfig = require('./src/getConfig')
const getHelp = require('./src/getHelp')

module.exports = (opts) => {
    // Should help be shown?
    if(opts.hasOwnProperty('help')) {
        console.log(getHelp())
        process.exit(0)
    }

    // Should the default CSS be exported?
    if (opts.cssToPath) {
        const dir = (opts.cssToPath === '.' || opts.cssToPath === '..') ? path.resolve(process.cwd(), opts.cssToPath) : opts.cssToPath

        if (!fs.existsSync(dir)) {
            console.error(`\nError: Unable to create pdfMd.css'. Target directory '${dir}' is not accessible.`)
            process.exit(1)
        }

        const buffer = fs.readFileSync(`${__dirname}/style.css`)
        fs.writeFileSync(`${dir}/pdfMd.css`, buffer);
        console.log(`CSS styling file was created as '${dir}/pdfMd.css'\n`);
        process.exit(0)
    }

    // Should the default config be exported?
    if (opts.cfgToPath) {
        const dir = (opts.cfgToPath === '.' || opts.cfgToPath === '..') ? path.resolve(process.cwd(), opts.cfgToPath) : opts.cfgToPath

        if (!fs.existsSync(dir)) {
            console.error(`\nError: Unable to create pdfMd.json. Target directory '${dir}' is not accessible.`)
            process.exit(1)
        } 

        const jsonBeautify = require('json-beautify')
        const output = JSON.stringify(getConfig({}), null, 2)
        fs.writeFileSync(`${dir}/pdfMd.json`, output)
        console.log(`JSON configuration file was created as '${dir}/pdfMd.json'\n`);
        process.exit(0)
    }

    // Parse commandline and config file options
    const config = getConfig(opts)

    // Are we in verbose mode?
    const verbose = opts.hasOwnProperty('verbose')

    // Get a list of files from the input directory
    const unfilteredList = fs.readdirSync(config.input)

    // Filter out non markdown files
    const fileList = unfilteredList
        .sort()
        .map( fileName => {
            if (fileName && fileName.indexOf('.md') > -1) {
                return `${config.input}/${fileName}`
            }
        })
        .filter(val => typeof val !== 'undefined')

    // Create the converter and generate the PDF
    const converter = new Markdown2Pdf()

    if (verbose) {
        console.log('Conversion configuration:\n', config, '\n')
        console.log('File list: \n', fileList.join('\n'), '\n') 
    }

    converter.generate(
        fileList.filter(val => typeof val !== 'undefined'),
        `${config.output}/${config.name}.pdf`,
        config
    )

}