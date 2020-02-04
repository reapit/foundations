const path = require('path')
const fs = require('fs')

const cdnPath = `${process.cwd()}/src/cdn`
const files = fs.readdirSync(cdnPath)

const { PATHS } = require('./constants')

// read all files in cdn folder folder
const entries = files.reduce((entries, file) => {
  const extName = path.extname(file)
  const fileWithoutExtName = file.replace(extName, '')

  // Each file will be webpack entry https://webpack.js.org/concepts/entry-points/ ~ 1 file
  entries[fileWithoutExtName] = path.resolve(cdnPath, file)
  return entries
}, {})

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ResolveTSPathsToWebpackAlias = require('ts-paths-to-webpack-alias')

module.exports = {
  context: process.cwd(),
  entry: entries,
  output: {
    path: PATHS.output,
    libraryTarget: 'umd',
  },
  plugins: [
    new ResolveTSPathsToWebpackAlias({
      tsconfig: PATHS.tsConfig,
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      useTypescriptIncrementalApi: true,
      memoryLimit: 4096,
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'entry',
                    corejs: '3',
                    targets: {
                      esmodules: true,
                      chrome: '58',
                      ie: '11',
                    },
                  },
                ],
              ],
            },
          },
          { loader: 'ts-loader', options: { transpileOnly: true } },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jpg|jpeg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '/assets',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': `${PATHS.src}/`,
    },
  },
  optimization: {
    nodeEnv: 'production',
    splitChunks: {
      chunks: 'all',
    },
  },
  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    modules: false,
  },
}
