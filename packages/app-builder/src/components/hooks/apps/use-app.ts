import { useQuery, gql } from '@apollo/client'
import { App, AppFragment, AppWithPages, AppWithPagesFragment, NavConfig, Node, NodeFragment } from './fragments'

export const GetAppQuery = gql`
  ${AppFragment}
  query GetAppQuery($idOrSubdomain: String!) {
    _getApp(idOrSubdomain: $idOrSubdomain) {
      ...AppFragment
    }
  }
`

export const GetAppWithPagesQuery = gql`
  ${AppWithPagesFragment}
  query GetAppWithPagesQuery($idOrSubdomain: String!) {
    _getApp(idOrSubdomain: $idOrSubdomain) {
      ...AppWithPagesFragment
    }
  }
`

export const GetAppPages = gql`
  query GetAppPages($idOrSubdomain: String!) {
    _getApp(idOrSubdomain: $idOrSubdomain) {
      id
      pages {
        id
        name
      }
    }
  }
`

export const GetAppNavConfig = gql`
  query GetAppNavConfig($idOrSubdomain: String!) {
    _getApp(idOrSubdomain: $idOrSubdomain) {
      id
      navConfig {
        id
        name
        icon
        destination
      }
    }
  }
`

export const GetPageNodes = gql`
  ${NodeFragment}
  query GetPageNodesQuery($appId: ID!, $pageId: ID!) {
    _getAppPageNodes(appId: $appId, pageId: $pageId) {
      ...NodeFragment
    }
  }
`

export const useAppPages = (idOrSubdomain: string) => {
  const { loading, error, data, refetch } = useQuery(GetAppPages, {
    variables: {
      idOrSubdomain,
    },
    skip: !idOrSubdomain,
  })

  return {
    loading,
    error,
    pages: data?._getApp?.pages as { id: string; name: string }[] | undefined,
    refetch,
  }
}

export const usePageNodes = (appId: string, pageId: string) => {
  const { loading, error, data, refetch } = useQuery(GetPageNodes, {
    variables: {
      appId,
      pageId,
    },
    skip: !appId || !pageId,
    fetchPolicy: 'network-only',
  })

  const nodes = data?._getAppPageNodes as Node[] | undefined

  return {
    loading,
    error,
    nodes,
    refetch,
  }
}

export const useAppNavConfig = (idOrSubdomain: string) => {
  const { loading, error, data, refetch } = useQuery(GetAppNavConfig, {
    variables: {
      idOrSubdomain,
    },
    skip: !idOrSubdomain,
  })

  return {
    loading,
    error,
    navConfig: data?._getApp.navConfig as NavConfig[] | undefined,
    refetch,
  }
}

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

export const useAppWithPages = (idOrSubdomain: string) => {
  const { loading, error, data, refetch } = useQuery(GetAppWithPagesQuery, {
    variables: {
      idOrSubdomain,
    },
    skip: !idOrSubdomain,
  })

  return {
    loading,
    error,
    app: data?._getApp as AppWithPages | undefined,
    refetch,
  }
}
