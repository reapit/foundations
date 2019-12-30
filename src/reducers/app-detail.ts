import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import {
  appDetailLoading,
  appDetailReceiveData,
  appDetailClearData,
  appDetailFailure,
  requestAuthenticationCode,
  requestAuthenticationSuccess,
  requestAuthenticationFailure,
  removeAuthenticationCode
} from '../actions/app-detail'

export interface AppDetailItem {
  data: AppDetailModel
}

export interface AppAuthDetailState {
  loading: boolean
  code: string
}

export interface AppDetailState {
  loading: boolean
  error: boolean
  appDetailData: AppDetailItem | null
  authentication: AppAuthDetailState
}

export const defaultAppAuthState: AppAuthDetailState = {
  loading: false,
  code: ''
}

export const defaultState: AppDetailState = {
  loading: false,
  error: false,
  appDetailData: null,
  authentication: defaultAppAuthState
}

const appDetailReducer = (state: AppDetailState = defaultState, action: Action<any>): AppDetailState => {
  if (isType(action, appDetailLoading)) {
    return {
      ...state,
      error: false,
      loading: action.data
    }
  }

  if (isType(action, appDetailReceiveData)) {
    return {
      ...state,
      loading: false,
      error: false,
      appDetailData: action.data || null
    }
  }

  if (isType(action, appDetailClearData)) {
    return {
      ...state,
      loading: false,
      error: false,
      appDetailData: action.data
    }
  }

  if (isType(action, appDetailFailure)) {
    return {
      ...state,
      loading: false,
      error: true
    }
  }

  if (isType(action, requestAuthenticationCode)) {
    return {
      ...state,
      authentication: {
        ...state.authentication,
        loading: true
      }
    }
  }

  if (isType(action, requestAuthenticationSuccess)) {
    return {
      ...state,
      authentication: {
        ...state.authentication,
        loading: false,
        code: action.data?.clientSecret || ''
      }
    }
  }

  if (isType(action, requestAuthenticationFailure)) {
    return {
      ...state,
      authentication: {
        ...state.authentication,
        code: '',
        loading: false
      }
    }
  }

  if (isType(action, removeAuthenticationCode)) {
    return {
      ...state,
      authentication: {
        ...state.authentication,
        code: ''
      }
    }
  }

  return state
}

export default appDetailReducer
