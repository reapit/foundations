import { gql, useApolloClient, useMutation } from '@apollo/client'
import cloneDeep from 'clone-deep'
import omitDeep from 'omit-deep'
import { debounce } from 'throttle-debounce'

import { App, AppFragment, NavConfig, Node, Page } from './fragments'
import { GetAppQuery } from './use-app'

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

export const useUpdateApp = () => {
  const [updateApp, { loading, error }] = useMutation(UpdateAppMutation)

  return {
    updateApp: (app: App, header: Node[], footer: Node[], navConfig: NavConfig[], pages?: Array<Partial<Page>>) =>
      updateApp({
        variables: { id: app.id, name: app.name, pages, header, footer, navConfig },
      }),
    loading,
    error,
  }
}

export const useUpdateAppNavConfig = (appId: string) => {
  const client = useApolloClient()
  const { updateApp, loading, error } = useUpdateApp()

  const debouncedUpdateApp = debounce(3000, async (navConfig: NavConfig[]) => {
    const { data } = await client.query<{ _getApp: App }>({ query: GetAppQuery, variables: { idOrSubdomain: appId } })
    const app: App = data?._getApp
    if (!app) return
    return updateApp(
      app,
      omitDeep(cloneDeep(app.header), ['__typename']),
      omitDeep(cloneDeep(app.footer), ['__typename']),
      omitDeep(cloneDeep(navConfig), ['__typename']),
      omitDeep(cloneDeep(app.pages), ['__typename']),
    )
  })

  return {
    updateAppNavConfig: debouncedUpdateApp,
    loading,
    error,
  }
}

export const useUpdateAppName = (appId: string) => {
  const client = useApolloClient()
  const { updateApp, loading, error } = useUpdateApp()

  return {
    updateAppName: async (name: string) => {
      const { data } = await client.query<{ _getApp: App }>({ query: GetAppQuery, variables: { idOrSubdomain: appId } })
      const app: App = data?._getApp
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

export const useUpdatePage = () => {
  const client = useApolloClient()
  const { updateApp, loading } = useUpdateApp()

  const updatePage = async (
    appId: string,
    page: Partial<Page>,
    { header, footer }: { header: Node[]; footer: Node[] },
  ) => {
    const { data } = await client.query<{ _getApp: App }>({ query: GetAppQuery, variables: { idOrSubdomain: appId } })
    const app: App = data?._getApp

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
