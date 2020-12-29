const path = require('path')
const slsw = require('serverless-webpack')
const { ContextReplacementPlugin } = require('webpack')

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  stats: 'minimal',
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  node: false,
  optimization: {
    minimize: slsw.lib.webpack.isLocal ? false : true,
  },
  devtool: 'inline-cheap-module-source-map',
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [new ContextReplacementPlugin(/express|encoding/)],
  // externals: [{ 'express': { commonjs: 'express' } }],
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
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.mjs', '.gql', '.graphql', '.json'],
  },
}
