const { baseBabel } = require('@reapit/ts-scripts')

module.exports = {
  ...baseBabel,
  plugins: [
    ...baseBabel.plugins,
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
  ],
}
