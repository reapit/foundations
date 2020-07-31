import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { fetchAppList, fetchAppListSuccess, fetchAppListFailed, clearAppList } from '@/actions/apps'
import { PagedResultAppSummaryModel_ } from '@reapit/foundations-ts-definitions'

export interface FetchAppListParams {
  page: number
  appsPerPage?: number
}

export type AppListState = PagedResultAppSummaryModel_ & {
  isLoading: boolean
  errorMessage?: string | null
}

export const defaultState: AppListState = {
  data: [],
  pageNumber: 0,
  pageSize: 0,
  totalCount: 0,
  isLoading: false,
  errorMessage: null,
}

const appListReducer = (state: AppListState = defaultState, action: Action<any>): AppListState => {
  if (isType(action, fetchAppList)) {
    return {
      ...state,
      isLoading: true,
    }
  }

  if (isType(action, fetchAppListSuccess)) {
    return {
      ...state,
      ...action.data,
      isLoading: false,
    }
  }

  if (isType(action, fetchAppListFailed)) {
    return {
      ...state,
      errorMessage: action.data,
      isLoading: false,
    }
  }

  if (isType(action, clearAppList)) {
    return defaultState
  }

  return state
}

export default appListReducer
