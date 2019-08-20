module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.scss$/,
      use: [require.resolve('style-loader'), require.resolve('css-loader'), require.resolve('sass-loader')]
    },
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
    }
  )
  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
