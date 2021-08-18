import { useQuery } from '@apollo/client'
import { useIntrospection, dummyQuery } from '../use-introspection'

export const useObjectList = (typeName?: string) => {
  const { data: introspectionResult, error, loading } = useIntrospection()
  const object = typeName && introspectionResult?.find(({ object }) => object.name === typeName)
  const listQuery = object && typeName ? object.list : undefined
  const query = useQuery(listQuery || dummyQuery, { skip: !listQuery })

  return {
    data: query.data && Object.values(query.data)[0],
    loading: loading || query.loading,
    error: error || query.error,
  }
}
