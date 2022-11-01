import path from 'path'
import fs from 'fs-extra'


import { Context } from './ts-bundler'

export const processWorkspaceDeps = ({ subdirs, tmpDir, packagesRoot, mainModuleName }: Context) => {
  const toCopy: string[] = [];

  subdirs.forEach((moduleName) => {
    console.log(`Processing ${moduleName}`)
    const moduleBuildDir = path.resolve(tmpDir, 'packages', moduleName)
    const moduleSourceDir = path.resolve(packagesRoot, moduleName)

    const pkgJson = path.resolve(moduleSourceDir, 'package.json')
    const pkg = fs.readFileSync(pkgJson, 'utf8')

    const modulePkg = JSON.parse(pkg)
    modulePkg.dependencies &&
      Object.keys(modulePkg.dependencies).forEach((depName) => {
        if (modulePkg.dependencies[depName].startsWith('workspace:')) {
          const depModuleDir = depName.split('/')[1] || depName.split('/')[0]
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
