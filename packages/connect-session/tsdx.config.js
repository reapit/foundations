const babel = require('@rollup/plugin-babel').default

module.exports = {
  rollup(config) {
    const plugins = config.plugins
    const oldPlugin = plugins.find((plugin) => plugin.name === 'babel')
    const babelPlugin = babel({
      presets: [['@babel/preset-env']],
      extensions: ['.ts', '.tsx'],
      babelHelpers: 'runtime',
      plugins: ['@babel/plugin-transform-runtime'],
    })

    plugins.splice(plugins.indexOf(oldPlugin), 1, babelPlugin)

    const newConfig = {
      ...config,
      exclude: [/\/core-js\//],
      output: {
        ...config.output,
        globals: {
          ...config.output.globals,
          'isomorphic-fetch': 'isomorphic-fetch',
          'idtoken-verifier': 'idtoken-verifier',
          'jwk-to-pem': 'jwk-to-pem',
          axios: 'axios',
          '@babel/runtime/helpers/asyncToGenerator': '@babel/runtime/helpers/asyncToGenerator',
          '@babel/runtime/helpers/classCallCheck': '@babel/runtime/helpers/classCallCheck',
          '@babel/runtime/helpers/createClass': '@babel/runtime/helpers/createClass',
          '@babel/runtime/regenerator': '@babel/runtime/regenerator',
          '@babel/runtime/helpers/slicedToArray': '@babel/runtime/helpers/slicedToArray',
          'bashleigh-idtoken-verifier': 'bashleigh-idtoken-verifier',
          'jwt-decode': 'jwt-decode',
        },
      },
      plugins,
    }
    return newConfig
  },
}
