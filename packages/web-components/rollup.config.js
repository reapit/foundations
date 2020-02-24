import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import typescript from '@wessberg/rollup-plugin-ts'
import babel from 'rollup-plugin-babel'

const svelteOptions = require('./svelte.config')
const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/search-widget/main.ts',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js',
  },
  plugins: [
    svelte({
      ...svelteOptions,
      dev: !production,
      css: css => {
        css.write('public/bundle.css')
      },
    }),
    resolve({
      browser: true,
      dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/'),
    }),
    commonjs(),
    typescript(),
    !production && livereload('public'),
    babel({
      extensions: ['.js', '.mjs', '.html', '.svelte'],
      runtimeHelpers: true,
      exclude: ['node_modules/@babel/**', '../../node_modules/@babel/**', 'node_modules/core-js/**', '../../node_modules/core-js/**'],
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              ie: '11',
            },
            useBuiltIns: 'usage',
            corejs: 3,
          },
        ],
      ],
    }),
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
}
