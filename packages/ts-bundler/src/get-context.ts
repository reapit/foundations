import fs from 'fs'
import path from 'path'
import os from 'os'

import { Context } from './ts-bundler'
import { getWorkspaceRoot } from './get-workspace-root'

type TSConfig = { compilerOptions?: { outDir?: string; paths?: Record<string, string> } }

export const getContext = (): Context => {
  const tsConfig: TSConfig = JSON.parse(fs.readFileSync(path.resolve('tsconfig.json'), 'utf-8'))
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

  const mn = Object.keys(paths)
  const mnPath = mn.find((path) => path !== '@/*')

  if (!mnPath) {
    throw new Error('Could not find monorepo namespace')
  }

  const monorepoNamespace = mnPath.split('/*')[0]
  const mainModuleName = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf-8')).name

  // get subdirectory names
  const subdirs = fs
    .readdirSync(path.resolve(outDir))
    .filter((file) => fs.statSync(path.resolve(outDir, file)).isDirectory())

  console.log('Creating tmp directory')
  const tmpDir = fs.mkdtempSync([os.tmpdir(), mainModuleName.split('/').join('-') + '-build-'].join(path.sep))
  console.log(`Created tmp directory ${tmpDir}`)

  const { packagesRoot, repoRootLocation } = getWorkspaceRoot()

  const context = { mainModuleName, monorepoNamespace, outDir, tmpDir, subdirs, packagesRoot, repoRootLocation }

  return context
}
