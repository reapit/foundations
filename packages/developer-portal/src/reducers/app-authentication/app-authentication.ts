import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import {
  fetchtAppAuthentication,
  fetchtAppAuthenticationSuccess,
  fetchtAppAuthenticationFailed,
  clearAppAuthentication,
} from '@/actions/app-authentication'

export type AppAuthenticationState = {
  isLoading: boolean
  code: string
}

export const defaultState: AppAuthenticationState = {
  isLoading: false,
  code: '',
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
      code: '',
      isLoading: false,
    }
  }

  if (isType(action, clearAppAuthentication)) {
    return {
      ...state,
      code: '',
    }
  }

  return state
}

export default appAuthenticationReducer
