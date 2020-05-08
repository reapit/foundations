import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { Action } from '@/types/core'
import { clientAppDetailRequestData, clientAppDetailReceiveData, clientAppDetailRequestFailure } from '@/actions/client'
import { isType } from '@/utils/actions'

export type AppDetailData = (AppDetailModel & { apiKey?: string }) | null

export interface ClientAppDetailState {
  data: AppDetailData
  appDetailAuthCode: string | null
  isAppDetailLoading: boolean
  isAppDetailAuthCodeLoading: boolean
  error?: string | null
}

export const defaultState: ClientAppDetailState = {
  error: null,
  data: null,
  appDetailAuthCode: null,
  isAppDetailLoading: false,
  isAppDetailAuthCodeLoading: false,
}

const appDetailReducer = (state: ClientAppDetailState = defaultState, action: Action<any>): ClientAppDetailState => {
  if (isType(action, clientAppDetailRequestData)) {
    return {
      ...state,
      isAppDetailLoading: true,
    }
  }

  if (isType(action, clientAppDetailReceiveData)) {
    return {
      ...state,
      isAppDetailLoading: false,
      data: action.data,
    }
  }

  if (isType(action, clientAppDetailRequestFailure)) {
    return {
      ...state,
      isAppDetailLoading: false,
      error: action.data,
    }
  }

  return state
}

export default appDetailReducer
