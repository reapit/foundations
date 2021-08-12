import { useQuery, gql } from '@apollo/client'
import { getIntrospectionQuery, IntrospectionQuery } from 'graphql'
import { parseIntrospectionResult } from './parse-introspection'

export const useIntrospection = () => {
  const introspectionQuery = gql`
    ${getIntrospectionQuery()}
  `
  const { loading, data, error } = useQuery(introspectionQuery)
  const parsedIntrospection = parseIntrospectionResult(data)
  console.log(parsedIntrospection)
  return {
    loading,
    error,
    data: data as IntrospectionQuery | undefined,
  }
}
