const path = require('path')

const { processYarnLock } = require('./yarn-lock')
const { processWorkspaceDeps } = require('./workspace-deps')
const { getWorkspaceRoot } = require('./get-workspace-root')
const { resolveRequires } = require('./resolve-requires')
const { getContext } = require('./get-context')
const { execSync } = require('./utils')

const { packagesRoot, repoRootLocation } = getWorkspaceRoot()
const context = {
  ...getContext(),
  packagesRoot,
  repoRootLocation,
}

const { subdirs, mainModuleName, buildDir, tmpDir } = context

console.log(`Starting bundle of ${mainModuleName}`)

console.log(`Found ${subdirs.length} modules including ${mainModuleName}`)

console.log('Resolving paths in built code')
resolveRequires(context)
console.log('Resolved paths')

const toCopy = processWorkspaceDeps(context)
console.log(`Found ${toCopy.length} modules to copy without processing`)

toCopy.forEach((moduleName) => {
  console.log(`Copying without processing ${moduleName}`)
  const moduleSourceDir = path.resolve(packagesRoot, moduleName)
  execSync(`cp -r ${moduleSourceDir} ${buildDir}`)
  console.log(`Copied ${moduleName}`)
})

const packagesDir = path.resolve(tmpDir, 'packages')

console.log('Creating packages directory')
execSync(`mkdir ${packagesDir}`)
console.log('Created packages directory')

console.log('Copying build directory contents to packages directory')
execSync(`cp -r ${buildDir}/* ${packagesDir}`)
console.log('Copied build directory contents to packages directory')

console.log('Processing root yarn.lock')
const yarnLockLocation = path.resolve(repoRootLocation, 'yarn.lock')
processYarnLock(yarnLockLocation, context)
console.log('Processed root yarn.lock to tmp directory')

const dotYarnLocation = path.resolve(repoRootLocation, '.yarn')
const mainPkgJsonLocation = path.resolve(repoRootLocation, 'package.json')
const yarnRcLocation = path.resolve(repoRootLocation, '.yarnrc.yml')

console.log('Copying root package.json to tmp directory')
execSync(`cp ${mainPkgJsonLocation} ${tmpDir}`)
console.log('Copied root package.json to tmp directory')

console.log('Copying root .yarn to tmp directory')
execSync(`cp -r ${dotYarnLocation} ${tmpDir}`)
console.log('Copied root .yarn to tmp directory')

console.log('Copying root .yarnrc.yml to tmp directory')
execSync(`cp -r ${yarnRcLocation} ${tmpDir}`)
console.log('Copied root .yarnrc.yml to tmp directory')

console.log(`Running yarn in ${tmpDir}`)
execSync(`cd ${tmpDir} && yarn`)
console.log(`Ran yarn in ${tmpDir}`)

console.log('Removing .yarn directory')
execSync(`rm -rf ${tmpDir}/.yarn`)
console.log('Removed .yarn directory')

console.log('Zipping bundle')
execSync(`zip -q -r bundle.zip ${tmpDir}`)
console.log('Zipped bundle')
