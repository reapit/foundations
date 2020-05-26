import { fetcher } from '@reapit/elements'
import { generateHeader } from './utils'
import { logger } from 'logger'
import { URLS } from './constants'

export interface FetchWebComponentConfigParams {
  customerId: string
}

export interface PutWebComponentConfigParams {
  appointmentLength: number
  appointmentTimeGap: number
  appointmentTypes: any
  customerId: string
  daysOfWeek: string[]
  negotiatorIds: string[]
}

export type WebComponentConfigResult = {
  appointmentLength: number
  appointmentTimeGap: number
  appointmentTypes: any
  customerId: string
  daysOfWeek: string[]
  negotiatorIds: string[]
} | null

export const fetchWebComponentConfig = async (
  params: FetchWebComponentConfigParams,
): Promise<WebComponentConfigResult> => {
  try {
    const { customerId } = params
    const response = await fetcher({
      url: `${URLS.webComponentConfig}/${customerId}`,
      api: window.reapit.config.webComponentConfigApiUrl,
      method: 'GET',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const putWebComponentConfig = async (params: PutWebComponentConfigParams): Promise<WebComponentConfigResult> => {
  try {
    const { customerId = 'DXX', ...rest } = params
    const response = await fetcher({
      url: `${URLS.webComponentConfig}/${customerId}`,
      api: window.reapit.config.webComponentConfigApiUrl,
      method: 'PATCH',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
      body: rest,
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}
