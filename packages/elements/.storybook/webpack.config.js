const path = require('path')

module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      use: [require.resolve('awesome-typescript-loader'), require.resolve('react-docgen-typescript-loader')]
    },
    {
      test: /\.stories\.tsx?$/,
      loaders: [
        {
          loader: require.resolve('@storybook/addon-storysource/loader'),
          options: { parser: 'typescript' }
        }
      ],
      enforce: 'pre'
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../')
    }
  )
  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
