const ResolveTSPathsToWebpackAlias = require('ts-paths-to-webpack-alias')
const webpack = require('webpack')

module.exports = function({ tsConfigPath, configJsonPath }) {
  const configObject = require(configJsonPath)
  console.log(configObject)
  return {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.jsx?$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      /**
       * This plugin mapped all data in the field named "paths" of tsconfig.json to webpack alias
       */
      new ResolveTSPathsToWebpackAlias({
        tsconfig: tsConfigPath,
      }),
      new webpack.DefinePlugin({
        reapit: {
          config: configObject,
        },
      }),
    ],
  }
}
