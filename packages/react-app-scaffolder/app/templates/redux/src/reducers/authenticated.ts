import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  authenticatedLoading,
  authenticatedReceiveData,
  authenticatedClearData,
  authenticatedRequestDataFailure,
} from '../actions/authenticated'

export interface AuthenticatedState {
  loading: boolean
  authenticatedData: {} | null
}

export const defaultState: AuthenticatedState = {
  loading: false,
  authenticatedData: null,
}

const authenticatedReducer = (state: AuthenticatedState = defaultState, action: Action<any>): AuthenticatedState => {
  if (isType(action, authenticatedLoading)) {
    return {
      ...state,
      loading: action.data,
    }
  }

  if (isType(action, authenticatedReceiveData)) {
    return {
      ...state,
      loading: false,
      authenticatedData: action.data || null,
    }
  }

  if (isType(action, authenticatedClearData)) {
    return {
      ...state,
      loading: false,
      authenticatedData: action.data,
    }
  }

  if (isType(action, authenticatedRequestDataFailure)) {
    return {
      ...state,
      loading: false,
    }
  }

  return state
}

export default authenticatedReducer
