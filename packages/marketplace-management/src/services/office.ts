import { fetcher } from '@reapit/elements'
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
    const url = `${URLS.ORGANISATIONS}/${orgId}${URLS.OFFICES_GROUPS}`

    const response = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url,
      method: 'POST',
      headers: await getPlatformHeaders(reapitConnectBrowserSession),
      body: officeGroup,
    })

    if (response) {
      return response
    }

    throw new Error('Create office group failed')
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
    const url = `${URLS.ORGANISATIONS}/${orgId}${URLS.OFFICES_GROUPS}/${officeGroupId}`

    const response = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url,
      method: 'PUT',
      headers: await getPlatformHeaders(reapitConnectBrowserSession),
      body: officeGroup,
    })

    if (response) {
      return response
    }

    throw new Error('Update office group failed')
  } catch (err) {
    logger(err)
  }
}
