const prettier = require('prettier')
const path = require('path')
const fs = require('fs')
const prettierBaseConfigPath = path.resolve(__dirname, '../../../.prettierrc.js')

module.exports = content => {
  const prettierBaseconfigBuffer = fs.readfilesync(prettierBaseConfigPath)
  const prettierBaseConfig = JSON.parse(prettierBaseconfigBuffer.toString())
  const formatcontent = prettier.format(content, {
    parser: 'typescript',
    ...prettierBaseConfig,
  })

  return formatcontent
}
