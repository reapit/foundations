import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { changePassword, changePasswordSuccess, changePasswordFailed } from '@/actions/cognito-identity'

export interface UpdatePasswordState {
  loading: boolean
  errorMessage: string
}

export const defaultState: UpdatePasswordState = {
  loading: false,
  errorMessage: '',
}

export const updatePasswordReducer = (
  state: UpdatePasswordState = defaultState,
  action: Action<any>,
): UpdatePasswordState => {
  if (isType(action, changePassword)) {
    return {
      ...state,
      loading: true,
    }
  }

  if (isType(action, changePasswordSuccess)) {
    return {
      ...state,
      loading: false,
      errorMessage: '',
    }
  }

  if (isType(action, changePasswordFailed)) {
    return {
      ...state,
      loading: false,
      errorMessage: action.data,
    }
  }

  return state
}
