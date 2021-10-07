const path = require('path')
const isProd = process.env.NODE_ENV == 'production'
const sveltePreprocess = require('svelte-preprocess')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const ResolveTSPathsToWebpackAlias = require('ts-paths-to-webpack-alias')

module.exports = {
  entry: {
    ['login-with-reapit']: './src/index.ts',
  },
  output: {
    filename: 'login-with-reapit.js',
    path: path.resolve(__dirname, 'public/dist'),
    publicPath: '/public/dist/',
    library: {
      type: 'umd',
    },
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
    new FriendlyErrorsWebpackPlugin(),
    new ResolveTSPathsToWebpackAlias({
      tsconfig: './tsconfig.json',
    }),
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
  },
}
