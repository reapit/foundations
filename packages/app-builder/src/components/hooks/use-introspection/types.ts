import {
  IntrospectionObjectType,
  IntrospectionOutputTypeRef,
  IntrospectionNonNullTypeRef,
  IntrospectionListTypeRef,
  IntrospectionField,
  TypeKind,
} from 'graphql'

export type QueryableField = IntrospectionField & {
  nestedKinds: Array<string>
  nestedType: string
}

export const isIntrospectionObjectType = (type: any): type is IntrospectionObjectType => {
  return type.kind === TypeKind.OBJECT
}

export const isNonNullType = (type: IntrospectionOutputTypeRef): type is IntrospectionNonNullTypeRef<any> => {
  return type.kind === TypeKind.NON_NULL
}

export const isListType = (type: IntrospectionOutputTypeRef): type is IntrospectionListTypeRef<any> => {
  return type.kind === TypeKind.LIST
}
