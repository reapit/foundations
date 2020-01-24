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
          const content = ['./dist/elements.esm.js']
          const options = {
            output: 'dist/index.css',
            minify: true,
            whitelist: [
              '*react-datepicker*',
              '*mt*',
              '*mb*',
              '*ml*',
              '*mr*',
              '*mx*',
              '*my*',
              '*pt*',
              '*pb*',
              '*pl*',
              '*pr*',
              '*px*',
              '*py*',
              '*flex*',
              '*justify*',
              '*items-center*',
              '*pin*',
              '*absolute*',
              '*relative*',
              '*capitalize*',
              'mw-100'
            ]
            // Uncomment this line if you want to see the CSS purified from the package
            // rejected: true
          }

          purify(content, styles, options)
        }
      })
    ]
  }
]
