import { logger } from '@reapit/utils-react'
import { useMemo } from 'react'
import { ReapitConnectBrowserSession } from '@reapit/connect-session'
import { useSnack } from '@reapit/elements'
import { getMergedHeaders, getUrl, handleReapitError, StringMap } from './utils'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponseHeaders } from 'axios'
import { UpdateAction } from './update-actions'

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

export interface ReapitUpdate {
  reapitConnectBrowserSession: ReapitConnectBrowserSession
  action: UpdateAction
  method?: AcceptedMethod
  returnType?: UpdateReturnTypeEnum
  headers?: StringMap
  uriParams?: Object
}

export interface Options {
  uriParams?: Object
  headers?: StringMap
}

export type SendFunction<ParamsType, DataType> = (params: ParamsType, options?: Options) => Promise<DataType>
export interface MutateParams<DataType> {
  data: DataType
  options?: Options
}

export const useReapitUpdate = <ParamsType, DataType>({
  action,
  method = 'POST',
  returnType = UpdateReturnTypeEnum.NONE,
  headers = {},
  uriParams,
  reapitConnectBrowserSession,
}: ReapitUpdate): ReapitUpdateState<ParamsType, DataType> => {
  const { error: errorSnack, success: successSnack } = useSnack()
  const { successMessage, errorMessage } = action
  const url = useMemo(getUrl(action, undefined, uriParams), [uriParams, action])

  const { mutateAsync, error, data, isSuccess, isLoading } = useMutation<
    DataType,
    AxiosError<any>,
    MutateParams<ParamsType>
  >([url, uriParams], {
    mutationFn: async (mutateParams: MutateParams<ParamsType>) => {
      const { data, options } = mutateParams
      const mergedHeaders = {
        ...headers,
        ...(options?.headers ?? {}),
      }
      const updateUrl = options?.uriParams ? getUrl(action, undefined, { ...uriParams, ...options.uriParams })() : url
      const updateHeaders = await getMergedHeaders(reapitConnectBrowserSession, mergedHeaders)

      if (!updateHeaders) throw new Error('Missing valid Reapit Connect Session, please try logging in again.')

      const res = await axios<DataType>(updateUrl, {
        method,
        headers: updateHeaders,
        data,
      })

      if (returnType === UpdateReturnTypeEnum.RESPONSE) return res.data

      if (returnType === UpdateReturnTypeEnum.LOCATION && res.headers) {
        const headers = res.headers as AxiosResponseHeaders
        const location = headers.get('Location')?.valueOf() as string

        if (!location) throw new Error('Location was not returned by server')

        const locationUrl = location.includes('.prod.paas') ? location.replace('.prod.paas', '') : location

        const locationRes = await axios(locationUrl, {
          method: 'GET',
          headers: updateHeaders,
        })

        return locationRes.data
      }

      return true
    },
    onSuccess: () => {
      if (successMessage) successSnack(successMessage)
    },
    onError: async (error: AxiosError<any>) => {
      const connectSession = await reapitConnectBrowserSession.connectSession()
      const errorString = handleReapitError(error, errorMessage)
      errorSnack(errorString, 5000)
      logger(new Error(errorString), connectSession ?? null)
    },
  })

  const errorString = error?.message ? error.message : null
  const sendFunc: SendFunction<ParamsType, DataType> = (data: ParamsType, options?: Options) =>
    mutateAsync({ data, options })

  return [isLoading, data, sendFunc, isSuccess, errorString]
}
