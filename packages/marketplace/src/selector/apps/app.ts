import { ReduxState } from '@/types/core'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { MyAppsState } from '@/reducers/my-apps'
import { AppDetailState } from '@/reducers/app-detail'
import { InstalledAppsState } from '@/reducers/installed-apps'
import { ClientAppSummaryState } from '@/reducers/client/app-summary'

export const selectAppDetailState = (state: ReduxState) => {
  return state?.appDetail
}

export const selectAppDetailId = (state: ReduxState) => {
  return state?.appDetail?.appDetailData?.data?.id
}

export const selectAppDetailInstallationId = (state: ReduxState) => {
  return state?.appDetail?.appDetailData?.data?.installationId
}

export const selectApp = (state: ReduxState): AppDetailModel => {
  return state?.appDetail?.appDetailData?.data || {}
}

export const selectAppAuthenticationLoading = (state: ReduxState): boolean => {
  return state.appDetail?.authentication.loading
}
export const selectAppAuthenticationCode = (state: ReduxState): string => {
  return state.appDetail?.authentication.code
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

export const selectAppDetail = (state: ReduxState): AppDetailState => {
  return state.appDetail
}

export const selectMyApps = (state: ReduxState): MyAppsState => {
  return state.myApps || {}
}

export const selectAppDetailData = (state: ReduxState) => {
  return state.client.appDetail.data || {}
}

export const selectAppDetailAuthentication = (state: ReduxState) => {
  return state.appDetail.authentication
}

export const selectAppDetailLoading = (state: ReduxState) => {
  return state.client.appDetail.isAppDetailLoading
}

export const selectAppDetailError = (state: ReduxState): string | null => {
  return state?.client?.appDetail?.error || null
}
