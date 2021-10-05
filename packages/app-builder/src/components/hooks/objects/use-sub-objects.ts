import { useIntrospection } from '../use-introspection'
import { usePageId } from '../use-page-id'

export const lowercaseFirstLetter = (string: string) => string.charAt(0).toLowerCase() + string.slice(1)

export const useSubObjects = (typeName?: string) => {
  const { data, error, loading } = useIntrospection()
  const { context } = usePageId()
  if (!typeName || !data) {
    return {
      data: [],
      error,
      loading,
    }
  }

  const subObjects = data.filter((type) => {
    const { list } = type
    if (!list) return false
    const { args } = list
    const isForThis = args.some((arg) => arg.name === `${lowercaseFirstLetter(typeName)}Id`)
    const hasOtherRequiredArgs =
      args.filter((arg) => !(arg.name === `${lowercaseFirstLetter(typeName)}Id` || context[arg.name])).length === 0

    return isForThis && hasOtherRequiredArgs
  })

  return {
    data: subObjects,
    error,
    loading,
  }
}
