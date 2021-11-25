const path = require('path')
const fs = require('fs')

const { sync } = require('fast-glob')

const resolveRequires = ({ buildDir }) => {
  const files = sync(`${buildDir}/**/*.{js,jsx,ts,tsx}`, {
    dot: true,
    onlyFiles: true,
  }).map((x) => path.resolve(x))

  const absBuildDir = path.resolve(buildDir)
  files.forEach((file) => {
    const contents = fs.readFileSync(file, 'utf8')
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
}

module.exports = {
  resolveRequires,
}
