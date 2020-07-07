import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { UsageStatsModel } from '@reapit/foundations-ts-definitions'
import {
  appUsageStatsRequestData,
  appUsageStatsReceiveData,
  appUsageStatsRequestDataFailure,
} from '@/actions/app-usage-stats'

export interface AppUsageStatsState {
  loading: boolean
  appUsageStatsData: UsageStatsModel | null
}

export const defaultState: AppUsageStatsState = {
  loading: false,
  appUsageStatsData: null,
}

const appUsageStatsReducer = (state: AppUsageStatsState = defaultState, action: Action<any>): AppUsageStatsState => {
  if (isType(action, appUsageStatsRequestData)) {
    return { ...state, loading: true }
  }

  if (isType(action, appUsageStatsReceiveData)) {
    return { ...state, loading: false, appUsageStatsData: action.data }
  }

  if (isType(action, appUsageStatsRequestDataFailure)) {
    return { ...state, loading: false }
  }

  return state
}

export default appUsageStatsReducer
