import path from 'path'
import fs from 'fs'

import { Context } from './ts-bundler'

export const processWorkspaceDeps = ({ subdirs, outDir, packagesRoot, monorepoNamespace }: Context) => {
  const toCopy: string[] = []

  subdirs.forEach((moduleName) => {
    console.log(`Processing ${moduleName}`)
    const moduleBuildDir = path.resolve(outDir, moduleName)
    const moduleSourceDir = path.resolve(packagesRoot, moduleName)

    const pkgJson = path.resolve(moduleSourceDir, 'package.json')
    const pkg = fs.readFileSync(pkgJson, 'utf8')

    const modulePkg = JSON.parse(pkg)
    modulePkg.dependencies &&
      Object.keys(modulePkg.dependencies).forEach((depName) => {
        if (depName.startsWith(monorepoNamespace)) {
          const depModuleDir = depName.split('/')[1]
          if (!subdirs.includes(depModuleDir)) {
            toCopy.push(depModuleDir)
          }
        }
      })
    delete modulePkg.devDependencies
    modulePkg.main = modulePkg.main.replace('.ts', '.js')
    const builtPkgJson = path.resolve(moduleBuildDir, 'package.json')
    fs.writeFileSync(builtPkgJson, JSON.stringify(modulePkg, null, 2))
    console.log(`Processed ${moduleName}`)
  })

  const uniqueToCopy = [...new Set(toCopy)]
  return uniqueToCopy
}
