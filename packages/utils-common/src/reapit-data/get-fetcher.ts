import { GetAction } from './actions'
import { getMergedHeaders } from './utils'
import qs from 'qs'
import { ReapitConnectSession } from '../../../connect-session/src'
import { StringMap } from '..'

export interface GetFetcherParams {
  action: GetAction
  connectSession: ReapitConnectSession | null
  queryParams?: Object
  uriParams?: Object
  headers?: StringMap
  logger: (error: Error) => void
}

export const getFetcher = async <DataType>({
  action,
  connectSession,
  queryParams,
  uriParams,
  headers,
  logger,
}: GetFetcherParams): Promise<DataType | string> => {
  const { api, path } = action
  const deSerialisedPath = uriParams
    ? Object.keys(uriParams).reduce<string>((path, uriReplaceKey) => {
        return path.replace(`{${uriReplaceKey}}`, uriParams[uriReplaceKey])
      }, path)
    : path
  const query = qs.stringify(queryParams)
  const url = `${api}${deSerialisedPath}${query ? `?${query}` : ''}`
  const accessToken = connectSession?.accessToken
  const getHeaders = getMergedHeaders(accessToken, headers)

  try {
    if (!getHeaders) throw new Error('Missing valid Reapit Connect Session')

    const res = await fetch(url, {
      headers: getHeaders,
      method: 'GET',
    })

    if (res.ok) {
      const jsonRes = await res.json()
      return jsonRes as DataType
    }

    throw new Error(action.errorMessage || 'Something went wrong')
  } catch (err) {
    const error = err as Error
    logger(error)
    return error.message
  }
}
