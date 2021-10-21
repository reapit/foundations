import { fetcher } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { URLS } from '../constants/api'
import { getPlatformHeaders, logger } from '@reapit/utils-react'

export interface CreateUpdateOfficeGroupModel {
  name: string
  officeIds: string
  status: 'active' | 'inactive'
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
        api: window.reapit.config.platformApiUrl,
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
  } catch (err) {
    logger(err)
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
        api: window.reapit.config.platformApiUrl,
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
  } catch (err) {
    logger(err)
  }
}
