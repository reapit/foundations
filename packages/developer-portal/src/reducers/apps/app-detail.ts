import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { fetchAppDetail, fetchAppDetailSuccess, fetchAppDetailFailed } from '@/actions/apps'

export type AppDetailData = (AppDetailModel & { apiKey?: string }) | null

export interface AppDetailState {
  data: AppDetailData
  isLoading: boolean
  errorMessage?: string | null
}

export const defaultState: AppDetailState = {
  isLoading: false,
  data: null,
  errorMessage: null,
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
