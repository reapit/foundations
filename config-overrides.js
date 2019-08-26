const path = require('path');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const {
  override,
  useEslintRc,
  enableEslintTypescript,
  addBundleVisualizer,
  addWebpackAlias,
  adjustWorkbox,
} = require('customize-cra');

module.exports = override(
  useEslintRc(path.resolve(__dirname, '.eslintrc.js')),
  enableEslintTypescript(),

  process.env.BUNDLE_VISUALIZE && addBundleVisualizer(),

  addWebpackAlias({
    '@': path.resolve(__dirname, 'src/'),
    '@assets': path.resolve(__dirname, 'src/assets/'),
    '@constants': path.resolve(__dirname, 'src/constants/'),
    '@components': path.resolve(__dirname, 'src/components/'),
    '@helpers': path.resolve(__dirname, 'src/helpers/'),
    '@pages': path.resolve(__dirname, 'src/pages/'),
    '@typings': path.resolve(__dirname, 'src/typings/'),
  }),

  adjustWorkbox(wb =>
    Object.assign(wb, {
      skipWaiting: true,
      exclude: (wb.exclude || []).concat('index.html'),
    }),
  ),

  config => rewireReactHotLoader(config),
);
