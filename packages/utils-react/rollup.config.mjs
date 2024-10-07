import linaria from '@wyw-in-js/rollup'
import css from 'rollup-plugin-css-only'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import url from '@rollup/plugin-url'
import { appendFileSync } from 'fs'
import { execSync } from 'child_process'
import svgr from '@svgr/rollup'

export default [
  {
    input: './src/index.ts',
    output: {
      dir: './dist/cjs',
      format: 'cjs',
      sourcemap: true,
    },
    external: ['@linaria/core', '@linaria/react', 'react', 'react-dom', '@sentry/react'],
    plugins: [
      resolve({
        browser: true,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.cjs.json',
      }),
      linaria({
        sourceMap: process.env.NODE_ENV !== 'production',
      }),
      css({
        output(styles) {
          execSync('mkdir ./dist')
          appendFileSync('./dist/index.css', styles)
        },
      }),
      babel({
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'usage',
              corejs: 3,
            },
          ],
        ],
        extensions: ['.ts', '.tsx'],
        babelHelpers: 'runtime',
        plugins: ['@babel/plugin-transform-runtime'],
      }),
      url(),
      svgr({ icon: true }),
      terser(),
    ],
  },
  {
    input: './src/index.ts',
    output: {
      dir: './dist/esm',
      format: 'esm',
      sourcemap: true,
    },
    external: ['@linaria/core', '@linaria/react', 'react', 'react-dom', '@sentry/react'],
    plugins: [
      resolve({
        browser: true,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.esm.json',
      }),
      linaria({
        sourceMap: process.env.NODE_ENV !== 'production',
      }),
      css({
        output: false,
      }),
      babel({
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'usage',
              corejs: 3,
            },
          ],
        ],
        extensions: ['.ts', '.tsx'],
        babelHelpers: 'runtime',
        plugins: ['@babel/plugin-transform-runtime'],
      }),
      url(),
      svgr({ icon: true }),
      terser(),
    ],
  },
]
