const path = require('path')
/**
 * Get path, line to .md file based on packageName
 *
 * @param {{docRepoPath: string, packageName: string}} inputObj
 * @return {null| {path: string, line: number}}
 */
const mapPackageNameToPathLine = ({ docRepoPath, packageName }) => {
  const basePath = path.join(docRepoPath, 'change-logs')
  switch (packageName) {
    case 'aml-checklist':
      return {
        path: path.join(basePath, 'aml-checklist.md'),
        line: 9,
      }
    case 'cognito-auth':
      return {
        path: path.join(basePath, 'cognito-auth.md'),
        line: 9,
      }
    case 'cognito-custom-mail-lambda':
      return {
        path: path.join(basePath, 'cognito-custom-mail-lambda.md'),
        line: 9,
      }
    case 'config-manager':
      return {
        path: path.join(basePath, 'config-manager.md'),
        line: 9,
      }
    case 'demo-site':
      return {
        path: path.join(basePath, 'demo-site.md'),
        line: 9,
      }
    case 'elements':
      return {
        path: path.join(basePath, 'elements.md'),
        line: 9,
      }
    case 'foundations-ts-definitions':
      return {
        path: path.join(basePath, 'foundations-ts-definitions.md'),
        line: 9,
      }
    case 'geo-diary':
      return {
        path: path.join(basePath, 'geo-diary.md'),
        line: 9,
      }
    case 'graphql-server':
      return {
        path: path.join(basePath, 'graphql-server.md'),
        line: 9,
      }
    case 'lifetime-legal':
      return {
        path: path.join(basePath, 'lifetime-legal.md'),
        line: 9,
      }
    case 'marketplace':
      return {
        path: path.join(basePath, 'marketplace.md'),
        line: 9,
      }
    case 'react-app-scaffolder':
      return {
        path: path.join(basePath, 'react-app-scaffolder.md'),
        line: 9,
      }
    case 'smb':
      return {
        path: path.join(basePath, 'smb.md'),
        line: 9,
      }
    case 'web-components':
      return {
        path: path.join(basePath, 'web-components.md'),
        line: 9,
      }
    default:
      return null
  }
}

module.exports = mapPackageNameToPathLine
