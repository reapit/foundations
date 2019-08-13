
import scss from 'rollup-plugin-scss'
import purify from 'purify-css'

export default [
  {
    input: 'src/styles/index.scss',
    output: {
      name: 'index',
      format: 'es'
    },
    plugins: [
      scss({
        output: (styles, styleNodes) => {
          const content = ['./public/**/*.js']
          const options = {
            output: 'public/index.css',
            minify: true,
            rejected: true
          }

          purify(content, styles, options)
        }
      })
    ]
  }
]
