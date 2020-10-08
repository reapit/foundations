import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { uninstallApp, uninstallAppFailed, uninstallAppSuccess } from '@/actions/installations'

export interface UninstallState {
  isLoading: boolean
  errorMessage: string
}

export const defaultState: UninstallState = {
  isLoading: false,
  errorMessage: '',
}

export const uninstallReducer = (state: UninstallState = defaultState, action: Action<any>): UninstallState => {
  if (isType(action, uninstallApp)) {
    return {
      ...state,
      isLoading: true,
      errorMessage: '',
    }
  }
  if (isType(action, uninstallAppSuccess)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: '',
    }
  }
  if (isType(action, uninstallAppFailed)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.data,
    }
  }

  return state
}
