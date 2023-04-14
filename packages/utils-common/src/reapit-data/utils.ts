interface StringMap {
  [key: string]: string
}

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

export const handleReapitError = ({ description, errors }: ReapitError, fallbackMessage?: string) => {
  const messageString = description ? description : fallbackMessage ? fallbackMessage : 'Something went wrong'
  const fieldErrors = errors?.map(({ field, message }) => `"${field}: ${message}"`)
  const fieldString = fieldErrors ? fieldErrors.join(', ') : ''

  return `${messageString} ${fieldString}`
}
