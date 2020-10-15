import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import {
  fetchAppRevisionList,
  fetchAppRevisionListSuccess,
  fetchAppRevisionListFailed,
  clearAppRevisionList,
} from '@/actions/apps'
import { AppRevisionModelPagedResult } from '@reapit/foundations-ts-definitions'

export interface FetchAppRevisionListParams {
  page: number
  appsPerPage?: number
}

export type AppRevisionListState = AppRevisionModelPagedResult & {
  isLoading: boolean
  errorMessage?: string | null
}

export const defaultState: AppRevisionListState = {
  data: [],
  pageNumber: 0,
  pageSize: 0,
  totalCount: 0,
  isLoading: false,
  errorMessage: null,
}

const appRevisionListReducer = (
  state: AppRevisionListState = defaultState,
  action: Action<any>,
): AppRevisionListState => {
  if (isType(action, fetchAppRevisionList)) {
    return {
      ...state,
      isLoading: true,
    }
  }

  if (isType(action, fetchAppRevisionListSuccess)) {
    return {
      ...state,
      ...action.data,
      isLoading: false,
    }
  }

  if (isType(action, fetchAppRevisionListFailed)) {
    return {
      ...state,
      errorMessage: action.data,
      isLoading: false,
    }
  }

  if (isType(action, clearAppRevisionList)) {
    return defaultState
  }

  return state
}

export default appRevisionListReducer
