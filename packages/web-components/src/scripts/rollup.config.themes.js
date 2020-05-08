import baseConfig from './rollup.config.base'

const production = !process.env.ROLLUP_WATCH

export default {
  ...baseConfig,
  input: 'src/common/styles/__themes__/themes.js',
  output: {
    sourcemap: !production,
    format: 'iife',
    name: 'theme',
    file: './public/themes/themes.js',
  },
  plugins: [...baseConfig.plugins],
}
