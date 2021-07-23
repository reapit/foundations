const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@reapit/storybook-addon-html',
    '@storybook/addon-essentials',
    '@storybook/addon-storysource/register',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push(
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              target: 'es2019',
            },
          },
          {
            loader: '@linaria/webpack-loader',
            options: {
              sourceMap: configType !== 'PRODUCTION',
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: process.env.NODE_ENV !== 'production',
            },
          },
          'sass-loader',
        ],
        include: path.resolve(__dirname, '../'),
      },
    )

    config.resolve.alias = {
      '@': `${process.cwd()}/src/`,
    }
  
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
    )

    config.stats = {
      cached: false,
      cachedAssets: false,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      modules: false,
    }

    return config
  },
}
