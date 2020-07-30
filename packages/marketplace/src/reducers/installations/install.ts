import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { installApp, installAppFailed, installAppSuccess } from '@/actions/installations'

export interface InstallState {
  isLoading: boolean
  errorMessage: string
}

export const defaultState: InstallState = {
  isLoading: false,
  errorMessage: '',
}

export const installReducer = (state: InstallState = defaultState, action: Action<any>): InstallState => {
  if (isType(action, installApp)) {
    return {
      ...state,
      isLoading: true,
      errorMessage: '',
    }
  }
  if (isType(action, installAppSuccess)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: '',
    }
  }
  if (isType(action, installAppFailed)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.data,
    }
  }

  return state
}
