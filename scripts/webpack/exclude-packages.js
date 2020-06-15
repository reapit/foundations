const EXCLUDE_PACKAGES = ['linaria']

module.exports = function() {
  const listPackagesString = EXCLUDE_PACKAGES.join('|')
  return new RegExp(`node_modules/(?!(${listPackagesString})/).*`)
}
