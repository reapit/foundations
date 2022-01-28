import { gql, useMutation } from '@apollo/client'
import { introspectionQuery } from '../use-introspection'
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
    createCustomEntity: (customEntity: CustomEntity) =>
      createCustomEntity({
        variables: {
          customEntity,
        },
        refetchQueries: [introspectionQuery],
      }).then(({ data }) => data?._createCustomEntity as CustomEntity),
  }
}
