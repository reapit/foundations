const { spawnSync } = require('child_process')
const getCurrentTimeStamp = require('./get-current-time-stamp-string')

module.exports = () => {
  const packageVersion = process.env.npm_package_version
  const packageName = process.env.npm_package_name

  /**
     * hacky way
     *
     * Bug1: https://github.com/yarnpkg/yarn/issues/2717
     * yarn tag add command is currently bugged
     * execute it will result an error like
     *
[1/3] Logging in...
[2/3] Creating tag {something} = "{{version}}...
error Couldn't add tag.
[3/3] Revoking token...
info Not revoking login token, specified via config file.
error An unexpected error occurred: "".

      even though the update tag process works

      Bug2:  an NPM script when executed/implemented execSync and ran by npm
      it will make yarn unable to load credential from npmrc

      Same when executing an NPM script with yarn, and run execSync with npm

      This script will be run by lerna:run which utilizes yarn as an npm client

      Solution: white list the error with the good symtom:

      E.g, verbose 1.502 Request "https://registry.yarnpkg.com/-/package/nghia-aa-123/dist-tags/test" finished with status code 204.
     */
  const { stderr, stdout } = spawnSync('yarn', [
    'tag',
    'add',
    `${packageName}@${packageVersion}`,
    getCurrentTimeStamp(),
    '--verbose',
  ])
  const stdOutInfo = stdout ? null : stdout.toString()
  if (stdOutInfo && /Request "[^]+" finished with status code 204/.test(stdOutInfo) && stderr) {
    process.exit(1)
    throw new Error(stderr.toString())
  }
}
