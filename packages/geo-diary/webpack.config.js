const { webpackConfigProd, webpackConfigDev, graphql } = require('@reapit/ts-scripts')

const isProd = process.env.NODE_ENV === 'production'
const appName = 'Geo Diary'
const config = isProd ? webpackConfigProd({ appName }) : webpackConfigDev({ appName })

config.module.rules.push(graphql)

module.exports = config
