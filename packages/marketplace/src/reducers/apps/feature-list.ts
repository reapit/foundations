import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { fetchFeatureApps, fetchFeatureAppsSuccess, fetchFeatureAppsFailed } from '@/actions/apps'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'

export type FeatureListState = AppSummaryModelPagedResult & {
  isLoading: boolean
  errorMessage: string
}

export const defaultFeatureAppsListState: FeatureListState = {
  data: [],
  pageNumber: 0,
  pageSize: 0,
  pageCount: 0,
  totalCount: 0,
  isLoading: false,
  errorMessage: '',
}

export const featureListReducer = (
  state: FeatureListState = defaultFeatureAppsListState,
  action: Action<any>,
): FeatureListState => {
  if (isType(action, fetchFeatureApps)) {
    return {
      ...state,
      isLoading: true,
      errorMessage: '',
    }
  }

  if (isType(action, fetchFeatureAppsSuccess)) {
    return {
      ...state,
      ...action.data,
      isLoading: false,
      errorMessage: '',
    }
  }

  if (isType(action, fetchFeatureAppsFailed)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.data,
    }
  }

  return state
}
