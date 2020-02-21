import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import typescript from '@wessberg/rollup-plugin-ts'
import buble from '@rollup/plugin-buble'

const svelteOptions = require('./svelte.config')

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/main.ts',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js',
    dir: 'public',
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
    buble(),
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
}
