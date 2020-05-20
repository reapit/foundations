const path = require('path')

const generateCssOutput = ({ css, fileName, production }) => {
  css.write(path.resolve(__dirname, `../public/dist/${fileName}`))
  if (production) {
    css.write(path.resolve(__dirname, `../public/dist-npm/css/${fileName}`))
  }
}

export default generateCssOutput
