import { CreateAppModel } from '../../types/marketplace-api-schema'

export interface ApiFormError {
  field: string
  message: string
}

export type ApiFormErrorsResponse =
  | {
      errors?: ApiFormError[] | null | undefined
    }
  | null
  | undefined

const defaultApiFormError: ApiFormError = { field: '', message: '' }

export const getApiErrorsFromResponse = (resp: ApiFormErrorsResponse): CreateAppModel | null => {
  if (!resp || !resp.errors || !Array.isArray(resp.errors)) return null
  const errors = resp.errors.reduce(
    (prev: CreateAppModel = {}, curr: ApiFormError = defaultApiFormError) => ({
      ...prev,
      [curr.field]: curr.message
    }),
    {}
  )
  return errors || null
}
