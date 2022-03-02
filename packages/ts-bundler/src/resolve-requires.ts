import path from 'path'
import fs from 'fs'

import { sync } from 'fast-glob'

import { generateHash } from './hash-file'

export const resolveRequires = ({ outDir }: { outDir: string }) => {
  const files = sync(`${outDir}/**/*.{js,jsx,ts,tsx}`, {
    dot: true,
    onlyFiles: true,
  }).map((x) => path.resolve(x))

  const hashes: Record<string, string> = {}

  const absBuildDir = path.resolve(outDir)
  files.forEach((file) => {
    const contents = fs.readFileSync(file, 'utf8')
    const hash = generateHash(contents)
    hashes[file] = hash
    const newContents = contents.replace(/require\(['"](.*)['"]\)/g, (match, p1) => {
      if (p1.startsWith('@/')) {
        const localFilePath = file.split(absBuildDir)[1]
        const sourceModuleName = [localFilePath.split('/')[1], localFilePath.split('/')[2]].join('/')
        const destination = p1.replace('@/', `/${sourceModuleName}/`)
        const relativeModulePath = path.relative(localFilePath, destination).replace('../', '')
        console.log(`Resolved ${p1} in ${localFilePath} to ${relativeModulePath}`)
        return `require('${relativeModulePath}')`
      }
      return match
    })
    fs.writeFileSync(file, newContents, 'utf8')
  })

  return generateHash(JSON.stringify(hashes))
}
