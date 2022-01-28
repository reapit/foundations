import { gql, useMutation } from '@apollo/client'
import { CustomEntity, CustomEntityFragment } from './types'

export const CreateCustomEntityMutation = gql`
  ${CustomEntityFragment}
  mutation _createCustomEntity($customEntity: _CustomEntityInput!) {
    _createCustomEntity(customEntity: $customEntity) {
      ...CustomEntityFragment
    }
  }
`

export const useCreateCustomEntity = () => {
  const [createCustomEntity, { loading, error }] = useMutation(CreateCustomEntityMutation)

  return {
    loading,
    error,
    createCustomEntity: (customEntity: Omit<CustomEntity, 'id'>) =>
      createCustomEntity({
        variables: {
          customEntity,
        },
      }).then(({ data }) => data?._createCustomEntity as CustomEntity),
  }
}
