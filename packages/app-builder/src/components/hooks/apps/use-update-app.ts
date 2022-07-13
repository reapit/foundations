import { gql, useMutation } from '@apollo/client'
import { useCallback, useEffect, useState } from 'react'
import debounce from 'debounce'

import {
  AppFragment,
  AppWithPages,
  AppWithPagesFragment,
  NavConfig,
  Node,
  NodeFragment,
  PageFragment,
} from './fragments'
import { NavConfigFragment, useAppNavConfig } from './use-app'

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
  ${NavConfigFragment}
  mutation UpdateAppNavConfig($appId: ID!, $navConfig: [_NavConfigInput!]!) {
    _updateAppNavConfig(appId: $appId, navConfig: $navConfig) {
      id
      navConfig {
        ...NavConfigFragment
      }
    }
  }
`

const removeTypeName = (obj: any) => {
  const clone = { ...obj }
  if (clone.__typename) {
    delete clone.__typename
  }
  return clone
}

export const useUpdateAppNavConfig = (appId: string) => {
  const { navConfig } = useAppNavConfig(appId)
  const [navConfigCopy, setNavConfigCopy] = useState(navConfig)
  const [updateAppNavConfig, { loading, error }] = useMutation(UpdateAppNavConfig)
  const updateAppNavConfigDebounced = useCallback(debounce(updateAppNavConfig, 1000), [updateAppNavConfig])

  const updateNavConfig = useCallback((navConfig: NavConfig[]) => {
    setNavConfigCopy(navConfig)
    updateAppNavConfigDebounced({
      variables: {
        appId,
        navConfig: navConfig.map(removeTypeName),
      },
    })
  }, [])

  useEffect(() => {
    return () => updateAppNavConfigDebounced.flush()
  }, [updateAppNavConfigDebounced])

  return {
    updateAppNavConfig: updateNavConfig,
    navConfigs: navConfigCopy || [],
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
