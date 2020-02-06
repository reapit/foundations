// flows
// glob the tsx, ts of src of elements/src
// build elements scss-es in a single css
// purge it against contents of files in {1}
// webpack sass config's entry will be tweaked
// dev: include elements/src/styles/index.scss
// the prod script will:
// execute 1,2,3
// collect CSS to scripts/webpack/webpack-sass-prod/.temp/index.css
// Add index.css to the entry of sass prod build script

const webpackBase = require('./webpack.base.dev')
const { PATHS } = require('./constants')

module.exports = {
  ...{
    ...webpackBase,
    entry: [...webpackBase.entry, PATHS.elementsIndexSass],
  },
  module: {
    rules: [
      ...webpackBase.module.rules,
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
    ],
  },
  resolve: {
    ...webpackBase.module.resolve,
    extensions: [...webpackBase.resolve.extensions, '.css', '.scss', '.sass'],
  },
}
