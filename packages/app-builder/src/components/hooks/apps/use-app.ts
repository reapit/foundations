import { useQuery, gql } from '@apollo/client'
import { App, AppFragment } from './fragments'

export const GetAppQuery = gql`
  ${AppFragment}
  query GetAppQuery($idOrSubdomain: String!) {
    _getApp(idOrSubdomain: $idOrSubdomain) {
      ...AppFragment
    }
  }
`

export const useApp = (idOrSubdomain: string) => {
  const { loading, error, data, refetch } = useQuery(GetAppQuery, {
    variables: {
      idOrSubdomain,
    },
    skip: !idOrSubdomain,
  })

  return {
    loading,
    error,
    app: data?._getApp as App | undefined,
    refetch,
  }
}
