const nodeSass = require('node-sass')
const path = require('path')
const glob = require('glob')
const purifyCss = require('purify-css')
const purifyOptions = require(path.resolve(__dirname, '../../../packages/elements/purify-options.js'))

/**
 * build css from scss imported from elements
 * then purge it by comparing it against all ts, tsx files in src/elements
 */
const buildElementScss = async () => {
  const result = nodeSass.renderSync({
    file: path.resolve(__dirname, '../../../packages/elements/src/styles/index.scss'),
  })
  const css = result.css.toString()
  const globElementSrc = glob.sync(path.resolve(__dirname, '../../../packages/elements/src/**/*.{ts,tsx}'))
  purifyOptions.output = path.resolve(__dirname, './.temp/index.css')
  purifyCss(globElementSrc, css, purifyOptions)
}

module.exports = buildElementScss
