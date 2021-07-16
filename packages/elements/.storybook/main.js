const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@whitespace/storybook-addon-html',
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
  managerBabel: async (config, options) => {
    // update config here
    console.log(config)
    return config;
  },
  webpackFinal: async (config, { configType }) => {
    // Make whatever fine-grained changes you need
    config.module.rules.push(
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: '@linaria/webpack-loader',
            options: {
              sourceMap: configType !== 'PRODUCTION',
            },
          },
          // { loader: 'ts-loader', options: { happyPackMode: true, transpileOnly: true } },
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              target: 'es2019',
            },
          },
          // require.resolve('react-docgen-typescript-loader'),
        ],
      },
    )
    console.log(config.plugins)
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
    // Return the altered config
    return config;
  },
}
