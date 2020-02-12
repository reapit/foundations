const semver = require('semver')
const fs = require('fs')
const path = require('path')
const { runCommand } = require('../../../scripts/release/utils')

const { npm_package_name } = process.env
const packageJsonPath = path.resolve(__dirname, '../package.json')

module.exports = () => {
  const remotePackageVersionStdOut = runCommand('yarn', ['info', npm_package_name, 'version'])
    .toString()
    .trim()
    .split('\n')
  let remotePackageVersion = ''

  // Ex of remotePackageVersionStdOut: ['0.0.0']
  const errrRemotePackageVersionStdOutInvalid = new Error(
    `Response of command: "yarn info ${npm_package_name} version" is invalid`,
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

  runCommand('git', ['remote', 'add', 'sshOrigin', `git@github.com:${process.env.GITHUB_REPOSITORY}.git`])
  runCommand('git', ['config', '--global', 'user.email', '"GithubActions@email.com"'])
  runCommand('git', ['config', '--global', 'user.name', '"Github Actions"'])

  runCommand('git', ['add', '.'])
  runCommand('git', ['commit', '-m', `"Update TypeScript definition - version: ${bumpedVersion}"`])
  runCommand('yarn', ['publish'])
  runCommand('git', ['push', '-u', 'sshOrigin', 'HEAD:master'])
}
