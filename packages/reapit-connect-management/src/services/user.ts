import { reapitConnectBrowserSession } from '../core/connect-session'
import { URLS, BASE_HEADERS } from '../constants/api'
import { fetcher } from '@reapit/elements'

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

    const response = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.USERS}/${userId}`,
      method: 'PUT',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: user,
    })

    if (response) {
      return response
    }

    throw new Error('Failed to update user')
  } catch (err) {
    console.error('Error', err.message)
  }
}

export const addMemberToGroup = async (group: UpdateUserGroupParams): Promise<any | undefined> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const response = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.USERS_GROUPS}/${group.id}/members`,
      method: 'POST',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: group,
    })

    if (response) {
      return response
    }

    throw new Error('Adding member to group failed')
  } catch (err) {
    console.error('Error', err.message)
  }
}

export const removeMemberFromGroup = async (group: UpdateUserGroupParams): Promise<any | undefined> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const response = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.USERS_GROUPS}/${group.id}/members/${group.userId}`,
      method: 'DELETE',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: group,
    })

    if (response) {
      return response
    }

    throw new Error('Removing member from group failed')
  } catch (err) {
    console.error('Error', err.message)
  }
}
