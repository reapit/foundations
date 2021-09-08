import { ESLint } from 'eslint'
import { baseEslint } from '@reapit/ts-scripts'

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
