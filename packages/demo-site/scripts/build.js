const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

const compileTemplate = async filename => {
  try {
    const config = require('../config.json')
    const distDir = path.resolve(__dirname, '..', 'public', 'dist')
    const ejsFileDir = path.resolve(__dirname, '..', `${filename}.ejs`)
    const htmlDir = path.resolve(__dirname, '..', 'public', 'dist', `${filename}.html`)
    const ejsTemplate = await fs.readFileSync(ejsFileDir, { encoding: 'utf8' })
    const template = ejs.compile(ejsTemplate)

    let CDN_URL = config.CDN_URL
    const env = process.env.NODE_ENV

    if (env === 'DEV') {
      CDN_URL = 'http://localhost:5000'
    }

    const html = template({ API_KEY: config.API_KEY, CUSTOMER_ID: config.CUSTOMER_ID, CDN_URL })

    fs.mkdirSync(distDir, { recursive: true })
    fs.writeFileSync(htmlDir, html)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

const build = async () => {
  try {
    const filenames = ['index', 'detail']
    await Promise.all(filenames.map(fileName => compileTemplate(fileName)))
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

build()
