import svelte from 'rollup-plugin-svelte'
import baseConfig from './rollup.config.base'
import replace from '@rollup/plugin-replace'
import path from 'path'

const env = require(path.resolve(__dirname, '../../../..', 'reapit-config.json'))
const config = env[process.env.REAPIT_ENV || 'LOCAL']
const svelteOptions = require('../../svelte.config')
const production = !process.env.ROLLUP_WATCH

export default {
  ...baseConfig,
  input: 'src/search-widget/client/core/index.ts',
  output: {
    sourcemap: !production,
    format: 'iife',
    name: 'app',
    file: './public/dist/client/search-widget.js',
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(config.NODE_ENV),
      'process.env.REAPIT_ENV': JSON.stringify(config.REAPIT_ENV),
      'process.env.WEB_COMPONENT_API_BASE_URL_SEARCH_WIDGET': JSON.stringify(
        config.WEB_COMPONENT_API_BASE_URL_SEARCH_WIDGET,
      ),
    }),
    svelte({
      ...svelteOptions,
      dev: !production,
      css: css => {
        css.write('./public/dist/client/search-widget.css')
      },
    }),
    ...baseConfig.plugins,
  ],
}
