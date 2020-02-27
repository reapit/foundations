module.exports = {
  rollup(config) {
    const newConfig = {
      ...config,
      output: {
        ...config.output,
        globals: {
          ...config.output.globals,
          'amazon-cognito-identity-js': 'amazon-cognito-identity-js',
          hardtack: 'hardtack',
          jsonwebtoken: 'jsonwebtoken',
          formik: 'formik',
          '@reapit/elements': '../elements',
        },
      },
    }
    return newConfig
  },
}
