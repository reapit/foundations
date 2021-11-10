import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { ReapitConnectBrowserSession, ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { logger, StringMap } from '..'
import { GetActionNames, getActions } from './actions/get'
import { getMergedHeaders } from './utils'
import qs from 'qs'
import { useAsyncState } from '../use-async-state/index'

export type ReapitGetState<DataType> = [
  data: DataType | null,
  loading: boolean,
  error: string | null,
  refresh: (queryParams?: Object) => void,
]

export interface ReapitGetParams {
  reapitConnectBrowserSession: ReapitConnectBrowserSession
  action: GetActionNames
  queryParams?: Object
  headers?: StringMap
  fetchWhenTrue?: any[]
}

export interface HandleGetParams<DataType> {
  action: GetActionNames
  connectSession: ReapitConnectSession | null
  data: DataType | null
  loading: boolean
  error: string | null
  setData: Dispatch<SetStateAction<DataType | null>>
  setLoading: (stateAction: boolean) => Promise<boolean>
  setError: Dispatch<SetStateAction<string | null>>
  queryParams?: Object
  headers?: StringMap
  fetchWhenTrue?: any[]
}

export const fetcher = async <DataType>({
  action,
  connectSession,
  queryParams,
  headers,
}: HandleGetParams<DataType>): Promise<DataType | string> => {
  const getAction = getActions[action]
  const { api, path } = getAction
  const query = qs.stringify(queryParams)
  const url = `${api}${path}${query ? `?${query}` : ''}`
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

    throw new Error(getAction.errorMessage)
  } catch (err) {
    const error = err as Error
    logger(error)
    return error.message
  }
}

export const checkShouldFetch = (fetchWhenTrue?: any[]): boolean => {
  if (!fetchWhenTrue) return true

  const filtered = fetchWhenTrue.filter((item) => Boolean(item))

  if (filtered.length === fetchWhenTrue.length) return true

  return false
}

export const handleGet =
  <DataType>(handleGetParams: HandleGetParams<DataType>) =>
  () => {
    const { data, error, loading, setData, setLoading, setError, connectSession, fetchWhenTrue } = handleGetParams

    const getData = async () => {
      setError(null)
      await setLoading(true)
      const response = await fetcher<DataType>(handleGetParams)
      const data = typeof response === 'string' ? null : response
      const error = typeof response === 'string' ? response : null

      setData(data)
      setError(error)
      await setLoading(false)
    }

    const shouldFetch = checkShouldFetch(fetchWhenTrue)

    if (!data && !error && !loading && connectSession?.accessToken && shouldFetch) {
      getData()
    }
  }

export const useReapitGet = <DataType>({
  reapitConnectBrowserSession,
  action,
  queryParams,
  headers,
  fetchWhenTrue,
}: ReapitGetParams): ReapitGetState<DataType> => {
  const [data, setData] = useState<DataType | null>(null)
  const [loading, setLoading] = useAsyncState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const getHandler = handleGet<DataType>({
    action,
    connectSession,
    queryParams,
    headers,
    data,
    loading,
    error,
    fetchWhenTrue,
    setData,
    setLoading,
    setError,
  })

  useEffect(getHandler, [connectSession, queryParams, headers, fetchWhenTrue])

  const refresh = getHandler

  return [data, loading, error, refresh]
}
