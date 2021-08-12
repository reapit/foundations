import {
  IntrospectionObjectType,
  IntrospectionOutputTypeRef,
  IntrospectionNonNullTypeRef,
  IntrospectionListTypeRef,
  IntrospectionField,
} from 'graphql'

export const OBJECT = 'OBJECT'
export const NON_NULL = 'NON_NULL'
export const LIST = 'LIST'
export const SCALAR = 'SCALAR'

export type QueryableField = IntrospectionField & {
  nestedKinds: Array<string>
  nestedType: string
}

export const isIntrospectionObjectType = (type: any): type is IntrospectionObjectType => {
  return type.kind === OBJECT
}

export const isNonNullType = (type: IntrospectionOutputTypeRef): type is IntrospectionNonNullTypeRef<any> => {
  return type.kind === NON_NULL
}

export const isListType = (type: IntrospectionOutputTypeRef): type is IntrospectionListTypeRef<any> => {
  return type.kind === LIST
}
