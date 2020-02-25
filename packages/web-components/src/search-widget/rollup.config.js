import svelte from 'rollup-plugin-svelte'
import baseConfig from '../../rollup.config.base'

const svelteOptions = require('../../svelte.config')

const production = !process.env.ROLLUP_WATCH

export default {
  ...baseConfig,
  input: 'src/search-widget/core/index.ts',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: './public/dist/search-widget.js',
  },
  plugins: [
    svelte({
      ...svelteOptions,
      dev: !production,
      css: css => {
        css.write('./public/dist/search-widget.css')
      },
    }),
    ...baseConfig.plugins,
  ],
}
