import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import {
  clientFetchWebComponentConfig,
  clientUpdateWebComponentConfig,
  clientFetchWebComponentConfigSuccess,
  clientFetchNegotiatorsSuccess,
  clientFetchWebComponentConfigFailed,
  clientUpdateWebComponentConfigFailed,
} from '@/actions/client'
import { WebComponentConfigResult } from '@/services/web-component'
import { PagedResultNegotiatorModel_ } from '@reapit/foundations-ts-definitions'

export interface WebComponentState {
  isShowModal: boolean
  data: WebComponentConfigResult
  loading: boolean
  updating: boolean
  negotiators: PagedResultNegotiatorModel_
}
export const defaultState: WebComponentState = {
  isShowModal: false,
  data: null,
  loading: true,
  updating: false,
  negotiators: {},
}

const webComponentReducer = (state: WebComponentState = defaultState, action: Action<any>): WebComponentState => {
  if (isType(action, clientFetchWebComponentConfig)) {
    return {
      ...state,
      loading: true,
    }
  }
  if (isType(action, clientUpdateWebComponentConfig)) {
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

  if (isType(action, clientFetchWebComponentConfigFailed)) {
    return {
      ...state,
      data: null,
      loading: false,
    }
  }

  if (isType(action, clientUpdateWebComponentConfigFailed)) {
    return {
      ...state,
      updating: false,
    }
  }

  if (isType(action, clientFetchNegotiatorsSuccess)) {
    return {
      ...state,
      negotiators: action.data as PagedResultNegotiatorModel_,
    }
  }

  return state
}

export default webComponentReducer
