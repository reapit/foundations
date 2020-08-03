import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { declineAppRevision, declineAppRevisionSuccess, declineAppRevisionFailed } from '@/actions/apps'

export type DeclineAppRevisionState = {
  isLoading: boolean
}

export const defaultState: DeclineAppRevisionState = {
  isLoading: false,
}

const declineAppRevisionReducer = (
  state: DeclineAppRevisionState = defaultState,
  action: Action<any>,
): DeclineAppRevisionState => {
  if (isType(action, declineAppRevision)) {
    return {
      ...state,
      isLoading: true,
    }
  }

  if (isType(action, declineAppRevisionSuccess)) {
    return {
      ...state,
      isLoading: false,
    }
  }

  if (isType(action, declineAppRevisionFailed)) {
    return {
      ...state,
      isLoading: false,
    }
  }

  return state
}

export default declineAppRevisionReducer
