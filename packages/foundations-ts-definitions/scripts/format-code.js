const prettier = require('prettier')

module.exports = content => {
  const formatContent = prettier.format(content, {
    singleQuote: true,
    printWidth: 120,
    semi: false,
    parser: 'typescript',
    tabWidth: 2,
  })

  return formatContent
}
