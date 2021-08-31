import { useUserId } from '@/components/pages/app-select'
import { gql, useMutation } from '@apollo/client'
import { App, AppFragment, Page } from './fragments'
import { GetUserAppsQuery } from './use-user-apps'

const UpdateAppMutation = gql`
  ${AppFragment}
  mutation UpdateApp($id: ID!, $name: String, $pages: [_PageInput!]) {
    _updateApp(id: $id, name: $name, pages: $pages) {
      ...AppFragment
    }
  }
`

export const useUpdateApp = () => {
  const userId = useUserId()
  const [updateApp, { loading, error }] = useMutation(UpdateAppMutation, {
    refetchQueries: [{ query: GetUserAppsQuery, variables: { userId } }],
  })

  return {
    updateApp: (app: App, name?: string, pages?: Array<Page>) =>
      updateApp({
        variables: { id: app.id, name, pages },
        optimisticResponse: { _updateApp: { ...app, name: name || app.name, pages: pages || app.pages } },
      }),
    loading,
    error,
  }
}
