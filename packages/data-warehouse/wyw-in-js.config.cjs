const dashify = require('dashify')

module.exports = {
  evaluate: true,
  displayName: false,
  classNameSlug: (_hash, title) => dashify(title),
}
