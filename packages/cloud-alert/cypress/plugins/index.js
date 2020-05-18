const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor')
const { initPlugin } = require('cypress-plugin-snapshots/plugin')

module.exports = (on, config) => {
  on('file:preprocessor', cypressTypeScriptPreprocessor)
  initPlugin(on, config)
  return config
}
