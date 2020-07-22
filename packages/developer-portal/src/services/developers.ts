import {
  CreateDeveloperModel,
  UpdateDeveloperModel,
  PagedResultDeveloperModel_,
  DeveloperModel,
  PagedResultMemberModel_,
  MemberModel,
  AcceptInviteModel,
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

export type FetchOrganisationMembersParams = FetchByIdCommonParams & FetchListCommonParams

export type FetchMemberDetailsParams = {
  developerId: string
  memberId: string
}

export type RejectInviteMemberParams = {
  developerId: string
  memberId: string
}

export type AcceptInviteMemberParams = AcceptInviteModel & {
  developerId: string
  memberId: string
}

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
    throw error?.response
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
    throw error?.response
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
    throw error?.response
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
    throw error?.response
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
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
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
    console.log({ error })
    logger(error)
    throw error?.response
  }
}

export const fetchMemberDetails = async (params: FetchMemberDetailsParams): Promise<MemberModel> => {
  try {
    const { developerId, memberId } = params
    const response = await fetcher({
      url: `${URLS.developers}/${developerId}/members/${memberId}`,
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

export const acceptInviteMember = async (params: AcceptInviteMemberParams) => {
  try {
    const { developerId, memberId, ...restParams } = params
    const response = await fetcher({
      url: `${URLS.developers}/${developerId}/members/${memberId}/accept`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'POST',
      body: restParams,
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response || error
  }
}

export const rejectInviteMember = async (params: RejectInviteMemberParams) => {
  try {
    const { developerId, memberId } = params
    const response = await fetcher({
      url: `${URLS.developers}/${developerId}/members/${memberId}/reject`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'POST',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response || error
  }
}
