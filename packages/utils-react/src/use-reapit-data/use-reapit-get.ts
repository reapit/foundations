import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { ReapitConnectBrowserSession, ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { StringMap } from '..'
import { GetActionNames, getActions } from './actions/get'
import { getMergedHeaders } from './utils'
import qs from 'qs'

export interface ReapitGetState<DataType> {
  data: DataType | null
  loading: boolean
  error: string | null
  refresh: (queryParams?: StringMap) => void
}

export interface ReapitGetParams {
  reapitConnectBrowserSession: ReapitConnectBrowserSession
  action: GetActionNames
  queryParams?: StringMap
  headers?: StringMap
}

export interface HandleGetParams<DataType> {
  action: GetActionNames
  connectSession: ReapitConnectSession | null
  setData: Dispatch<SetStateAction<DataType | null>>
  setLoading: Dispatch<SetStateAction<boolean>>
  setError: Dispatch<SetStateAction<string | null>>
  queryParams?: StringMap
  headers?: StringMap
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
    return error.message
  }
}

export const handleGet =
  <DataType>(handleGetParams: HandleGetParams<DataType>) =>
  () => {
    const getData = async () => {
      const { setData, setLoading, setError } = handleGetParams

      setLoading(true)
      setError(null)

      const response = await fetcher<DataType>(handleGetParams)
      const data = typeof response === 'string' ? null : response
      const error = typeof response === 'string' ? response : null

      setLoading(false)
      setData(data)
      setError(error)
    }

    getData()
  }

export const useReapitGet = <DataType>({
  reapitConnectBrowserSession,
  action,
  queryParams,
  headers,
}: ReapitGetParams): ReapitGetState<DataType> => {
  const [data, setData] = useState<DataType | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const getHandler = handleGet<DataType>({
    action,
    connectSession,
    queryParams,
    headers,
    setData,
    setLoading,
    setError,
  })

  useEffect(getHandler, [connectSession, queryParams, headers])

  const refresh = getHandler

  return {
    data,
    loading,
    refresh,
    error,
  }
}
