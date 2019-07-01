import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { myAppsLoading, myAppsReceiveData, myAppsClearData } from '../actions/my-apps'

export interface MyAppsItem {
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

export interface MyAppsState {
  loading: boolean
  myAppsData: MyAppsItem | null
}

export const defaultState: MyAppsState = {
  loading: false,
  myAppsData: null
}

const myAppsReducer = (state: MyAppsState = defaultState, action: Action<any>): MyAppsState => {
  if (isType(action, myAppsLoading)) {
    return {
      ...state,
      loading: action.data
    }
  }

  if (isType(action, myAppsReceiveData)) {
    return {
      ...state,
      loading: false,
      myAppsData: action.data || null
    }
  }

  if (isType(action, myAppsClearData)) {
    return {
      ...state,
      loading: false,
      myAppsData: action.data
    }
  }

  return state
}

export default myAppsReducer
