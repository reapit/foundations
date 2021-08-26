import { useQuery } from '@apollo/client'
import { dummyQuery } from '../use-introspection'
import { useObject } from './use-object'

export const useObjectGet = (typeName?: string, id?: string | number | null) => {
  const { object, error, loading } = useObject(typeName)
  const getQuery = object && typeName ? object.get : undefined
  const query = useQuery(getQuery || dummyQuery, { skip: !getQuery || !id, variables: { id } })

  return {
    data: query.data && Object.values(query.data)[0],
    loading: loading || query.loading,
    error: error || query.error,
  }
}
