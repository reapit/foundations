import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import typescript from '@wessberg/rollup-plugin-ts'
import babel from 'rollup-plugin-babel'
import replace from '@rollup/plugin-replace'

const env = require('./get-env')()

export default {
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
    }),
    resolve({
      browser: true,
      dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/'),
    }),
    commonjs(),
    typescript(),
    babel({
      extensions: ['.js', '.ts', '.mjs', '.html', '.svelte'],
      runtimeHelpers: true,
      exclude: [
        'node_modules/@babel/**',
        '../../node_modules/@babel/**',
        'node_modules/core-js/**',
        '../../node_modules/core-js/**',
      ],
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
    !process.env.NODE_ENV === 'production' && livereload('public'),
    process.env.NODE_ENV === 'production' && terser(),
  ],
  watch: {
    clearScreen: false,
  },
}
