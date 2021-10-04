import linaria from '@linaria/rollup'
import css from 'rollup-plugin-css-only'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import svgr from '@svgr/rollup'
import { appendFileSync } from 'fs'
import { execSync } from 'child_process'
import svelte from 'rollup-plugin-svelte'
import autoPreprocess from 'svelte-preprocess'
import json from '@rollup/plugin-json'
import { transformSync } from 'esbuild'

export default [
  {
    input: './src/index.ts',
    output: {
      dir: './dist/cjs',
      format: 'cjs',
      sourcemap: true,
    },
    external: ['@linaria/core', '@linaria/react', 'react', 'react-dom'],
    plugins: [
      json(),
      svelte({
        include: 'src/components/**/*.svelte',
        // preprocess: {
        //   style: ({ content }) => {
        //     return transformStyles(content)
        //   }
        // },
        preprocess: autoPreprocess({
          /* options available https://github.com/sveltejs/svelte-preprocess/blob/master/docs/preprocessing.md */
          typescript({ content }) {
            const { code, map } = transformSync(content, {
              loader: 'ts',
            });
            return { code, map };
          },
        }),
        emitCss: false,
        compilerOptions: {
          generate: 'dom',
          customElement: false,
        },
      }),
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
    external: ['@linaria/core', '@linaria/react', 'react', 'react-dom'],
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
