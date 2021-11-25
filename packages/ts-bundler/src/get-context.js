const fs = require('fs')
const path = require('path')
const os = require('os')

const getContext = () => {
  const tsConfig = JSON.parse(fs.readFileSync(path.resolve('tsconfig.json')))
  const buildDir = tsConfig.compilerOptions.outDir
  const monorepoNamespace = Object.keys(tsConfig.compilerOptions.paths)
    .find((path) => path !== '@/*')
    .split('/*')[0]
  const mainModuleName = JSON.parse(fs.readFileSync(path.resolve('package.json'))).name

  // get subdirectory names
  const subdirs = fs
    .readdirSync(path.resolve(buildDir))
    .filter((file) => fs.statSync(path.resolve(buildDir, file)).isDirectory())

  console.log('Creating tmp directory')
  const tmpDir = fs.mkdtempSync([os.tmpdir(), mainModuleName + '-build-'].join(path.sep))
  console.log(`Created tmp directory ${tmpDir}`)

  const context = { mainModuleName, monorepoNamespace, buildDir, tmpDir, subdirs }

  return context
}

module.exports = {
  getContext,
}
