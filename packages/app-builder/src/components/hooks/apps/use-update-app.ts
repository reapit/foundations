import { gql, useApolloClient, useMutation } from '@apollo/client'
import cloneDeep from 'clone-deep'
import omitDeep from 'omit-deep'

import { App, AppFragment, Page } from './fragments'
import { GetAppQuery } from './use-app'

const UpdateAppMutation = gql`
  ${AppFragment}
  mutation UpdateApp($id: ID!, $name: String, $pages: [_PageInput!]) {
    _updateApp(id: $id, name: $name, pages: $pages) {
      ...AppFragment
    }
  }
`

export const useUpdateApp = () => {
  const [updateApp, { loading, error }] = useMutation(UpdateAppMutation)

  return {
    updateApp: (app: App, name?: string, pages?: Array<Partial<Page>>) =>
      updateApp({
        variables: { id: app.id, name: name || app.name, pages },
        // optimisticResponse: {
        //   _updateApp: { ...app, name: name || app.name, pages: pages || app.pages },
        // },
      }),
    loading,
    error,
  }
}

export const useUpdatePage = () => {
  const client = useApolloClient()
  const { updateApp } = useUpdateApp()

  const updatePage = async (appId: string, page: Partial<Page>) => {
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

      return updateApp(app, app.name, omitDeep(cloneDeep(pages), ['__typename']))
    }
  }

  return { updatePage }
}

export const useDeletePage = () => {
  const client = useApolloClient()
  const { updateApp } = useUpdateApp()

  const deletePage = async (appId: string, pageId: string) => {
    const { data } = await client.query({ query: GetAppQuery, variables: { idOrSubdomain: appId } })
    const app = data?.getApp
    if (app) {
      const pages = app.pages.filter((p: Page) => p.id !== pageId)
      return updateApp(app, app.name, pages)
    }
  }

  return { deletePage }
}
