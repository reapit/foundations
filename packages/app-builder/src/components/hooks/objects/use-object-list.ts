import { useQuery } from '@apollo/client'
import { dummyQuery } from '../use-introspection'
import { usePageId } from '../use-page-id'
import { useObject } from './use-object'

export const useObjectList = (typeName?: string) => {
  const { object, error, loading } = useObject(typeName)
  const { context } = usePageId()
  const listQuery = object && typeName ? object.list : undefined
  const query = useQuery(listQuery?.query || dummyQuery, { skip: !listQuery?.query, variables: context })

  return {
    data: (query.data && Object.values(query.data)[0]) as any[] | undefined,
    loading: loading || query.loading,
    error: error || query.error,
    args: listQuery?.args,
  }
}
