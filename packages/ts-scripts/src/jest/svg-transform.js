const svgTransform = {
  process() {
    return 'module.exports = {};'
  },
  getCacheKey() {
    // The output is always the same.
    return 'svgTransform'
  },
}

module.exports = svgTransform
