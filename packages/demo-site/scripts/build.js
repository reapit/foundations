const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

const compileTemplate = async () => {
  try {
    const config = require('../config.json')
    const ejsFileDir = path.resolve(__dirname, '..', 'index.ejs')
    const indexHtmlDir = path.resolve(__dirname, '..', 'public', 'index.html')
    const ejsTemplate = await fs.readFileSync(ejsFileDir, { encoding: 'utf8' })

    const template = ejs.compile(ejsTemplate)
    const html = template({ API_KEY: config.API_KEY, CDN_URL: config.CDN_URL })
    fs.writeFileSync(indexHtmlDir, html)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

compileTemplate()
