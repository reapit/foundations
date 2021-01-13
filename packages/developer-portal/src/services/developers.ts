import {
  CreateDeveloperModel,
  UpdateDeveloperModel,
  DeveloperModelPagedResult,
  DeveloperModel,
  MemberModelPagedResult,
  MemberModel,
  AcceptInviteModel,
  UpdateMemberModel,
} from '@reapit/foundations-ts-definitions'
import { fetcher } from '@reapit/elements'
import { URLS } from './constants'
import { getPlatformHeaders, logger } from '@reapit/utils'
import { FetchListCommonParams, FetchByIdCommonParams } from './types'
import { stringify } from 'query-string'
import Routes from '../constants/routes'
import { history } from '@/core/router'
import { reapitConnectBrowserSession } from '../core/connect-session'

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

export const fetchDevelopersList = async (params: FetchDevelopersListParams): Promise<DeveloperModelPagedResult> => {
  try {
    const response = await fetcher({
      url: `${URLS.developers}?${stringify(params)}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
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
      api: window.reapit.config.platformApiUrl,
      method: 'POST',
      body: params,
      headers: {
        'Content-Type': 'application/json',
      },
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
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
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
      api: window.reapit.config.platformApiUrl,
      method: 'PUT',
      body: rest,
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const fetchOrganisationMembers = async (
  params: FetchOrganisationMembersParams,
): Promise<MemberModelPagedResult | undefined> => {
  try {
    const { id, ...restParams } = params
    const response = await fetcher({
      url: `${URLS.developers}/${id}/members?${stringify(restParams)}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
    })
    return response
  } catch (error) {
    if (error.response.statusCode === 403) {
      history.push(`${Routes.AUTHENTICATION}/developer`)
    } else {
      logger(error)
      throw error?.response
    }
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
      api: window.reapit.config.platformApiUrl,
      method: 'POST',
      body: rest,
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
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
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
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
      api: window.reapit.config.platformApiUrl,
      method: 'POST',
      body: restParams,
      headers: {
        'Content-Type': 'application/json',
      },
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
      api: window.reapit.config.platformApiUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
      api: window.reapit.config.platformApiUrl,
      method: 'PUT',
      body: rest,
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
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
      api: window.reapit.config.platformApiUrl,
      method: 'DELETE',
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
  }
}
