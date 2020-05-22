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

const API = '/dev/v1/web-components-config'

export const fetchWebComponentConfig = async (
  params: FetchWebComponentConfigParams,
): Promise<WebComponentConfigResult> => {
  return sampleRespone() //SHOULD REMOVE WHEN API READY
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

export const putWebComponentConfig = async (params: PutWebComponentConfigParams): Promise<WebComponentConfigResult> => {
  return sampleRespone() //SHOULD REMOVE WHEN API READY
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

//SHOULD REMOVE WHEN API READY
function sampleRespone(): Promise<WebComponentConfigResult> {
  return new Promise(res => {
    setTimeout(() => {
      const data = {
        appointmentLength: 15,
        appointmentTimeGap: 60,
        appointmentTypes: [{ value: 'value1', id: 'id1' }],
        customerId: 'DXX',
        daysOfWeek: ['1', '2', '3', '5', '6'],
        negotiatorIds: ['1', '2'],
      } as WebComponentConfigResult
      res(data)
    }, 1000)
  })
}
