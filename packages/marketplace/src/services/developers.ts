import {
  CreateDeveloperModel,
  UpdateDeveloperModel,
  PagedResultDeveloperModel_,
  DeveloperModel,
} from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { generateHeader } from './utils'
import { logger } from 'logger'
import { FetchListCommonParams, FetchByIdCommonParams } from './types'

export interface FetchDevelopersListParams extends FetchListCommonParams {
  name?: string
  company?: string
  isInactive?: boolean
  registeredFrom?: string
  registeredTo?: string
}

export type CreateDeveloperParams = CreateDeveloperModel

export type FetchDeveloperByIdParams = FetchByIdCommonParams

export type UpdateDeveloperByIdParams = FetchByIdCommonParams & UpdateDeveloperModel

export const fetchDevelopersList = async (params: FetchDevelopersListParams): Promise<PagedResultDeveloperModel_> => {
  try {
    const response = await fetcher({
      url: `${URLS.developers}?${setQueryParams(params)}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const createDeveloper = async (params: CreateDeveloperParams) => {
  try {
    const response = await fetcher({
      url: `${URLS.developers}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'POST',
      body: params,
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const fetchDeveloperById = async (params: FetchDeveloperByIdParams): Promise<DeveloperModel> => {
  try {
    const { id } = params
    const response = await fetcher({
      url: `${URLS.developers}/${id}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const updateDeveloperById = async (params: UpdateDeveloperByIdParams) => {
  try {
    const { id, ...rest } = params
    const response = await fetcher({
      url: `${URLS.developers}/${id}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'PUT',
      body: rest,
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}
