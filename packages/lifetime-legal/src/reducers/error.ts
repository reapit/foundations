import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { errorClearedComponent, errorClearedServer, errorThrownComponent, errorThrownServer } from '../actions/error'

export interface ErrorData {
  readonly status?: number
  readonly message?: string
  readonly type: 'COMPONENT' | 'SERVER'
}

export interface ErrorState {
  componentError: ErrorData | null
  serverError: ErrorData | null
}

export const defaultState: ErrorState = {
  componentError: null,
  serverError: null,
}

const errorReducer = (state: ErrorState = defaultState, action: Action<any>): ErrorState => {
  if (isType(action, errorClearedServer) || isType(action, errorThrownServer)) {
    return {
      ...state,
      serverError: action.data,
    }
  }

  if (isType(action, errorClearedComponent) || isType(action, errorThrownComponent)) {
    return {
      ...state,
      componentError: action.data,
    }
  }

  return state
}

export default errorReducer
