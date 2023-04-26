import {
  IntrospectionObjectType,
  IntrospectionOutputTypeRef,
  IntrospectionNonNullTypeRef,
  IntrospectionListTypeRef,
  IntrospectionField,
  TypeKind,
  IntrospectionInputTypeRef,
  IntrospectionInputObjectType,
  IntrospectionScalarType,
  IntrospectionOutputType,
  IntrospectionInputType,
  IntrospectionEnumType,
} from 'graphql'

export type QueryableField = IntrospectionField & {
  nestedKinds: Array<string>
  nestedType: string
  isRequired: boolean
}

const mutationTypes = ['create', 'update', 'delete']
export type MutationType = (typeof mutationTypes)[number]
export const stringIsMutationType = (str: string): str is MutationType => {
  return mutationTypes.some((mt) => str.startsWith(mt))
}

export const isIntrospectionObjectType = (type: any): type is IntrospectionObjectType => {
  return type.kind === TypeKind.OBJECT
}

export const isIntrospectionScalarType = (type: any): type is IntrospectionScalarType => {
  return type.kind === TypeKind.SCALAR
}

export const isIntrospectionInputObjectType = (type: any): type is IntrospectionInputObjectType => {
  return type.kind === TypeKind.INPUT_OBJECT
}

export const isIntrospectionEnumType = (type: any): type is IntrospectionEnumType => {
  return type.kind === TypeKind.ENUM
}

export const isNonNullInputType = (
  type: IntrospectionInputTypeRef,
): type is IntrospectionNonNullTypeRef<IntrospectionInputType> => {
  return type.kind === TypeKind.NON_NULL
}

export const isNonNullType = (
  type: IntrospectionOutputTypeRef,
): type is IntrospectionNonNullTypeRef<IntrospectionOutputType> => {
  return type.kind === TypeKind.NON_NULL
}

export const isListType = (type: IntrospectionOutputTypeRef): type is IntrospectionListTypeRef<any> => {
  return type.kind === TypeKind.LIST
}

export const isListField = (type: IntrospectionOutputTypeRef): type is IntrospectionListTypeRef<any> => {
  return type.kind === TypeKind.LIST
}

export const isListInputType = (type: IntrospectionInputTypeRef): type is IntrospectionListTypeRef<any> => {
  return type.kind === TypeKind.LIST
}
