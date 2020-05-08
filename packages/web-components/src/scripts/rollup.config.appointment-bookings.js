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
  input: 'src/appointment-bookings/client/core/index.ts',
  output: generateRollupOutput({ production, fileName: 'appointment-bookings', name: 'appointmentBookings' }),
  plugins: [
    svelte({
      dev: !production,
      css: css => generateCssOutput({ css, fileName: 'appointment-bookings.css' }),
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(config.NODE_ENV),
    }),
    ...baseConfig.plugins,
  ],
}
