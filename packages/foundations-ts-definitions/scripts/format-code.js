const prettier = require('prettier')
const prettierBaseConfig = require('../../../.prettierrc')

module.exports = async (content) => {
  const formatcontent = await prettier.format(content, {
    parser: 'typescript',
    ...prettierBaseConfig,
  })

  return formatcontent
}
