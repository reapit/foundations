import { fetcher } from '@reapit/elements'
import { generateHeader } from './utils'
import { logger } from 'logger'

export interface FetchWebComponentConfigParams {
  customerId: string
}

export interface PutWebComponentConfigParams {
  appointmentLength: number
  appointmentTimeGap: number
  appointmentTypes: any
  customerId: string
  daysOfWeek: number[]
  negotiatorIds: string[]
}

export type WebComponentConfigResult = {
  appointmentLength: number
  appointmentTimeGap: number
  appointmentTypes: any
  customerId: string
  daysOfWeek: number[]
  negotiatorIds: string[]
} | null

const API = '/dev/v1/web-components-config'

export const fetchWebComponentConfig = async (
  params: FetchWebComponentConfigParams,
): Promise<WebComponentConfigResult> => {
  try {
    const { customerId } = params
    const response = await fetcher({
      url: `${API}/${customerId}`,
      api: 'http://localhost:3000',
      method: 'GET',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const putWebComponentConfig = async (params: PutWebComponentConfigParams) => {
  try {
    const { customerId = 'DXX', ...rest } = params
    const response = await fetcher({
      url: `${API}/${customerId}`,
      api: 'http://localhost:3000',
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
