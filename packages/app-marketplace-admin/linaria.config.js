const dashify = require('dashify')

module.exports = {
  evaluate: true,
  displayName: false,
  // converts camelCase classNames to kebab-case-for-friendly-css
  classNameSlug: (hash, title) => dashify(title),
}
