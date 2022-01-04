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

export enum UpdateReturnTypeEnum {
  NONE = 'none',
  LOCATION = 'location',
  RESPONSE = 'response',
}

type ReapitUpdate = {
  reapitConnectBrowserSession: ReapitConnectBrowserSession
  action: UpdateAction
  method?: AcceptedMethod
  returnType?: UpdateReturnTypeEnum
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
  returnType: UpdateReturnTypeEnum
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
    returnType,
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

    await setLoading(true)
    setSuccess(undefined)
    try {
      const response = await fetch(url, {
        headers: getHeaders,
        method,
        body: JSON.stringify(params),
      })

      let data
      let location
      let fetchResponse

      switch (returnType) {
        case UpdateReturnTypeEnum.RESPONSE:
          data = await response.json()

          Promise.all([setLoading(false), setSuccess(true), setData(data)])
          break
        case UpdateReturnTypeEnum.LOCATION:
          location = response.headers.get('Location')
          if (!location) {
            throw new Error('Location was not returned by server')
          }

          fetchResponse = await fetch(location, {
            headers: getHeaders,
            method: 'GET',
          })

          data = await fetchResponse.json()

          Promise.all([setLoading(false), setSuccess(true), setData(data)])
          break
        case UpdateReturnTypeEnum.NONE:
        default:
          await setLoading(false)
          setSuccess(true)
      }

      return true
    } catch (exception: any) {
      errorSnack(exception?.message || error)

      await Promise.all([setLoading(false), setSuccess(false), setError(exception?.message || error)])
      return false
    }
  }

export const useReapitUpdate = <ParamsType, DataType>({
  action,
  method = 'POST',
  returnType = UpdateReturnTypeEnum.NONE,
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
    returnType,
    error,
    canCall,
  })

  return [loading, data, sendFunc, success, error]
}
