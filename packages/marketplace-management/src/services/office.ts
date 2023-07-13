import { fetcher } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { URLS } from '../constants/api'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { OfficeModelPagedResult } from '@reapit/foundations-ts-definitions'

export interface CreateUpdateOfficeGroupModel {
  name: string
  officeIds: string
  status: 'active' | 'inactive'
}

export const OFFICE_IN_USE_ERROR =
  'One of more of the office ids you are using is already assigned to another office group within this organisation'

export const getOfficesService = async (
  search: string,
  orgClientId: string,
): Promise<OfficeModelPagedResult | undefined | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response: OfficeModelPagedResult | undefined = await fetcher({
        api: process.env.platformApiUrl,
        url: `${URLS.OFFICES}${search ? search + '&pageSize=12&active=true' : '?pageSize=12&active=true'}`,
        method: 'GET',
        headers: {
          ...headers,
          ['reapit-customer']: orgClientId,
        },
      })

      if (response) {
        return response
      }
      throw new Error('Failed to fetch offices')
    }
  } catch (err) {
    logger(err as Error)
  }
}

export const createOfficeGroup = async (
  officeGroup: CreateUpdateOfficeGroupModel,
  orgId: string,
): Promise<any | void> => {
  try {
    const url = `${URLS.ORGANISATIONS}/${orgId}${URLS.OFFICES_GROUPS}`
    const headers = await getPlatformHeaders(reapitConnectBrowserSession)
    if (headers) {
      const response = await fetcher({
        api: process.env.platformApiUrl,
        url,
        method: 'POST',
        headers,
        body: officeGroup,
      })

      if (response) {
        return response
      }

      throw new Error('Create office group failed')
    }
  } catch (err: any) {
    const description = err?.response?.description
    if (description && description === OFFICE_IN_USE_ERROR) {
      return description
    }
    logger(err as Error)
  }
}

export const updateOfficeGroup = async (
  officeGroup: CreateUpdateOfficeGroupModel,
  orgId: string,
  officeGroupId: string,
): Promise<any | void> => {
  try {
    const url = `${URLS.ORGANISATIONS}/${orgId}${URLS.OFFICES_GROUPS}/${officeGroupId}`
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        api: process.env.platformApiUrl,
        url,
        method: 'PUT',
        headers,
        body: officeGroup,
      })

      if (response) {
        return response
      }

      throw new Error('Update office group failed')
    }
  } catch (err: any) {
    const description = err?.response?.description
    if (description && description === OFFICE_IN_USE_ERROR) {
      return description
    }
    logger(err as Error)
  }
}
