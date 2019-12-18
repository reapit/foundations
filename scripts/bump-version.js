const { execSync } = require("child_process");
const semver = require('semver')
const fs = require('fs')
const path = require('path')
const prettifyCode = require('./format-code')

const {npm_package_name} = process.env
const packageJsonPath = path.resolve(__dirname, '../package.json')

module.exports = () => {
  const remotePackageVersionStdOut = execSync(`yarn info ${npm_package_name} version`).toString().trim().split('\n')
  let remotePackageVersion = ''
  if (!remotePackageVersionStdOut || !(typeof Array.isArray(remotePackageVersionStdOut)) || remotePackageVersionStdOut.length < 3) {
    return
  }

  remotePackageVersion = remotePackageVersionStdOut[1]
  const bumpedVersion = semver.inc(remotePackageVersion, 'patch')
  
  const packageJsonContent = fs.readFileSync(packageJsonPath).toString()
  let parsedPackageJsonContent = JSON.parse(packageJsonContent)
  parsedPackageJsonContent.version = bumpedVersion
  fs.writeFileSync(packageJsonPath, JSON.stringify(parsedPackageJsonContent, null, 2))

  execSync("git add .");
  execSync(
    `git commit -m 'Update TypeScript definition - version: ${bumpedVersion}'`
  );
  execSync(`yarn publish`)
  execSync(`git push -u authOrigin HEAD:master`);
}