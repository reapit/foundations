import {
  UpdateDeveloperModel,
  DeveloperModelPagedResult,
  AcceptInviteModel,
  MemberModelPagedResult,
  UpdateMemberModel,
} from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams, fetcherWithBlob } from '@reapit/elements-legacy'
import { URLS } from './constants'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { FetchListCommonParams, FetchByIdCommonParams } from './types'
import { stringify } from 'query-string'
import { reapitConnectBrowserSession } from '../core/connect-session'

export type FetchDevelopersListParams = FetchListCommonParams & {
  name?: string
  company?: string
  isInactive?: boolean
  registeredFrom?: string
  registeredTo?: string
  status?: string
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

export const fetchDevelopersList = async (
  params: FetchDevelopersListParams,
): Promise<DeveloperModelPagedResult | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.developers}/?${setQueryParams(params)}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error
  }
}

export const updateDeveloperById = async (params: UpdateDeveloperParams) => {
  try {
    const { id, ...rest } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.developers}/${id}`,
        api: window.reapit.config.platformApiUrl,
        method: 'PUT',
        body: rest,
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error
  }
}

export const fetchDeveloperBillingPeriod = async (params: FetchDeveloperBillingPeriod) => {
  try {
    const { period } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcherWithBlob({
        url: `${URLS.developers}/costs/${period}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const fetchOrganisationMembers = async (
  params: FetchDeveloperMembersParams,
): Promise<MemberModelPagedResult | void> => {
  try {
    const { id, ...restParams } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.developers}/${id}/members?${stringify(restParams)}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const updateOrganisationMemberById = async (params: UpdateDeveloperMemberParams) => {
  try {
    const { id: developerId, memberId, ...rest } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.developers}/${developerId}/members/${memberId}`,
        api: window.reapit.config.platformApiUrl,
        method: 'PUT',
        body: rest,
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error?.response
  }
}

export const disableMemberApi = async (params: DisableDeveloperMemberParams) => {
  try {
    const { developerId, memberId } = params
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.developers}/${developerId}/members/${memberId}`,
        api: window.reapit.config.platformApiUrl,
        method: 'DELETE',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error?.response
  }
}
