
# PDF-MRKDWN

* Combine and convert multiple Markdown (.md) files into a single PDF file
* Configure page layout with settings and CSS.
* **pdf-mrkdwn** depends on the **wkhtmltopdf** binary, which needs to be in the path. \
  It is recommended to use the static version of the binary (wkhtmltopdf-static).

## About the current release

The default configuration and CSS is suitable for creating standard novels. The next release will focus on providing more presets for other document types.

If the defaults are not suitable for you, you need to create your own CSS and configuration file. To export the defaults use the following commands:

* `pdf-markdown --cssToPath <target directory>`
* `pdf-markdown --cfgToPath <target directory>`

## Installation

`npm install -g pdf-markdown`

## Usage

`pdf-markdown --help | [options...] [--config-file <file>.json] [--verbose]`

Without options (or `--input` option) the pdf-markdown README file will be created as PDF in the current directory.

### Base options:

```
--name              The name of the generated PDF file
                    Default: README

--input             Input directory. All markdown (.md) files. from
                    the directory will be added to the PDF file.
                    Default: the current directory

--output            The output directory of the generated PDF file.
                    Default: the current directory

--css               A css file used for styling
                    Default: built-in styling
```

### Wkhtmltopdf options (The default is for creating a novel in standard size):

```
--zoom              Zoom level
                    Default: 1.5

--pageWidth         Page width in inches
                    Default: 5.5in
    
--pageHeight        Page height in inches
                    Default: 8.5in

--footerCenter      Elements to put in the page footer
                    Default: [page]

--footerFontSize    Font size used in the footer
                    Default: 8

--footerSpacing     Distance of the footer from the page edge
                    Default: 10                    

--marginBottom      Distance of the footer from the page contents
                    Default: 24
```

### Export:

```
--cssToPath         Exports the default CSS to <provided path>/pdfMd.css

--cfgToPath         Exports the default configuration to <provided path>/pdfMd.json
```

### Config file example (based on default options):

```
    {
        "name": "README",
        "output": ".",
        "wkhtmltopdf": {
            "zoom": "1.5",
            "pageWidth": "5.5in",
            "pageHeight": "8.5in",
            "footerCenter": "[page]",
            "footerFontSize": "8",
            "footerSpacing": "10",
            "marginBottom": "24"
        }
    }
```
