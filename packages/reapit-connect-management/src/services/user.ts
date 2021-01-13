import { reapitConnectBrowserSession } from '../core/connect-session'
import { URLS } from '../constants/api'
import { fetcher } from '@reapit/elements'
import { getPlatformHeaders, logger } from '@reapit/utils'

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
    const response = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.USERS}/${userId}`,
      method: 'PUT',
      headers: await getPlatformHeaders(reapitConnectBrowserSession),
      body: user,
    })

    if (response) {
      return response
    }

    throw new Error('Failed to update user')
  } catch (err) {
    logger(err)
  }
}

export const addMemberToGroup = async (group: UpdateUserGroupParams): Promise<any | undefined> => {
  try {
    const response = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.USERS_GROUPS}/${group.id}/members`,
      method: 'POST',
      headers: await getPlatformHeaders(reapitConnectBrowserSession),
      body: group,
    })

    if (response) {
      return response
    }

    throw new Error('Adding member to group failed')
  } catch (err) {
    logger(err)
  }
}

export const removeMemberFromGroup = async (group: UpdateUserGroupParams): Promise<any | undefined> => {
  try {
    const response = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.USERS_GROUPS}/${group.id}/members/${group.userId}`,
      method: 'DELETE',
      headers: await getPlatformHeaders(reapitConnectBrowserSession),
      body: group,
    })

    if (response) {
      return response
    }

    throw new Error('Removing member from group failed')
  } catch (err) {
    logger(err)
  }
}
