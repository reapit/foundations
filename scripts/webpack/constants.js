const PATHS = {
  src: `${process.cwd()}/src`,
  entryWeb: `${process.cwd()}/src/core/index.tsx`,
  config: `${process.cwd()}/../../reapit-config.json`,
  template: `${process.cwd()}/public/index.html`,
  tsConfig: `${process.cwd()}/tsconfig.json`,
  logo: `${process.cwd()}/public/logo.png`,
  output: `${process.cwd()}/public/dist`,
  elementsSass: `${process.cwd()}/../elements/src/styles/**.scss`,
}

module.exports = {
  PATHS,
}
