import { reapitConnectBrowserSession } from '../core/connect-session'
import { URLS, BASE_HEADERS } from '../constants/api'

interface UpdateUserParams {
  name: string
  groupIds: string[]
}

interface UpdateUserGroupParams {
  id: string
  userId: string
}

export const updateUser = async (user: UpdateUserParams, userId: string): Promise<any | undefined> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const api = window.reapit.config.platformApiUrl
    const url = `${URLS.USERS}/${userId}`
    const path = `${api}${url}`

    const response = await fetch(path, {
      method: 'PUT',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
        'api-version': '2020-01-31',
      },
      body: JSON.stringify(user),
    }).then(response => response.json())
    return response
  } catch (err) {
    console.error('Error', err.message)
  }
}

export const addMemberToGroup = async (group: UpdateUserGroupParams): Promise<any | undefined> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const api = window.reapit.config.platformApiUrl
    const url = `${URLS.USERS_GROUPS}/${group.id}/members`
    const path = `${api}${url}`

    const response = await fetch(path, {
      method: 'POST',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
        'api-version': '2020-01-31',
      },
      body: JSON.stringify(group),
    }).then(response => response.json())
    return response
  } catch (err) {
    console.error('Error', err.message)
  }
}

export const removeMemberFromGroup = async (group: UpdateUserGroupParams): Promise<any | undefined> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const api = window.reapit.config.platformApiUrl
    const url = `${URLS.USERS_GROUPS}/${group.id}/members/${group.userId}`
    const path = `${api}${url}`

    const response = await fetch(path, {
      method: 'DELETE',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
        'api-version': '2020-01-31',
      },
      body: JSON.stringify(group),
    }).then(response => response.json())
    return response
  } catch (err) {
    console.error('Error', err.message)
  }
}
