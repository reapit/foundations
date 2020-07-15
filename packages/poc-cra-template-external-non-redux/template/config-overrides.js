const { override, addBabelPreset } = require('customize-cra')

/**
 * Add linaria loader after babel loader
 */
function transformLoader(loader) {
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
        loader: 'linaria/loader',
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

module.exports = override(addBabelPreset('linaria/babel'), addLinariaLoader)
