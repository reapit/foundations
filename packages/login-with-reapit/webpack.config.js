const path = require('path')
const isProd = process.env.NODE_ENV == 'production'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const sveltePreprocess = require('svelte-preprocess')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

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
    fallback: { crypto: require.resolve('crypto-browserify') },
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
    ],
  },
  plugins: [
    new NodePolyfillPlugin(),
    new HtmlWebpackPlugin({ template: 'public/index.html' }),
    new FriendlyErrorsWebpackPlugin(),
  ],
  devServer: {
    quiet: true,
    hot: true,
    clientLogLevel: 'warning',
    stats: {
      cached: false,
      cachedAssets: false,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      modules: false,
    },
  }
}
