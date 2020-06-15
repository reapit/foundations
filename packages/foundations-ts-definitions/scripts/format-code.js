const prettier = require('prettier')
const prettierBaseConfig = require('../../../.prettierrc')

module.exports = content => {
  const formatcontent = prettier.format(content, {
    parser: 'typescript',
    ...prettierBaseConfig,
  })

  return formatcontent
}
