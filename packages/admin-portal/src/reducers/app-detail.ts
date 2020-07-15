import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import {
  appDetailLoading,
  appDetailReceiveData,
  appDetailClearData,
  appDetailFailure,
  setAppDetailStale,
} from '../actions/app-detail'

export interface AppDetailItem {
  data: AppDetailModel & { apiKey?: string }
}

export interface AppDetailState {
  loading: boolean
  error: boolean
  appDetailData: AppDetailItem | null
  isStale: boolean
}

export const defaultState: AppDetailState = {
  loading: false,
  error: false,
  appDetailData: null,
  isStale: true,
}

export type AppDetailData = (AppDetailModel & { apiKey?: string }) | null

export interface DeveloperAppDetailState {
  data: AppDetailData
  isAppDetailLoading: boolean
  error?: string | null
}

const appDetailReducer = (state: AppDetailState = defaultState, action: Action<any>): AppDetailState => {
  if (isType(action, setAppDetailStale)) {
    return {
      ...state,
      isStale: action.data,
    }
  }

  if (isType(action, appDetailLoading)) {
    return {
      ...state,
      error: false,
      loading: action.data,
    }
  }

  if (isType(action, appDetailReceiveData)) {
    return {
      ...state,
      loading: false,
      error: false,
      isStale: false,
      appDetailData: action.data || null,
    }
  }

  if (isType(action, appDetailClearData)) {
    return {
      ...state,
      loading: false,
      error: false,
      appDetailData: action.data,
    }
  }

  if (isType(action, appDetailFailure)) {
    return {
      ...state,
      loading: false,
      error: true,
    }
  }

  return state
}

export default appDetailReducer
