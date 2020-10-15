import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { fetchApps, fetchAppsSuccess, fetchAppsFailed, fetchAppsInfiniteSuccess } from '@/actions/apps'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { mergeAppsWithoutDuplicateId } from '@/utils/browse-app'

export type AppsListState = AppSummaryModelPagedResult & {
  isLoading: boolean
  errorMessage: string
}

export const defaultAppsListState: AppsListState = {
  data: [],
  pageNumber: 0,
  pageSize: 0,
  pageCount: 0,
  totalCount: 0,
  isLoading: false,
  errorMessage: '',
}

export const appsListReducer = (state: AppsListState = defaultAppsListState, action: Action<any>): AppsListState => {
  if (isType(action, fetchApps)) {
    return {
      ...state,
      isLoading: true,
      errorMessage: '',
    }
  }

  if (isType(action, fetchAppsSuccess)) {
    return {
      ...state,
      ...action.data,
      isLoading: false,
      errorMessage: '',
    }
  }

  if (isType(action, fetchAppsFailed)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.data,
    }
  }

  if (isType(action, fetchAppsInfiniteSuccess)) {
    const {
      data: { data: newAppsList, ...rest },
    } = action

    const { data: oldAppsList } = state

    const uniqueAppsList = mergeAppsWithoutDuplicateId(oldAppsList, newAppsList)

    return {
      ...state,
      ...rest,
      data: uniqueAppsList,
      isLoading: false,
      errorMessage: '',
    }
  }

  return state
}
