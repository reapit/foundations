import { useState } from 'react'
import { useAsyncState } from '../use-async-state'
import { ReapitConnectBrowserSession, useReapitConnect } from '@reapit/connect-session'
import { updateActions } from '@reapit/utils-common'
import { getMergedHeaders } from './../../../utils-common/src/reapit-data/utils'
import { UpdateActionNames } from '@reapit/utils-common'
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
  action: UpdateActionNames
  method?: AcceptedMethod
  returnUpdatedModel?: boolean
  headers?: StringMap
  uriParams?: Object
}

type SendFunction<ParamsType> = (params: ParamsType) => Promise<boolean>

export const useReapitUpdate = <ParamsType, DataType>({
  action,
  method = 'POST',
  returnUpdatedModel = false,
  headers = {},
  uriParams,
  reapitConnectBrowserSession,
}: ReapitUpdate): ReapitUpdateState<ParamsType, DataType> => {
  const [loading, setLoading] = useAsyncState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [data, setData] = useState()
  const { error: errorSnack } = useSnack()
  const [success, setSuccess] = useState<undefined | boolean>(undefined)

  const send: SendFunction<ParamsType> = async (params: ParamsType): Promise<boolean> => {
    const updateAction = updateActions[action]
    const { api, path } = updateAction
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

      if (!returnUpdatedModel) await setLoading(false)

      if (returnUpdatedModel && error === null) {
        const location = response.headers.get('Location')
        if (!location) {
          throw new Error('Location was not returned by server')
        }

        const fetchResponse = await fetch(location, {
          headers: getHeaders,
          method: 'GET',
        })

        const data = await fetchResponse.json()

        await setLoading(false)
        setSuccess(true)
        setData(data)
      } else {
        setSuccess(true)
      }
      return true
    } catch (error: any) {
      errorSnack(error?.message)
      await setLoading(false)
      setSuccess(false)
      setError(error.message)
      return false
    }
  }

  return [loading, data, send, success, error]
}
