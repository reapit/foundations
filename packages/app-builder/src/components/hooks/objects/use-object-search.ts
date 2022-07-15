import { useQuery, useApolloClient, ApolloError } from '@apollo/client'
import { useState } from 'react'
import { dummyQuery } from '../use-introspection'
import { usePageId } from '../use-page-id'
import { useObject } from './use-object'

export const useObjectSearch = (typeName?: string, queryStr?: string) => {
  const { object, error, loading } = useObject(typeName)
  const { context } = usePageId()
  const searchQuery = object && typeName ? object.search : undefined
  const query = useQuery(searchQuery?.query || dummyQuery, {
    skip: !searchQuery?.query || !queryStr,
    variables: {
      ...context,
      query: queryStr,
    },
  })

  return {
    available: !!searchQuery?.query,
    data: (query.data && Object.values(query.data)[0]) as any[] | undefined,
    loading: loading || query.loading,
    error: error || query.error,
  }
}

export const useLazyObjectSearch = (typeName?: string) => {
  const { object, error, loading } = useObject(typeName)
  const { context } = usePageId()
  const searchQuery = object && typeName ? object.search : undefined
  const client = useApolloClient()
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState<ApolloError | undefined>(undefined)

  const search = async (query: string) => {
    setSearchError(undefined)
    setSearchLoading(true)
    try {
      const { data, error } = await client.query({
        query: searchQuery?.query || dummyQuery,
        variables: {
          ...context,
          query,
        },
      })
      if (error) {
        setSearchError(error)
      }
      setSearchLoading(false)
      return (data && Object.values(data)[0]) || []
    } catch (e) {
      setSearchError(e as any)
      setSearchLoading(false)
      return []
    }
  }

  return {
    available: !!searchQuery?.query,
    search,
    error: error || searchError,
    loading: loading || searchLoading,
  }
}
