const babel = require('@rollup/plugin-babel').default

module.exports = {
  rollup(config) {
    const plugins = config.plugins
    const oldPlugin = plugins.find((plugin) => plugin.name === 'babel')
    const babelPlugin = babel({
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              ie: '11',
            },
            useBuiltIns: 'usage',
            corejs: 3,
          },
        ],
      ],
      extensions: ['.ts', '.tsx'],
      babelHelpers: 'runtime',
      plugins: ['@babel/plugin-transform-runtime'],
    })
  
    plugins.splice(plugins.indexOf(oldPlugin), 1,  babelPlugin)

    const newConfig = {
      ...config,
      exclude: [/\/core-js\//],
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
      plugins
    }
    return newConfig
  },
}
