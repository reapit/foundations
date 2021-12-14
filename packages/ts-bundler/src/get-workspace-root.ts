import path from 'path'
import fs from 'fs'

export const getWorkspaceRoot = () => {
  const moduleDir = path.resolve('.')
  let repoRoot = moduleDir
  while (repoRoot !== '/') {
    repoRoot = path.resolve(repoRoot, '..')
    const rrPkgJson = path.resolve(repoRoot, 'package.json')
    if (fs.existsSync(rrPkgJson)) {
      const pkg = JSON.parse(fs.readFileSync(rrPkgJson, 'utf-8'))
      if (pkg.workspaces) {
        const packagesDir = pkg.workspaces.packages[0]
        const rr = path.relative(moduleDir, repoRoot)
        return {
          repoRootLocation: rr,
          packagesRoot: path.relative(moduleDir, path.resolve(rr, packagesDir.replace('*', ''))),
        }
      }
    }
  }

  throw new Error('Could not find workspace root')
}
