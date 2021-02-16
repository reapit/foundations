const devConfig = require('../../scripts/webpack/webpack.config.dev.js')
const prodConfig = require('../../scripts/webpack/webpack.config.prod.js')
const { sassDev, sassProd } = require('../../scripts/webpack/rules.js')

const isProd = process.env.NODE_ENV === 'production'
const config = isProd ? prodConfig : devConfig
const sassRules = isProd ? sassProd : sassDev

config.module.rules.push(sassRules)

module.exports = config
