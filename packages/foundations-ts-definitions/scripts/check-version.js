const { npm_package_version: currentPackageVersion, npm_package_name: npmPackageName } = process.env
const { execSync } = require('child_process')
const remotePackageVersion = execSync(`yarn info ${npmPackageName} version`)
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
