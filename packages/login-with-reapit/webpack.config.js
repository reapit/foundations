const devConfig = require('../../scripts/webpack/webpack.config.dev.js')
const prodConfig = require('../../scripts/webpack/webpack.config.prod.js')

const isProd = process.env.NODE_ENV === 'production'
const config = isProd ? prodConfig : devConfig

config.module.rules.push({
  test: /\.(html|svelte)$/,
  exclude: /node_modules/,
  use: 'svelte-loader',
})

module.exports = config
