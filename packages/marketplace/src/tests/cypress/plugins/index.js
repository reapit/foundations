const path = require('path')
const wp = require('@cypress/webpack-preprocessor')
const createCypressWebpackConfig = require('../../../../../../scripts/webpack/webpack.cypress')

const tsConfigPath = path.resolve(__dirname, '../../tsconfig.json')
const configJsonPath = path.resolve(__dirname, '../../../../config.json')

module.exports = (on, config) => {
  const options = {
    webpackOptions: createCypressWebpackConfig({ tsConfigPath, configJsonPath }),
  }
  on('file:preprocessor', wp(options))

  require('cypress-plugin-retries/lib/plugin')(on)

  const envVariables = require(configJsonPath)
  const baseUrl = envVariables.cypressBaseUrl

  return { ...config, baseUrl, env: envVariables }
}
