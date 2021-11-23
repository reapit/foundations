import { useQuery } from '@apollo/client'
import { dummyQuery } from '../use-introspection'
import { usePageId } from '../use-page-id'
import { useObject } from './use-object'

export const useObjectGet = (typeName?: string, id?: string | number | null) => {
  const { object, error, loading } = useObject(typeName)
  const { context } = usePageId()
  const getQuery = object && typeName ? object.get : undefined
  const query = useQuery(getQuery?.query || dummyQuery, {
    skip: !getQuery?.query || !id,
    variables: { ...context, id },
  })

  return {
    data: query.data && Object.values(query.data)[0],
    loading: loading || query.loading,
    error: error || query.error,
  }
}
