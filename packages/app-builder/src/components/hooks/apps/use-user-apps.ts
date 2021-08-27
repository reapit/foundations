import { useQuery, gql } from '@apollo/client'
import { App, AppFragment } from './fragments'

const GetUserAppsQuery = gql`
  ${AppFragment}
  query GetUserAppsQuery($userId: String!) {
    _getUserApps(userId: $userId) {
      ...AppFragment
    }
  }
`

export const useGetUserApps = (userId: string) => {
  const { loading, error, data } = useQuery(GetUserAppsQuery, {
    variables: {
      userId,
    },
    skip: !userId,
  })

  return {
    loading,
    error,
    data: data?._getUserApps as Array<App> | undefined,
  }
}
