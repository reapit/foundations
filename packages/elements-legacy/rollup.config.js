import linaria from '@linaria/rollup'
import css from 'rollup-plugin-css-only'
const scss = require('rollup-plugin-scss')
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import svgr from '@svgr/rollup'
import { appendFileSync } from 'fs'

export default [
  {
    input: './src/index.tsx',
    output: {
      dir: './dist/esm',
      format: 'esm',
      sourcemap: true,
    },
    external: [
      '@linaria/core',
      '@linaria/react',
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'react-is',
      'react-table',
      'pell',
    ],
    plugins: [
      resolve({
        browser: true,
      }),
      commonjs({
        exclude: ['../../node_modules/lodash-es/*'],
      }),
      typescript({
        tsconfig: './tsconfig.esm.json',
      }),
      linaria({
        sourceMap: process.env.NODE_ENV !== 'production',
      }),
      scss({
        output: './dist/index.css',
      }),
      css({
        output: false,
      }),
      babel({
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                chrome: '69',
              },
              useBuiltIns: 'usage',
              corejs: 3,
            },
          ],
        ],
        extensions: ['.ts', '.tsx'],
        babelHelpers: 'runtime',
        plugins: ['@babel/plugin-transform-runtime'],
      }),
      svgr({ icon: true }),
      terser(),
    ],
  },
  {
    input: './src/index.tsx',
    output: {
      dir: './dist/cjs',
      format: 'cjs',
      sourcemap: true,
    },
    external: [
      '@linaria/core',
      '@linaria/react',
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'react-is',
      'react-table',
      'pell',
    ],
    plugins: [
      resolve({
        browser: true,
      }),
      commonjs({
        exclude: ['../../node_modules/lodash-es/*'],
      }),
      typescript({
        tsconfig: './tsconfig.cjs.json',
      }),
      linaria({
        sourceMap: process.env.NODE_ENV !== 'production',
      }),
      css({
        output(styles) {
          appendFileSync('./dist/index.css', styles)
        },
      }),
      scss({
        output: false,
      }),
      babel({
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                chrome: '69',
              },
              useBuiltIns: 'usage',
              corejs: 3,
            },
          ],
        ],
        extensions: ['.ts', '.tsx'],
        babelHelpers: 'runtime',
        plugins: ['@babel/plugin-transform-runtime'],
      }),
      svgr({ icon: true }),
      terser(),
    ],
  },
]
