const svgTransform = {
  process() {
    return {
      code: 'module.exports = {};',
    }
  },
  getCacheKey() {
    // The output is always the same.
    return 'svgTransform'
  },
}

module.exports = svgTransform
