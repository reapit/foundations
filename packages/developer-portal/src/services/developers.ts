import {
  CreateDeveloperModel,
  UpdateDeveloperModel,
  PagedResultDeveloperModel_,
  DeveloperModel,
  PagedResultMemberModel_,
  MemberModel,
  AcceptInviteModel,
  UpdateMemberModel,
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

export type FetchOrganisationMembersParams = FetchByIdCommonParams &
  FetchListCommonParams & {
    email?: string
  }

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

export type UpdateOrganisationMemberByIdParams = FetchByIdCommonParams & {
  memberId: string
} & UpdateMemberModel

export const fetchDevelopersList = async (params: FetchDevelopersListParams): Promise<PagedResultDeveloperModel_> => {
  try {
    const response = await fetcher({
      url: `${URLS.developers}?${stringify(params)}`,
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

export const createDeveloper = async (params: CreateDeveloperParams) => {
  try {
    const response = await fetcher({
      url: `${URLS.developers}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'POST',
      body: params,
      headers: await generateHeader(window.reapit.config.marketplaceApiKey),
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
      headers:
        // Route is unprotected in prod so users can accept invites. In dev, it is protected by the API key still
        window.reapit.config.appEnv === 'production'
          ? {
              'Content-Type': 'application/json',
            }
          : await generateHeader(window.reapit.config.marketplaceApiKey),
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
      headers: await generateHeader(window.reapit.config.marketplaceApiKey),
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
      headers: await generateHeader(window.reapit.config.marketplaceApiKey),
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
      headers: await generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
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
      headers:
        // Route is unprotected in prod so users can accept invites. In dev, it is protected by the API key still
        window.reapit.config.appEnv === 'production'
          ? {
              'Content-Type': 'application/json',
            }
          : await generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
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
      headers:
        // Route is unprotected in prod so users can accept invites. In dev, it is protected by the API key still
        window.reapit.config.appEnv === 'production'
          ? {
              'Content-Type': 'application/json',
            }
          : await generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const rejectInviteMember = async (params: RejectInviteMemberParams) => {
  try {
    const { developerId, memberId } = params
    const response = await fetcher({
      url: `${URLS.developers}/${developerId}/members/${memberId}/reject`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'POST',
      headers:
        // Route is unprotected in prod so users can accept invites. In dev, it is protected by the API key still
        window.reapit.config.appEnv === 'production'
          ? {
              'Content-Type': 'application/json',
            }
          : await generateHeader(window.reapit.config.marketplaceApiKey),
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
