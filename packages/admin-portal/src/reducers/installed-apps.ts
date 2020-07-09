import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  installedAppsLoading,
  installedAppsReceiveData,
  installedAppsClearData,
  installedAppsRequestDataFailure,
} from '../actions/installed-apps'
import { PagedResultAppSummaryModel_ } from '@reapit/foundations-ts-definitions'

export interface InstalledAppsItem {
  data: PagedResultAppSummaryModel_
}

export interface InstalledAppsState {
  loading: boolean
  installedAppsData: InstalledAppsItem | null
}

export const defaultState: InstalledAppsState = {
  loading: false,
  installedAppsData: null,
}

const installedAppsReducer = (state: InstalledAppsState = defaultState, action: Action<any>): InstalledAppsState => {
  if (isType(action, installedAppsLoading)) {
    return {
      ...state,
      loading: action.data,
    }
  }

  if (isType(action, installedAppsReceiveData)) {
    return {
      ...state,
      loading: false,
      installedAppsData: action.data || null,
    }
  }

  if (isType(action, installedAppsClearData)) {
    return {
      ...state,
      loading: false,
      installedAppsData: action.data,
    }
  }

  if (isType(action, installedAppsRequestDataFailure)) {
    return {
      ...state,
      loading: false,
    }
  }

  return state
}

export default installedAppsReducer
