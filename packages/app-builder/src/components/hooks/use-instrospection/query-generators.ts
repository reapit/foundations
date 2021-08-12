import { IntrospectionObjectType } from 'graphql'

import { nestedFieldsToString, queryableFieldToNestedDict } from './nested-fields'
import { LIST, QueryableField } from './types'

export const getListQuery = (
  queries: Array<QueryableField>,
  queryableObjectTypes: Array<IntrospectionObjectType>,
  queryName: string,
) => {
  const list = queries.find(({ nestedKinds }) => nestedKinds.includes(LIST))
  const listDict = list && queryableFieldToNestedDict(list.type, queryableObjectTypes)
  const listTypeStr = listDict && nestedFieldsToString(listDict)
  const listQuery = list && `${queryName} { ${list.name}${listTypeStr ? ` ${listTypeStr}` : ''} }`

  return listQuery
}
