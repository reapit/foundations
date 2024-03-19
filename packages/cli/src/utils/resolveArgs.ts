import { ArgsType } from '../decorators'
import chalk from 'chalk'

export type ParameterType = {
  default: any
}

export const resolveArgs = (incomingArgs: string[], args?: ArgsType[]): any[] => {
  const results: any[] = []
  const incomingParams = incomingArgs.filter((param) => !/^-/.test(param))
  const argTypes = args?.map((paramOrOption, index) => ({
    paramOrOption,
    index,
  }))

  argTypes
    ?.filter((argOptions) => argOptions.paramOrOption.type === 'parameter')
    .forEach(({ paramOrOption: param, index: depIndex }, index) => {
      if (param.required && typeof incomingParams[index] == 'undefined') {
        console.log(chalk.red(`${param.name} is required`))
        process.exit(1)
      }

      results[depIndex] = incomingParams[index] || param.default
    })

  argTypes
    ?.filter((argOptions) => argOptions.paramOrOption.type === 'option')
    .forEach(({ paramOrOption: option, index }) => {
      if (incomingArgs.some((opt) => [`-${option.shortName}`, `--${option.name}`].includes(opt))) {
        results[index] = true
      } else if (option.default) {
        results[index] = option.default
      } else {
        results[index] = false
      }
    })

  return results
}
