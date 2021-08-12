import { useQuery, gql } from '@apollo/client'
import { useIntrospection } from '../use-introspection'

export const useObjectList = (typeName?: string) => {
  const { data: introspectionResult, error, loading } = useIntrospection()
  const object = typeName && introspectionResult?.find(({ object }) => object.name === typeName)
  const listQuery = object && typeName ? object.list : undefined
  const dummyQuery = gql``
  const query = useQuery(listQuery || dummyQuery, { skip: !listQuery })

  return {
    data: query.data,
    loading: loading || query.loading,
    error: error || query.error,
  }
}
