const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const path = require('path')

module.exports = async ({ config }) => {
  
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    exclude: /(node_modules|bower_components|types)/,
    use: {
      loader: 'babel-loader'
    }
  })

  
  config.resolve = {
    ...config.resolve,
    plugins: [new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, '../tsconfig.json')
    })]
  }

  config.resolve.extensions = [...config.resolve.extensions, '.ts', '.tsx']
  

  return config
}
