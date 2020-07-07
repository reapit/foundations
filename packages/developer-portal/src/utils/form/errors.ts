export interface ApiFormError {
  field: string
  message: string
}

export type ApiFormErrorsResponse =
  | {
      errors?: ApiFormError[] | null | undefined
      description?: string
    }
  | null
  | undefined

const defaultApiFormError: ApiFormError = { field: '', message: '' }

export const getApiErrorsFromResponse = (resp: ApiFormErrorsResponse) => {
  if (!resp || !resp.errors || !Array.isArray(resp.errors)) return null
  const errors = resp.errors.reduce(
    (prev: { [k: string]: string | string[] } = {}, curr: ApiFormError = defaultApiFormError) => ({
      ...prev,
      [curr.field]: curr.message,
    }),
    {},
  )
  return errors || null
}
