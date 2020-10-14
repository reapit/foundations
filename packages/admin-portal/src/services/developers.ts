import {
  UpdateDeveloperModel,
  PagedResultDeveloperModel_,
  AcceptInviteModel,
  PagedResultMemberModel_,
  UpdateMemberModel,
} from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams, fetcherWithBlob } from '@reapit/elements'
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

export type UpdateDeveloperParams = FetchByIdCommonParams & UpdateDeveloperModel

export type FetchDeveloperBillingPeriod = {
  period: string
}

export type UpdateDeveloperMemberParams = FetchByIdCommonParams & {
  memberId: string
} & UpdateMemberModel

export type FetchDeveloperMembersParams = FetchByIdCommonParams &
  FetchListCommonParams & {
    email?: string
  }

export type DisableDeveloperMemberParams = AcceptInviteModel & {
  developerId: string
  memberId: string
}

export const fetchDevelopersList = async (params: FetchDevelopersListParams): Promise<PagedResultDeveloperModel_> => {
  try {
    const response = await fetcher({
      url: `${URLS.developers}/?${setQueryParams(params)}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers: await generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw error
  }
}

export const updateDeveloperById = async (params: UpdateDeveloperParams) => {
  try {
    const { id, ...rest } = params
    const response = await fetcher({
      url: `${URLS.developers}/${id}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'PUT',
      body: rest,
      headers: await generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw error
  }
}

export const fetchDeveloperBillingPeriod = async (params: FetchDeveloperBillingPeriod) => {
  try {
    const { period } = params
    const response = await fetcherWithBlob({
      url: `${URLS.developers}/costs/${period}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers: await generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const fetchOrganisationMembers = async (
  params: FetchDeveloperMembersParams,
): Promise<PagedResultMemberModel_> => {
  try {
    const { id, ...restParams } = params
    const response = await fetcher({
      url: `${URLS.developers}/${id}/members?${stringify(restParams)}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers: await generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const updateOrganisationMemberById = async (params: UpdateDeveloperMemberParams) => {
  try {
    const { id: developerId, memberId, ...rest } = params
    const response = await fetcher({
      url: `${URLS.developers}/${developerId}/members/${memberId}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'PUT',
      body: rest,
      headers: await generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const disableMemberApi = async (params: DisableDeveloperMemberParams) => {
  try {
    const { developerId, memberId } = params
    const response = await fetcher({
      url: `${URLS.developers}/${developerId}/members/${memberId}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'DELETE',
      headers: await generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
  }
}
