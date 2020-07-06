import { ReduxState } from '@/types/core'
import { MyAppsState } from '@/reducers/my-apps'
import { AppDetailState } from '@/reducers/app-detail'
import { NegotiatorItem } from '@/services/negotiators'
import { WebComponentConfigResult } from '@/services/web-component'
import { InstalledAppsState } from '@/reducers/installed-apps'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { ClientAppSummaryState } from '@/reducers/client/app-summary'
import { selectLoginIdentity } from '@/selector/auth'
import { COGNITO_GROUP_DEVELOPER_EDITION } from '@/constants/api'

export const selectClientId = (state: ReduxState) => {
  return state?.auth?.loginSession?.loginIdentity?.clientId || ''
}

/**
 * Need get developer id to filter apps list if this user belong to
 * AgencyCloudDeveloperEdition group, if not just return null
 * refer to this ticket https://github.com/reapit/foundations/issues/1848
 */
export const selectDeveloperEditionId = (state: ReduxState) => {
  const loginIdentity = selectLoginIdentity(state)
  if (loginIdentity?.groups.includes(COGNITO_GROUP_DEVELOPER_EDITION)) {
    return state?.auth?.loginSession?.loginIdentity?.developerId || ''
  }
  return null
}

export const selectLoggedUserEmail = (state: ReduxState): string => {
  return state?.auth?.loginSession?.loginIdentity?.email || ''
}

export const selectAppSummary = (state: ReduxState): ClientAppSummaryState => {
  return state?.client.appSummary
}

export const selectFeaturedApps = (state: ReduxState): AppSummaryModel[] => {
  return state?.client.appSummary.data?.featuredApps || []
}

export const selectInstalledApps = (state: ReduxState): InstalledAppsState => {
  return state?.installedApps
}

export const selectWebComponentOpen = (state: ReduxState): boolean => {
  return state?.client.webComponent?.isShowModal
}

export const selectWebComponentData = (state: ReduxState): WebComponentConfigResult => {
  return state?.client.webComponent?.data
}

export const selectWebComponentLoading = (state: ReduxState): boolean => {
  return state?.client.webComponent?.loading
}

export const selectWebComponentUpdating = (state: ReduxState): boolean => {
  return state?.client.webComponent?.updating
}

export const selectWebComponentNegotiators = (state: ReduxState): NegotiatorItem[] => {
  return state?.client.webComponent?.negotiators?._embedded || []
}

export const selectAppDetail = (state: ReduxState): AppDetailState => {
  return state.appDetail
}

export const selectMyApps = (state: ReduxState): MyAppsState => {
  return state.myApps || {}
}
