import { useQuery, gql, ApolloError, ApolloClient } from '@apollo/client'
import { getIntrospectionQuery } from 'graphql'
import { useMemo } from 'react'
import { IntrospectionResult, parseIntrospectionResult } from './parse-introspection'

export const introspectionQuery = gql`
  ${getIntrospectionQuery()}
`

export const useIntrospection = (
  client?: ApolloClient<any>,
): { loading: boolean; error?: ApolloError; data?: IntrospectionResult[] } => {
  const { loading, data, error } = useQuery(introspectionQuery, {
    client,
  })
  const parsedIntrospection = useMemo(() => {
    try {
      return parseIntrospectionResult(data)
    } catch (e) {
      console.error('Error parsing introspection result', e)
      return undefined
    }
  }, [data])

  return {
    loading,
    error,
    data: parsedIntrospection,
  }
}

export const dummyQuery = gql`
  {
    __type(name: "Query") {
      name
    }
  }
`

export const dummyMutation = gql`
  mutation {
    doSomething {
      __typename
    }
  }
`
