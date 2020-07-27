import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import typescript from '@rollup/plugin-typescript'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'

const production = !process.env.ROLLUP_WATCH

export default {
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: true,
      dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/'),
    }),
    commonjs(),
    json(),
    globals(),
    builtins(),
    typescript({ sourceMap: !production }),
    babel({
      extensions: ['.js', 'ts', '.mjs', '.html', '.svelte'],
      runtimeHelpers: true,
      include: ['src/**', 'node_modules/svelte/**'],
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
    !production && livereload('public'),
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
}
