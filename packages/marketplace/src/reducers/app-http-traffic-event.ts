import { Action } from '../types/core'
import { isType } from '../utils/actions'
// import { HttpTrafficPerdayStatsModel } from '@reapit/foundations-ts-definitions'
import {
  httpTrafficPerDayRequestData,
  httpTrafficPerDayReceiveData,
  httpTrafficPerDayRequestDataFailure,
} from '@/actions/app-http-traffic-event'

export interface AppHttpTrafficEventState {
  perDayLoading: boolean
  appHttpTraffic: any
}

export const defaultState: AppHttpTrafficEventState = {
  perDayLoading: false,
  appHttpTraffic: null,
}

const appHttpTrafficEventReducer = (
  state: AppHttpTrafficEventState = defaultState,
  action: Action<any>,
): AppHttpTrafficEventState => {
  if (isType(action, httpTrafficPerDayRequestData)) {
    return { ...state, perDayLoading: true }
  }

  if (isType(action, httpTrafficPerDayReceiveData)) {
    return { ...state, perDayLoading: false, appHttpTraffic: action.data }
  }

  if (isType(action, httpTrafficPerDayRequestDataFailure)) {
    return { ...state, perDayLoading: false }
  }

  return state
}

export default appHttpTrafficEventReducer
