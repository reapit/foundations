import { gql, useMutation } from '@apollo/client'
import cloneDeep from 'clone-deep'
import omitDeep from 'omit-deep'
import { introspectionQuery } from '../use-introspection'
import { CustomEntity, CustomEntityFragment } from './types'

export const UpdateCustomEntityMutation = gql`
  ${CustomEntityFragment}
  mutation _updateCustomEntity($id: String!, $customEntity: _CustomEntityInput!) {
    _updateCustomEntity(id: $id, customEntity: $customEntity) {
      ...CustomEntityFragment
    }
  }
`

export const useUpdateCustomEntity = () => {
  const [updateCustomEntity, { loading, error }] = useMutation(UpdateCustomEntityMutation)

  return {
    loading,
    error,
    updateCustomEntity: (id: string, customEntity: CustomEntity) =>
      updateCustomEntity({
        variables: {
          customEntity: omitDeep(cloneDeep(customEntity), ['__typename']),
          id,
        },
        refetchQueries: [introspectionQuery],
      }).then(({ data }) => data?._updateCustomEntity as CustomEntity),
  }
}
