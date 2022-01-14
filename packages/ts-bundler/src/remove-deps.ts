import fs from 'fs'
import path from 'path'

export const removeDeps = (modulePath: string, andScripts?: boolean) => {
  const pkg = JSON.parse(fs.readFileSync(path.resolve(modulePath, 'package.json'), 'utf8'))
  delete pkg.dependencies
  delete pkg.devDependencies
  if (andScripts) {
    delete pkg.scripts
  }
  fs.writeFileSync(path.resolve(modulePath, 'package.json'), JSON.stringify(pkg, null, 2))
}
