import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { createAppRevision, createAppRevisionSuccess, createAppRevisionFailed } from '@/actions/apps'

export type CreateAppRevisionState = {
  isLoading: boolean
}

export const defaultState: CreateAppRevisionState = {
  isLoading: false,
}

const createAppRevisionReducer = (
  state: CreateAppRevisionState = defaultState,
  action: Action<any>,
): CreateAppRevisionState => {
  if (isType(action, createAppRevision)) {
    return {
      ...state,
      isLoading: true,
    }
  }

  if (isType(action, createAppRevisionSuccess)) {
    return {
      ...state,
      isLoading: false,
    }
  }

  if (isType(action, createAppRevisionFailed)) {
    return {
      ...state,
      isLoading: false,
    }
  }

  return state
}

export default createAppRevisionReducer
