import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { myAppsLoading, myAppsReceiveData, myAppsClearData, myAppsRequestDataFailure } from '../actions/my-apps'
import { PagedResultAppSummaryModel_ } from '@reapit/foundations-ts-definitions'

export interface MyAppsItem {
  data: PagedResultAppSummaryModel_
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

  if (isType(action, myAppsRequestDataFailure)) {
    return {
      ...state,
      loading: false
    }
  }

  return state
}

export default myAppsReducer
