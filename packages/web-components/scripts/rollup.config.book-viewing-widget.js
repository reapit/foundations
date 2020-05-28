import svelte from 'rollup-plugin-svelte'
import baseConfig from './rollup.config.base'
import replace from '@rollup/plugin-replace'
import path from 'path'
import generateRollupOutput from './generate-rollup-output'
import generateCssOutput from './generate-css-output'
import themesConfigurations from './rollup.config.themes.js'

const config = require(path.resolve(__dirname, '..', 'config.json'))
const production = !process.env.ROLLUP_WATCH

export const baseConfigurationWithoutTheme = {
  ...baseConfig,
  input: 'src/book-viewing-widget/client/core/index.ts',
  output: generateRollupOutput({ production, fileName: 'book-viewing-widget', name: 'bookViewingWidget' }),
  plugins: [
    svelte({
      dev: !production,
      css: css => generateCssOutput({ css, fileName: 'book-viewing-widget.css', production }),
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(config.NODE_ENV),
    }),
    ...baseConfig.plugins,
  ],
}
const configurations = [baseConfigurationWithoutTheme]

if (!production) {
  configurations.push(themesConfigurations)
}

export default configurations
