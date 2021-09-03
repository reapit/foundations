import { useUserId } from '@/components/pages/app-select'
import { gql, useMutation } from '@apollo/client'
import { AppFragment } from './fragments'
import { GetUserAppsQuery } from './use-user-apps'

const CreateAppMutation = gql`
  ${AppFragment}
  mutation CreateApp($name: String!, $userId: String!) {
    _createApp(name: $name, userId: $userId) {
      ...AppFragment
    }
  }
`

export const useCreateApp = () => {
  const userId = useUserId()
  const [createApp, { loading, error }] = useMutation(CreateAppMutation, {
    refetchQueries: [{ query: GetUserAppsQuery, variables: { userId } }],
  })

  return {
    createApp,
    loading,
    error,
  }
}
