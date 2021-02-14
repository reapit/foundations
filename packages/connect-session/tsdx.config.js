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
          'jwk-to-pem': 'jwk-to-pem',
          axios: 'axios',
        },
      },
    }
    return newConfig
  },
}
