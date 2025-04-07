import fs from 'fs-extra'
import path from 'path'
import os from 'os'

import { Context } from './ts-bundler'
import { getWorkspaceRoot } from './get-workspace-root'
import { readStateFile } from './state-file'

type TSConfig = { compilerOptions?: { outDir?: string; paths?: Record<string, string> } }

const getSubdirs = ({
  outDir,
  packagesRoot,
  mainModuleName,
}: Pick<Context, 'outDir' | 'packagesRoot' | 'mainModuleName'>): string[] => {
  let isSingularDir = true
  let subdirs: string[] = []
  while (isSingularDir) {
    subdirs = fs
      .readdirSync(path.resolve(outDir))
      .filter((file) => fs.statSync(path.resolve(outDir, file)).isDirectory())

    isSingularDir = subdirs.length === 1 && subdirs[0] === 'src'

    if (isSingularDir) {
      const contents = fs.readdirSync(`${packagesRoot}/${mainModuleName}/${outDir}`)

      contents.forEach((dirOrFile) => {
        fs.moveSync(
          path.resolve(`${packagesRoot}/${mainModuleName}/${outDir}/${dirOrFile}`),
          path.resolve(`${packagesRoot}/${mainModuleName}/${outDir}/${mainModuleName}/${dirOrFile}`),
        )
      })
    }
  }
  return subdirs
}

export const getContext = (relModuleDir: string = '.', isIncremental?: boolean): Context => {
  const tsConfig: TSConfig = JSON.parse(fs.readFileSync(path.resolve(relModuleDir, 'tsconfig.json'), 'utf-8'))
  if (!tsConfig) {
    throw new Error('Could not parse tsconfig.json')
  }
  if (!tsConfig.compilerOptions) {
    throw new Error('tsconfig.json does not contain compilerOptions')
  }
  const { compilerOptions } = tsConfig
  const { outDir, paths } = compilerOptions
  if (!outDir) {
    throw new Error('tsconfig.json does not contain outDir')
  }
  if (!paths) {
    throw new Error('tsconfig.json does not contain paths')
  }

  const mainModuleName = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf-8')).name

  const { packagesRoot, repoRootLocation } = getWorkspaceRoot(relModuleDir)

  // get subdirectory names
  const subdirs = getSubdirs({
    outDir,
    mainModuleName,
    packagesRoot,
  })

  console.log('Creating tmp directory')
  const tmpDir = fs.mkdtempSync([os.tmpdir(), mainModuleName.split('/').join('-') + '-build-'].join(path.sep))
  console.log(`Created tmp directory ${tmpDir}`)

  const moduleDir = path.resolve(relModuleDir)
  let previousIncrementalState
  if (isIncremental) {
    previousIncrementalState = readStateFile(moduleDir)
  }

  return {
    mainModuleName,
    outDir,
    tmpDir,
    subdirs,
    packagesRoot,
    repoRootLocation,
    previousIncrementalState,
    isIncremental,
    moduleDir,
  }
}
