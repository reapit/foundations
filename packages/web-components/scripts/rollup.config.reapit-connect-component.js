import svelte from 'rollup-plugin-svelte'
import baseConfig from './rollup.config.base'
import replace from '@rollup/plugin-replace'
import path from 'path'
import generateRollupOutput from './generate-rollup-output'
import autoPreprocess from 'svelte-preprocess'

const config = require(path.resolve(__dirname, '..', 'config.json'))
const production = !process.env.ROLLUP_WATCH

export const baseConfigurationWithoutTheme = {
  ...baseConfig,
  input: 'src/reapit-connect-component/index.ts',
  output: generateRollupOutput({
    production,
    fileName: 'reapit-connect-component',
    name: 'reaptConnectComponent',
  }),
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(config.NODE_ENV),
      'process.env.APP_ENV': JSON.stringify(config.APP_ENV),
    }),
    svelte({
      dev: !production,
      preprocess: autoPreprocess(),
    }),
    ...baseConfig.plugins,
  ],
}
const configurations = [baseConfigurationWithoutTheme]

export default configurations
