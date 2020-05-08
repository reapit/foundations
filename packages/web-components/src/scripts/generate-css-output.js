const path = require('path')

const generateCssOutput = ({ css, fileName }) => {
  css.write(path.resolve(__dirname, `../../public/dist-npm/css/${fileName}`))
  css.write(path.resolve(__dirname, `../../public/dist/${fileName}`))
}

export default generateCssOutput
