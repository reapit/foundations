import { IntrospectionOutputType, IntrospectionOutputTypeRef } from 'graphql'
import { isListType, isNonNullType } from './types'

export const flatKind = (type: IntrospectionOutputTypeRef, kinds: Array<string> = []): Array<string> => {
  if (isNonNullType(type) || isListType(type)) {
    return [...kinds, type.kind, ...flatKind(type.ofType, kinds)]
  }

  return [...kinds, type.kind]
}

export const getObjectType = (type: IntrospectionOutputType | IntrospectionOutputTypeRef): string => {
  if (isNonNullType(type) || isListType(type)) {
    return getObjectType(type.ofType)
  }

  // @ts-ignore
  return type.name
}

export const notEmpty = <TValue>(value?: TValue | null): value is TValue => {
  return value !== null && value !== undefined
}
