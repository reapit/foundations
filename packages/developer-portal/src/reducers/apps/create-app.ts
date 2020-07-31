import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { createApp, createAppSuccess, createAppFailed } from '@/actions/apps'

export type CreateAppState = {
  isLoading: boolean
}

export const defaultState: CreateAppState = {
  isLoading: false,
}

const createAppReducer = (state: CreateAppState = defaultState, action: Action<any>): CreateAppState => {
  if (isType(action, createApp)) {
    return {
      ...state,
      isLoading: true,
    }
  }

  if (isType(action, createAppSuccess)) {
    return {
      ...state,
      isLoading: false,
    }
  }

  if (isType(action, createAppFailed)) {
    return {
      ...state,
      isLoading: false,
    }
  }

  return state
}

export default createAppReducer
