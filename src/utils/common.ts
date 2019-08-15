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

export const transformDotNotationToObject = (scopesModel: ScopeModel[] | undefined): ScopeObject => {
  if (!scopesModel) {
    return {}
  }
  const scopes = scopesModel.map((scopeModel: ScopeModel) => scopeModel.name)
  const result: ScopeObject = {}
  scopes.forEach((scope: string | undefined) => {
    const scopeArray = scope && scope.split('.')
    const key = scopeArray && scopeArray[0]
    const childKey = scopeArray && scopeArray[1]
    if (key && childKey) {
      result[key] = {
        ...result[key],
        [childKey]: true
      }
    }
  })
  return result
}
