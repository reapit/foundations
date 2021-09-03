import { useQuery, gql } from '@apollo/client'
import { useEffect } from 'react'
import { App, AppFragment } from './fragments'

export const GetAppQuery = gql`
  ${AppFragment}
  query GetAppQuery($id: String!) {
    _getApp(id: $id) {
      ...AppFragment
    }
  }
`

export const useApp = (id: string) => {
  const { loading, error, data } = useQuery(GetAppQuery, {
    variables: {
      id,
    },
    skip: !id,
  })

  useEffect(() => {
    console.log('useApp', data?._getApp)
  }, [data])

  return {
    loading,
    error,
    app: data?._getApp as App | undefined,
  }
}
