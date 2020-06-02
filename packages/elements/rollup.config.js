import scss from 'rollup-plugin-scss'
import linaria from 'linaria/rollup'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'

export default [
  {
    input: 'src/index.tsx',
    output: {
      name: 'index',
      format: 'es',
    },
    context: '{}',
    plugins: [
      resolve({
        preferBuiltins: false,
        browser: true,
      }),
      commonjs(),
      // Not using to bundle typescript but I need to parse the TS so I can extract the linaria styles
      typescript({
        noEmit: true,
      }),
      linaria({
        sourceMap: process.env.NODE_ENV !== 'production',
        evaluate: true,
      }),
      scss({
        output: 'dist/index.css',
      }),
    ],
  },
]
