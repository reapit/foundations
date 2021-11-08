import fetch from 'node-fetch'
import config from '../config.json'
import {
  AppSummaryModelPagedResult,
  CreateAppModel,
  ProblemDetails,
  AppDetailModel,
  CreateAppRevisionModel,
  ApproveModel,
} from '@reapit/foundations-ts-definitions'
import { getIdFromCreateHeaders } from '../utils/get-id-from-create-headers'

const { platformApiUrl } = config

const API_VERSION = 'latest'

export const getDeveloperApps = async (developerId: string, accessToken: string) => {
  const res = await fetch(`${platformApiUrl}/marketplace/apps?PageSize=100&developerId=${developerId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'api-version': API_VERSION,
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
      'api-version': API_VERSION,
    },
    body: JSON.stringify(appRevision),
  })
  if (!res.ok) {
    const data: ProblemDetails = await res.json()
    console.log(data)
    throw new Error(data.description)
  }
  const revisionId = getIdFromCreateHeaders({
    headers: iterableToDictionary(res.headers),
  })

  if (!revisionId) {
    throw new Error('Failed to get revision id from headers')
  }

  return revisionId
}

export const approveMarketplaceAppRevision = async (
  appId: string,
  revisionId: string,
  approval: ApproveModel,
  accessToken: string,
) => {
  const res = await fetch(`${platformApiUrl}/marketplace/apps/${appId}/revisions/${revisionId}/approve`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'api-version': API_VERSION,
    },
    body: JSON.stringify(approval),
  })
  if (!res.ok) {
    const data: ProblemDetails = await res.json()
    throw new Error(data.description)
  }
  return false
}

export const getMarketplaceApp = async (appId: string, accessToken: string) => {
  const res = await fetch(`${platformApiUrl}/marketplace/apps/${appId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'api-version': API_VERSION,
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
      'api-version': API_VERSION,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(app),
  })

  if (!res.ok) {
    const data: ProblemDetails = await res.json()
    throw new Error(data.description)
  }

  const appId = getIdFromCreateHeaders({
    headers: iterableToDictionary(res.headers),
  })

  if (!appId) {
    throw new Error('Failed to get appId from create headers')
  }

  return appId
}
