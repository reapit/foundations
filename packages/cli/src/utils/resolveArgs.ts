export type ParameterType = {
  default: any
}

export const resolveArgs = (args: any, parameters: ParameterType[]): any[] => {
  const results: any[] = []

  parameters.forEach((param, index) => {
    results[index] = args[index] || param.default
  })

  return results
}
