const webpack = require('webpack')
const buildConfiguration = require('./webpack.base.prod')
const { buildElementScss } = require('./build-element-scss')
buildElementScss()

const compiler = webpack(buildConfiguration)

compiler.run((err, stats) => {
  if (err) {
    throw err
  }

  console.log(
    stats.toString({
      colors: true,
    }),
  )
})
