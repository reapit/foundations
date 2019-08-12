import { Action, FormState } from '../types/core'
import { isType } from '../utils/actions'
import {
  appPermissionLoading,
  appPermissionReceiveData,
  appPermissionRequestDataFailure
} from '../actions/app-permission'

import { ScopeModel } from '@/types/marketplace-api-schema'

export interface AppPermissionState {
  loading: boolean
  error: boolean
  appPermissionData: ScopeModel[] | null
}

export const defaultState: AppPermissionState = {
  loading: false,
  appPermissionData: null,
  error: false
}

const appPermissionReducer = (state: AppPermissionState = defaultState, action: Action<any>): AppPermissionState => {
  if (isType(action, appPermissionLoading)) {
    return {
      ...state,
      loading: action.data
    }
  }

  if (isType(action, appPermissionReceiveData)) {
    return {
      ...state,
      loading: false,
      error: false,
      appPermissionData: action.data || null
    }
  }

  if (isType(action, appPermissionRequestDataFailure)) {
    return {
      ...state,
      loading: false,
      error: true
    }
  }

  return state
}

export default appPermissionReducer
