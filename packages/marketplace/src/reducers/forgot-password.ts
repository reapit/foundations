import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { forgotPasswordLoading } from '@/actions/forgot-password'

export interface ForgotPasswordState {
  loading: boolean
}

export const defaultState: ForgotPasswordState = {
  loading: false,
}

const forgotPasswordReducer = (state: ForgotPasswordState = defaultState, action: Action<any>): ForgotPasswordState => {
  if (isType(action, forgotPasswordLoading)) {
    return {
      ...state,
      loading: action.data,
    }
  }

  return state
}

export default forgotPasswordReducer
