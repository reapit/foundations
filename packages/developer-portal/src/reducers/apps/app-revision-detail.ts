import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { AppRevisionModel } from '@reapit/foundations-ts-definitions'
import {
  fetchAppRevisionDetail,
  fetchAppRevisionDetailSuccess,
  fetchAppRevisionDetailFailed,
  clearAppRevisionDetail,
} from '@/actions/apps'

export interface AppRevisionDetailState {
  data: AppRevisionModel | null
  isLoading: boolean
  errorMessage?: string | null
}

export const defaultState: AppRevisionDetailState = {
  isLoading: false,
  data: null,
  errorMessage: null,
}

const appRevisionDetailReducer = (
  state: AppRevisionDetailState = defaultState,
  action: Action<any>,
): AppRevisionDetailState => {
  if (isType(action, fetchAppRevisionDetail)) {
    return {
      ...state,
      isLoading: true,
    }
  }

  if (isType(action, fetchAppRevisionDetailSuccess)) {
    return {
      ...state,
      isLoading: false,
      data: action.data || null,
    }
  }

  if (isType(action, fetchAppRevisionDetailFailed)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.data,
    }
  }

  if (isType(action, clearAppRevisionDetail)) {
    return defaultState
  }

  return state
}

export default appRevisionDetailReducer
