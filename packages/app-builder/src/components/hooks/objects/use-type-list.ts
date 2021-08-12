import { useIntrospection } from '../use-introspection'

export const useTypeList = () => {
  const { data: introspectionResult, error, loading } = useIntrospection()
  const data = introspectionResult?.map(({ object }) => object.name)

  return {
    data,
    loading,
    error,
  }
}
