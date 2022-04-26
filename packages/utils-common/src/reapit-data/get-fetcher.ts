import { GetAction } from './actions'
import { getMergedHeaders, handleReapitError } from './utils'
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
  signal: AbortSignal
  failSilently?: boolean
}

export const getFetcher = async <DataType>({
  action,
  connectSession,
  queryParams,
  uriParams,
  headers,
  logger,
  signal,
  failSilently,
}: GetFetcherParams): Promise<DataType | string> => {
  const { api, path, errorMessage } = action
  const deSerialisedPath = uriParams
    ? Object.keys(uriParams).reduce<string>((path, uriReplaceKey) => {
        return path.replace(`{${uriReplaceKey}}`, uriParams[uriReplaceKey])
      }, path)
    : path
  const query = qs.stringify(queryParams, { encode: false })
  const url = `${api}${deSerialisedPath}${query ? `?${query}` : ''}`
  const accessToken = connectSession?.accessToken
  const getHeaders = getMergedHeaders(accessToken, headers)

  try {
    if (!getHeaders) throw new Error('Missing valid Reapit Connect Session')

    const res = await fetch(url, {
      headers: getHeaders,
      method: 'GET',
      signal,
    })

    if (res.ok) {
      const jsonRes = await res.json()
      return jsonRes as DataType
    }

    const errorRes = await res.json()
    throw new Error(handleReapitError(errorRes ?? {}, errorMessage))
  } catch (err) {
    const error = err as Error
    if (!failSilently) {
      logger(error)
    }
    return error.message ?? action.errorMessage
  }
}
