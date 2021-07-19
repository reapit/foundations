const { baseBabel } = require('@reapit/ts-scripts')

baseBabel.plugins.push('babel-plugin-transform-typescript-metadata', [
  '@babel/plugin-proposal-decorators',
  { legacy: true },
])

module.exports = {
  ...baseBabel,
  assumptions: {
    setPublicClassFields: true,
  },
}
