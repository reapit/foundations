import { useState, useEffect } from 'react'
import { useAsyncState } from '../use-async-state'
import { ReapitConnectBrowserSession, ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { getMergedHeaders } from './../../../utils-common/src/reapit-data/utils'
import { UpdateAction } from '@reapit/utils-common'
import { useSnack } from '@reapit/elements'
import { StringMap } from '../get-platform-headers'

export type ReapitUpdateState<ParamsType, DataType> = [
  boolean,
  DataType | undefined,
  SendFunction<ParamsType>,
  boolean | undefined,
  string | null,
]

type AcceptedMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type ReapitUpdate = {
  reapitConnectBrowserSession: ReapitConnectBrowserSession
  action: UpdateAction
  method?: AcceptedMethod
  returnUpdatedModel?: boolean
  returnUpdatedModelWithLocation?: boolean
  headers?: StringMap
  uriParams?: Object
}

interface SendFunctionPropsInterface<DataType> {
  uriParams?: Object
  action: UpdateAction
  setLoading: (val: boolean) => Promise<boolean>
  setSuccess: (val: boolean | undefined) => void
  setData: (val: DataType) => void
  setError: (val: string | null) => void
  method: AcceptedMethod
  headers: StringMap
  error: string | null
  returnUpdatedModel: boolean
  returnUpdatedModelWithLocation: boolean
  connectSession: null | ReapitConnectSession
  errorSnack: (text: string, timeout?: number) => void
  canCall: boolean
}

type SendFunction<ParamsType> = (params: ParamsType) => Promise<boolean>

export const send =
  <ParamsType, DataType>({
    uriParams,
    action,
    setLoading,
    setSuccess,
    setData,
    setError,
    errorSnack,
    method,
    connectSession,
    headers,
    returnUpdatedModel,
    returnUpdatedModelWithLocation,
    error,
    canCall,
  }: SendFunctionPropsInterface<DataType>): SendFunction<ParamsType> =>
  async (params: ParamsType): Promise<boolean> => {
    if (!canCall) {
      console.error('connect session not ready')
      return false
    }
    const { api, path } = action
    const deSerialisedPath = uriParams
      ? Object.keys(uriParams).reduce<string>((path, uriReplaceKey) => {
          return path.replace(`{${uriReplaceKey}}`, uriParams[uriReplaceKey])
        }, path)
      : path
    const url = `${api}${deSerialisedPath}`
    const accessToken = connectSession?.accessToken
    const getHeaders = getMergedHeaders(accessToken, headers)

    if (!getHeaders) throw new Error('Missing valid Reapit Connect Session')

    console.log('starting')

    await setLoading(true)
    setSuccess(undefined)
    try {
      console.log('fetching')

      const response = await fetch(url, {
        headers: getHeaders,
        method,
        body: JSON.stringify(params),
      })

      if (!returnUpdatedModel && !returnUpdatedModelWithLocation) await setLoading(false)

      if (returnUpdatedModelWithLocation && error === null) {
        const location = response.headers.get('Location')
        if (!location) {
          throw new Error('Location was not returned by server')
        }

        const fetchResponse = await fetch(location, {
          headers: getHeaders,
          method: 'GET',
        })

        const data = await fetchResponse.json()

        Promise.all([setLoading(false), setSuccess(true), setData(data)])
      } else if (returnUpdatedModel) {
        const data = await response.json()

        Promise.all([setLoading(false), setSuccess(true), setData(data)])
      } else {
        setSuccess(true)
      }
      return true
    } catch (error: any) {
      errorSnack(error?.message)

      await Promise.all([setLoading(false), setSuccess(false), setError(error.message)])
      return false
    }
  }

export const useReapitUpdate = <ParamsType, DataType>({
  action,
  method = 'POST',
  returnUpdatedModel = false,
  returnUpdatedModelWithLocation = false,
  headers = {},
  uriParams,
  reapitConnectBrowserSession,
}: ReapitUpdate): ReapitUpdateState<ParamsType, DataType> => {
  const [loading, setLoading] = useAsyncState<boolean>(false)
  const [error, setError] = useAsyncState<string | null>(null)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [data, setData] = useState<DataType>()
  const { error: errorSnack } = useSnack()
  const [success, setSuccess] = useAsyncState<undefined | boolean>(undefined)
  const [canCall, setCanCall] = useState<boolean>(connectSession !== null)

  useEffect(() => setCanCall(true), [connectSession])

  const sendFunc = send<ParamsType, DataType>({
    uriParams,
    headers,
    setLoading,
    setData,
    setError,
    setSuccess,
    errorSnack,
    connectSession,
    action,
    method,
    returnUpdatedModel,
    returnUpdatedModelWithLocation,
    error,
    canCall,
  })

  return [loading, data, sendFunc, success, error]
}
