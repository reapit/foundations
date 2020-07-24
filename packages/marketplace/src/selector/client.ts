import { AppSummaryModel, NegotiatorModel } from '@reapit/foundations-ts-definitions'
import { ReduxState } from '@/types/core'
import { MyAppsState } from '@/reducers/my-apps'
import { AppDetailState } from '@/reducers/app-detail'
import { WebComponentConfigResult } from '@/services/web-component'
import { InstalledAppsState } from '@/reducers/installed-apps'
import { ClientAppSummaryState } from '@/reducers/client/app-summary'
import { selectLoginIdentity } from '@/selector/auth'
import { COGNITO_GROUP_DEVELOPER_EDITION } from '@/constants/api'
import { ReapitConnectSession } from '@reapit/connect-session'

/**
 * Need get developer id to filter apps list if this user belong to
 * AgencyCloudDeveloperEdition group, if not just return null
 * refer to this ticket https://github.com/reapit/foundations/issues/1848
 */

// update this function to accept
// FIXME(selectDeveloperEditionId)
export const selectDeveloperEditionId = (state: ReduxState) => {
  const loginIdentity = selectLoginIdentity(state)
  if (loginIdentity?.groups.includes(COGNITO_GROUP_DEVELOPER_EDITION)) {
    return state?.auth?.loginSession?.loginIdentity?.developerId || ''
  }
  return null
}

// FIXME(selectLoggedUserEmail)
export const selectLoggedUserEmail = (state: ReapitConnectSession | null): string => {
  return state?.loginIdentity?.email || ''
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

export const selectWebComponentNegotiators = (state: ReduxState): NegotiatorModel[] => {
  return state?.client.webComponent?.negotiators?._embedded || []
}

export const selectAppDetail = (state: ReduxState): AppDetailState => {
  return state.appDetail
}

export const selectMyApps = (state: ReduxState): MyAppsState => {
  return state.myApps || {}
}
