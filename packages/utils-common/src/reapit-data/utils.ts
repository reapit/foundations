import { StringMap } from '..'

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
