import css from 'rollup-plugin-css-only'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import svgr from '@svgr/rollup'
import svelte from 'rollup-plugin-svelte'
import autoPreprocess from 'svelte-preprocess'
import json from '@rollup/plugin-json'
import nodePolyfills from 'rollup-plugin-node-polyfills'

export default [
  {
    input: './src/index.ts',
    output: {
      dir: './dist/cjs',
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      json(),
      svelte({
        include: 'src/components/**/*.svelte',
        preprocess: autoPreprocess(),
        emitCss: false,
        compilerOptions: {
          generate: 'dom',
          customElement: false,
        },
      }),
      nodePolyfills(),
      resolve({
        preferBuiltins: false,
        browser: true,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.cjs.json',
      }),
      css(),
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
    input: './src/index.ts',
    output: {
      dir: './dist/esm',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      json(),
      svelte({
        include: 'src/components/**/*.svelte',
        preprocess: autoPreprocess(),
        emitCss: false,
        compilerOptions: {
          generate: 'dom',
          customElement: false,
        },
      }),
      nodePolyfills(),
      resolve({
        preferBuiltins: false,
        browser: true,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.esm.json',
      }),
      css(),
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
    input: './src/index.ts',
    output: {
      dir: './dist/umd',
      format: 'umd',
      name: 'index.js',
      sourcemap: true,
    },
    plugins: [
      json(),
      svelte({
        include: 'src/components/**/*.svelte',
        preprocess: autoPreprocess(),
        emitCss: false,
        compilerOptions: {
          generate: 'dom',
          customElement: false,
        },
      }),
      nodePolyfills(),
      resolve({
        preferBuiltins: false,
        browser: true,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.umd.json',
      }),
      css(),
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
