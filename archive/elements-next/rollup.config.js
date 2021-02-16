import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel'
import scss from 'rollup-plugin-scss'
import linaria from 'linaria/rollup'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'

const globals = {
  react: 'react',
  'react-dom': 'react-dom',
  'react-router-dom': 'react-router-dom',
}

export default {
  input: 'src/index.ts',
  output: [
    {
      format: 'cjs',
      name: 'elements-cjs',
      file: './dist/elements.cjs.js',
      globals,
    },
    {
      format: 'es',
      name: 'elements-esm',
      file: './dist/elements.esm.js',
      globals,
    },
  ],
  plugins: [
    resolve({
      browser: true,
    }),
    postcss({
      plugins: [autoprefixer()],
    }),
    commonjs(),
    json(),
    typescript(),
    // use Babel here to transpile @ alias from the styles and components which linaria cannot understanding the alias
    babel({
      exclude: /node_modules/,
      extensions: ['.ts', '.tsx'],
      babelHelpers: 'bundled',
      plugins: [
        [
          'module-resolver',
          {
            alias: {
              '@': './src',
            },
          },
        ],
      ],
    }),
    linaria(),
    scss({
      output: 'dist/index.css',
    }),
    babel({
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
        '@babel/preset-react',
        'linaria/babel',
      ],
      exclude: /node_modules/,
      include: /node_modules\/(linaria)/,
      extensions: ['.js', '.jsx'],
      babelHelpers: 'runtime',
      plugins: ['@babel/plugin-transform-runtime'],
    }),
    terser(),
  ],
}
