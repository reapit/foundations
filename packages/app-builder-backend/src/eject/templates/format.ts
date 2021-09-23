import { ESLint } from 'eslint'
// need to use require here as can't import this on it's own from ts-scripts, and importing ts-scripts
// will cause execution of git commands for the ts-scripts webpack config which we don't want because
// in prod we don't have git in the path
const baseEslint = require('@reapit/ts-scripts/src/eslint/base-eslint')

export const slugToCamel = (str) =>
  capitalize(
    str.toLowerCase().replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', '')),
  )

const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1)

export const lint = async (code: string): Promise<string> => {
  const eslint = new ESLint({
    // @ts-ignore
    baseConfig: baseEslint,
    useEslintrc: false,
    fix: true,
  })
  const fixed = await eslint.lintText(code)
  return fixed[0].output || fixed[0].source || ''
}
