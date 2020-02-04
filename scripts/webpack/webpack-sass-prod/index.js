// flows
// glob the tsx, ts of src of elements/src
// build elements scss-es in a single css
// purge it against contents of files in {1}
// webpack sass config's entry will be tweaked
// dev: include elements/src/styles/index.scss
// the prod script will:
// execute 1,2,3
// collect CSS to scripts/webpack/webpack-sass-prod/.temp/index.css
// Add index.css to the entry of sass prod build script

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
