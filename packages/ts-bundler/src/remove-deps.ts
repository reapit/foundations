import fs from 'fs'
import path from 'path'

export const removeDeps = (modulePath: string) => {
  const pkg = JSON.parse(fs.readFileSync(path.resolve(modulePath, 'package.json'), 'utf8'))
  delete pkg.dependencies
  delete pkg.devDependencies
  fs.writeFileSync(path.resolve(modulePath, 'package.json'), JSON.stringify(pkg, null, 2))
}
