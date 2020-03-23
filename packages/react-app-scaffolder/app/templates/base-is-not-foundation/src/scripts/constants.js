const PATHS = {
  src: `${process.cwd()}/src`,
  entryWeb: `${process.cwd()}/src/core/index.tsx`,
  template: `${process.cwd()}/public/index.html`,
  tsConfig: `${process.cwd()}/tsconfig.json`,
  logo: `${process.cwd()}/public/logo.png`,
  output: `${process.cwd()}/public/dist`,
  elementsSass: `${process.cwd()}/../elements/src/styles/**.scss`,
  elementsIndexSass: `${process.cwd()}/../elements/src/styles/index.scss`,
}

module.exports = {
  PATHS,
}
