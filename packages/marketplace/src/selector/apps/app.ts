import { ReduxState } from '@/types/core'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { MyAppsState } from '@/reducers/my-apps'
import { InstalledAppsState } from '@/reducers/installed-apps'
import { ClientAppSummaryState } from '@/reducers/client/app-summary'

export const selectAppSummary = (state: ReduxState): ClientAppSummaryState => {
  return state?.client.appSummary
}

export const selectFeaturedApps = (state: ReduxState): AppSummaryModel[] => {
  return state?.client.appSummary.data?.featuredApps || []
}

export const selectInstalledApps = (state: ReduxState): InstalledAppsState => {
  return state?.installedApps
}

export const selectMyApps = (state: ReduxState): MyAppsState => {
  return state.myApps || {}
}

export const selectAppDetailData = (state: ReduxState) => {
  return state.client.appDetail.data || {}
}

export const selectAppDetailLoading = (state: ReduxState) => {
  return state.client.appDetail.isAppDetailLoading
}
