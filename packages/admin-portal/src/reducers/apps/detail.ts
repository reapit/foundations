import { FetchDetailResult, getDefaultFetchDetailValue } from '@reapit/utils'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { Action } from '../../types/core'
import { isType } from '@/utils/actions'
import { appDetailLoading, appDetailReceiveData, appDetailFailure } from '@/actions/app-detail'
import errorMessages from '../../../../elements/src/utils/validators/error-messages'

export type AppDetailItem = AppDetailModel & { apiKey?: string }

export type AppDetailState = FetchDetailResult<AppDetailItem>

export const defaultState: AppDetailState = getDefaultFetchDetailValue()

const appDetailReducer = (state: AppDetailState = defaultState, action: Action<any>): AppDetailState => {
  if (isType(action, appDetailLoading)) {
    return {
      ...state,
      errorMessage: '',
      isLoading: action.data,
    }
  }

  if (isType(action, appDetailReceiveData)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: '',
      data: action.data?.data || null,
    }
  }

  if (isType(action, appDetailFailure)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.data || errorMessages.DEFAULT_SERVER_ERROR,
    }
  }

  return state
}

export default appDetailReducer
