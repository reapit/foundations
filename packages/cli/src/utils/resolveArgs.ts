import { ArgsType } from '@/decorators'

export type ParameterType = {
  default: any
}

export const resolveArgs = (incomingArgs: any, args?: ArgsType[]): any[] => {
  const results: any[] = []

  args?.forEach((param, index) => {
    results[index] = incomingArgs[index] || param.default
  })

  return results
}
