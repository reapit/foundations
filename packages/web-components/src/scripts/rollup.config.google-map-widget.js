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
  input: 'src/google-map/core/index.ts',
  output: {
    sourcemap: !production,
    format: 'iife',
    name: 'app',
    file: './public/dist/google-map-widget.js',
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(config.NODE_ENV),
      'process.env.REAPIT_ENV': JSON.stringify(config.REAPIT_ENV),
    }),
    svelte({
      ...svelteOptions,
      dev: !production,
      css: css => {
        css.write('./public/dist/google-map-widget.css')
      },
    }),
    ...baseConfig.plugins,
  ],
}
