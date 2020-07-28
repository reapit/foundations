import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import {
  fetchtAppAuthentication,
  fetchtAppAuthenticationSuccess,
  fetchtAppAuthenticationFailed,
  clearAppAuthentication,
} from '@/actions/apps'

export type AppAuthenticationState = {
  isLoading: boolean
  code: string
  errorMessage?: string | null
}

export const defaultState: AppAuthenticationState = {
  isLoading: false,
  code: '',
  errorMessage: null,
}

const appAuthenticationReducer = (
  state: AppAuthenticationState = defaultState,
  action: Action<any>,
): AppAuthenticationState => {
  if (isType(action, fetchtAppAuthentication)) {
    return {
      ...state,
      isLoading: true,
    }
  }

  if (isType(action, fetchtAppAuthenticationSuccess)) {
    return {
      ...state,
      isLoading: false,
      code: action.data?.clientSecret || '',
    }
  }

  if (isType(action, fetchtAppAuthenticationFailed)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.data,
    }
  }

  if (isType(action, clearAppAuthentication)) {
    return defaultState
  }

  return state
}

export default appAuthenticationReducer
