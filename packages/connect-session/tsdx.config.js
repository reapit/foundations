module.exports = {
  rollup(config) {
    const newConfig = {
      ...config,
      output: {
        ...config.output,
        globals: {
          ...config.output.globals,
          'isomorphic-fetch': 'isomorphic-fetch',
          jsonwebtoken: 'jsonwebtoken',
        },
      },
    }
    return newConfig
  },
}
