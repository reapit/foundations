const prettier = require('prettier')
const prettierBaseConfig = require('../../../../.prettierrc')

module.exports = content => {
  const formatContent = prettier.format(content, {
    parser: 'typescript',
    ...prettierBaseConfig,
  })

  return formatContent
}
