require('isomorphic-fetch')
const spawnSync = require('child_process').spawnSync
const path = require('path')

const removeUnuseChar = value => {
  if (!value) {
    return ''
  }
  return value.replace(/(\r\n\t|\n|\r\t)/gm, '')
}

const getRef = () => {
  return runCommand('git', ['rev-parse', '--short', 'HEAD'])
}

const runCommand = (cmd, args) => {
  const resultObj = spawnSync(cmd, args)
  const { stdout, stderr } = resultObj

  if (stderr.length !== 0) {
    console.error(stderr.toString().trim())
    return stderr.toString().trim()
  }
  console.info(stdout.toString().trim())
  return stdout.toString().trim()
}

const getVersionTag = () => {
  const packageFolderName = path.basename(path.dirname(`${process.cwd()}/package.json`))
  try {
    const tagName = process.env.RELEASE_VERSION
    const tagNameArr = removeUnuseChar(tagName).split('_')
    const PACKAGE_NAME_INDEX = 0
    const VERSION_INDEX = 1
    const packageName = tagNameArr[PACKAGE_NAME_INDEX] || packageFolderName
    const version = tagNameArr[VERSION_INDEX] || getRef()
    return { packageName, version }
  } catch (error) {
    console.error(error)
    return { packageName: packageFolderName, version: getRef() }
  }
}

module.exports = {
  getVersionTag,
  runCommand,
  getRef,
}
