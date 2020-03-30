import svelte from 'rollup-plugin-svelte'
import baseConfig from './rollup.config.base'

const production = !process.env.ROLLUP_WATCH

export default {
  ...baseConfig,
  input: 'src/appointment-planner/client/core/index.ts',
  output: {
    sourcemap: !production,
    format: 'iife',
    name: 'app',
    file: './public/dist/appointment-planner.js',
  },
  plugins: [
    svelte({
      dev: !production,
      css: css => {
        css.write('./public/dist/appointment-planner.css')
      },
    }),
    ...baseConfig.plugins,
  ],
}
