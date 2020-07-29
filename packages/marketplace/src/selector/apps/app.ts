import { ReduxState } from '@/types/core'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { InstalledAppsState } from '@/reducers/client/installed-apps'
import { InstalledAppsState as InstalledLaunchAppsState } from '@/reducers/installed-apps'
import { ClientAppSummaryState } from '@/reducers/client/app-summary'

export const selectAppSummary = (state: ReduxState): ClientAppSummaryState => {
  return state?.client.appSummary
}

export const selectFeaturedApps = (state: ReduxState): AppSummaryModel[] => {
  return state?.client.appSummary.data?.featuredApps || []
}

export const selectInstalledAppsForLaunch = (state: ReduxState): InstalledLaunchAppsState => {
  return state?.installedApps
}

export const selectInstalledApps = (state: ReduxState): InstalledAppsState => {
  return state?.client.installedApps || {}
}

export const selectAppDetailData = (state: ReduxState) => {
  return state.client.appDetail.data || {}
}

export const selectAppDetailLoading = (state: ReduxState) => {
  return state.client.appDetail.isAppDetailLoading
}
