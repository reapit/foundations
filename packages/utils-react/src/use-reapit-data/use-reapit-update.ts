import { logger } from '@reapit/utils-react'
import { useState, useEffect } from 'react'
import { useAsyncState } from '../use-async-state'
import { ReapitConnectBrowserSession, ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { getMergedHeaders, handleReapitError } from './../../../utils-common/src/reapit-data/utils'
import { UpdateAction } from '@reapit/utils-common'
import { useSnack } from '@reapit/elements'
import { StringMap } from '../get-platform-headers'

export type ReapitUpdateState<ParamsType, DataType> = [
  boolean,
  DataType | undefined,
  SendFunction<ParamsType, DataType | boolean>,
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
  setData: (val: DataType | undefined) => Promise<DataType | undefined>
  setError: (val: string | null) => void
  method: AcceptedMethod
  headers: StringMap
  error: string | null
  returnType: UpdateReturnTypeEnum
  connectSession: null | ReapitConnectSession
  errorSnack: (text: string, timeout?: number) => void
  canCall: boolean
}

export type SendFunction<ParamsType, DataType> = (
  params: ParamsType,
  options?: {
    uriParams?: Object
  },
) => Promise<DataType>

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
  }: SendFunctionPropsInterface<DataType>): SendFunction<ParamsType, DataType | boolean> =>
  async (
    params: ParamsType,
    options?: {
      uriParams?: Object
    },
  ): Promise<DataType | boolean> => {
    if (!canCall) {
      return false
    }
    const { api, path, errorMessage } = action
    const spreadedUriParams = { ...uriParams, ...options?.uriParams }
    const deSerialisedPath = spreadedUriParams
      ? Object.keys(spreadedUriParams).reduce<string>((path, uriReplaceKey) => {
          return path.replace(`{${uriReplaceKey}}`, spreadedUriParams[uriReplaceKey])
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

      if (!response.ok) {
        const errorRes = await response.json()
        throw new Error(handleReapitError(errorRes ?? {}, errorMessage))
      }

      switch (returnType) {
        case UpdateReturnTypeEnum.RESPONSE:
          data = await response.json()

          await Promise.all([setData(data), setLoading(false), setSuccess(true)])
          return data
        case UpdateReturnTypeEnum.LOCATION:
          location = response.headers.get('Location')
          /* Need to redirect to main platform uri **/
          location = location?.includes('.prod.paas') ? location.replace('.prod.paas', '') : location
          if (!location) {
            throw new Error('Location was not returned by server')
          }

          fetchResponse = await fetch(location, {
            headers: getHeaders,
            method: 'GET',
          })

          if (!fetchResponse.ok) {
            const errorRes = await fetchResponse.json()
            throw new Error(handleReapitError(errorRes ?? {}, errorMessage))
          }

          data = await fetchResponse.json()

          await Promise.all([setLoading(false), setSuccess(true), setData(data)])
          break
        case UpdateReturnTypeEnum.NONE:
        default:
          await setLoading(false)
          setSuccess(true)
      }

      return true
    } catch (exception) {
      const err = exception as Error
      const message = err?.message ?? error
      errorSnack(message, 5000)

      await Promise.all([setLoading(false), setSuccess(false), setError(message)])

      logger(err, connectSession)
      return false
    }
  }

export const handleSuccess =
  (action: UpdateAction, success: boolean | undefined, successSnack: (message: string) => void) => () => {
    const { successMessage } = action

    if (success && successMessage) {
      successSnack(successMessage)
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
  const [data, setData] = useAsyncState<DataType | undefined>(undefined)
  const { error: errorSnack, success: successSnack } = useSnack()
  const [success, setSuccess] = useAsyncState<undefined | boolean>(undefined)
  const [canCall, setCanCall] = useState<boolean>(connectSession !== null)

  useEffect(() => setCanCall(true), [connectSession])
  useEffect(handleSuccess(action, success, successSnack), [success])

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
