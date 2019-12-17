const path = require('path')
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const ResolveTSPathsToWebpackAlias = require('ts-paths-to-webpack-alias')

module.exports = {
  context: process.cwd(),
  entry: './src/core/index.tsx',
  output: {
    path: path.join(process.cwd(), 'public', 'dist'),
    filename: '[name].[hash].js',
  },
  plugins: [
    new ResolveTSPathsToWebpackAlias({
      tsconfig: path.resolve(__dirname, '../..', 'tsconfig.json'),
    }),
    new ForkTsCheckerWebpackPlugin({
      useTypescriptIncrementalApi: true,
    }),
    new ForkTsCheckerNotifierWebpackPlugin({
      title: 'TypeScript',
      excludeWarnings: false,
    }),
    new Dotenv({
      path: path.join(process.cwd(), 'src', 'constants', '.env'),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
    }),
    new FaviconsWebpackPlugin({
      logo: './public/logo.png',
      emitStats: false,
      persistentCache: true,
      inject: true,
      background: '#fff',
      title: 'Reapit',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: { transpileOnly: true },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jpg|jpeg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(sass|scss)$/,
        oneOf: [
          {
            resourceQuery: /\?mod$/,
            use: [
              {
                loader: 'style-loader',
              },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[name]-[local]-[hash:base64:5]',
                  },
                  localsConvention: 'camelCase',
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  includePaths: ['node_modules'],
                },
              },
            ],
          },
          {
            use: [
              {
                loader: 'style-loader',
              },
              {
                loader: 'css-loader',
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  includePaths: ['node_modules'],
                },
              },
            ],
          },
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: 'graphql-tag/loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.scss', '.sass'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    openPage: 'login',
    clientLogLevel: 'warning',
    historyApiFallback: true,
    stats: 'errors-only',
  },
  optimization: {
    nodeEnv: 'development',
    splitChunks: {
      chunks: 'all',
    },
  },
}
