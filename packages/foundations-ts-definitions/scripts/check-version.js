const { runCommand } = require('../../../scripts/release/utils')
const { npm_package_version: currentPackageVersion, npm_package_name: npmPackageName } = process.env

const remotePackageVersion = runCommand('yarn', ['info', npmPackageName, 'version'])
  .toString()
  .trim()
const compareVersions = require('compare-versions')

if (!remotePackageVersion) {
  return
}

// currentPackageVersion < remotePackageVersion
if (compareVersions(currentPackageVersion, remotePackageVersion) < 1) {
  console.log('Current version is smaller than remote version. Please bump your package version')
  process.exit(1)
}
