const path = require('path')
const fs = require('fs')

const processWorkspaceDeps = ({ subdirs, buildDir, packagesRoot, monorepoNamespace }) => {
  const toCopy = []

  subdirs.forEach((moduleName) => {
    console.log(`Processing ${moduleName}`)
    const moduleBuildDir = path.resolve(buildDir, moduleName)
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
          modulePkg.dependencies[depName] = `file:../${depModuleDir}`
          modulePkg.main = modulePkg.main.replace('.ts', '.js')
        }
      })
    delete modulePkg.devDependencies
    fs.writeFileSync(path.resolve(moduleBuildDir, 'package.json'), JSON.stringify(modulePkg, null, 2))
    console.log(`Processed ${moduleName}`)
  })

  const uniqueToCopy = [...new Set(toCopy)]
  return uniqueToCopy
}

module.exports = {
  processWorkspaceDeps,
}
