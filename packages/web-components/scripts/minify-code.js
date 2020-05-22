const terser = require('terser')

module.exports = async content => {
  const formatContent = await terser.minify(content, {
    mangle: false,
    compress: false,
  })

  return formatContent.code
}
