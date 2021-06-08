import { ArgsType } from '@/decorators'

export type ParameterType = {
  default: any
}

export const resolveArgs = (incomingArgs: any, args: ArgsType[]): any[] => {
  const results: any[] = []

  console.log(incomingArgs, args)

  args.forEach((param, index) => {
    console.log(index, incomingArgs[index])
    results[index] = incomingArgs[index] || param.default
  })

  return results
}
