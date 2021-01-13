import { reapitConnectBrowserSession } from '../core/connect-session'
import { URLS } from '../constants/api'
import { getPlatformHeaders, logger } from '@reapit/utils'

interface CreateOfficeGroupParams {
  name: string
  officeIds: string
}

interface UpdateOfficeGroupParams extends CreateOfficeGroupParams {
  status: string
}

export const createOfficeGroup = async (
  officeGroup: CreateOfficeGroupParams,
  orgId: string,
): Promise<any | undefined> => {
  try {
    const api = window.reapit.config.platformApiUrl
    const url = `${URLS.ORGANISATIONS}/${orgId}${URLS.OFFICES_GROUPS}`
    const path = `${api}${url}`

    const response = await fetch(path, {
      method: 'POST',
      headers: await getPlatformHeaders(reapitConnectBrowserSession),
      body: JSON.stringify(officeGroup),
    }).then(res => res.json())
    return response
  } catch (err) {
    logger(err)
  }
}

export const updateOfficeGroup = async (
  officeGroup: UpdateOfficeGroupParams,
  orgId: string,
  officeGroupId: string,
): Promise<any | undefined> => {
  try {
    const api = window.reapit.config.platformApiUrl
    const url = `${URLS.ORGANISATIONS}/${orgId}${URLS.OFFICES_GROUPS}/${officeGroupId}`
    const path = `${api}${url}`

    const response = await fetch(path, {
      method: 'PUT',
      headers: await getPlatformHeaders(reapitConnectBrowserSession),
      body: JSON.stringify(officeGroup),
    }).then(res => res.json())
    return response
  } catch (err) {
    logger(err)
  }
}
