const { override } = require('customize-cra')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path')

const patchForkTsCheckerWebpackPlugin = (config, env) => {
  const isDev = env === 'development'

  config.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        async: isDev,
      },
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
  )

  return config
}

/**
 * Add linaria loader after babel loader
 */
const transformLoader = (loader) => {
  const options = loader.options || {}
  const presets = options.presets || []
  options.presets = presets

  return {
    test: loader.test,
    include: loader.include,
    rules: [
      {
        loader: loader.loader,
        options,
      },
      {
        loader: '@linaria/webpack-loader',
        options: {
          cacheDirectory: 'src/.linaria_cache',
          sourceMap: process.env.NODE_ENV !== 'production',
          babelOptions: {
            presets,
          },
        },
      },
    ],
  }
}

const updateJestSetupTestFiles = (config) => {
  const setupTestFile = path.resolve(__dirname, './src/setup-tests.js')
  config.setupFiles.push(setupTestFile)
  return config
}

const addLinariaLoader = (config) => {
  /**
   * cra scripts rules atm (version 3)
   * https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js
   */
  const ruleWithOneOf = config.module.rules.find((rule) => rule.oneOf)
  if (ruleWithOneOf === null) {
    throw Error('Cant find webpack rule with oneOf')
  }

  let subRuleWithTsxIndex = ruleWithOneOf.oneOf.findIndex((rule) => rule.test.toString().includes('tsx'))
  if (subRuleWithTsxIndex === -1) {
    throw Error('Cant find rule match ts/tsx')
  }
  const subRuleWithTsx = transformLoader(ruleWithOneOf.oneOf[subRuleWithTsxIndex])
  ruleWithOneOf.oneOf[1] = subRuleWithTsx

  return config
}

// react-rewired configuration https://github.com/timarney/react-app-rewired
module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function (config, env) {
    return {
      ...override(addLinariaLoader)(config),
      ...patchForkTsCheckerWebpackPlugin(config, env),
    }
  },
  jest: function (config) {
    return updateJestSetupTestFiles(config)
  },
}
