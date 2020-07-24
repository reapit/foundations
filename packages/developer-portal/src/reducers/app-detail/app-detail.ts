import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { fetchAppDetail, fetchAppDetailSuccess, fetchAppDetailFailed } from '@/actions/app-detail'

export type AppDetailData = (AppDetailModel & { apiKey?: string }) | null

export interface AppDetailState {
  isLoading: boolean
  data: AppDetailData
  errorMessage: string
}

export const defaultState: AppDetailState = {
  isLoading: false,
  data: null,
  errorMessage: '',
}

const appDetailReducer = (state: AppDetailState = defaultState, action: Action<any>): AppDetailState => {
  if (isType(action, fetchAppDetail)) {
    return {
      ...state,
      isLoading: true,
    }
  }

  if (isType(action, fetchAppDetailSuccess)) {
    return {
      ...state,
      isLoading: false,
      data: action.data || null,
    }
  }

  if (isType(action, fetchAppDetailFailed)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.data,
    }
  }

  return state
}

export default appDetailReducer
