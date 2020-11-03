import { fetcher } from '@reapit/elements'
import { generateHeaders } from './utils'
import { logger } from '@reapit/utils'
import { URLS } from './constants'

export interface FetchWebComponentConfigParams {
  customerId: string
  applicationId: string
}

export interface UpdateWebComponentConfigParams {
  appId: string
  appointmentLength: number
  appointmentTimeGap: number
  appointmentTypes: any
  customerId: string
  daysOfWeek: string[]
  negotiatorIds: string[]
  // Callback run after update success
  callback?: () => void
}

export type WebComponentConfigResult = {
  appointmentLength: number
  appointmentTimeGap: number
  appointmentTypes: any
  customerId: string
  daysOfWeek: string[]
  negotiatorIds: string[]
} | null

export const fetchWebComponentConfigApi = async (
  params: FetchWebComponentConfigParams,
): Promise<WebComponentConfigResult> => {
  try {
    const { customerId, applicationId } = params
    const response = await fetcher({
      url: `${URLS.webComponentConfig}/${customerId}/${applicationId}`,
      api: window.reapit.config.webComponentConfigApiUrl,
      method: 'GET',
      headers: await generateHeaders(),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const updateWebComponentConfigApi = async (
  params: UpdateWebComponentConfigParams,
): Promise<WebComponentConfigResult> => {
  try {
    const { customerId, appId, ...rest } = params
    const response = await fetcher({
      url: `${URLS.webComponentConfig}/${customerId}/${appId}`,
      api: window.reapit.config.webComponentConfigApiUrl,
      method: 'PATCH',
      headers: await generateHeaders(),
      body: rest,
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
  }
}
