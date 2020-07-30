import { ReduxState } from '@/types/core'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { FeatureListState } from '@/reducers/apps/feature-list'
import { AppsListState } from '@/reducers/apps/list'

// App Detail
export const selectAppDetailData = (state: ReduxState): AppDetailModel => {
  return state.apps.detail.data || {}
}

export const selectAppDetailLoading = (state: ReduxState): boolean => {
  return state.apps.detail.isLoading
}

export const selectFeatureAppsListState = (state: ReduxState): FeatureListState => {
  return state.apps.featureList
}

export const selectAppsListState = (state: ReduxState): AppsListState => {
  return state.apps.list
}
