const semver = require('semver')
const { runCommand } = require('../release/utils')
const fs = require('fs')
const path = require('path')
const { FOUNDATION_ROOT_FOLDER, PACKAGE_NAME } = require('./constants')
const packageJsonPath = path.resolve(FOUNDATION_ROOT_FOLDER, './package.json')

module.exports = () => {
  const remotePackageVersionStdOut = runCommand('yarn', [
    'info',
    '@reapit/foundations-ts-definitions',
    'version',
  ]).split('\n')
  let remotePackageVersion = ''

  // Ex of remotePackageVersionStdOut: ['0.0.0']
  const errrRemotePackageVersionStdOutInvalid = new Error(
    `Response of command: "yarn info ${PACKAGE_NAME} version" is invalid`,
  )
  const isRemotePackageVersionStdOutValid =
    !remotePackageVersionStdOut || !typeof Array.isArray(remotePackageVersionStdOut)
  if (isRemotePackageVersionStdOutValid) {
    throw errrRemotePackageVersionStdOutInvalid
  }

  remotePackageVersion = remotePackageVersionStdOut.find(remotePackageVersionStdOutPart => {
    return semver.parse(remotePackageVersionStdOutPart)
  })

  if (!remotePackageVersion) {
    throw errrRemotePackageVersionStdOutInvalid
  }

  const bumpedVersion = semver.inc(remotePackageVersion, 'patch')

  const packageJsonContent = fs.readFileSync(packageJsonPath).toString()
  let parsedPackageJsonContent = JSON.parse(packageJsonContent)
  parsedPackageJsonContent.version = bumpedVersion
  fs.writeFileSync(packageJsonPath, JSON.stringify(parsedPackageJsonContent, null, 2))
}
