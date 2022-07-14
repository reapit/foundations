import { fetcher, FetchError, fetcherWithReturnHeader } from '@reapit/utils-common'
import config from '../config.json'
import {
  AppSummaryModelPagedResult,
  CreateAppModel,
  AppDetailModel,
  CreateAppRevisionModel,
  ApproveModel,
  ScopeModel,
} from '@reapit/foundations-ts-definitions'
import Dataloader from 'dataloader'
import { getIdFromCreateHeaders } from '../utils/get-id-from-create-headers'

const { platformApiUrl } = config

const API_VERSION = 'latest'

const getHeaders = (accessToken: string) => ({
  'Content-Type': 'application/json',
  'api-version': API_VERSION,
  Authorization: `Bearer ${accessToken}`,
})

export const getDeveloperApps = async (developerId: string, accessToken: string) => {
  const data: AppSummaryModelPagedResult = await fetcher({
    api: platformApiUrl,
    url: `/marketplace/apps?PageSize=100&developerId=${developerId}`,
    headers: getHeaders(accessToken),
    method: 'GET',
  })
  return data.data
}

// is FetchError typeguard
const isFetchError = (error: any): error is FetchError => {
  return error.name === 'FetchError'
}

export const createMarketplaceAppRevision = async (
  appId: string,
  appRevision: CreateAppRevisionModel,
  accessToken: string,
) => {
  const respHeaders = await fetcherWithReturnHeader<CreateAppRevisionModel>({
    api: platformApiUrl,
    url: `/marketplace/apps/${appId}/revisions`,
    headers: getHeaders(accessToken),
    method: 'POST',
    body: appRevision,
  })

  if (isFetchError(respHeaders)) {
    throw new Error('Failed to get revision id from headers')
  }

  const revisionId = getIdFromCreateHeaders({
    headers: foreachableToDictionary(respHeaders),
  })

  return revisionId
}

export const approveMarketplaceAppRevision = async (
  appId: string,
  revisionId: string,
  approval: ApproveModel,
  accessToken: string,
) => {
  const res = await fetcher({
    api: platformApiUrl,
    url: `/marketplace/apps/${appId}/revisions/${revisionId}/approve`,
    headers: getHeaders(accessToken),
    method: 'POST',
    body: approval,
  })
  return !!res
}

export const getValidMarketplaceScopes = async (accessToken: string) => {
  const res: ScopeModel[] = await fetcher({
    api: platformApiUrl,
    url: '/marketplace/scopes',
    headers: getHeaders(accessToken),
    method: 'GET',
  })

  return res
}

export const createMarketplaceAppLoader = (accessToken: string) =>
  new Dataloader((appIds: readonly string[]) => {
    return Promise.all(appIds.map((appId) => getMarketplaceApp(appId, accessToken)))
  })

export const getMarketplaceApp = async (appId: string, accessToken: string) => {
  const res: AppDetailModel = await fetcher({
    api: platformApiUrl,
    url: `/marketplace/apps/${appId}`,
    headers: getHeaders(accessToken),
    method: 'GET',
  })

  return res
}

const foreachableToDictionary = (foreachable: {
  forEach: (callback: (value: string, key: string) => void) => void
}) => {
  const dictionary: { [key: string]: any } = {}
  foreachable.forEach((value: string, key: string) => {
    dictionary[key] = value
  })
  return dictionary
}

export const createMarketplaceApp = async (app: CreateAppModel, accessToken: string) => {
  const resHeaders = await fetcherWithReturnHeader({
    method: 'POST',
    api: platformApiUrl,
    url: '/marketplace/apps',
    headers: getHeaders(accessToken),
    body: app,
  })

  if (isFetchError(resHeaders)) {
    throw new Error('Failed to get revision id from headers')
  }

  const appId = getIdFromCreateHeaders({
    headers: foreachableToDictionary(resHeaders),
  })

  if (!appId) {
    throw new Error('Failed to get appId from create headers')
  }

  return appId
}
