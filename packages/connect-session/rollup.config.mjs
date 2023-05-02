// import linaria from '@linaria/rollup'
// import css from 'rollup-plugin-css-only'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
// import svgr from '@svgr/rollup'
// import url from '@rollup/plugin-url'
// import { appendFileSync } from 'fs'
// import { execSync } from 'child_process'

export default [
  {
    input: './src/index.ts',
    output: {
      dir: './dist/cjs',
      format: 'cjs',
      sourcemap: true,
    },
    external: ['react', 'react-dom'],
    plugins: [
      resolve({
        browser: true,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.cjs.json',
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
    external: ['react', 'react-dom'],
    plugins: [
      resolve({
        browser: true,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.esm.json',
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
      terser(),
    ],
  },
]
