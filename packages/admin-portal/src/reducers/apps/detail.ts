import { FetchDetailResult, getDefaultFetchDetailValue } from '@reapit/utils'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { Action } from '@/types/core'
import errorMessages from '@/constants/error-messages'
import { isType } from '@/utils/actions'
import { fetchAppDetailLoading, fetchAppDetailDataSuccess, fetchAppDetailFailed } from '@/actions/app-detail'

export type AppDetailItem = AppDetailModel & { apiKey?: string }

export type AppDetailState = FetchDetailResult<AppDetailItem>

export const defaultState: AppDetailState = getDefaultFetchDetailValue()

const appDetailReducer = (state: AppDetailState = defaultState, action: Action<any>): AppDetailState => {
  if (isType(action, fetchAppDetailLoading)) {
    return {
      ...state,
      errorMessage: '',
      isLoading: action.data,
    }
  }

  if (isType(action, fetchAppDetailDataSuccess)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: '',
      data: action.data?.data || null,
    }
  }

  if (isType(action, fetchAppDetailFailed)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.data || errorMessages.DEFAULT_SERVER_ERROR,
    }
  }

  return state
}

export default appDetailReducer
