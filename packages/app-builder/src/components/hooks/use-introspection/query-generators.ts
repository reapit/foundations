import { IntrospectionObjectType, TypeKind } from 'graphql'
import { gql } from '@apollo/client'
import { nestedFieldsToString, queryableFieldToNestedDict } from './nested-fields'
import { QueryableField } from './types'

export const getListQuery = (queries: Array<QueryableField>, queryableObjectTypes: Array<IntrospectionObjectType>) => {
  const list = queries.find(({ nestedKinds }) => nestedKinds.includes(TypeKind.LIST))
  const listDict = list && queryableFieldToNestedDict(list.type, queryableObjectTypes)
  const listTypeStr = listDict && nestedFieldsToString(listDict)
  const listQuery = list && `{ ${list.name}${listTypeStr ? ` ${listTypeStr}` : ''} }`

  return gql`
    ${listQuery}
  `
}
