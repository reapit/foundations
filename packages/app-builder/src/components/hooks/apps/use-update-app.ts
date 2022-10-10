import { gql, useMutation } from '@apollo/client'
import { useCallback } from 'react'

import { AppFragment, AppWithPages, AppWithPagesFragment, Node, NodeFragment, PageFragment } from './fragments'

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
  mutation CreateAppPage($appId: ID!, $entityName: String!, $pageType: String!, $name: String!) {
    _createAppPage(appId: $appId, entityName: $entityName, pageType: $pageType, name: $name) {
      ...AppWithPagesFragment
    }
  }
`

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
    (name: string, entityName: string, pageType: string) =>
      createAppPage({
        variables: {
          appId,
          name,
          entityName,
          pageType,
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
