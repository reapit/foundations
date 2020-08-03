import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { fetchAppListSuccess, fetchAppList, fetchAppListFailed } from '@/actions/apps-management'
import { PagedResultAppSummaryModel_ } from '@reapit/foundations-ts-definitions'
import { FetchDetailResult, getDefaultFetchListValue } from '@reapit/utils'

export type AppListState = PagedResultAppSummaryModel_ & Pick<FetchDetailResult<any>, 'isLoading' | 'errorMessage'>

export const defaultState: AppListState = getDefaultFetchListValue()

const appListReducer = (state: AppListState = defaultState, action: Action<any>): AppListState => {
  if (isType(action, fetchAppList)) {
    return {
      ...state,
      isLoading: true,
      errorMessage: '',
    }
  }

  if (isType(action, fetchAppListSuccess)) {
    return {
      ...state,
      ...(action.data || {}),
      isLoading: false,
    }
  }

  if (isType(action, fetchAppListFailed)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.data,
    }
  }

  return state
}

export default appListReducer
