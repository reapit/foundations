import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { resetPasswordLoading } from '@/actions/reset-password'

export interface ResetPasswordState {
  loading: boolean
}

export const defaultState: ResetPasswordState = {
  loading: false,
}

const resetPasswordReducer = (
  state: ResetPasswordState | undefined = defaultState,
  action: Action<any>,
): ResetPasswordState => {
  if (isType(action, resetPasswordLoading)) {
    return {
      ...state,
      loading: action.data,
    }
  }

  return state
}

export default resetPasswordReducer
