import { gql, useMutation } from '@apollo/client'
import { CustomEntity, CustomEntityFragment } from './types'

export const UpdateCustomEntityMutation = gql`
  ${CustomEntityFragment}
  mutation _updateCustomEntity($id: String!, $customEntity: _CustomEntityInput!) {
    _updateCustomEntity(customEntity: $customEntity) {
      ...CustomEntityFragment
    }
  }
`

export const useUpdateCustomEntity = () => {
  const [updateCustomEntity, { loading, error }] = useMutation(UpdateCustomEntityMutation)

  return {
    loading,
    error,
    updateCustomEntity: (id: string, customEntity: Omit<CustomEntity, 'id'>) =>
      updateCustomEntity({
        variables: {
          customEntity,
          id,
        },
      }).then(({ data }) => data?._updateCustomEntity as CustomEntity),
  }
}
