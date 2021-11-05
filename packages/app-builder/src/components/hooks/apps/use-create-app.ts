import { useUserId } from '@/components/pages/app-select'
import { gql, useMutation } from '@apollo/client'
import { AppFragment } from './fragments'
import { GetUserAppsQuery } from './use-user-apps'

const CreateAppMutation = gql`
  ${AppFragment}
  mutation CreateApp($name: String!, $developerId: String!) {
    _createApp(name: $name, developerId: $developerId) {
      ...AppFragment
    }
  }
`

export const useCreateApp = () => {
  const developerId = useUserId()
  const [createApp, { loading, error }] = useMutation(CreateAppMutation, {
    refetchQueries: [{ query: GetUserAppsQuery, variables: { developerId } }],
  })

  return {
    createApp,
    loading,
    error,
  }
}
