import path from 'path'

import { processYarnLock } from './yarn-lock'
import { processWorkspaceDeps } from './workspace-deps'
import { resolveRequires } from './resolve-requires'
import { getContext } from './get-context'
import { execSync } from './utils'
import { removeDeps } from './remove-deps'

export type Context = {
  packagesRoot: string
  repoRootLocation: string
  mainModuleName: string
  monorepoNamespace: string
  outDir: string
  tmpDir: string
  subdirs: string[]
}

export const bundle = () => {
  const context = getContext()

  const { subdirs, mainModuleName, outDir, tmpDir, packagesRoot, repoRootLocation } = context

  console.log(`Starting bundle of ${mainModuleName}`)

  console.log(`Found ${subdirs.length} modules including ${mainModuleName}`)

  console.log('Resolving paths in built code')
  resolveRequires(context)
  console.log('Resolved paths')

  const packagesDir = path.resolve(tmpDir, 'packages')

  console.log('Creating packages directory')
  execSync(`mkdir ${packagesDir}`)
  console.log('Created packages directory')

  console.log('Copying build directory contents to packages directory')
  execSync(`cp -r ${outDir}/* ${packagesDir}`)
  console.log('Copied build directory contents to packages directory')

  const toCopy = processWorkspaceDeps(context)
  console.log(`Found ${toCopy.length} modules to copy without processing`)

  toCopy.forEach((moduleName) => {
    console.log(`Copying without processing ${moduleName}`)
    const moduleSourceDir = path.resolve(packagesRoot, moduleName)
    execSync(`cp -r ${moduleSourceDir} ${packagesDir}`)
    execSync(`rm -rf ${path.resolve(packagesDir, moduleName, 'node_modules')}`)
    removeDeps(path.resolve(packagesDir, moduleName))
    console.log(`Copied ${moduleName}`)
  })

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
  // https://github.com/yarnpkg/berry/issues/2948
  // https://github.com/renovatebot/renovate/discussions/9481?sort=old#discussioncomment-660412
  execSync(`cd ${tmpDir} && YARN_ENABLE_IMMUTABLE_INSTALLS=false yarn`)
  console.log(`Ran yarn in ${tmpDir}`)

  console.log('Removing .yarn directory')
  execSync(`rm -rf ${tmpDir}/.yarn`)
  console.log('Removed .yarn directory')

  console.log('Readding copy-only packages package.jsons')
  toCopy.forEach((moduleName) => {
    console.log(`Copying ${moduleName} package.json`)
    const moduleSourceDirPkgJson = path.resolve(packagesRoot, moduleName, 'package.json')
    const moduleDestDir = path.resolve(packagesDir, moduleName)
    execSync(`cp -f ${moduleSourceDirPkgJson} ${moduleDestDir}`)
    console.log(`Copied ${moduleName} package.json`)
  })

  console.log('Zipping bundle')
  execSync('rm -rf bundle.zip')
  execSync(`cd ${tmpDir} && zip -q -r ${path.resolve('bundle.zip')} *`)
  console.log('Zipped bundle')

  console.log('Removing tmp directory')
  execSync(`rm -rf ${tmpDir}`)
  console.log('Removed tmp directory')

  console.log('✨ Bundle complete ✨')
}
