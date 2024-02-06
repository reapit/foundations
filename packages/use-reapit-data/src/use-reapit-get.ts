import { useMemo } from 'react'
import { ReapitConnectBrowserSession } from '@reapit/connect-session'
import {
  StringMap,
  getMergedHeaders,
  handleReapitError,
  getUrl,
  RC_SESSION_MISSING_ERROR,
  NETWORK_ERROR,
} from './utils'
import { GetAction } from './get-actions'
import { useSnack } from '@reapit/elements'
import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { logger } from '@reapit/utils-react'
import { useNavigate } from 'react-router-dom'

export type ReapitGetState<DataType> = [
  data: DataType | null,
  loading: boolean,
  error: string | null,
  refresh: (queryParams?: Object) => void,
  refreshing: boolean,
  clearCache: () => void,
]

export interface ReapitGetParams extends Pick<UseQueryOptions, 'refetchOnWindowFocus' | 'retry'> {
  reapitConnectBrowserSession: ReapitConnectBrowserSession
  action: GetAction
  queryParams?: Object
  uriParams?: Object
  headers?: StringMap
  fetchWhenTrue?: any[]
  withCredentials?: boolean
  onSuccess?: (message: string) => void
  onError?: (message: string) => void
}

export const useReapitGet = <DataType>({
  reapitConnectBrowserSession,
  action,
  queryParams,
  uriParams,
  headers,
  fetchWhenTrue,
  onSuccess,
  onError,
  refetchOnWindowFocus,
  retry,
  withCredentials,
}: ReapitGetParams): ReapitGetState<DataType> => {
  const { success: successSnack, error: errorSnack } = useSnack()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { successMessage, errorMessage } = action
  const url = useMemo(getUrl(action, queryParams, uriParams), [queryParams, uriParams, action])
  const isEnabled = fetchWhenTrue?.length
    ? Boolean(fetchWhenTrue?.filter(Boolean).length === fetchWhenTrue.length)
    : true

  const { data, error, isLoading, isRefetching, refetch } = useQuery<DataType, AxiosError<any>>([url], {
    queryFn: async () => {
      const reqHeaders = await getMergedHeaders(reapitConnectBrowserSession, headers)

      if (!reqHeaders) throw new Error('Missing valid Reapit Connect Session, please try logging in again.')

      const req = await axios.get<DataType>(url, {
        headers: reqHeaders,
        withCredentials,
      })
      return req.data
    },
    onSuccess: () => {
      if (onSuccess && successMessage) onSuccess(successMessage)
      if (!onSuccess && successMessage) successSnack(successMessage)
    },
    onError: async (error) => {
      const connectSession = await reapitConnectBrowserSession.connectSession()
      const isRcError = error.message === RC_SESSION_MISSING_ERROR
      const isFourOOne = error.code === NETWORK_ERROR

      if (isRcError || isFourOOne || !connectSession) {
        return navigate('/login')
      }

      const errorString = handleReapitError(error, errorMessage)

      if (onError) onError(errorString)
      if (!onError) {
        errorSnack(errorString)
        logger(new Error(errorString), connectSession)
      }
    },
    retry: retry ? retry : 1,
    refetchOnWindowFocus: Boolean(refetchOnWindowFocus),
    enabled: isEnabled,
  })

  const result = data ? data : null
  const errorString = error ? handleReapitError(error, errorMessage) : null
  const loading = isEnabled && isLoading
  const clearCache = () => {
    queryClient.removeQueries({ queryKey: [url] })
  }

  return [result, loading, errorString, refetch, isRefetching, clearCache]
}
