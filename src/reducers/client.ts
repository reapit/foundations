import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { clientLoading, clientReceiveData, clientClearData } from '../actions/client'

export interface ClientItem {
  data: {
    id: string
    appName: string
    developerName: string
    developerId: string
    displayImage: string
    displayText: string
    approved: boolean
  }[]
}

export interface ClientState {
  loading: boolean
  clientData: ClientItem | null
}

export const defaultState: ClientState = {
  loading: false,
  clientData: null
}

const clientReducer = (state: ClientState = defaultState, action: Action<any>): ClientState => {
  if (isType(action, clientLoading)) {
    return {
      ...state,
      loading: action.data
    }
  }

  if (isType(action, clientReceiveData)) {
    return {
      ...state,
      loading: false,
      clientData: action.data || null
    }
  }

  if (isType(action, clientClearData)) {
    return {
      ...state,
      loading: false,
      clientData: action.data
    }
  }

  return state
}

export default clientReducer
