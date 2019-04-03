
const fs = require('fs')
const defaultConfig = require('../config')

const getOpt = (opts, opt, defVal) => opts.hasOwnProperty(opt) ? opts[opt] : defVal

const getCmdAndDefaultConfig = (opts) => {
    return {
        bookName:  getOpt(opts, 'name', 'MyBook'),
        inputDir:  getOpt(opts, 'input', '.'),
        outputDir: getOpt(opts, 'output', '.'),
        css:       getOpt(opts, 'css', `${__dirname}/style.css`),
        wkhtmltopdf: {
            zoom:           getOpt(opts, 'zoom',           defaultConfig.wkhtmltopdf.zoom),
            pageWidth:      getOpt(opts, 'pageWidth',      defaultConfig.wkhtmltopdf.pageWidth),
            pageHeight:     getOpt(opts, 'pageHeight',     defaultConfig.wkhtmltopdf.pageHeight),
            footerCenter:   getOpt(opts, 'footerCenter',   defaultConfig.wkhtmltopdf.footerCenter),
            footerFontSize: getOpt(opts, 'footerFontSize', defaultConfig.wkhtmltopdf.footerFontSize),
            footerSpacing:  getOpt(opts, 'footerSpacing',  defaultConfig.wkhtmltopdf.footerSpacing),
            marginBottom:   getOpt(opts, 'marginBottom',   defaultConfig.wkhtmltopdf.marginBottom),
        }
    }
}

const getFileConfig = (fileCfg) => {
    const base = {
        bookName:  getOpt(fileCfg, 'name', 'MyBook'),
        inputDir:  getOpt(fileCfg, 'input', '.'),
        outputDir: getOpt(fileCfg, 'output', '.'),
        css:       getOpt(fileCfg, 'css', `${__dirname}/style.css`),
    }

    if (fileCfg.hasOwnProperty('wkhtmltopdf')) {
        base.wkhtmltopdf = {
            zoom:           getOpt(fileCfg, 'zoom',           defaultConfig.wkhtmltopdf.zoom),
            pageWidth:      getOpt(fileCfg, 'pageWidth',      defaultConfig.wkhtmltopdf.pageWidth),
            pageHeight:     getOpt(fileCfg, 'pageHeight',     defaultConfig.wkhtmltopdf.pageHeight),
            footerCenter:   getOpt(fileCfg, 'footerCenter',   defaultConfig.wkhtmltopdf.footerCenter),
            footerFontSize: getOpt(fileCfg, 'footerFontSize', defaultConfig.wkhtmltopdf.footerFontSize),
            footerSpacing:  getOpt(fileCfg, 'footerSpacing',  defaultConfig.wkhtmltopdf.footerSpacing),
            marginBottom:   getOpt(fileCfg, 'marginBottom',   defaultConfig.wkhtmltopdf.marginBottom),
        }
    } else {
        base.wkhtmltopdf = defaultConfig.wkhtmltopdf
    }

    return base
}

module.exports = (opts) => {
    const configFile = getOpt(opts, 'config', null)
    const cwd = process.cwd()
    let config = null

    if(configFile === null) {
        return getCmdAndDefaultConfig(opts)

    } else {
        const altConfigFile = `${cwd}/${configFile}`

        if (fs.existsSync(configFile)) {
            config = JSON.parse(fs.readFileSync(configFile))

        } else if (fs.existsSync(altConfigFile)) {
            config = JSON.parse(fs.readFileSync(altConfigFile))

        } else {
            console.error(
                `Config file was not found in any of these locations:\n` +
                `- ${configFile}\n` +
                `- ${altConfigFile}\n`
            )

            process.exit(1)
        }

        return getFileConfig(config)
    }
}