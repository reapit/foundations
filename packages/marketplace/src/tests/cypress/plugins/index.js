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

  // this account can login as three roles
  const { CYPRESS_USERNAME, CYPRESS_PASSWORD } = process.env

  const env = {
    ...envVariables,
    clientUserName: CYPRESS_USERNAME,
    clientPassword: CYPRESS_PASSWORD,
    developerUserName: CYPRESS_USERNAME,
    developerPassword: CYPRESS_PASSWORD,
    adminUserName: CYPRESS_USERNAME,
    adminPassword: CYPRESS_PASSWORD,
  }

  return { ...config, baseUrl, env }
}
