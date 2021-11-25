const YAML = require('yaml')
const fs = require('fs')
const path = require('path')

const processYarnLock = (yarnLockLocation, { monorepoNamespace, buildDir, tmpDir, subdirs }) => {
  const mainLock = YAML.parse(fs.readFileSync(path.resolve(yarnLockLocation), 'utf8'))

  Object.keys(mainLock)
    .filter((lockDepName) => lockDepName.startsWith(monorepoNamespace) && lockDepName.includes('@workspace'))
    .filter((lockDepName) => {
      // lockDepName looks like "@reapit/api-key-verify@workspace:packages/api-key-verify"
      const depName = lockDepName.split('@workspace')[0]
      const folderName = depName.split('/')[1]
      if (!subdirs.includes(folderName)) {
        delete mainLock[lockDepName]
      } else {
        // filter out devDependencies
        // read original package.json cos we removed devDeps from the copy
        const pkgJsonPath = path.resolve(buildDir, folderName, 'package.json')
        const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'))
        const devDeps = pkgJson.devDependencies ? Object.keys(pkgJson.devDependencies) : []
        Object.keys(mainLock[lockDepName].dependencies).forEach((depName) => {
          if (devDeps.includes(depName)) {
            delete mainLock[lockDepName].dependencies[depName]
          }
        })
      }
    })

  fs.writeFileSync(path.resolve(tmpDir, 'yarn.lock'), YAML.stringify(mainLock))
}

module.exports = {
  processYarnLock,
}
