import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import {
  clientOpenWebComponentConfig,
  clientCloseWebComponentConfig,
  clientFetchWebComponentConfig,
  clientPutWebComponentConfig,
  clientFetchWebComponentConfigSuccess,
  clientFetchNegotiatorsSuccess,
} from '@/actions/client'
import { WebComponentConfigResult } from '@/services/web-component'
import { NegotiatorsResult } from '@/services/negotiators'

export interface WebComponentState {
  isShowModal: boolean
  data: WebComponentConfigResult
  loading: boolean
  updating: boolean
  negotiators: NegotiatorsResult
}
export const defaultState: WebComponentState = {
  isShowModal: false,
  data: null,
  loading: true,
  updating: false,
  negotiators: null,
}

const webComponentReducer = (state: WebComponentState = defaultState, action: Action<any>): WebComponentState => {
  if (isType(action, clientOpenWebComponentConfig)) {
    return {
      ...state,
      isShowModal: true,
      loading: true,
    }
  }
  if (isType(action, clientCloseWebComponentConfig)) {
    return {
      ...state,
      isShowModal: false,
    }
  }

  if (isType(action, clientFetchWebComponentConfig)) {
    return {
      ...state,
      loading: true,
    }
  }
  if (isType(action, clientPutWebComponentConfig)) {
    return {
      ...state,
      updating: true,
    }
  }
  if (isType(action, clientFetchWebComponentConfigSuccess)) {
    return {
      ...state,
      data: action.data,
      loading: false,
      updating: false,
    }
  }

  if (isType(action, clientFetchNegotiatorsSuccess)) {
    return {
      ...state,
      negotiators: action.data as NegotiatorsResult,
    }
  }

  return state
}

export default webComponentReducer
