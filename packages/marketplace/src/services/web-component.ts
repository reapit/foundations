import { fetcher } from '@reapit/elements'
import { generateHeader } from './utils'
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

export const fetchWebComponentConfig = async (
  params: FetchWebComponentConfigParams,
): Promise<WebComponentConfigResult> => {
  try {
    const { customerId, applicationId } = params
    const response = await fetcher({
      url: `${URLS.webComponentConfig}/${customerId}/${applicationId}`,
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

export const updateWebComponentConfig = async (
  params: UpdateWebComponentConfigParams,
): Promise<WebComponentConfigResult> => {
  try {
    const { customerId, appId, ...rest } = params
    const response = await fetcher({
      url: `${URLS.webComponentConfig}/${customerId}/${appId}`,
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

// export const createWebComponentConfig = async (): Promise<WebComponentConfigResult> => {
//   try {
//     const body = {
//       appointmentLength: '30',
//       appointmentTimeGap: '30',
//       appointmentTypes: '',
//       customerId: 'DXX',
//       daysOfWeek: ['1', '2', '3'],
//       negotiatorIds: ['AAAW'],
//     }

//     const response = await fetcher({
//       url: `${URLS.webComponentConfig}/DXX/4fbbb1e8-bad0-43a2-98f9-bfb9bba366e7`,
//       api: window.reapit.config.webComponentConfigApiUrl,
//       method: 'POST',
//       headers: generateHeader(window.reapit.config.marketplaceApiKey),
//       body: body,
//     })
//     return response
//   } catch (error) {
//     logger(error)
//     throw new Error(error)
//   }
// }
