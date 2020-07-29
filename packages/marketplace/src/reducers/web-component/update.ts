import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import {
  updateWebComponentConfig,
  updateWebComponentConfigFailed,
  updateWebComponentConfigSuccess,
} from '@/actions/web-component'

export type WebComponentUpdateState = {
  isLoading: boolean
  errorMessage: string
}
export const defaultState: WebComponentUpdateState = {
  isLoading: false,
  errorMessage: '',
}

export const webComponentUpdateReducer = (
  state: WebComponentUpdateState = defaultState,
  action: Action<any>,
): WebComponentUpdateState => {
  if (isType(action, updateWebComponentConfig)) {
    return {
      ...state,
      isLoading: true,
      errorMessage: '',
    }
  }
  if (isType(action, updateWebComponentConfigSuccess)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: '',
    }
  }
  if (isType(action, updateWebComponentConfigFailed)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.data,
    }
  }
  return state
}
