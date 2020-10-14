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

export type UpdateDeveloperByIdParams = FetchByIdCommonParams & UpdateDeveloperModel

export type FetchDeveloperBillingPeriod = {
  period: string
}

export type UpdateOrganisationMemberByIdParams = FetchByIdCommonParams & {
  memberId: string
} & UpdateMemberModel

export type FetchOrganisationMembersParams = FetchByIdCommonParams &
  FetchListCommonParams & {
    email?: string
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

export const updateDeveloperById = async (params: UpdateDeveloperByIdParams) => {
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
  params: FetchOrganisationMembersParams,
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

export const updateOrganisationMemberById = async (params: UpdateOrganisationMemberByIdParams) => {
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

export type DisableMemberParams = AcceptInviteModel & {
  developerId: string
  memberId: string
}

export const disableMemberApi = async (params: DisableMemberParams) => {
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
