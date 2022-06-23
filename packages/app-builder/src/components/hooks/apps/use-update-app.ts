import { gql, useApolloClient, useMutation } from '@apollo/client'
import cloneDeep from 'clone-deep'
import omitDeep from 'omit-deep'
import { useEffect, useState } from 'react'
import { notEmpty } from '../use-introspection/helpers'

import { App, AppFragment, NavConfig, Node, Page } from './fragments'
import { GetAppQuery, useApp } from './use-app'

const UpdateAppMutation = gql`
  ${AppFragment}
  mutation UpdateApp(
    $id: ID!
    $name: String!
    $pages: [_PageInput!]
    $header: [_NodeInput!]
    $footer: [_NodeInput!]
    $navConfig: [_NavConfigInput!]
  ) {
    _updateApp(id: $id, name: $name, pages: $pages, header: $header, footer: $footer, navConfig: $navConfig) {
      ...AppFragment
    }
  }
`

const validateNodes = (nodes: any[]) => {
  nodes.forEach((node) => {
    if (!node.nodeId) {
      throw new Error('invalid node detected')
    }
  })
}

export const useUpdateApp = () => {
  const [updateApp, { loading, error }] = useMutation(UpdateAppMutation)

  return {
    updateApp: (app: App, header: Node[], footer: Node[], navConfig: NavConfig[], pages?: Array<Partial<Page>>) => {
      const variables = { id: app.id, name: app.name, pages, header, footer, navConfig }
      validateNodes([...header, ...footer, ...(pages || []).map((page) => page.nodes)].flat().filter(notEmpty))
      return updateApp({
        variables,
        optimisticResponse: {
          _updateApp: {
            ...app,
            ...variables,
          },
        },
      })
    },
    loading,
    error,
  }
}

export const useUpdateAppNavConfig = (appId: string) => {
  const { updateApp, loading, error } = useUpdateApp()
  const { app } = useApp(appId)
  const client = useApolloClient()

  const [newNavConfig, setNewNavConfig] = useState<NavConfig[]>()

  const doUpdate = () => {
    if (newNavConfig) {
      if (!app) {
        return
      }
      updateApp(
        app,
        omitDeep(cloneDeep(app.header), ['__typename']),
        omitDeep(cloneDeep(app.footer), ['__typename']),
        omitDeep(cloneDeep(newNavConfig), ['__typename']),
        omitDeep(cloneDeep(app.pages), ['__typename']),
      )
      setNewNavConfig(undefined)
    }
  }

  let timeout: any

  useEffect(() => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(doUpdate, 2000)

    return () => {
      clearTimeout(timeout)
    }
  }, [newNavConfig])

  return {
    updateAppNavConfig: async (navConfig: NavConfig[]) => {
      if (!app) return
      client.writeQuery({
        query: GetAppQuery,
        variables: { idOrSubdomain: app.id },
        data: {
          _getApp: {
            ...app,
            navConfig,
          },
        },
      })
      setNewNavConfig(navConfig)
    },
    navConfigs: app?.navConfig || [],
    loading,
    error,
  }
}

export const useUpdateAppName = (appId: string) => {
  const { updateApp, loading, error } = useUpdateApp()
  const { app } = useApp(appId)

  return {
    updateAppName: async (name: string) => {
      if (!app) return
      return updateApp(
        {
          ...app,
          name,
        },
        omitDeep(cloneDeep(app.header), ['__typename']),
        omitDeep(cloneDeep(app.footer), ['__typename']),
        omitDeep(cloneDeep(app.navConfig), ['__typename']),
        omitDeep(cloneDeep(app.pages), ['__typename']),
      )
    },
    loading,
    error,
  }
}

export const useUpdatePage = (appId: string) => {
  const { updateApp, loading } = useUpdateApp()
  const { app } = useApp(appId)

  const updatePage = async (page: Partial<Page>, { header, footer }: { header: Node[]; footer: Node[] }) => {
    if (app) {
      const pages = app.pages.map((p: Page) => {
        return p.id === page.id ? { ...p, ...page } : p
      })
      const existing = pages.find((p) => p.id === page.id)
      if (!existing) {
        pages.push(page as Page)
      }

      return updateApp(
        app,
        omitDeep(cloneDeep(header), ['__typename']),
        omitDeep(cloneDeep(footer), ['__typename']),
        omitDeep(cloneDeep(app.navConfig), ['__typename']),
        omitDeep(cloneDeep(pages), ['__typename']),
      )
    }
  }

  return { updatePage, loading }
}

export const useDeletePage = () => {
  const client = useApolloClient()
  const { updateApp, loading } = useUpdateApp()

  const deletePage = async (appId: string, pageId: string) => {
    const { data } = await client.query({ query: GetAppQuery, variables: { idOrSubdomain: appId } })
    const app = data?._getApp

    if (app) {
      const pages = app.pages.filter((p: Page) => p.id !== pageId)
      const { header, footer } = app

      return updateApp(
        app,
        omitDeep(cloneDeep(header), ['__typename']),
        omitDeep(cloneDeep(footer), ['__typename']),
        omitDeep(cloneDeep(app.navConfig), ['__typename']),
        omitDeep(cloneDeep(pages), ['__typename']),
      )
    }
  }

  return { deletePage, loading }
}
