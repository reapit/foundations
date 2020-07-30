import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { fetchWebComponentConfig, fetchWebComponentConfigFailed } from '@/actions/web-component'
import { WebComponentConfigResult } from '@/services/web-component'
import { fetchWebComponentConfigSuccess } from '@/actions/web-component'

export interface WebComponentState {
  data: WebComponentConfigResult
  isLoading: boolean
  errorMessage: string
}
export const defaultState: WebComponentState = {
  data: {} as WebComponentConfigResult,
  isLoading: true,
  errorMessage: '',
}

export const webComponentReducer = (
  state: WebComponentState = defaultState,
  action: Action<any>,
): WebComponentState => {
  if (isType(action, fetchWebComponentConfig)) {
    return {
      data: {} as WebComponentConfigResult,
      isLoading: true,
      errorMessage: '',
    }
  }
  if (isType(action, fetchWebComponentConfigSuccess)) {
    return {
      data: action.data,
      isLoading: false,
      errorMessage: '',
    }
  }

  if (isType(action, fetchWebComponentConfigFailed)) {
    return {
      data: {} as WebComponentConfigResult,
      isLoading: false,
      errorMessage: action.data,
    }
  }

  return state
}
