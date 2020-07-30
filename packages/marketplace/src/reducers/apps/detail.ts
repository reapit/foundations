import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { fetchAppDetail, fetchAppDetailSuccess, fetchAppDetailFailed } from '@/actions/apps'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'

export type AppDetailState = {
  data: AppDetailModel
  isLoading: boolean
  errorMessage: string
}

export const defaultAppDetailState: AppDetailState = {
  data: {},
  isLoading: false,
  errorMessage: '',
}

export const appDetailReducer = (
  state: AppDetailState = defaultAppDetailState,
  action: Action<any>,
): AppDetailState => {
  if (isType(action, fetchAppDetail)) {
    return {
      data: {},
      isLoading: true,
      errorMessage: '',
    }
  }

  if (isType(action, fetchAppDetailSuccess)) {
    return {
      data: action.data,
      isLoading: false,
      errorMessage: '',
    }
  }

  if (isType(action, fetchAppDetailFailed)) {
    return {
      data: {},
      isLoading: false,
      errorMessage: action.data,
    }
  }

  return state
}
