import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { setOnline, setOffline } from '../actions/online'

export interface OnlineState {
  online: boolean
}

export const defaultState: OnlineState = {
  online: navigator.onLine
}

const onlineReducer = (state: OnlineState = defaultState, action: Action<any>): OnlineState => {
  if (isType(action, setOnline)) {
    return {
      online: true
    }
  }
  if (isType(action, setOffline)) {
    return {
      online: false
    }
  }

  return state
}

export default onlineReducer
