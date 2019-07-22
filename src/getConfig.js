
const fs = require('fs')
const defaultConfig = require('../config')

// Helper: return 'opt' from 'opts' if exists otherwise return 'defVal'
const getOpt = (opts, opt, defVal) => opts.hasOwnProperty(opt) ? `${opts[opt]}` : defVal

// Helper: if 'opt' is in 'opts' add it to 'target' using 'opt' as index
const addOpt = (opts, opt, target) => { if (opts.hasOwnProperty(opt)) target[opt] = `${opts[opt]}` }

const optsToConfig = (opts) => {
    const cfg = {
        'wkhtmltopdf': {}
    }

    addOpt(opts, 'name',           cfg)
    addOpt(opts, 'input',          cfg)
    addOpt(opts, 'output',         cfg)
    addOpt(opts, 'css',            cfg)
    addOpt(opts, 'zoom',           cfg.wkhtmltopdf)
    addOpt(opts, 'pageWidth',      cfg.wkhtmltopdf)
    addOpt(opts, 'pageHeight',     cfg.wkhtmltopdf)
    addOpt(opts, 'footerCenter',   cfg.wkhtmltopdf)
    addOpt(opts, 'footerFontSize', cfg.wkhtmltopdf)
    addOpt(opts, 'footerSpacing',  cfg.wkhtmltopdf)
    addOpt(opts, 'marginBottom',   cfg.wkhtmltopdf)
    return cfg
}

const getConfig = (cfg) => {
    const base = {
        bookName:  getOpt(cfg, 'name',   defaultConfig.name),
        inputDir:  getOpt(cfg, 'input',  defaultConfig.input),
        outputDir: getOpt(cfg, 'output', defaultConfig.output),
        css:       getOpt(cfg, 'css',    defaultConfig.css),
    }

    if (cfg.hasOwnProperty('wkhtmltopdf')) {
        base.wkhtmltopdf = {
            zoom:           getOpt(cfg.wkhtmltopdf, 'zoom',           defaultConfig.wkhtmltopdf.zoom),
            pageWidth:      getOpt(cfg.wkhtmltopdf, 'pageWidth',      defaultConfig.wkhtmltopdf.pageWidth),
            pageHeight:     getOpt(cfg.wkhtmltopdf, 'pageHeight',     defaultConfig.wkhtmltopdf.pageHeight),
            footerCenter:   getOpt(cfg.wkhtmltopdf, 'footerCenter',   defaultConfig.wkhtmltopdf.footerCenter),
            footerFontSize: getOpt(cfg.wkhtmltopdf, 'footerFontSize', defaultConfig.wkhtmltopdf.footerFontSize),
            footerSpacing:  getOpt(cfg.wkhtmltopdf, 'footerSpacing',  defaultConfig.wkhtmltopdf.footerSpacing),
            marginBottom:   getOpt(cfg.wkhtmltopdf, 'marginBottom',   defaultConfig.wkhtmltopdf.marginBottom),
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
        // Generate config from commandline options
        const cfg = optsToConfig(opts)
        
        // Use default config and potentially overwrite with commandline options
        return getConfig(cfg)

    } else {
        // Use config file
        const altConfigFile = `${cwd}/${configFile}`

        if (fs.existsSync(configFile)) {
            console.log(`Using configuration: ${configFile}`)
            config = JSON.parse(fs.readFileSync(configFile))
            console.log(`\nUsing configuration file:`, configFile)

        } else if (fs.existsSync(altConfigFile)) {
            console.log(`Using configuration: ${altConfigFile}`)
            config = JSON.parse(fs.readFileSync(altConfigFile))
            console.log(`\nUsing configuration file:`, altConfigFile)

        } else {
            console.error(
                `Config file was not found in any of these locations:\n` +
                `- ${configFile}\n` +
                `- ${altConfigFile}\n`
            )

            process.exit(1)
        }

        return getConfig(config)
    }
}