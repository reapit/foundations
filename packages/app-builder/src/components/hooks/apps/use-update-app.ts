import { gql, useApolloClient, useMutation } from '@apollo/client'
import cloneDeep from 'clone-deep'
import omitDeep from 'omit-deep'

import { App, AppFragment, Node, Page } from './fragments'
import { GetAppQuery } from './use-app'

const UpdateAppMutation = gql`
  ${AppFragment}
  mutation UpdateApp($id: ID!, $pages: [_PageInput!], $header: [_NodeInput!], $footer: [_NodeInput!]) {
    _updateApp(id: $id, pages: $pages, header: $header, footer: $footer) {
      ...AppFragment
    }
  }
`

export const useUpdateApp = () => {
  const [updateApp, { loading, error }] = useMutation(UpdateAppMutation)

  return {
    updateApp: (app: App, header: Node[], footer: Node[], pages?: Array<Partial<Page>>) =>
      updateApp({
        variables: { id: app.id, pages, header, footer },
      }),
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
        omitDeep(cloneDeep(pages), ['__typename']),
      )
    }
  }

  return { deletePage, loading }
}
