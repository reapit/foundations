import { gql, useMutation } from '@apollo/client'
import { useCallback } from 'react'

import {
  AppFragment,
  AppWithPages,
  AppWithPagesFragment,
  NavConfig,
  Node,
  NodeFragment,
  PageFragment,
} from './fragments'
import { useApp } from './use-app'

const UpdateAppNameMutation = gql`
  ${AppFragment}
  mutation UpdateAppName($appId: ID!, $name: String!) {
    _updateAppName(appId: $appId, name: $name) {
      ...AppFragment
    }
  }
`
const UpdateAppPageNameMutation = gql`
  ${PageFragment}
  mutation UpdateAppPageName($appId: ID!, $pageId: ID!, $name: String!) {
    _updateAppPageName(appId: $appId, pageId: $pageId, name: $name) {
      ...PageFragment
    }
  }
`

const UpdateAppPageNodesMutation = gql`
  ${NodeFragment}
  mutation UpdateAppPageNodes($appId: ID!, $pageId: ID!, $nodes: [_NodeInput!]!) {
    _updateAppPageNodes(appId: $appId, pageId: $pageId, nodes: $nodes) {
      ...NodeFragment
    }
  }
`

const DeleteAppPageMutation = gql`
  ${AppWithPagesFragment}
  mutation DeleteAppPage($appId: ID!, $pageId: ID!) {
    _deleteAppPage(appId: $appId, pageId: $pageId) {
      ...AppWithPagesFragment
    }
  }
`

const CreateAppPageMutation = gql`
  ${AppWithPagesFragment}
  mutation CreateAppPage($appId: ID!, $name: String!) {
    _createAppPage(appId: $appId, name: $name) {
      ...AppWithPagesFragment
    }
  }
`

const UpdateAppNavConfig = gql`
  ${AppWithPagesFragment}
  mutation UpdateAppNavConfig($appId: ID!, $navConfig: [_NavConfigInput!]!) {
    _updateAppNavConfig(appId: $appId, navConfig: $navConfig) {
      ...AppWithPagesFragment
    }
  }
`

// const validateNodes = (nodes: any[]) => {
//   nodes.forEach((node) => {
//     if (!node.nodeId) {
//       console.error(node, nodes)
//       throw new Error('invalid node detected')
//     }
//   })
// }

// const cleanNode = (node: any) => {
//   if (!node.nodeId) {
//     console.log('node is invalid', node)
//   }
//   return !!node.nodeId
// }

export const useUpdateAppNavConfig = (appId: string) => {
  const { app } = useApp(appId)
  const [updateAppNavConfig, { loading, error }] = useMutation(UpdateAppNavConfig)

  return {
    updateAppNavConfig: useCallback(
      async (navConfig: NavConfig[]) => {
        const data = await updateAppNavConfig({
          variables: {
            appId,
            navConfig,
          },
        })

        return data.data._updateAppNavConfig as NavConfig[]
      },
      [updateAppNavConfig],
    ),
    navConfigs: app?.navConfig || [],
    loading,
    error,
  }
}

export const useUpdateAppName = (appId: string) => {
  const [updateAppNavConfig, { loading, error }] = useMutation(UpdateAppNameMutation)

  return {
    updateAppName: useCallback(
      async (name: string) => {
        return updateAppNavConfig({
          variables: {
            appId,
            name,
          },
        })
      },
      [updateAppNavConfig],
    ),
    loading,
    error,
  }
}

export const useUpdatePageNodes = (appId: string, pageId?: string) => {
  const [updateAppPageNodes] = useMutation(UpdateAppPageNodesMutation, {
    ignoreResults: true,
  })
  const updatePageNodes = useCallback(
    (nodes: Node[], overridePageId?: string) =>
      updateAppPageNodes({
        variables: {
          appId,
          pageId: overridePageId || pageId,
          nodes,
        },
      }),
    [updateAppPageNodes],
  )

  return { updatePageNodes }
}

export const useUpdatePageName = (appId: string, pageId: string) => {
  const [updateAppPageName, { loading, error }] = useMutation(UpdateAppPageNameMutation)
  const updatePageName = useCallback(
    (name: string) =>
      updateAppPageName({
        variables: {
          appId,
          pageId,
          name,
        },
      }),
    [updateAppPageName],
  )
  return { updatePageName, loading, error }
}

export const useCreatePage = (appId: string) => {
  const [createAppPage, { loading, error }] = useMutation(CreateAppPageMutation)
  const createPage = useCallback(
    (name: string) =>
      createAppPage({
        variables: {
          appId,
          name,
        },
      }).then((data) => data.data._createAppPage as AppWithPages),
    [createAppPage],
  )
  return { createPage, loading, error }
}

export const useDeletePage = (appId: string) => {
  const [deleteAppPage, { loading, error }] = useMutation(DeleteAppPageMutation)
  const deletePage = useCallback(
    async (pageId: string) =>
      deleteAppPage({
        variables: {
          appId,
          pageId,
        },
      }),
    [deleteAppPage],
  )

  return { deletePage, loading, error }
}
