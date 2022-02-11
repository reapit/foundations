import { StringMap } from '..'

export interface ReapitErrorField {
  field?: string
  message?: string
}

export interface ReapitError {
  statusCode?: number
  errors?: ReapitErrorField[]
  description?: string
  dateTime?: string
}

export const getMergedHeaders = (accessToken?: string, headers?: StringMap): StringMap | null => {
  return accessToken
    ? {
        Authorization: `Bearer ${accessToken}`,
        'api-version': 'latest',
        'Content-Type': 'application/json',
        ...headers,
      }
    : null
}

export const handleReapitError = ({ description, errors }: ReapitError) => {
  const messageString = description ? description : 'Something went wrong'
  const fieldErrors = errors?.map(({ field, message }) => `Field: ${field}, Message: ${message}`)
  const fieldString = fieldErrors ? fieldErrors.join(', ') : ''

  return `${messageString} ${fieldString}`
}
