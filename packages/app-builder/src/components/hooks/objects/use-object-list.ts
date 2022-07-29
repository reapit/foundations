import { useQuery } from '@apollo/client'
import { dummyQuery } from '../use-introspection'
import { usePageId } from '../use-page-id'
import { useObject } from './use-object'

export const useObjectList = (typeName?: string, filters?: any) => {
  const { object, error, loading } = useObject(typeName)
  const { context } = usePageId()
  const listQuery = object && typeName ? object.list : undefined
  let skip = true
  if (listQuery?.query) {
    skip = false
  }
  if (listQuery?.args?.length) {
    skip = !Object.keys(filters || {}).length
  }
  const query = useQuery(listQuery?.query || dummyQuery, {
    skip,
    variables: { ...context, ...(filters || {}) },
  })

  return {
    data: (query.data && Object.values(query.data)[0]) as any[] | undefined,
    loading: loading || query.loading,
    error: error || query.error,
    args: listQuery?.args,
  }
}
