import scss from 'rollup-plugin-scss'
import purify from 'purify-css'

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
    ],
  },
]
