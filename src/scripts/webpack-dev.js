const path = require('path')
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const ResolveTSPathsToWebpackAlias = require('ts-paths-to-webpack-alias')

module.exports = {
  context: process.cwd(),
  entry: './src/core/index.tsx',
  output: {
    path: path.join(process.cwd(), 'public', 'dist'),
    filename: '[name].[hash].js'
  },
  plugins: [
    new ResolveTSPathsToWebpackAlias({
      tsconfig: path.resolve(__dirname, '../..', 'tsconfig.json')
    }),
    new ForkTsCheckerWebpackPlugin({
      tslint: true,
      useTypescriptIncrementalApi: true
    }),
    new ForkTsCheckerNotifierWebpackPlugin({
      title: 'TypeScript',
      excludeWarnings: false
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: { transpileOnly: true }
          }
        ]
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        include: path.resolve(__dirname, 'src', 'assets'),
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            outputPath: path.resolve(__dirname, 'public', 'dist', 'assets')
          }
        }
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: ['node_modules']
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.scss', '.sass'],
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },
  devtool: 'inline-source-map',
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    stats: 'errors-only'
  },
  optimization: {
    nodeEnv: 'development',
    splitChunks: {
      chunks: 'all'
    }
  }
}
