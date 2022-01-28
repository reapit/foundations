import { useQuery, gql } from '@apollo/client'
import { CustomEntity, CustomEntityFragment } from './types'

export const ListCustomEntitiesQuery = gql`
  ${CustomEntityFragment}
  query ListCustomEntitiesQuery() {
    _getCustomEntities {
      ...CustomEntityFragment
    }
  }
`

export const useCustomEntities = () => {
  const { loading, error, data } = useQuery(ListCustomEntitiesQuery)

  return {
    loading,
    error,
    customEntities: (data?._getCustomEntities || []) as CustomEntity[],
  }
}
