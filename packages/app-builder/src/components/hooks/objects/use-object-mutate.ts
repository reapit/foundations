import { useMutation } from '@apollo/client'
import { dummyMutation } from '../use-introspection'
import { notEmpty } from '../use-introspection/helpers'
import { MutationType } from '../use-introspection/types'
import { useObject } from './use-object'

export const useObjectMutate = (mutateType: MutationType | string, typeName?: string) => {
  const { object, error, loading } = useObject(typeName)
  const listQuery = object && typeName ? object.list : undefined
  const mutate =
    object && typeName ? object[mutateType] || object.specials.find(({ name }) => name === mutateType) : undefined
  const [mutateFunction, mutationResult] = useMutation(mutate?.mutation || dummyMutation, {
    refetchQueries: [listQuery?.query && { query: listQuery.query }].filter(notEmpty),
  })

  return {
    available: !!mutate,
    mutateFunction,
    args: mutate?.args,
    data: mutationResult.data,
    loading: loading || mutationResult.loading,
    mutationLoading: mutationResult.loading,
    error: error || mutationResult.error,
  }
}

export const useObjectCreate = (typeName?: string) => useObjectMutate('create', typeName)
export const useObjectUpdate = (typeName?: string) => useObjectMutate('update', typeName)
export const useObjectDelete = (typeName?: string) => useObjectMutate('delete', typeName)
export const useObjectSpecial = (typeName: string, specialName: string) => useObjectMutate(specialName, typeName)
