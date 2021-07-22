import linaria from '@linaria/rollup'
import css from 'rollup-plugin-css-only'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import svgr from '@svgr/rollup'

export default {
  input: './src/index.ts',
  output: {
    dir: './dist',
    format: 'cjs',
    sourcemap: true,
  },
  external: ['@linaria/core', '@linaria/react', 'react', 'react-dom'],
  plugins: [
    resolve({
      browser: true,
    }),
    commonjs(),
    typescript(),
    linaria({
      sourceMap: process.env.NODE_ENV !== 'production',
    }),
    css({
      output: 'index.css',
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
}
