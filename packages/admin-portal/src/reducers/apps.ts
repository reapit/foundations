import { FetchDetailResult } from '@reapit/utils'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { Action } from '../types/core'
import { isType } from '@/utils/actions'
import { appDetailLoading, appDetailReceiveData, appDetailFailure } from '@/actions/app-detail'
import errorMessages from '../../../elements/src/utils/validators/error-messages'

export type AppDetailItem = AppDetailModel & { apiKey?: string }

export interface AppsState {
  detail: FetchDetailResult<AppDetailItem>
}

export const defaultState: AppsState = {
  detail: { isLoading: false, data: null, errorMessage: '' },
}

const appsReducer = (state: AppsState = defaultState, action: Action<any>): AppsState => {
  if (isType(action, appDetailLoading)) {
    return {
      detail: {
        ...state.detail,
        errorMessage: '',
        isLoading: action.data,
      },
    }
  }

  if (isType(action, appDetailReceiveData)) {
    return {
      detail: {
        ...state.detail,
        isLoading: false,
        errorMessage: '',
        data: action.data?.data || null,
      },
    }
  }

  if (isType(action, appDetailFailure)) {
    return {
      detail: {
        ...state.detail,
        isLoading: false,
        errorMessage: action.data || errorMessages.DEFAULT_SERVER_ERROR,
      },
    }
  }

  return state
}

export default appsReducer
