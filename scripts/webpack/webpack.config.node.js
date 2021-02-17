const slsw = require('serverless-webpack')
const { ContextReplacementPlugin } = require('webpack')
const ResolveTSPathsToWebpackAlias = require('ts-paths-to-webpack-alias')
const { PATHS } = require('../../scripts/webpack/constants')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { ESBuildPlugin, ESBuildMinifyPlugin } = require('esbuild-loader')

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  stats: 'minimal',
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  node: false,
  optimization: {
    minimize: slsw.lib.webpack.isLocal ? false : true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2019',
      }),
    ],
  },
  devtool: 'inline-cheap-module-source-map',
  output: {
    libraryTarget: 'commonjs',
    path: `${process.cwd()}/dist`,
    filename: '[name].js',
  },
  plugins: [
    new ESBuildPlugin(),
    new ContextReplacementPlugin(/express|encoding/),
    new ResolveTSPathsToWebpackAlias({
      tsconfig: PATHS.tsConfig,
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /.ts?$/,
        exclude: /node_modules/,
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
  resolve: {
    extensions: ['.ts', '.js', '.mjs', '.gql', '.graphql', '.json'],
  },
}
