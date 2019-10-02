
const fs = require('fs')
const path = require('path')
const defaultConfig = require('../config')

// Get a value from an object or a default value if not exists
const getOpt = (opts, opt, defVal) => opts.hasOwnProperty(opt) ? opts[opt] : defVal

// Parse command line or file options
const getConfig = (opts) => {
    const base = {
        name:   getOpt(opts, 'name',   defaultConfig.name),
        input:  getOpt(opts, 'input',  path.resolve(__dirname, '..')),
        output: getOpt(opts, 'output', defaultConfig.output),
        css:    getOpt(opts, 'css',    path.resolve(__dirname, '..', 'style.css'))
    }

    if (opts.hasOwnProperty('wkhtmltopdf')) {
        base.wkhtmltopdf = {
            zoom:           getOpt(opts, 'zoom',           defaultConfig.wkhtmltopdf.zoom),
            pageWidth:      getOpt(opts, 'pageWidth',      defaultConfig.wkhtmltopdf.pageWidth),
            pageHeight:     getOpt(opts, 'pageHeight',     defaultConfig.wkhtmltopdf.pageHeight),
            footerCenter:   getOpt(opts, 'footerCenter',   defaultConfig.wkhtmltopdf.footerCenter),
            footerFontSize: getOpt(opts, 'footerFontSize', defaultConfig.wkhtmltopdf.footerFontSize),
            footerSpacing:  getOpt(opts, 'footerSpacing',  defaultConfig.wkhtmltopdf.footerSpacing),
            marginBottom:   getOpt(opts, 'marginBottom',   defaultConfig.wkhtmltopdf.marginBottom),
        }
    } else {
        base.wkhtmltopdf = defaultConfig.wkhtmltopdf
    }

    return base
}

module.exports = (opts) => {
    // Get command line options
    let config = getConfig(opts)
    
    // Get config file option if exists
    const configFile = getOpt(opts, 'config', null)

    if(configFile === null) {
        return config
    }

    // Read the config file
    const cwd = process.cwd()
    const altConfigFile = `${cwd}/${configFile}`
    let fileOpts = null

    if (fs.existsSync(configFile)) {
        fileOpts = JSON.parse(fs.readFileSync(configFile))

    } else if (fs.existsSync(altConfigFile)) {
        fileOpts = JSON.parse(fs.readFileSync(altConfigFile))

    } else {
        console.error(
            `Config file was not found in any of these locations:\n` +
            `- ${configFile}\n` +
            `- ${altConfigFile}\n`
        )

        process.exit(1)
    }

    // Merge file options with command line options (the former overwrites the latter)
    return getConfig(Object.assign(opts, fileOpts))
}