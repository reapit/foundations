import svelte from 'rollup-plugin-svelte'
import baseConfig from './rollup.config.base'
import replace from '@rollup/plugin-replace'
import path from 'path'

const config = require(path.resolve(__dirname, '../..', 'config.json'))
const production = !process.env.ROLLUP_WATCH

export default {
  ...baseConfig,
  input: 'src/property-detail/client/core/index.ts',
  output: {
    sourcemap: !production,
    format: 'iife',
    name: 'app',
    file: './public/dist/property-detail.js',
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(config.NODE_ENV),
      'process.env.APP_ENV': JSON.stringify(config.APP_ENV),
      'process.env.WEB_COMPONENT_API_BASE_URL_SEARCH_WIDGET': JSON.stringify(
        config.WEB_COMPONENT_API_BASE_URL_SEARCH_WIDGET,
      ),
    }),
    svelte({
      dev: !production,
      css: css => {
        css.write('./public/dist/property-detail.css')
      },
    }),
    ...baseConfig.plugins,
  ],
}
