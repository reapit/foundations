import { useQuery } from '@apollo/client'
import { dummyQuery } from '../use-introspection'
import { useObject } from './use-object'

export const useObjectList = (typeName?: string) => {
  const { object, error, loading } = useObject(typeName)
  const listQuery = object && typeName ? object.list : undefined
  const query = useQuery(listQuery || dummyQuery, { skip: !listQuery })

  return {
    data: query.data && Object.values(query.data)[0],
    loading: loading || query.loading,
    error: error || query.error,
  }
}
