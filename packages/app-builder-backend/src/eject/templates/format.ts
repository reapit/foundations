import { ESLint } from 'eslint'
// require instead of import to avoid exec of git commands by webpack config which is exported by ts-scripts
const baseEslint = require('@reapit/ts-scripts/src/eslint/base-eslint')

export const slugToCamel = (str) =>
  capitalize(
    str.toLowerCase().replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', '')),
  )

const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1)

const baseConfig = {
  ...baseEslint,
  extends: baseEslint.extends.filter((extend) => !extend.startsWith('prettier/')),
}

export const lint = async (code: string): Promise<string> => {
  const eslint = new ESLint({
    // @ts-ignore
    baseConfig,
    useEslintrc: false,
    fix: true,
  })
  const fixed = await eslint.lintText(code)
  return fixed[0].output || fixed[0].source || ''
}
