const path = require('path')
const ResolveTSPathsToWebpackAlias = require('ts-paths-to-webpack-alias')
const slsw = require('serverless-webpack')
const CopyPlugin = require('copy-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const { EnvironmentPlugin } = require('webpack')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const { getVersionTag, PATHS } = require('@reapit/ts-scripts')

const getServerlessEnvPlugins = () => {
  const tagName = getVersionTag()
  const APP_VERSION = `${tagName.packageName}_${tagName.version}`
  const envPlugins = []
  if (process.env.NODE_ENV !== 'develop') {
    envPlugins.push(
      new EnvironmentPlugin({
        APP_VERSION,
      }),
    )
  }

  if (process.env.IS_RELEASE) {
    const sentryWebpackConfig = {
      release: APP_VERSION,
      include: './dist',
      ignore: ['node_modules', 'webpack.config.js'],
      configFile: '.sentryclirc',
      setCommits: {
        repo: 'reapit/foundations',
        auto: true,
      },
    }
    envPlugins.push(new SentryWebpackPlugin(sentryWebpackConfig))
  }

  return envPlugins
}

const isLocal = slsw.lib.webpack.isLocal

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  stats: 'minimal',
  mode: isLocal ? 'development' : 'production',
  node: false,
  externals: isLocal ? [nodeExternals({ modulesDir: path.resolve(__dirname, '../..', 'node_modules') })] : undefined,
  optimization: {
    minimize: true,
  },
  devtool: isLocal ? 'inline-cheap-module-source-map' : 'sourcemap',
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
              presets: [
                ['@babel/preset-env', { targets: { node: isLocal ? '12' : '14' }, useBuiltIns: 'usage', corejs: 3 }],
              ],
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
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: 'graphql-tag/loader',
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/**/*.graphql',
          to: './',
          force: true,
        },
      ],
    }),
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
