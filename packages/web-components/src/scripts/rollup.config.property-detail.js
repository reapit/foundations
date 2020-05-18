import svelte from 'rollup-plugin-svelte'
import baseConfig from './rollup.config.base'
import replace from '@rollup/plugin-replace'
import path from 'path'
import generateRollupOutput from './generate-rollup-output'
import generateCssOutput from './generate-css-output'
import themesConfiguration from './rollup.config.themes.js'
import { baseConfigurationWithoutTheme as viewBookinConfiguration } from './rollup.config.viewing-booking.js'

const config = require(path.resolve(__dirname, '../..', 'config.json'))
const production = !process.env.ROLLUP_WATCH

export const baseConfigurationWithoutTheme = {
  ...baseConfig,
  input: 'src/property-detail/client/core/index.ts',
  output: generateRollupOutput({ production, fileName: 'property-detail', name: 'propertyDetail' }),
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
      css: css => generateCssOutput({ css, fileName: 'property-detail.css', production }),
    }),
    ...baseConfig.plugins,
  ],
}
const configurations = [baseConfigurationWithoutTheme]

if (!production) {
  configurations.push(themesConfiguration, viewBookinConfiguration)
}

export default configurations
