import { useIntrospection } from '../use-introspection'

export const useObject = (typeName?: string) => {
  const { data: introspectionResult, error, loading } = useIntrospection()
  const object = typeName ? introspectionResult?.find(({ object }) => object.name === typeName) : undefined
  return { object, error, loading }
}
