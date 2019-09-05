import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { setOnline, setOffline } from '../actions/online'

export interface OnlineState {
  value: boolean
}

export const defaultState: OnlineState = {
  value: navigator.onLine
}

const onlineReducer = (state: OnlineState = defaultState, action: Action<any>): OnlineState => {
  if (isType(action, setOnline)) {
    return {
      value: true
    }
  }
  if (isType(action, setOffline)) {
    return {
      value: false
    }
  }

  return state
}

export default onlineReducer
