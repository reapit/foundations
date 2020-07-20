import {
  CreateDeveloperModel,
  UpdateDeveloperModel,
  PagedResultDeveloperModel_,
  DeveloperModel,
  PagedResultMemberModel_,
} from '@reapit/foundations-ts-definitions'
import { fetcher } from '@reapit/elements'
import { URLS } from './constants'
import { generateHeader } from './utils'
import { logger } from '@reapit/utils'
import { FetchListCommonParams, FetchByIdCommonParams } from './types'
import { stringify } from 'query-string'

export type FetchDevelopersListParams = FetchListCommonParams & {
  name?: string
  company?: string
  isInactive?: boolean
  registeredFrom?: string
  registeredTo?: string
}

export type CreateDeveloperParams = CreateDeveloperModel

export type FetchDeveloperByIdParams = FetchByIdCommonParams

export type UpdateDeveloperByIdParams = FetchByIdCommonParams & UpdateDeveloperModel

export type FetchOrganisationMembers = FetchByIdCommonParams & FetchListCommonParams

export const fetchDevelopersList = async (params: FetchDevelopersListParams): Promise<PagedResultDeveloperModel_> => {
  try {
    const response = await fetcher({
      url: `${URLS.developers}?${stringify(params)}`,
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
    throw error
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

export const fetchOrganisationMembers = async (params: FetchOrganisationMembers): Promise<PagedResultMemberModel_> => {
  try {
    const { id, ...restParams } = params
    const response = await fetcher({
      url: `${URLS.developers}/${id}/members?${stringify(restParams)}`,
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

export type InviteDeveloperAsOrgMemberParams = {
  id: string
  email: string
  name: string
  jobTitle: string
  sender: string
  message: string
}

export const inviteDeveloperAsOrgMemberApi = async (params: InviteDeveloperAsOrgMemberParams) => {
  try {
    const { id, ...rest } = params
    const response = await fetcher({
      url: `${URLS.developers}/${id}/members`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'POST',
      body: rest,
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}
