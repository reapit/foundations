import { AcceptInviteModel, CreateDeveloperModel } from '@reapit/foundations-ts-definitions'
import { fetcher } from '@reapit/utils-common'
import { logger } from '@reapit/utils-react'

export const createDeveloperService = async (developer: CreateDeveloperModel) => {
  try {
    const response = await fetcher({
      url: '/marketplace/developers',
      api: process.env.platformApiUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-version': 'latest',
      },
      body: developer,
    })

    if (response) {
      return true
    }
  } catch (err: any) {
    logger(err as Error)
    return err?.response?.description ?? ''
  }
}

export const acceptInviteService = async (
  acceptInviteModel: AcceptInviteModel,
  developerId: string,
  memberId: string,
) => {
  try {
    const response = await fetcher({
      url: `/marketplace/developers/${developerId}/members/${memberId}/accept`,
      api: process.env.platformApiUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-version': 'latest',
      },
      body: acceptInviteModel,
    })

    if (response) {
      return true
    }
  } catch (err: any) {
    logger(err as Error)
    return err?.response?.description ?? ''
  }
}

export const rejectInviteService = async (developerId: string, memberId: string) => {
  try {
    const response = await fetcher({
      url: `/marketplace/developers/${developerId}/members/${memberId}/reject`,
      api: process.env.platformApiUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-version': 'latest',
      },
    })

    if (response) {
      return true
    }
  } catch (err: any) {
    logger(err as Error)
    return err?.response?.description ?? ''
  }
}
