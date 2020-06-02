const path = require('path')
/**
 * Get path, line to .md file based on packageName
 *
 * @param {{docRepoPath: string, packageName: string}} inputObj
 * @return {null| {path: string, line: number}}
 */
const mapPackageNameToPathLine = ({ docRepoPath, packageName }) => {
  const basePath = path.join(docRepoPath, 'change-logs')
  return {
    path: path.join(basePath, `${packageName}.md`),
    line: 9,
  }
}

module.exports = mapPackageNameToPathLine
