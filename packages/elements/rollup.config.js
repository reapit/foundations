import scss from 'rollup-plugin-scss'
import purify from 'purify-css'
import linaria from 'linaria/rollup'
import css from 'rollup-plugin-css-only'
import commonjs from 'rollup-plugin-commonjs'

// import in rollup doesn't work with common.js
const purifyOpions = require('./purify-options.js')

export default [
  {
    input: 'src/styles/index.scss',
    output: {
      name: 'index',
      format: 'es',
    },
    plugins: [
      scss({
        output: styles => {
          const content = ['./dist/elements.esm.js']
          purify(content, styles, purifyOpions)
        },
      }),
      linaria({
        sourceMap: process.env.NODE_ENV !== 'production',
        evaluate: true,
      }),
      css({
        output: 'styles.css',
      }),
      // Allow bundling cjs modules. Rollup doesn't understand cjs
      commonjs({
        namedExports: {
          '../../node_modules/linaria/react.js': ['styled', 'css'],
          '../../node_modules/react-is/index.js': ['isElement', 'isValidElementType', 'ForwardRef'],
        },
      }),
    ],
  },
]
