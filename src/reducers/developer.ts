import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { developerLoading, developerReceiveData, developerClearData } from '../actions/developer'

export interface DeveloperItem {
  data: {
    id: string
    appName: string
    developerName: string
    developerId: string
    displayImage: string
    displayText: string
  }[]
}

export interface DeveloperState {
  loading: boolean
  developerData: DeveloperItem | null
}

export const defaultState: DeveloperState = {
  loading: false,
  developerData: null
}

const developerReducer = (state: DeveloperState = defaultState, action: Action<any>): DeveloperState => {
  if (isType(action, developerLoading)) {
    return {
      ...state,
      loading: action.data
    }
  }

  if (isType(action, developerReceiveData)) {
    return {
      ...state,
      loading: false,
      developerData: action.data || null
    }
  }

  if (isType(action, developerClearData)) {
    return {
      ...state,
      loading: false,
      developerData: action.data
    }
  }

  return state
}

export default developerReducer
