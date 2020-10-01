import { fetcher } from '@reapit/elements'
import {
  PropertyModel,
  PagedResultPropertyModel_,
} from '@reapit/foundations-ts-definitions'
import { URLS } from '../constants/api'
import { genPlatformHeaders } from '../utils/headers'

export const propertiesApiService = async (): Promise<
  PropertyModel[] | undefined
> => {
  try {
    const response: PagedResultPropertyModel_ | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.PROPERTIES}/?agentRole=rentCollection&marketingMode=letting`,
      method: 'GET',
      headers: await genPlatformHeaders(),
    })

    if (response) {
      return response._embedded as PropertyModel[]
    }

    throw new Error('No response returned by API')
  } catch (err) {
    console.error('Error fetching properties', err.message)
  }
}

export const propertyByIdApiService = async (): Promise<
  PropertyModel | undefined
> => {
  try {
    const globals = window['__REAPIT_MARKETPLACE_GLOBALS__']
    if (!globals) throw new Error('Global object not found on window')
    const code = globals.prpCode
    if (!code) throw new Error('Prp prpCode not found on window')

    const response: PagedResultPropertyModel_ | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.PROPERTIES}/${code}`,
      method: 'GET',
      headers: await genPlatformHeaders(),
    })

    if (response) {
      console.log(response)
      return response as PropertyModel
    }

    throw new Error('No response returned by API')
  } catch (err) {
    console.error('Error fetching property', err.message)
  }
}
