import { Context } from './ts-bundler'

import YAML from 'yaml'
import fs from 'fs'
import path from 'path'

export const processYarnLock = (yarnLockLocation: string, { tmpDir, subdirs, packagesRoot }: Context) => {
  const mainLock = YAML.parse(fs.readFileSync(path.resolve(yarnLockLocation), 'utf8'))

  Object.keys(mainLock)
    .filter((lockDepName) => lockDepName.includes('@workspace'))
    .forEach((lockDepName) => {
      // lockDepName looks like "@reapit/utils-react@workspace:packages/utils-react"
      const depName = lockDepName.split('@workspace')[0]
      const folderName = depName.split('/')[1] || depName.split('/')[0]
      if (!subdirs.includes(folderName)) {
        delete mainLock[lockDepName]
      } else {
        // filter out devDependencies
        // read original package.json cos we removed devDeps from the copy
        const pkgJsonPath = path.resolve(packagesRoot, folderName, 'package.json')
        const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'))
        const devDeps = pkgJson.devDependencies ? Object.keys(pkgJson.devDependencies) : []
        Object.keys(mainLock[lockDepName].dependencies).forEach((depName) => {
          if (devDeps.includes(depName)) {
            delete mainLock[lockDepName].dependencies[depName]
          }
        })
      }
    })

  Object.keys(mainLock).forEach((lockDepName) => {
    if (!mainLock[lockDepName]) {
      return
    }
    if (!mainLock[lockDepName].dependencies) {
      return
    }
    Object.entries(mainLock[lockDepName].dependencies).forEach(([depName, depVersion]) => {
      const dv = `${depVersion}`
      if (dv.includes('workspace:')) {
        // depVersion looks like workspace:packages/config-manager"
        const folderName = dv.split('workspace:')[1].split('/')[1]
        if (!subdirs.includes(folderName)) {
          delete mainLock[lockDepName].dependencies[depName]
        }
      }
    })
  })

  fs.writeFileSync(path.resolve(tmpDir, 'yarn.lock'), YAML.stringify(mainLock))
}
