import svelte from 'rollup-plugin-svelte'
import baseConfig from './rollup.config.base'
import replace from '@rollup/plugin-replace'
import path from 'path'

const config = require(path.resolve(__dirname, '../..', 'config.json'))
const production = !process.env.ROLLUP_WATCH

export default {
  ...baseConfig,
  input: 'src/appointment-bookings/client/core/index.ts',
  output: {
    sourcemap: !production,
    format: 'iife',
    name: 'app',
    file: './public/dist/appointment-bookings.js',
  },
  plugins: [
    svelte({
      dev: !production,
      css: css => {
        css.write('./public/dist/appointment-bookings.css')
      },
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(config.NODE_ENV),
    }),
    ...baseConfig.plugins,
  ],
}
