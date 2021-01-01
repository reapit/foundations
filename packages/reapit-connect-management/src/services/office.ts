import { reapitConnectBrowserSession } from '../core/connect-session'
import { URLS, BASE_HEADERS } from '../constants/api'

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
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')
    const api = window.reapit.config.platformApiUrl
    const url = `${URLS.ORGANISATIONS}/${orgId}${URLS.OFFICES_GROUPS}`
    const path = `${api}${url}`

    const response = await fetch(path, {
      method: 'POST',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
        'api-version': '2020-01-31',
      },
      body: JSON.stringify(officeGroup),
    }).then(response => response.json())
    return response
  } catch (err) {
    console.error('Error', err.message)
  }
}

export const updateOfficeGroup = async (
  officeGroup: UpdateOfficeGroupParams,
  orgId: string,
  officeGroupId: string,
): Promise<any | undefined> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const api = window.reapit.config.platformApiUrl
    const url = `${URLS.ORGANISATIONS}/${orgId}${URLS.OFFICES_GROUPS}/${officeGroupId}`
    const path = `${api}${url}`

    const response = await fetch(path, {
      method: 'PUT',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
        'api-version': '2020-01-31',
      },
      body: JSON.stringify(officeGroup),
    }).then(response => response.json())
    return response
  } catch (err) {
    console.error('Error', err.message)
  }
}
