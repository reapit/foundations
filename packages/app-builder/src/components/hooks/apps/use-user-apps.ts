import { useQuery, gql } from '@apollo/client'
import { App, AppFragment } from './fragments'

export const GetUserAppsQuery = gql`
  ${AppFragment}
  query GetUserAppsQuery($developerId: String!) {
    _getUserApps(developerId: $developerId) {
      ...AppFragment
    }
  }
`

export const useGetUserApps = (developerId?: string) => {
  const { loading, error, data } = useQuery(GetUserAppsQuery, {
    variables: {
      developerId,
    },
    skip: !developerId,
  })

  return {
    loading,
    error,
    data: data?._getUserApps as App[] | undefined,
  }
}
