import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { appsReceiveData, appsRequestData, appsRequestFailure } from '@/actions/apps-management'
import { PagedResultAppSummaryModel_ } from '@reapit/foundations-ts-definitions'
import { FetchDetailResult, getDefaultFetchListValue } from '@reapit/utils'

export type AppListState = PagedResultAppSummaryModel_ & Pick<FetchDetailResult<any>, 'isLoading' | 'errorMessage'>

export const defaultState: AppListState = getDefaultFetchListValue()

const appListReducer = (state: AppListState = defaultState, action: Action<any>): AppListState => {
  if (isType(action, appsRequestData)) {
    return {
      ...state,
      isLoading: true,
      errorMessage: '',
    }
  }

  if (isType(action, appsReceiveData)) {
    return {
      ...state,
      ...(action.data || {}),
      isLoading: false,
    }
  }

  if (isType(action, appsRequestFailure)) {
    return {
      ...state,
      isLoading: false,
    }
  }

  // if (isType(action, appsSetFormState)) {
  //   return {
  //     ...state,
  //     formState: action.data,
  //   }
  // }

  return state
}

export default appListReducer
