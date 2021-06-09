import { ArgsType } from '@/decorators'
import chalk from 'chalk'

export type ParameterType = {
  default: any
}

export const resolveArgs = (incomingArgs: any, args?: ArgsType[]): any[] => {
  const results: any[] = []

  args?.forEach((param, index) => {
    if (param.required && typeof incomingArgs[index] == 'undefined') {
      console.log(chalk.red(`${param.name} is required`))
      process.exit(1)
    }

    results[index] = incomingArgs[index] || param.default
  })

  return results
}
