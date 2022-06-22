import { useQuery, gql } from '@apollo/client'
import { CustomEntity, CustomEntityFragment } from './types'

export const ListCustomEntitiesQuery = gql`
  ${CustomEntityFragment}
  query GetCustomEntitiesQuery($id: String!) {
    _getCustomEntity(id: $id) {
      ...CustomEntityFragment
    }
  }
`

export const useCustomEntity = (id: string) => {
  const { loading, error, data } = useQuery(ListCustomEntitiesQuery, {
    variables: {
      id,
    },
    skip: !id,
  })

  return {
    loading,
    error,
    customEntity: data?._getCustomEntity as CustomEntity | undefined,
  }
}
