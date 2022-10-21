const path = require('path')

const PATHS = {
  src: `${process.cwd()}/src`,
  entryWeb: `${process.cwd()}/src/core/index.tsx`,
  template: `${process.cwd()}/public/index.html`,
  tsConfig: `${process.cwd()}/tsconfig.json`,
  logo: `${process.cwd()}/public/logo.svg`,
  output: `${process.cwd()}/public/dist`,
  cacheWebpackDir: `${process.cwd()}/.webpack-cache`,
}

module.exports = {
  PATHS,
}
