import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { appsReceiveData, appsRequestData, appsRequestFailure } from '@/actions/apps-management'
import { PagedResultAppSummaryModel_ } from '@reapit/foundations-ts-definitions'
import { FetchDetailResult } from '@reapit/utils'

export type AppListState = PagedResultAppSummaryModel_ & Pick<FetchDetailResult<any>, 'isLoading' | 'errorMessage'>

export const defaultState: AppListState = {
  isLoading: false,
  errorMessage: '',
  data: [],
  totalCount: 0,
  pageSize: 0,
  pageNumber: 0,
  pageCount: 0,
}

const appListReducer = (state: AppListState = defaultState, action: Action<any>): AppListState => {
  // Test TBC
  if (isType(action, appsRequestData)) {
    return {
      ...state,
      isLoading: true,
      errorMessage: '',
    }
  }

  // Test TBC
  if (isType(action, appsReceiveData)) {
    return {
      ...state,
      ...(action.data || {}),
      isLoading: false,
    }
  }

  // Test TBC
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
