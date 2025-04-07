import path from 'path'

import { processYarnLock } from './yarn-lock'
import { processWorkspaceDeps } from './workspace-deps'
import { resolveRequires } from './resolve-requires'
import { getContext } from './get-context'
import { execSync } from './utils'
import { removeDeps } from './remove-deps'
import { IncrementalState, writeStateFile } from './state-file'
import { generateHashFromFile } from './hash-file'

export type Context = {
  packagesRoot: string
  repoRootLocation: string
  mainModuleName: string
  moduleDir: string
  outDir: string
  tmpDir: string
  subdirs: string[]
  isIncremental?: boolean
  previousIncrementalState?: IncrementalState
}

const zipBundle = (tmpDir: string) => {
  console.log('Zipping bundle')
  execSync('rm -rf bundle.zip')
  execSync(`cd ${tmpDir} && zip -q -r ${path.resolve('bundle.zip')} .`)
  console.log('Zipped bundle, size:')
  execSync(`du -h ${path.resolve('bundle.zip')}`)
}

const finalize = (context: Context, codeHash: string, yarnLockHash: string) => {
  if (context.isIncremental) {
    writeStateFile(context, {
      codeHash,
      yarnLockHash,
    })
  } else {
    console.log('Removing tmp directory')
    execSync(`rm -rf ${context.tmpDir}`)
    console.log('Removed tmp directory')
  }

  console.log('✨ Bundle complete ✨')
}

type Config = {
  relModuleDir?: string
  isIncremental?: boolean
}

export const bundle = ({ relModuleDir, isIncremental }: Config) => {
  const context = getContext(relModuleDir, isIncremental)

  const { subdirs, mainModuleName, outDir, tmpDir, packagesRoot, repoRootLocation, previousIncrementalState } = context

  console.log(`Starting ${isIncremental ? 'incremental ' : ''}bundle of ${mainModuleName}`)

  console.log(`Found ${subdirs.length} modules including ${mainModuleName}`)

  console.log('Resolving paths in built code')
  const codeHash = resolveRequires(context)
  console.log('Resolved paths')

  console.log('Generating yarn.lock hash')
  const yarnLockLocation = path.resolve(repoRootLocation, 'yarn.lock')
  const yarnLockHash = generateHashFromFile(yarnLockLocation)

  if (isIncremental && !previousIncrementalState) {
    console.log('No previous incremental state found, performing full bundle')
  }

  let skipYarnInstall = false

  if (isIncremental && previousIncrementalState) {
    console.log('Previous incremental state found, performing incremental bundle')
    const { codeHash: prevCodeHash, yarnLockHash: prevYarnLockHash } = previousIncrementalState
    const codeIdentical = codeHash === prevCodeHash
    const yarnLockIdentical = yarnLockHash === prevYarnLockHash

    if (codeIdentical && yarnLockIdentical) {
      console.log('Code and yarn.lock are identical, zipping previous bundle')
      zipBundle(previousIncrementalState.prevContext.tmpDir)
      finalize(context, codeHash, yarnLockHash)
      return
    }
    if (yarnLockIdentical) {
      // yarn.lock is identical, but code has changed
      // copy the previous bundle from tmpDir
      console.log('Code has changed but yarn.lock identical, copying previous bundle')
      execSync(`rmdir ${tmpDir}`)
      execSync(`cp -r ${previousIncrementalState.prevContext.tmpDir} ${tmpDir}`)
      console.log('Copied previous bundle')
      skipYarnInstall = true
    }
    if (codeIdentical) {
      console.log('Code is identical but yarn.lock has changed, performing full bundle')
      // code is identical, but yarn.lock has changed
      // perform normal process
    }
  }

  const newPackagesDir = path.resolve(tmpDir, 'packages')

  console.log('Creating packages directory')
  execSync(`mkdir -p ${newPackagesDir}`)
  console.log('Created packages directory')

  console.log('Copying build directory contents to packages directory')
  execSync(`cp -r ${outDir}/* ${newPackagesDir}`)
  console.log('Copied build directory contents to packages directory')
  const toCopy = processWorkspaceDeps(context)
  console.log(`Found ${toCopy.length} modules to copy without processing`)

  toCopy.forEach((moduleName) => {
    console.log(`Copying without processing ${moduleName}`)
    const moduleSourceDir = path.resolve(packagesRoot, moduleName)
    execSync(`cp -r ${moduleSourceDir} ${newPackagesDir}`)
    execSync(`rm -rf ${path.resolve(newPackagesDir, moduleName, 'node_modules')}`)
    removeDeps(path.resolve(newPackagesDir, moduleName))
    console.log(`Copied ${moduleName}`)
  })

  console.log('Processing root yarn.lock')
  processYarnLock(yarnLockLocation, context)
  console.log('Processed root yarn.lock to tmp directory')

  const dotYarnLocation = path.resolve(repoRootLocation, '.yarn')
  const mainPkgJsonLocation = path.resolve(repoRootLocation, 'package.json')
  const yarnRcLocation = path.resolve(repoRootLocation, '.yarnrc.yml')

  console.log('Copying root package.json to tmp directory')
  execSync(`cp ${mainPkgJsonLocation} ${tmpDir}`)
  console.log('Copied root package.json to tmp directory')

  console.log('Removing deps and scripts from root package.json')
  removeDeps(tmpDir, true)
  console.log('Removed deps and scripts from root package.json')

  console.log('Copying root .yarn to tmp directory')
  execSync(`cp -r ${dotYarnLocation} ${tmpDir}`)
  console.log('Copied root .yarn to tmp directory')

  console.log('Copying root .yarnrc.yml to tmp directory')
  execSync(`cp -r ${yarnRcLocation} ${tmpDir}`)
  console.log('Copied root .yarnrc.yml to tmp directory')

  if (!skipYarnInstall) {
    console.log(`Running yarn in ${tmpDir}`)
    // https://github.com/yarnpkg/berry/issues/2948
    // https://github.com/renovatebot/renovate/discussions/9481?sort=old#discussioncomment-660412
    execSync(`cd ${tmpDir} && YARN_ENABLE_IMMUTABLE_INSTALLS=false yarn`)
    console.log(`Ran yarn in ${tmpDir}`)
  } else {
    console.log('Skipping yarn install')
  }

  console.log('Removing .yarn directory')
  execSync(`rm -rf ${tmpDir}/.yarn`)
  console.log('Removed .yarn directory')

  console.log('Readding copy-only packages package.jsons')
  toCopy.forEach((moduleName) => {
    console.log(`Copying ${moduleName} package.json`)
    const moduleSourceDirPkgJson = path.resolve(packagesRoot, moduleName, 'package.json')
    const moduleDestDir = path.resolve(newPackagesDir, moduleName)
    execSync(`cp -f ${moduleSourceDirPkgJson} ${moduleDestDir}`)
    console.log(`Copied ${moduleName} package.json`)
  })

  zipBundle(tmpDir)

  finalize(context, codeHash, yarnLockHash)
}
