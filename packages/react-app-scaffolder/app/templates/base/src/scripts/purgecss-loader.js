// Origin from https://github.com/americanexpress/purgecss-loader/blob/master/loader.js
const PurgeCss = require('purgecss')
const { getOptions } = require('loader-utils')

module.exports = function purifyCssLoader(content) {
  const { paths, extractors, whitelistPatterns = [], whitelist = [], whitelistPatternsChildren = [] } = getOptions(this)
  return new PurgeCss({
    content: paths,
    css: [{ raw: content }],
    whitelist,
    whitelistPatterns,
    whitelistPatternsChildren,
    extractors
  }).purge()[0].css
}
