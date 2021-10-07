import { useObject } from './use-object'

export const useObjectSpecials = (typeName?: string) => {
  const { object, loading, error } = useObject(typeName)
  return {
    loading,
    error,
    specials: object?.specials || [],
  }
}
