const util = require('util')
const fs = require('fs')

const exec = util.promisify(require('child_process').exec)
const readFileAsync = util.promisify(fs.readFile)

const bundlePhobia = async () => {
  const options = { encoding: 'utf8' }
  const dependencies = await readFileAsync(`${__dirname}/../../package.json`, options)
  const modules = JSON.parse(dependencies).dependencies

  const packages = Object.keys(modules).reduce((packageList, key) => {
    const version = modules[key]
    return `${packageList} ${key}@${version}`
  }, '')

  const { stdout, stderr } = await exec(`${__dirname}/../../node_modules/.bin/bundle-phobia ${packages}`)

  console.log(stdout, stderr)
}

bundlePhobia()
