const path = require('path')
const isProd = process.env.NODE_ENV == 'production'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const sveltePreprocess = require('svelte-preprocess')
const { ESBuildPlugin } = require('esbuild-loader')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  entry: {
    ['login-with-reapit']: './src/index.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/dist'),
    publicPath: '/public/dist/',
  },
  resolve: {
    extensions: ['.mjs', '.ts', '.tsx', '.js', '.svelte'],
  },
  mode: isProd ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.(svelte)$/,
        use: [
          { loader: 'esbuild-loader' },
          {
            loader: 'svelte-loader',
            options: {
              preprocess: sveltePreprocess({}),
            },
          },
        ],
      },
      {
        test: /.tsx?$/,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              target: 'es2019',
            },
          },
        ],
      },
      // {
      //   test: /\.(t|j)sx?$/,
      //   exclude: /node_modules/,
      //   loader: 'babel-loader',
      // },
    ],
  },
  plugins: [
    new ESBuildPlugin(),
    new HtmlWebpackPlugin({ template: 'public/index.html' }),
    new FriendlyErrorsWebpackPlugin(),
  ],
}
