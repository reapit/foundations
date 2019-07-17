import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { adminLoading, adminReceiveRevisions } from '../actions/admin'
import { AppRevisionModel } from '../types/marketplace-api-schema'

export interface AdminState {
  loading: boolean
  appRevisions: AppRevisionModel[] | null
}

export const defaultState: AdminState = {
  loading: false,
  appRevisions: null
}

const adminReducer = (state: AdminState = defaultState, action: Action<any>): AdminState => {
  if (isType(action, adminLoading)) {
    return {
      ...state,
      loading: action.data
    }
  }

  if (isType(action, adminReceiveRevisions)) {
    return {
      ...state,
      loading: false,
      appRevisions: action.data || null
    }
  }

  return state
}

export default adminReducer
