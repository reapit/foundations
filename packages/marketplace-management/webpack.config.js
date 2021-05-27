const { webpackConfigProd, webpackConfigDev, sassProd, sassDev } = require('@reapit/ts-scripts')

const isProd = process.env.NODE_ENV === 'production'
const appName = 'Marketplace Management'
const config = isProd ? webpackConfigProd({ appName }) : webpackConfigDev({ appName })
const sassRules = isProd ? sassProd : sassDev

config.module.rules.push(sassRules)

module.exports = config
