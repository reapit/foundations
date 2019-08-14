import { ScopeModel } from '@/types/marketplace-api-schema'

export type ScopeObject = {
  [key: string]: {
    [key: string]: boolean
  }
}

export const transformObjectToDotNotation = (scopes: ScopeObject | undefined): string[] => {
  if (!scopes || scopes === {}) {
    return []
  }
  const result: string[] = []
  Object.keys(scopes).forEach((scopeName: string) => {
    Object.keys(scopes[scopeName]).forEach((permission: string) => {
      const isHavePermission = scopes[scopeName][permission] === true
      if (isHavePermission) {
        result.push(`${scopeName}.${permission}`)
      }
    })
  })
  return result
}
