import { reapitConnectBrowserSession } from '@/core/connect-session'
import { PipelineModelInterface, PipelineRunnerModelInterface } from '@reapit/foundations-ts-definitions'
import { fetcher } from '@reapit/utils-common'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { URLS } from './constants'

type Pagination<T> = {
  items: T[]
  count: number
  totalCount: number
}

export const fetchPipelineDeploymentList = async (params: {
  appId: string
  page?: number
}): Promise<Pagination<PipelineRunnerModelInterface> | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.pipelines}/${params.appId}`,
        api: window.reapit.config.platformApiUrl, // TODO change to test url if required
        method: 'GET',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error
  }
}

export const fetchAppById = async (params: { id: string }): Promise<PipelineModelInterface | void> => {
  try {
    const { id } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.pipelines}/${id}/deployments`,
        api: window.reapit.config.platformApiUrl, // TODO change to test url if required
        method: 'GET',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error
  }
}
