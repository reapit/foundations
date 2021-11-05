import fetch from 'node-fetch'
import config from '../config.json'
import {
  AppSummaryModelPagedResult,
  CreateAppModel,
  ProblemDetails,
  AppDetailModel,
  CreateAppRevisionModel,
} from '@reapit/foundations-ts-definitions'
import { getIdFromCreateHeaders } from '../utils/get-id-from-create-headers'

const { platformApiUrl } = config

export const getDeveloperApps = async (developerId: string, accessToken: string) => {
  const res = await fetch(`${platformApiUrl}/marketplace/apps?PageSize=100&developerId=${developerId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'api-version': '2020-01-31',
    },
  })
  const data: AppSummaryModelPagedResult = await res.json()

  return data.data
}

export const createMarketplaceAppRevision = async (
  appId: string,
  appRevision: CreateAppRevisionModel,
  accessToken: string,
) => {
  const res = await fetch(`${platformApiUrl}/marketplace/apps/${appId}/revisions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'api-version': '2020-01-31',
    },
    body: JSON.stringify(appRevision),
  })
  if (!res.ok) {
    const data: ProblemDetails = await res.json()
    throw new Error(data.detail)
  }
  return true
}

export const getMarketplaceApp = async (appId: string, accessToken: string) => {
  const res = await fetch(`${platformApiUrl}/marketplace/apps/${appId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'api-version': '2020-01-31',
    },
  })
  const data: AppDetailModel = await res.json()

  return data
}

const iterableToDictionary = <T>(iterable: Iterable<[string, T]>): { [key: string]: T } =>
  [...iterable].reduce((acc, [key, value]) => {
    acc[key] = value
    return acc
  }, {})

export const createMarketplaceApp = async (app: CreateAppModel, accessToken: string) => {
  const res = await fetch(`${platformApiUrl}/marketplace/apps`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'api-version': '2020-01-31',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(app),
  })

  if (!res.ok) {
    const data: ProblemDetails = await res.json()
    throw new Error(data.detail)
  }

  const appId = getIdFromCreateHeaders({
    headers: iterableToDictionary(res.headers),
  })

  if (!appId) {
    throw new Error('Failed to get appId from create headers')
  }

  return appId

  // return getMarketplaceApp(appId, accessToken)
}
