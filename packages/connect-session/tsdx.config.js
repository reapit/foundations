const scss = require('rollup-plugin-scss')

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
      plugins: [
        ...config.plugins,
        // Have added sass with no emit because elements is a hard dependency. Just needs to be able to
        // handle the file without throwing
        scss({
          output: () => {
            console.info('Not emitting CSS, plugin to handle the file only')
          },
        }),
      ],
    }
    return newConfig
  },
}
