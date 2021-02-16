const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const sassDev = {
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
}

const sassProd = {
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
              localIdentName: '[hash:base64:5]',
            },
            localsConvention: 'camelCase',
          },
        },
        'postcss-loader',
        {
          loader: 'sass-loader',
          options: {
            sourceMap: false,
          },
        },
      ],
    },
    {
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          },
        },
        'postcss-loader',
        {
          loader: 'sass-loader',
          options: {
            sourceMap: false,
          },
        },
      ],
    },
  ],
}

const graphql = {
  test: /\.(graphql|gql)$/,
  exclude: /node_modules/,
  use: 'graphql-tag/loader',
}

module.exports = { sassDev, sassProd, graphql }
