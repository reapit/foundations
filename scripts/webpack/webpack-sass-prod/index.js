const webpack = require('webpack')
const buildConfiguration = require('./build-configuration')
const buildElementScss = require('./build-element-scss')

// build multiple scss-es into a singlae css file in .temp/index.css
buildElementScss()

// https://webpack.js.org/api/node/
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
