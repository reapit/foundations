const { webpackConfigProd, webpackConfigDev, sassProd, sassDev } = require('@reapit/ts-scripts')

const isProd = process.env.NODE_ENV === 'production'
const config = isProd ? webpackConfigProd : webpackConfigDev
const sassRules = isProd ? sassProd : sassDev

config.module.rules.push(sassRules)

module.exports = config
