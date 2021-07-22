const { override } = require('customize-cra')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const paths = require.resolve('react-scripts/config/paths')
const typescriptFormatter = require('react-dev-utils/typescriptFormatter')
const resolve = require('resolve')
const path = require('path')

/**
 *
 * https://github.com/TypeStrong/fork-ts-checker-webpack-plugin/issues/211
 * https://github.com/facebook/create-react-app/issues/8707#issuecomment-624284347
 * disable useTypescriptIncrementalApi of react-scripts ForkTsCheckerWebpackPlugin
 * Fix Hanging at 'Files successfully emitted, waiting for typecheck results...' when yarn start on the first time
 */
const removeOriginalForkTsCheckerWebpackPlugin = (config) => {
  config.plugins = config.plugins.filter((plugin) => {
    return plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin'
  })

  return config
}

const patchForkTsCheckerWebpackPlugin = (config, env) => {
  const isEnvDevelopment = env === 'development'
  const isEnvProduction = env === 'production'

  config.plugins.push(
    // original ForkTsCheckerWebpackPlugin config with useTypescriptIncrementalApi disable
    new ForkTsCheckerWebpackPlugin({
      typescript: resolve.sync('typescript', {
        basedir: paths.appNodeModules,
      }),
      async: isEnvDevelopment,
      useTypescriptIncrementalApi: false,
      checkSyntacticErrors: true,
      resolveModuleNameModule: process.versions.pnp ? `${__dirname}/pnpTs.js` : undefined,
      resolveTypeReferenceDirectiveModule: process.versions.pnp ? `${__dirname}/pnpTs.js` : undefined,
      tsconfig: paths.appTsConfig,
      reportFiles: ['**', '!**/__tests__/**', '!**/?(*.)(spec|test).*', '!**/src/setupProxy.*', '!**/src/setupTests.*'],
      silent: true,
      // The formatter is invoked directly in WebpackDevServerUtils during development
      formatter: isEnvProduction ? typescriptFormatter : undefined,
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
      ...override(addLinariaLoader, removeOriginalForkTsCheckerWebpackPlugin)(config),
      ...patchForkTsCheckerWebpackPlugin(config, env),
    }
  },
  jest: function (config) {
    return updateJestSetupTestFiles(config)
  },
}
