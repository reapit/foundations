import { useQuery, gql } from '@apollo/client'
import { App, AppFragment } from './fragments'

export const GetUserAppsQuery = gql`
  ${AppFragment}
  query GetUserAppsQuery($userId: String!) {
    _getUserApps(userId: $userId) {
      ...AppFragment
    }
  }
`

export const useGetUserApps = (userId?: string) => {
  const { loading, error, data } = useQuery(GetUserAppsQuery, {
    variables: {
      userId,
    },
    skip: !userId,
  })

  return {
    loading,
    error,
    data: data?._getUserApps.map((app) => ({
      ...app,
      pages: app.pages.map((page) => ({
        ...page,
        nodes: page.nodes.map((node) => ({
          ...node,
          custom: node.custom || undefined,
        })),
      })),
    })) as Array<App> | undefined,
  }
}
