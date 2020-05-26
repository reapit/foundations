const path = require('path')
const slsw = require('serverless-webpack')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  stats: 'minimal',
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  node: false,
  optimization: {
    minimize: true,
  },
  devtool: 'inline-cheap-module-source-map',
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
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
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/credentials.json'),
          to: 'src',
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.mjs', '.gql', '.graphql', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
}
