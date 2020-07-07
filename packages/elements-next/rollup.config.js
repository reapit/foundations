import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel'
import scss from 'rollup-plugin-scss'
import linaria from 'linaria/rollup'
import typescript from 'rollup-plugin-typescript2'

const EXCLUDE_PACKAGES = ['linaria']

const generateRegexExcludePackages = () => {
  const listPackagesString = EXCLUDE_PACKAGES.join('|')
  return new RegExp(`node_modules/(?!(${listPackagesString})/).*`)
}

const globals = {
  'react-dom': 'react-dom',
  'react-router-dom': 'react-router-dom',
  'react-google-map': 'react-google-map',
  linaria: 'linaria',
  react: 'react',
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
    commonjs(),
    json(),
    typescript(),
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
      ],
      exclude: generateRegexExcludePackages(),
      extensions: ['.js', '.jsx'],
      babelHelpers: 'runtime',
      plugins: ['@babel/plugin-transform-runtime'],
    }),
    terser(),
  ],
}
