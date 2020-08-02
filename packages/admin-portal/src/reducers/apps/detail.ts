import { FetchDetailResult, getDefaultFetchDetailValue } from '@reapit/utils'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { Action } from '@/types/core'
import errorMessages from '@/constants/error-messages'
import { isType } from '@/utils/actions'
import { fetchAppDetailSuccess, fetchAppDetailFailed, fetchAppDetail } from '@/actions/app-detail'

export type AppDetailItem = AppDetailModel & { apiKey?: string }

export type AppDetailState = FetchDetailResult<AppDetailItem>

export const defaultState: AppDetailState = getDefaultFetchDetailValue()

const appDetailReducer = (state: AppDetailState = defaultState, action: Action<any>): AppDetailState => {
  if (isType(action, fetchAppDetail)) {
    return {
      ...state,
      errorMessage: '',
      isLoading: true,
    }
  }

  if (isType(action, fetchAppDetailSuccess)) {
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
