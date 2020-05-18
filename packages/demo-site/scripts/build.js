const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

const inputs = [
  {
    ejsFilePath: path.resolve(__dirname, '..', './tpls/index.ejs'),
    outputFilePath: path.resolve(__dirname, '../public/dist/index.html'),
  },
  {
    ejsFilePath: path.resolve(__dirname, '..', './tpls/detail.ejs'),
    outputFilePath: path.resolve(__dirname, '../public/dist/detail.html'),
  },
]

const compileTemplate = async () => {
  try {
    const config = require('../config.json')
    const distDir = path.resolve(__dirname, '..', 'public', 'dist')

    let CDN_URL = config.CDN_URL
    const env = process.env.NODE_ENV
    const development = env === 'DEV'

    if (development) {
      CDN_URL = 'http://localhost:5000'
    }

    fs.mkdirSync(distDir, { recursive: true })
    inputs.forEach(({ ejsFilePath, outputFilePath }) => {
      const ejsTemplate = fs.readFileSync(ejsFilePath, { encoding: 'utf8' })
      const html = ejs.render(ejsTemplate, {
        CDN_URL,
        API_KEY: config.API_KEY,
        CUSTOMER_ID: config.CUSTOMER_ID,
        development,
      })
      fs.writeFileSync(outputFilePath, html)
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

compileTemplate()
