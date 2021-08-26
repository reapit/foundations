import { useQuery, gql } from '@apollo/client'
import { getIntrospectionQuery } from 'graphql'
import { useMemo } from 'react'
import { parseIntrospectionResult } from './parse-introspection'

export const useIntrospection = () => {
  const introspectionQuery = gql`
    ${getIntrospectionQuery()}
  `
  const { loading, data, error } = useQuery(introspectionQuery)
  const parsedIntrospection = useMemo(() => parseIntrospectionResult(data), [data])

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
