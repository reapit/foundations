const path = require('path')
const ResolveTSPathsToWebpackAlias = require('ts-paths-to-webpack-alias')
const { PATHS } = require('../../scripts/webpack/constants')
const slsw = require('serverless-webpack')
const getServerlessEnvPlugins = require('../../scripts/utils/get-serverless-env-plugins')
const nodeExternals = require('webpack-node-externals')

const isLocal = slsw.lib.webpack.isLocal
module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  stats: 'minimal',
  mode: isLocal ? 'development' : 'production',
  node: false,
  optimization: {
    minimize: true,
  },
  devtool: isLocal ? 'inline-cheap-module-source-map' : 'sourcemap',
  externals: [nodeExternals()],
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    sourceMapFilename: '[file].map',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { targets: { node: '12' }, useBuiltIns: 'usage', corejs: 3 }]],
            },
          },
        ],
      },
      {
        test: /.ts?$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
  plugins: [
    new ResolveTSPathsToWebpackAlias({
      tsconfig: PATHS.tsConfig,
    }),
    ...getServerlessEnvPlugins(),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.mjs', '.gql', '.graphql', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
}
