const path = require('path')
const glob = require('glob')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const Dotenv = require('dotenv-webpack')
const ResolveTSPathsToWebpackAlias = require('ts-paths-to-webpack-alias')
const HashedModuleIdsPlugin = require('webpack').HashedModuleIdsPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const PATHS = {
  src: path.join(__dirname, '../..', 'src')
}

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
      async: false,
      useTypescriptIncrementalApi: true,
      memoryLimit: 4096
    }),
    new HtmlWebpackPlugin({
      hash: false,
      inject: true,
      template: 'public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
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
        windows: false
      }
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true
    }),
    new Dotenv({
      path: path.join(process.cwd(), 'src', 'constants', '.env')
    }),
    new HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css'
    }),
    new GenerateSW({
      exclude: [/\.jpe?g$/, /\.png$/],
      clientsClaim: true,
      skipWaiting: true,
      navigateFallback: '/index.html',
      cacheId: 'reapit/geo-diary',
      cleanupOutdatedCaches: true
    })
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [{ loader: 'ts-loader', options: { transpileOnly: true } }]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jpg|jpeg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '/assets'
          }
        }
      },
      {
        test: /\.(css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }
        ]
      },
      {
        test: /\.(sass|scss)$/,
        oneOf: [
          {
            resourceQuery: /\?mod$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  modules: {
                    localIdentName: '[hash:base64:5]'
                  },
                  localsConvention: 'camelCase'
                }
              },
              {
                loader: path.resolve('./src/scripts/purgecss-loader.js'),
                options: {
                  paths: glob.sync(`${PATHS.src}/**/*.{ts,tsx}`)
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          {
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: path.resolve('./src/scripts/purgecss-loader.js'),
                options: {
                  paths: glob.sync(`${PATHS.src}/**/*.{ts,tsx}`),
                  whitelistPatterns: [/^(slick)/]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
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
  optimization: {
    nodeEnv: 'production',
    splitChunks: {
      chunks: 'all'
    }
  }
}
