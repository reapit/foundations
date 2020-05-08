import svelte from 'rollup-plugin-svelte'
import baseConfig from './rollup.config.base'
import replace from '@rollup/plugin-replace'
import path from 'path'
import generateRollupOutput from './generate-rollup-output'
import generateCssOutput from './generate-css-output'

const config = require(path.resolve(__dirname, '../..', 'config.json'))
const production = !process.env.ROLLUP_WATCH

export default {
  ...baseConfig,
  input: 'src/search-widget/client/core/index.ts',
  output: generateRollupOutput({ production, fileName: 'search-widget', name: 'searchWidget' }),
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(config.NODE_ENV),
      'process.env.APP_ENV': JSON.stringify(config.APP_ENV),
      'process.env.WEB_COMPONENT_API_BASE_URL_SEARCH_WIDGET': JSON.stringify(
        config.WEB_COMPONENT_API_BASE_URL_SEARCH_WIDGET,
      ),
      'process.env.GOOGLE_MAPS_API_KEY': JSON.stringify(config.GOOGLE_MAPS_API_KEY),
    }),
    svelte({
      dev: !production,
      css: css => generateCssOutput({ css, fileName: 'search-widget.css' }),
    }),
    ...baseConfig.plugins,
  ],
}
