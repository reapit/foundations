import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { Action } from '@/types/core'
import { clientFetchAppDetail, clientFetchAppDetailSuccess, clientFetchAppDetailFailed } from '@/actions/client'
import { isType } from '@/utils/actions'

export type AppDetailData = (AppDetailModel & { apiKey?: string }) | null

export interface ClientAppDetailState {
  data: AppDetailData
  isAppDetailLoading: boolean
  error?: string | null
}

export const defaultState: ClientAppDetailState = {
  error: null,
  data: null,
  isAppDetailLoading: false,
}

const appDetailReducer = (state: ClientAppDetailState = defaultState, action: Action<any>): ClientAppDetailState => {
  if (isType(action, clientFetchAppDetail)) {
    return {
      ...state,
      isAppDetailLoading: true,
    }
  }

  if (isType(action, clientFetchAppDetailSuccess)) {
    return {
      ...state,
      isAppDetailLoading: false,
      data: action.data,
    }
  }

  if (isType(action, clientFetchAppDetailFailed)) {
    return {
      ...state,
      isAppDetailLoading: false,
      error: action.data,
    }
  }

  return state
}

export default appDetailReducer
